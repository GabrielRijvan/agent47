```javascript
/* =========================================================
   THE FILE HUNT — SCRIPT.JS
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const TOTAL_BUTTONS = 100;

const REAL_BUTTON = 47;

const REAL_LINK =
    "https://drive.google.com/file/d/1qQg0rbBL7UduQVZ2kFznb1iNJHoa6kqT/view?usp=sharing";


/* =========================================================
   ELEMENTS
   ========================================================= */

const buttonGrid = document.getElementById("button-grid");

const statusMessage = document.getElementById("status-message");

const overlay = document.getElementById("reaction-overlay");

const reactionNumber = document.getElementById("reaction-number");

const reactionTitle = document.getElementById("reaction-title");

const reactionText = document.getElementById("reaction-text");

const closeReaction = document.getElementById("close-reaction");


/* =========================================================
   MESSAGES DES FAUX BOUTONS
   ========================================================= */

const fakeMessages = [

    "Accès refusé. Évidemment.",

    "Ce fichier n'existe probablement pas.",

    "Bravo. Vous venez de perdre quelques secondes.",

    "Erreur 404 : votre intuition est introuvable.",

    "Rien à signaler ici.",

    "Le mauvais bouton. Quelle surprise.",

    "Vous pensiez vraiment que ce serait celui-là ?",

    "Fausse piste détectée.",

    "Le système vous observe.",

    "Tentative enregistrée.",

    "Encore raté.",

    "Ce bouton ne sert absolument à rien.",

    "Mauvaise décision.",

    "Vous êtes proche. Ou pas.",

    "Le fichier est ailleurs.",

    "L'algorithme se moque de vous.",

    "Accès fantôme détecté.",

    "Signal perdu.",

    "Vous avez réveillé quelque chose.",

    "Non.",

    "Toujours pas.",

    "Essayez encore, agent.",

    "Erreur critique... enfin, presque.",

    "Cette porte est condamnée.",

    "Indice : ce n'est pas ici.",

    "Votre chance vient de diminuer.",

    "Le système dit NON.",

    "Fausse alerte.",

    "Presque crédible.",

    "Pourquoi avez-vous cliqué ici ?"

];


/* =========================================================
   CREATION DES BOUTONS
   ========================================================= */

for (let i = 1; i <= TOTAL_BUTTONS; i++) {

    const button = document.createElement("button");

    button.classList.add("file-button");

    button.type = "button";

    button.dataset.number = i;

    const number = document.createElement("span");

    number.textContent =
        String(i).padStart(2, "0");

    button.appendChild(number);


    /* -----------------------------------------------------
       BOUTON 47
       ----------------------------------------------------- */

    if (i === REAL_BUTTON) {

        button.classList.add("agent-47");

        button.title =
            "PROTOCOL 47 — CLASSIFIED";

        button.addEventListener("click", () => {

            launchRealFile();

        });

    }


    /* -----------------------------------------------------
       AUTRES BOUTONS
       ----------------------------------------------------- */

    else {

        button.addEventListener("click", () => {

            launchFakeButton(i);

        });

    }


    buttonGrid.appendChild(button);
}


/* =========================================================
   BOUTON 47 — VRAI LIEN
   ========================================================= */

function launchRealFile() {

    document.body.classList.add("system-chaos");

    statusMessage.textContent =
        "⚠ PROTOCOLE 47 ACTIVÉ — OUVERTURE DU FICHIER...";


    reactionNumber.textContent = "47";

    reactionTitle.textContent =
        "TARGET ACQUIRED";

    reactionText.textContent =
        "Le bon bouton. Agent 47 approuve votre choix.";


    openOverlay();


    setTimeout(() => {

        document.body.classList.remove("system-chaos");

        window.open(
            REAL_LINK,
            "_blank",
            "noopener,noreferrer"
        );

    }, 1200);
}


/* =========================================================
   FAUX BOUTONS
   ========================================================= */

function launchFakeButton(number) {

    const randomIndex =
        Math.floor(Math.random() * fakeMessages.length);

    const message =
        fakeMessages[randomIndex];


    reactionNumber.textContent =
        String(number).padStart(2, "0");


    reactionTitle.textContent =
        getFakeTitle();


    reactionText.textContent =
        message;


    statusMessage.textContent =
        `Tentative ${String(number).padStart(2, "0")} détectée... ACCÈS REFUSÉ.`;


    openOverlay();


    /* Petit chaos aléatoire */

    if (Math.random() > 0.65) {

        document.body.classList.add("system-chaos");

        setTimeout(() => {

            document.body.classList.remove("system-chaos");

        }, 250);

    }
}


/* =========================================================
   TITRES ALÉATOIRES
   ========================================================= */

function getFakeTitle() {

    const titles = [

        "ACCESS DENIED",

        "WRONG PATH",

        "FALSE TARGET",

        "NOPE",

        "SYSTEM ERROR",

        "NICE TRY",

        "CLASSIFIED",

        "404",

        "TARGET NOT FOUND",

        "INVALID CHOICE",

        "MISSION FAILED"

    ];

    return titles[
        Math.floor(Math.random() * titles.length)
    ];
}


/* =========================================================
   OVERLAY
   ========================================================= */

function openOverlay() {

    overlay.classList.add("active");

}


function closeOverlay() {

    overlay.classList.remove("active");

}


/* =========================================================
   BOUTON FERMER
   ========================================================= */

closeReaction.addEventListener(
    "click",
    closeOverlay
);


/* =========================================================
   CLIQUE EN DEHORS DE LA FENÊTRE
   ========================================================= */

overlay.addEventListener("click", (event) => {

    if (event.target === overlay) {

        closeOverlay();

    }

});


/* =========================================================
   TOUCHE ESC
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeOverlay();

    }

});


/* =========================================================
   EFFET ALÉATOIRE SUR LES BOUTONS
   ========================================================= */

const buttons =
    document.querySelectorAll(".file-button");


buttons.forEach((button, index) => {

    /* Délais légèrement différents */

    button.style.animationDelay =
        `${index * 0.015}s`;


    /* Petit mouvement aléatoire au survol */

    button.addEventListener("mouseenter", () => {

        if (button.dataset.number !== "47") {

            const rotation =
                (Math.random() * 4) - 2;

            button.style.transform =
                `translateY(-8px)
                 rotateZ(${rotation}deg)
                 scale(1.04)`;

        }

    });


    button.addEventListener("mouseleave", () => {

        if (button.dataset.number !== "47") {

            button.style.transform = "";

        }

    });

});


/* =========================================================
   MESSAGE INITIAL
   ========================================================= */

setTimeout(() => {

    statusMessage.textContent =
        "100 cibles détectées. Une seule est authentique.";

}, 1000);


/* =========================================================
   PETIT GLITCH ALÉATOIRE
   ========================================================= */

setInterval(() => {

    const randomButton =
        buttons[
            Math.floor(Math.random() * buttons.length)
        ];

    if (!randomButton) return;


    randomButton.style.transform =
        "translateX(3px) skewX(-4deg)";


    setTimeout(() => {

        randomButton.style.transform = "";

    }, 100);

}, 3500);
```
