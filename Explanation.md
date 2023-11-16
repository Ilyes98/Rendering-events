# 📅 RENDERING EVENTS 📅

### `Project Overview`

**Le but du projet** c'est d'afficher les événements sur une page Web dans un conteneur couvrant toute la fenêtre avec certaines conditions.


**Tout d'abord**, j'ai créé un fichier appelé **EventUtils** dans le dossier **utils**. Ce fichier contient deux fonctions principales.

La première fonction, appelée **sortEvents**, permet de trier les événements. 

La deuxième fonction, nommée **checkIfEventOverlapsWithAll**, vérifie si un événement donné se chevauche avec tous les autres événements présents.

Ensuite, dans le fichier **EventList**, j'ai implémenté la logique d'affichage des événements sur la page Web. Voici comment cela fonctionne :

J'initialise une variable **event** "index" qui représente l'événement actuel que je vais comparer avec les autres événements.

En utilisant une boucle, je parcours tous les événements en utilisant **un compteur** i". Pour chaque événement, je vérifie deux conditions : 

    -Si "i" est inférieur à "index" et l'event "i" se chevauche avec l'event "index" 
    j'ajoute l'événement "i" à un ensemble et j'incrémente de 1 ma variable "prevCounter".
    -Si "i" est supèrieur à "index" et l'event "i" se chevauche avec l'event "index" 
    j'ajoute l'événement "i" à un ensemble.
    -Sinon si'ils ne chevauchent pas je sort et je ne rajoute rien.
 
 L'ajout des événements à cet ensemble me permet de calculer la largeur des événements **(maxEventWidth)**, tandis que **prevCounter** est utilisé pour déterminer la position de chaque événement(left).

En utilisant cette approche, j'ai pu afficher les événements de manière **responsive**, en tenant compte de la taille de l'écran. J'ai calculé la hauteur de chaque plage horaire **(timeSlotHeight)** en divisant la hauteur de l'écran par **13**, ce qui correspond à la plage horaire de **9h à 21h**. De même, j'ai calculé la largeur maximale d'un événement **(maxEventWidth)** en fonction de la taille de l'écran.

### `Architecture`

    src/
  - components/
    - Calendar.jsx
    - EventList.jsx
    - Events.jsx
    - Header.jsx
    - TimeSlots.jsx
  - styles/
    - App.css
    - Calendar.css
    - index.css
  - utils/
    - CalendarUtils.jsx
    - EventUtils.jsx
    - TimeSlotUtils.jsx

### `Clone the project to your local machine`

    git clone https://gitlab.com/exalt-it-dojo/candidats/ilyes-belfekih-frontjs-rendering-events.git

### `Install the packages required`

    npm install

### `Run the application`

    npm start
