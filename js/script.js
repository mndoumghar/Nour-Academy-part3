

import { eleves, groupes } from "./data.js"



const container = document.getElementById("compteur");
const cards = document.getElementById("liste-eleves");
const DATA = [];


const eleve = eleves.length;
container.textContent = `${eleve} élèves`
const select = document.getElementById("filtre-groupe");
const search = document.getElementById("recherche");

search.addEventListener("input", (event) => {
    let input = event.target.value;
    let filter = eleves.filter((elemnt) => (elemnt.nom.toLocaleLowerCase().includes(input.toLowerCase()) || input === ""));
    render(filter);
})

groupes.forEach((group) => {
    const option = document.createElement("option");
    option.textContent = group.nom;
    option.value = group.id;
    select.append(option)
})

select.addEventListener("change", () => {
    const filterDATA = eleves.filter((eleve) => (eleve.groupeId === Number(select.value) || select.value == ""));
    render(filterDATA)


})


function render(eleves) {
    cards.innerHTML = ""
    eleves.forEach((eleve) => {
        const xx = eleve.notes;
        const li = document.createElement("li");
        if (eleve.absences >= 3) {
            li.className = "alerte rounded-2xl border border-line bg-card p-3";
        } else {
            li.className = "rounded-2xl border border-line bg-card p-3";
        }
        li.dataset.id = eleve.id;
        const name = document.createElement("span");
        name.className = "block truncate font-medium";
        name.textContent = eleve.nom;

        const absence = document.createElement("span");
        absence.className = "block text-sm text-muted";
        absence.textContent = `${eleve.absences} absence(s)`;
        if (eleve.absences >= 3) {
            const spann = document.createElement("span");
            spann.className = "badge ml-1 whitespace-nowrap rounded-full bg-alert px-2 py-0.5 text-xs font-medium text-white";
            spann.textContent = "Prévenir les parents";
            absence.append(spann);
        }

        const initials = document.createElement("span");
        initials.className = "grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand";
        initials.textContent = eleve.initials;
        const note = document.createElement("span");
        if (xx.length > 0) {
            note.className = "font-serif text-xl";
            note.textContent = `${eleve.notes[0]} / 20`;
        }

        const info = document.createElement("span");
        info.className = "min-w-0 flex-1";
        info.append(name, absence);

        const fiche = document.createElement("button");
        fiche.type = "button";
        fiche.className = "btn-fiche flex min-h-11 flex-1 items-center gap-3 text-left";

        fiche.append(initials, info, note);
        const absentBtn = document.createElement("button");
        absentBtn.type = "button";
        absentBtn.className = "btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper";
        absentBtn.textContent = "Absent";

        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "20";
        input.step = "0.5";
        input.placeholder = "Note";
        input.className = "h-11 w-full rounded-full border border-line bg-paper px-4 text-sm lg:w-24";


        const label = document.createElement("label");
        label.className = "flex-1";
        label.append(input);

        const noteBtn = document.createElement("button");
        noteBtn.type = "button";
        noteBtn.className = "btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand";
        noteBtn.textContent = "Ajouter la note";

        const actions = document.createElement("div");
        actions.className = "flex gap-2";
        actions.append(absentBtn, label, noteBtn);

        const container = document.createElement("div");
        container.className = "flex flex-col gap-3 lg:flex-row lg:items-center";
        container.append(fiche, actions);

        const p = document.createElement("p");
        p.className = "message mt-2 text-xs text-alert";
        p.textContent = "La note doit être un nombre entre 0 et 20";

        if (xx.length === 0) {
            li.append(container, p);

        } else {
            li.append(container);

        }
        cards.append(li);
    });



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



getAlertes()
getAbsences()
getMoyenne()






render(eleves)