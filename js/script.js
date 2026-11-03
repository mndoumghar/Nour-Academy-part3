

import { eleves, groupes } from "./data.js"



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
        name.textContent =`${eleve.prenom} ${eleve.nom}`;

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

        note.classList.add("font-serif", "text-xl");
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
        container.append(fiche, actions);
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
       const abs =  eleves.reduce((sum,ob) => sum + ob.absences,0);
       return bilan_absences.textContent = abs;
}

function getAlertes() {
    const bilan_alertes = document.getElementById("bilan-alertes");
    const newArray =  eleves.filter((e) => e.absences >=3);
    return bilan_alertes.textContent = newArray.length;
}


function getMeilleurMoyenne() {
    const bilan_meilleur = document.getElementById("bilan-meilleur");

    return bilan_meilleur.textContent = "mndoumghar";

}
function applyFilters() {
    const query = search.value.trim().toLowerCase();
    const selectedGroup = select.value;

    const filteredEleves = eleves.filter((eleve) => {
        const matchName =
            eleve.prenom.toLowerCase().includes(query) ||
            eleve.nom.toLowerCase().includes(query);

        const matchGroup =
            selectedGroup === "" ||
            eleve.groupeId === Number(selectedGroup);

        return matchName && matchGroup;
    });

    render(filteredEleves);
}


search.addEventListener("input", applyFilters);
select.addEventListener("change", applyFilters);


getAlertes()
getAbsences()
getMoyenne()
getMeilleurMoyenne();






render(eleves)