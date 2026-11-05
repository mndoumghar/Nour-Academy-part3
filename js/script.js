
import { eleves, groupes } from "./data.js"
import { initStudentForm } from "./features/student-form.js";

const container = document.getElementById("compteur");
const cards = document.getElementById("liste-eleves");


const select = document.getElementById("filtre-groupe");
const search = document.getElementById("recherche");



groupes.forEach((group) => {
    const option = document.createElement("option");
    option.textContent = group.nom;
    option.value = group.id;
    select.append(option)
})

function render(filteredEleves = eleves) {
    cards.replaceChildren();
    container.textContent = `${filteredEleves.length} élèves`;
    const lignes = filteredEleves.map(creerLigne);
    cards.append(...lignes);

    getMeilleurMoyenne();
    getAbsences();
    getMoyenne();
    getAlertes();

}


function creerLigne(eleve) {
    const li = document.createElement("li");
    li.classList.add("rounded-2xl", "border", "border-line", "bg-card", "p-3");
    if (eleve.absences >= 3) {
        li.classList.add("alerte");
    }

    li.dataset.id = eleve.id;
    const name = document.createElement("span");
    name.classList.add("block", "truncate", "font-medium");
    name.textContent = `${eleve.prenom} ${eleve.nom}`;

    const absence = document.createElement("span");
    absence.classList.add("block", "text-sm", "text-muted");
    absence.textContent = `${eleve.absences} absence(s)`;

    if (eleve.absences >= 3) {
        const spann = document.createElement("span");
        spann.classList.add(
            "badge", "ml-1", "whitespace-nowrap",
            "rounded-full", "bg-alert", "px-2",
            "py-0.5", "text-xs", "font-medium", "text-white"
        );

        spann.textContent = "Prévenir les parents";
        absence.append(spann);
    }

    const initials = document.createElement("span");
    initials.classList.add(
        "grid", "size-10", "shrink-0", "place-items-center",
        "rounded-full", "bg-brand-soft", "text-sm",
        "font-semibold", "text-brand"
    );

    initials.textContent = `${eleve.prenom[0]}${eleve.nom[0]}`.toUpperCase();
    const note = document.createElement("span");

    note.classList.add("font-serif", "text-xl", "student-average");

    note.textContent = lanote(eleve.notes);

    const info = document.createElement("span");
    info.classList.add("min-w-0", "flex-1");
    info.append(name, absence);

    const fiche = document.createElement("button");
    fiche.type = "button";
    fiche.classList.add(
        "btn-fiche", "flex", "min-h-11", "flex-1",
        "items-center", "gap-3", "text-left"
    );

    fiche.append(initials, info, note);

    const absentBtn = document.createElement("button");
    absentBtn.type = "button";
    absentBtn.classList.add(
        "btn-absent", "h-11", "rounded-full",
        "border", "border-line", "px-3",
        "sm:px-4", "text-sm", "font-medium", "hover:bg-paper"
    );
    absentBtn.textContent = "Absent";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "20";
    input.step = "0.5";
    input.placeholder = "Note";
    input.classList.add(
        "grade-input",
        "h-11", "w-full", "rounded-full",
        "border", "border-line", "bg-paper",
        "px-4", "text-sm", "lg:w-24"
    );


    const label = document.createElement("label");
    label.classList.add("flex-1");
    label.append(input);

    const noteBtn = document.createElement("button");
    noteBtn.type = "button";
    noteBtn.classList.add(
        "btn-note", "h-11", "rounded-full",
        "bg-ink", "px-3", "sm:px-4",
        "text-sm", "font-medium", "text-white", "hover:bg-brand"
    );
    noteBtn.textContent = "Ajouter la note";
    const actions = document.createElement("div");
    actions.classList.add("flex", "gap-2");
    actions.append(absentBtn, label, noteBtn);

    const container = document.createElement("div");
    container.classList.add(
        "flex", "flex-col", "gap-3",
        "lg:flex-row", "lg:items-center"
    );
    const span = document.createElement("span");
    span.classList.add("text-red-600");
    span.classList.add("message")
    container.append(fiche, actions, span);
    li.append(container);
    return li;

}


function getMoyenne() {
    const bilan_moyenne = document.getElementById("bilan-moyenne");
    const moyenne = eleves.reduce((sum, ob) => {
        const total = ob.notes.reduce((x, y) => x + y, 0);
        const averge = total / ob.notes.length || 0;
        return sum + averge;
    }, 0)
    const averge = (moyenne / eleves.length).toFixed("2");
    bilan_moyenne.textContent = `${averge}`;
}

function lanote(arr) {
    if (arr.length === 0) return "—";
    const moyenne = arr.reduce((sum, note) => sum + note, 0) / arr.length;
    return `${moyenne.toLocaleString("fr-FR", {
        maximumFractionDigits: 1
    })} / 20`;
}


function getAbsences() {
    const bilan_absences = document.getElementById("bilan-absences");
    const abs = eleves.reduce((sum, ob) => sum + ob.absences, 0);
    return bilan_absences.textContent = abs;
}

function getAlertes() {
    const bilan_alertes = document.getElementById("bilan-alertes");
    const newArray = eleves.filter((e) => e.absences >= 3);
    return bilan_alertes.textContent = newArray.length;
}


function getMeilleurMoyenne() {
    const bilan_meilleur = document.getElementById("bilan-meilleur");

    const arr = eleves

        .filter((eleve) => eleve.notes.length > 0)
        .map((eleve) => ({
            id: eleve.id,
            nom: `${eleve.prenom} ${eleve.nom}`,
            moyenne: eleve.notes.reduce((sum, note) => sum + note, 0) / eleve.notes.length
        }))

        if (arr.length === 0) {
            bilan_meilleur.textContent = "—";
            return;
        }

    const meilleur = arr.reduce((sum, x) =>
        x.moyenne > sum.moyenne ? x : sum
    );


    bilan_meilleur.textContent =
        `${meilleur.nom} — ${meilleur.moyenne.toLocaleString("fr-Ma", {
            maximumFractionDigits: 2,
        })} / 20`;

}


function applyFilters() {
    const query = search.value.trim().toLowerCase();
    const selectedGroup = select.value;
    const message = document.getElementById("message-items");

    const filteredEleves = eleves.filter((eleve) => {

        return (eleve.prenom.toLowerCase().includes(query) || eleve.nom.toLowerCase().includes(query)) &&
            (selectedGroup === "" || eleve.groupeId === Number(selectedGroup));
    });

    if (filteredEleves.length == 0) {
        message.textContent = "aucun élève ne correspond ";
    } else {
        message.textContent = "";
    }

    render(filteredEleves);
}



function notificationAbsence() {
    const lis_parents = document.getElementById("liste-parents");
    lis_parents.replaceChildren();

    const ul = document.createElement("ul");

    ul.classList.add("mt-3", "grid", "gap-2", "text-sm");

    let CallParent = eleves.filter(el => el.absences >= 3);

    CallParent = CallParent.sort((x, y) => y.absences - x.absences);

    CallParent.forEach((parent, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");

        /*
        class="badge ml-1 whitespace-nowrap rounded-full bg-alert px-2 py-0.5 text-xs font-medium text-white"
        
        */
        span.textContent = parent.absences;

        span.classList.add(
            "ml-1",
            "whitespace-nowrap",
            "rounded-full",
            "bg-alert",
            "px-2",
            "py-0.5",
            "text-xs",
            "font-medium",
            "text-white"
        );

        li.textContent = `${parent.prenom} ${parent.nom} — ${parent.telephoneParent}`;
        li.classList.add(
            "flex",
            "w-full",
            "rounded-xl",
            "bg-card",
            "px-3",
            "py-2",
            "ring-1",
            "ring-line",
            "justify-between"
        );


        if (index === 0) {
            li.classList.add("appeler-parent");
        }

        li.append(span);


        ul.appendChild(li);
    });
    lis_parents.append(ul);

}


search.addEventListener("input", Debounse(applyFilters));
select.addEventListener("change", applyFilters);


cards.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-absent");
    if (!button) return

    const li = event.target.closest("li");
    const ID = Number
        (li.dataset.id);

    const objEleve = eleves.find((eleve) => eleve.id === ID);

    if (!objEleve) return;
    objEleve.absences++;
    applyFilters();
    getAlertes();

    if (objEleve.absences >= 3) {
        //  alert("Absence Est  3");
        notificationAbsence();
    }
})



cards.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-note");
    if (!button) return;

    const li = button.closest("li[data-id]");

    if (!li) return;

    const ID = Number(li.dataset.id);

    const objEleve = eleves.find(
        (eleve) => eleve.id === ID
    );

    if (!objEleve) return;

    const input = li.querySelector(".grade-input");
    const message = li.querySelector(".message");

    const value = input.value.trim();
    const grade = Number(value);

    if (
        value === "" ||
        !Number.isFinite(grade) ||
        grade < 0 ||
        grade > 20
    ) {
        message.textContent =
            "La note doit être un nombre entre 0 et 20";
        message.hidden = false;

        input.focus();
        return;
    }


    objEleve.notes.push(grade);

    li.querySelector(".student-average").textContent = lanote(objEleve.notes);

    input.value = "";
    message.hidden = true;
    render();

});







getAlertes()
getAbsences()
getMoyenne()
getMeilleurMoyenne();



notificationAbsence()


function Debounse(callback) {
    let res = null;
    return function () {
        clearTimeout(res);
        res = setTimeout(() => {
            callback();
        }, 500);
    }
}

const form = document.getElementById("form-eleve");

initStudentForm(
    form,
    eleves,
    groupes,
    applyFilters
);





render(eleves)