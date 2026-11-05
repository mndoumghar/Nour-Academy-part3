User Stories => 1:

## Afficher le groupe et les élèves

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

## Choisir un groupe et rechercher un élève

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

## Faire l'appel et saisir les notes

- [X] Un seul écouteur click sur #liste-eleves.
- [X] Utiliser closest() et data-id.
- [X] Retrouver l'élève avec find().
- [X] Le bouton Absent incrémente absences.
- [X] Le bouton Ajouter la note ajoute une note.
- [X] Refuser toute note non numérique ou hors de [0, 20].
- [X] Afficher un message d'erreur si la note est invalide.
- [X] À partir de 3 absences, afficher la classe alerte et le badge.
- [X] Actualiser uniquement la ligne concernée.
- [X] Vérifier que la délégation fonctionne après filtrage.


User Story => 4:

## Ajouter un nouvel élève

FORMULAIRE
- [X] Créer un formulaire avec les champs prénom, nom, groupe, email du parent, téléphone du parent et code d'accès provisoire.
- [X] Chaque champ possède un label.
- [X] Chaque champ possède un message d'erreur et de succès précis.

VALIDATION REGEX
- [X] Valider le prénom avec Regex : lettres, espaces et tirets, 2 caractères minimum.
- [X] Valider le nom avec Regex : lettres, espaces et tirets, 2 caractères minimum.
- [X] Valider l'email du parent avec Regex.
- [X] Valider le téléphone marocain : 06/07 + 8 chiffres ou +212 6/7 + 8 chiffres.
- [X] Valider le code : minimum 8 caractères, une majuscule, un chiffre et un caractère spécial.
- [X] Déclencher la validation en temps réel.
- [X] Modifier la bordure du champ selon son état (valide/invalide).
- [X] Afficher un message de succès ou d'erreur sous chaque champ.

SOUMISSION DU FORMULAIRE
- [X] Bloquer l'envoi si au moins un champ est invalide avec every().
- [X] Vérifier les doublons dans le même groupe avec some().
- [X] Vérifier que le groupe contient moins de 15 élèves.
- [X] Déplacer le focus vers le premier champ en erreur.
- [X] Ajouter l'élève au tableau et à la liste après validation.
- [x] Réinitialiser le formulaire après un ajout réussi.
- [X] Ne jamais afficher le code d'accès provisoire.
- [X] Ne jamais conserver le code d'accès dans les données de l'élève.
