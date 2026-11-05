
export function initStudentForm(form, eleves, groupes, onStudentAdded) {

    const prenom = form.querySelector("#prenom")
    const nom = form.querySelector("#nom");
    const groupe = form.querySelector("#groupe")
    const email = form.querySelector("#email")
    const telephone = form.querySelector("#telephone");
    const code = form.querySelector("#code");    
    const success = form.querySelector("#form-succes")
    const error = form.querySelector("#form-erreur")

    const fields = [prenom, nom, groupe, email, telephone, code]

    groupes.forEach((group) => {
        const option = document.createElement("option")
        option.value = group.id
        option.textContent = group.nom
        groupe.append(option)
    })

    
    const nameRegex = /^[\p{L}]+(?:[ -][\p{L}]+)*$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:0[67]\d{8}|\+212[67]\d{8})$/;
    const codeRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;

    function displayValidation(field, isValid, message) {
        const wrapper = field.closest(".champ")
        const feedback = form.querySelector(`#${field.id}-msg`)
        
        wrapper.classList.toggle("valide", isValid)
        wrapper.classList.toggle("erreur", !isValid)
      
        feedback.textContent = isValid      
            ? "Champ valide."
            : message

        field.setAttribute("aria-invalid", String(!isValid))
    }

    function validationform(field) {
        const value = field.value.trim()

        let isValid = false
        let message = ""

        if (field === prenom || field === nom) {
            isValid = value.length >= 2 && nameRegex.test(value);
            message = "minimum 2 caractères:: lettres, espaces ou tirets"

        } else if (field === groupe) {

            isValid = groupes.some(
                (group) => String(group.id) === value
            );
                 message = "veuillez choisir un groupe valide";

        } else if(field === email) {

            isValid = emailRegex.test(value);

            message = "Veuillez saisir un email valide.";

        } else if(field === telephone) {
            isValid = phoneRegex.test(value.replace(/\s/g, ""));
            message = "format attendu : 06/07 + 8 chiffres ou +212 6/7 + 8 chiffres.";

        } else if (field === code) {

            isValid = codeRegex.test(field.value);

            message = "Minimum 8 caractères, une majuscule, un chiffre et un caractère spécial.";
        }

        displayValidation(field, isValid, message);

        return isValid;
    }
    fields.forEach((field) => {
        const eventName = field === groupe ? "change" : "input";

        field.addEventListener(eventName, () => {
            validationform(field);
            error.hidden = true;
        });

    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        success.hidden = true;
        error.hidden = true;

        const results = fields.map(validationform);

        const isValid = results.every(Boolean);

        if (!isValid) {
            const firstInvalid = fields.find(
                (field) => field.getAttribute("aria-invalid") === "true"
            )
            firstInvalid.focus();
            return
        }
        const groupId = Number(groupe.value);

        const exists = eleves.some((eleve) =>
            eleve.groupeId === groupId &&
            eleve.prenom.toLowerCase() === prenom.value.trim().toLowerCase() &&
            eleve.nom.toLowerCase() === nom.value.trim().toLowerCase()
        );

        if (exists) {

            displayValidation(
                prenom,
                false,
                "Cet élève existe déjà dans ce groupe."
            );

            prenom.focus();

            return;
        }

        const groupSize = eleves.filter(
            (eleve) => eleve.groupeId === groupId
        ).length

        if (groupSize >= 15) {

            displayValidation(
                groupe,
                false,
                "Ce groupe contient déjà 15 élèves."
            );

            groupe.focus();

            error.textContent = "Impossible d'ajouter un élève : groupe complet.";
            error.hidden = false;

            return;
        }

        const id = eleves.reduce(
            (max, eleve) => Math.max(max, eleve.id),
            0
        ) + 1;

        const newStudent = {
            id,
            prenom: prenom.value.trim(),
            nom: nom.value.trim(),
            groupeId: groupId,
            emailParent: email.value.trim(),
            telephoneParent: telephone.value.trim(),
            absences: 0,
            notes: []
        };
        
        eleves.push(newStudent);
        form.reset()

        fields.forEach((field) => {
            field.classList.remove("is-valid", "is-invalid");
            field.removeAttribute("aria-invalid");

            const wrapper = field.closest(".champ");
            wrapper.classList.remove("valide", "erreur");

            form.querySelector(`#${field.id}-msg`).textContent = "";
        });


        success.hidden = false
        error.hidden = true

        onStudentAdded();

    });
}
