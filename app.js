/* ==========================================================================
   APPLICATION D'ANNIVERSAIRE LILY - LOGIQUE INTERACTIVE & VIDÉOS SOUVENIRS
   ========================================================================== */

// 1. LISTE DES VIDÉOS DES PARTICIPANTS (Spécifiées dans les assets)
const MEMORIES = [
    {
        id: "adeline",
        name: "Adeline",
        videoUrl: "assets/Adeline/video.mp4"
    },
    {
        id: "aelis",
        name: "Aelis",
        videoUrl: "assets/Aelis/video.mp4"
    },
    {
        id: "alicia",
        name: "Alicia",
        videoUrl: "assets/Alicia/video.mp4"
    },
    {
        id: "axel",
        name: "Axel",
        videoUrl: "assets/Axel/video.mp4"
    },
    {
        id: "benoit",
        name: "Benoit",
        videoUrl: "assets/Benoit/IMG_0369.MOV"
    },
    {
        id: "bryan",
        name: "Bryan",
        videoUrl: "assets/Bryan/video.mp4"
    },
    {
        id: "carole",
        name: "Carole",
        videoUrl: "assets/Carole/IMG_0368.MOV"
    },
    {
        id: "caroline",
        name: "Caroline",
        videoUrl: "assets/Caroline/IMG_0372.MOV"
    },
    {
        id: "cassandra",
        name: "Cassandra",
        videoUrl: "assets/Cassandra/video.mp4"
    },
    {
        id: "emilie",
        name: "Emilie",
        videoUrl: "assets/Emilie/video.mp4"
    },
    {
        id: "emmanuel",
        name: "Emmanuel",
        videoUrl: "assets/Emmanuel/IMG_0375.MOV"
    },
    {
        id: "emmie",
        name: "Emmie",
        videoUrl: "assets/Emmie/video.mp4"
    },
    {
        id: "enzo-madmoiselle",
        name: "Enzo Madmoiselle",
        videoUrl: "assets/enzo-madmoiselle/video.mp4"
    },
    {
        id: "floryen",
        name: "Floryen",
        videoUrl: "assets/Floryen/video.mp4"
    },
    {
        id: "gwen",
        name: "Gwen",
        videoUrl: "assets/Gwen/video.mp4"
    },
    {
        id: "judy",
        name: "Judy",
        videoUrl: "assets/Judy/video.mp4"
    },
    {
        id: "kenzo",
        name: "Kenzo",
        videoUrl: "assets/Kenzo/Kenzo.MOV"
    },
    {
        id: "kev-adams",
        name: "Kev Adams",
        videoUrl: "assets/Kev-Adams/video.mp4"
    },
    {
        id: "laetitia",
        name: "Laetitia",
        videoUrl: "assets/Laetitia/video.mp4"
    },
    {
        id: "le-daron",
        name: "Le Daron",
        videoUrl: "assets/Le Daron/video.mp4"
    },
    {
        id: "les-barbeaux",
        name: "Les Barbeaux",
        videoUrl: "assets/Les-Barbeaux/video.mp4"
    },
    {
        id: "les-goulamas-k",
        name: "Les Goulamas'k",
        videoUrl: "assets/Les-Goulamas'k/video.mp4"
    },
    {
        id: "lilian",
        name: "Lilian",
        videoUrl: "assets/Lilian/video.mp4"
    },
    {
        id: "lina",
        name: "Lina",
        videoUrl: "assets/Lina/video.mp4"
    },
    {
        id: "magalie",
        name: "Magalie",
        videoUrl: "assets/Magalie/video.mp4"
    },
    {
        id: "maia",
        name: "Maïa",
        videoUrl: "assets/Maïa/video.mp4"
    },
    {
        id: "marie-laure",
        name: "Marie-Laure",
        videoUrl: "assets/Marie-laure/video.mp4"
    },
    {
        id: "marilou",
        name: "Marilou",
        videoUrl: "assets/Marilou/video.mp4"
    },
    {
        id: "marine",
        name: "Marine",
        videoUrl: "assets/Marine/video.mp4"
    },
    {
        id: "mathieu",
        name: "Mathieu",
        videoUrl: "assets/Mathieu/video.mp4"
    },
    {
        id: "noah",
        name: "Noah",
        videoUrl: "assets/Noah/video.mp4"
    },
    {
        id: "noel",
        name: "Noël",
        videoUrl: "assets/Noel/video.mp4"
    },
    {
        id: "oriane",
        name: "Oriane",
        videoUrl: "assets/Oriane/0735f3bda4314f91b465cf049be42f4c.MOV"
    },
    {
        id: "philippe",
        name: "Philippe",
        videoUrl: "assets/philippe/IMG_0374.MOV"
    },
    {
        id: "pierre",
        name: "Pierre",
        videoUrl: "assets/Pierre/video.mp4"
    },
    {
        id: "quentin",
        name: "Quentin",
        videoUrl: "assets/Quentin/video.mp4"
    },
    {
        id: "sarah-de-skyrock",
        name: "Sarah de Skyrock",
        videoUrl: "assets/Sarah-de-skyrock/video.mp4"
    },
    {
        id: "simon",
        name: "Simon",
        videoUrl: "assets/Simon/d33c0f6e7b0a479988fd445cf90f7444.MOV"
    },
    {
        id: "ted-de-skyrock",
        name: "Ted de Skyrock",
        videoUrl: "assets/Ted-de-skyrock/video.mp4"
    },
    {
        id: "valerie",
        name: "Valérie",
        videoUrl: "assets/Valérie/video.mp4"
    },
    {
        id: "yoan",
        name: "Yoan",
        videoUrl: "assets/Yoan/video.mp4"
    }
];


// 2. MOTEUR DE CONFETTIS EN CANVAS 2D (Optimisé pour de hautes performances)
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let confettiParticles = [];
let animationFrameId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const CONFETTI_COLORS = [
    "#9d4edd", // Violet principal
    "#ff007f", // Rose secondaire
    "#ffb703", // Accent or
    "#240046", // Violet foncé
    "#e2e8f0", // Blanc cassé
    "#06b6d4"  // Bleu cyan
];

class Confetti {
    constructor(x, y, isBurst = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 6;
        this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        
        if (isBurst) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 4;
            this.speedX = Math.cos(angle) * speed;
            this.speedY = Math.sin(angle) * speed - 2;
        } else {
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 + 2; // Chute constante
        }
        
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
        this.opacity = 1;
        this.decay = Math.random() * 0.015 + 0.005;
        this.isBurst = isBurst;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.isBurst) {
            this.speedX *= 0.96;
            this.speedY += 0.2;
            this.opacity -= this.decay;
        } else {
            this.speedY += 0.01;
            this.speedX += Math.sin(this.y / 30) * 0.01;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        if (this.size % 2 === 0) {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 1.5);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

// Lancer un burst de confettis
function triggerConfettiBurst(x, y) {
    for (let i = 0; i < 70; i++) {
        confettiParticles.push(new Confetti(x, y, true));
    }
}

// Pluie de confettis continue
function addConfettiRain() {
    if (confettiParticles.filter(p => !p.isBurst).length < 60) {
        confettiParticles.push(new Confetti(Math.random() * canvas.width, -10, false));
    }
}

// Animation Loop
function animateConfettis() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addConfettiRain();

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const p = confettiParticles[i];
        p.update();
        p.draw();

        if (p.opacity <= 0 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
            confettiParticles.splice(i, 1);
        }
    }

    animationFrameId = requestAnimationFrame(animateConfettis);
}


// 3. MODALE ET LECTEUR VIDÉO IMMERSIF AVEC TÉLÉCHARGEMENT
const modal = document.getElementById("video-modal");
const modalClose = document.getElementById("modal-close");
const modalVideo = document.getElementById("modal-video-element");
const videoLoader = document.getElementById("video-loader");
const modalName = document.getElementById("modal-participant-name");

// Contrôles personnalisés du lecteur
const playBtn = document.getElementById("video-btn-play");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const progressBar = document.getElementById("video-progress-bar");
const progressFilled = document.getElementById("video-progress-filled");
const timeLabel = document.getElementById("video-time");
const muteBtn = document.getElementById("video-btn-mute");
const iconUnmute = document.getElementById("icon-unmute");
const iconMute = document.getElementById("icon-mute");
const downloadBtn = document.getElementById("video-btn-download");

// Variables pour la gestion robuste des formats vidéo (fallbacks)
let currentVideoFallbacks = [];
let currentFallbackIndex = 0;

function openVideoModal(memory) {
    // Mettre à jour le titre du participant
    modalName.innerText = memory.name;

    // Déterminer le bon chemin vidéo selon si on est dans un sous-dossier ou à la racine
    let videoPath = memory.videoUrl;
    if (window.CURRENT_PARTICIPANT && !videoPath.startsWith("../")) {
        videoPath = "../" + videoPath;
    }

    // Configurer le bouton de téléchargement de la vidéo
    downloadBtn.href = videoPath;
    
    // Déterminer l'extension du fichier original
    const extension = videoPath.split('.').pop();
    downloadBtn.download = `Joyeux_Anniversaire_Lily_par_${memory.name}.${extension}`;

    // Construire la liste de replis si c'est une vidéo par défaut "video.mp4"
    currentVideoFallbacks = [videoPath];
    currentFallbackIndex = 0;

    if (videoPath.endsWith('/video.mp4')) {
        const basePath = videoPath.substring(0, videoPath.length - 4);
        currentVideoFallbacks.push(basePath + '.mov');
        currentVideoFallbacks.push(basePath + '.MOV');
        currentVideoFallbacks.push(basePath + '.MP4');
    } else if (videoPath.endsWith('/video.MOV')) {
        const basePath = videoPath.substring(0, videoPath.length - 4);
        currentVideoFallbacks.push(basePath + '.mp4');
        currentVideoFallbacks.push(basePath + '.mov');
        currentVideoFallbacks.push(basePath + '.MP4');
    }

    // Préparer le chargement de la vidéo
    videoLoader.classList.add("active");
    modalVideo.src = currentVideoFallbacks[0];

    // Réinitialiser les états des contrôles du lecteur
    iconPlay.classList.remove("hidden");
    iconPause.classList.add("hidden");
    progressFilled.style.width = "0%";
    timeLabel.innerText = "0:00 / 0:00";

    // Ouvrir la modale avec effet confetti
    modal.classList.add("active");
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);

    modalVideo.load();
}

modalVideo.addEventListener("canplay", () => {
    videoLoader.classList.remove("active");
});

modalVideo.addEventListener("waiting", () => {
    videoLoader.classList.add("active");
});

modalVideo.addEventListener("error", () => {
    // Si un format échoue, on tente le format suivant s'il y en a un
    currentFallbackIndex++;
    if (currentFallbackIndex < currentVideoFallbacks.length) {
        console.log(`Échec du chargement du format précédent, essai avec : ${currentVideoFallbacks[currentFallbackIndex]}`);
        modalVideo.src = currentVideoFallbacks[currentFallbackIndex];
        
        // Mettre à jour également le bouton de téléchargement vers le format valide actuel !
        downloadBtn.href = currentVideoFallbacks[currentFallbackIndex];
        const extension = currentVideoFallbacks[currentFallbackIndex].split('.').pop();
        downloadBtn.download = `Joyeux_Anniversaire_Lily_par_${modalName.innerText}.${extension}`;
        
        modalVideo.load();
    } else {
        videoLoader.classList.remove("active");
        console.warn("Tous les formats de repli vidéo ont échoué.");
    }
});

function closeModal() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
    currentVideoFallbacks = [];
    currentFallbackIndex = 0;
    // Vider l'ancre URL pour réinitialiser proprement sans recharger si l'utilisateur ferme la modale
    if (window.location.hash) {
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// LOGIQUE INTERACTIVE DU LECTEUR VIDÉO
function togglePlay() {
    if (modalVideo.paused) {
        modalVideo.play();
        iconPlay.classList.add("hidden");
        iconPause.classList.remove("hidden");
    } else {
        modalVideo.pause();
        iconPlay.classList.remove("hidden");
        iconPause.classList.add("hidden");
    }
}

playBtn.addEventListener("click", togglePlay);
modalVideo.addEventListener("click", togglePlay);

modalVideo.addEventListener("timeupdate", () => {
    if (!modalVideo.duration) return;
    
    const percentage = (modalVideo.currentTime / modalVideo.duration) * 100;
    progressFilled.style.width = `${percentage}%`;
    
    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    timeLabel.innerText = `${formatTime(modalVideo.currentTime)} / ${formatTime(modalVideo.duration)}`;
});

progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    modalVideo.currentTime = pos * modalVideo.duration;
});

muteBtn.addEventListener("click", () => {
    modalVideo.muted = !modalVideo.muted;
    if (modalVideo.muted) {
        iconUnmute.classList.add("hidden");
        iconMute.classList.remove("hidden");
    } else {
        iconUnmute.classList.remove("hidden");
        iconMute.classList.add("hidden");
    }
});


// 4. LOGIQUE D'OUVERTURE AUTOMATIQUE PAR ANCRE URL (HASH)
function checkUrlHash() {
    const hash = window.location.hash.substring(1).toLowerCase();
    if (hash) {
        const found = MEMORIES.find(m => m.id === hash || m.name.toLowerCase() === hash);
        if (found) {
            setTimeout(() => {
                openVideoModal(found);
            }, 500); // Délai fluide
        }
    }
}

// 5. INITIALISATION
document.getElementById("btn-explore").addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();
    triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    // Si on est sur la page dédiée à un participant, on ouvre directement sa vidéo !
    if (window.CURRENT_PARTICIPANT) {
        setTimeout(() => {
            openVideoModal(window.CURRENT_PARTICIPANT);
        }, 300);
    } else {
        // Sinon, on fait juste une explosion de confettis sur l'écran
        setTimeout(() => {
            triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
        }, 200);
    }
});

// Écouter les changements d'ancre à la volée
window.addEventListener("hashchange", checkUrlHash);

document.addEventListener("DOMContentLoaded", () => {
    animateConfettis();
    
    // Si on est sur la page d'un participant dédié, on ne fait rien de spécial au chargement,
    // sinon on vérifie l'ancre URL comme d'habitude.
    if (!window.CURRENT_PARTICIPANT) {
        checkUrlHash();
    }
});
