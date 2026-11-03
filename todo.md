User Stories => 1:

Afficher le groupe et les élèves

- [X] Définir les données dans data.js.
- [X] Charger data.js avant script.js.
- [X] Créer 3 groupes et au moins 15 élèves fictifs.
- [X] Générer les lignes avec eleves.map(creerLigne).
- [X] Utiliser createElement() pour créer les éléments DOM.
- [X] Utiliser textContent pour afficher les données.
- [X] Utiliser classList pour gérer les classes CSS tailwind
- [X] Ajouter les lignes avec append() data
- [X] Ne pas écrire les élèves directement dans le HTML.
- [X] Ne pas utiliser innerHTML pour afficher les données des élèves.
- [X] Afficher le prénom et le nom de chaque élève.
- [X] Afficher le nombre d'absences.
- [X] Calculer et afficher la moyenne de chaque élève.
- [X] Afficher "—" lorsqu'un élève n'a aucune note.
- [X] Afficher le compteur du nombre d'élèves




User Stories => 2:

Choisir un groupe et rechercher un élève

- [X] Générer les options du select depuis le tableau groupes.
- [X] Utiliser l'événement change pour détecter le changement de groupe.
- [X] Utiliser l'événement input pour effectuer une recherche instantanée.
- [X] Rechercher un élève par son prénom ou son nom.
- [X] Effectuer une recherche insensible à la casse.
- [X] Combiner la sélection du groupe et la recherche dans un seul filter()
- [X] Afficher uniquement les élèves correspondant aux deux critère
- [X] Afficher le nombre de résultats après chaque filtrage
- [X] Afficher un message lorsqu'aucun élève ne correspond à la recherche




User Stories => 3:

Faire l'appel et saisir les notes
- [X] Un seul écouteur click sur #liste-eleves.
- [X] Utiliser closest() et data-id.
- [X] Retrouver l'élève avec find().
- [X] Le bouton Absent incrémente absences.
- [ ] Le bouton Ajouter la note ajoute une note.
- [ ] Refuser toute note non numérique ou hors de [0, 20].
- [ ] Afficher un message d'erreur si la note est invalide.
- [ ] À partir de 3 absences, afficher la classe alerte et le badge.
- [ ] Actualiser uniquement la ligne concernée.
- [ ] Vérifier que la délégation fonctionne après filtrage.


