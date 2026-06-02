/* ==========================================================================
   LOGIQUE INTERACTIVE DE L'ESPACE HUB SKYROCK
   ========================================================================== */

// 1. BASE DE DONNÉES DES ANIMATEURS SKYROCK (Chemins depuis le sous-dossier SKYROCK/)
const SKYROCK_MEMORIES = [
    {
        id: "sarah-de-skyrock",
        name: "Sarah de Skyrock",
        videoUrl: "../assets/skyrock/sarah-skyrock/sarah-skyrock.MOV"
    },
    {
        id: "ted-de-skyrock",
        name: "Ted de Skyrock",
        videoUrl: "../assets/skyrock/Ted-skyrock/TED.mov"
    },
    {
        id: "maxime-skyrock",
        name: "Maxime de Skyrock",
        videoUrl: "../assets/skyrock/maxime-skyrock/MAXIME.MOV"
    }
];

// 2. LOGIQUE DES CONFETTIS EN CANVAS 2D
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
    "#9d4edd", // Violet
    "#ff007f", // Rose
    "#ffb703", // Accent or
    "#240046", // Violet foncé
    "#e2e8f0", // Blanc
    "#06b6d4"  // Cyan
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
            this.speedY = Math.random() * 3 + 2; // Chute
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

function triggerConfettiBurst(x, y) {
    for (let i = 0; i < 70; i++) {
        confettiParticles.push(new Confetti(x, y, true));
    }
}

function addConfettiRain() {
    if (confettiParticles.filter(p => !p.isBurst).length < 50) {
        confettiParticles.push(new Confetti(Math.random() * canvas.width, -10, false));
    }
}

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

// 3. LOGIQUE D'OUVERTURE DE DOSSIER (ACCORDÉON)
function toggleFolder(folderId) {
    const activeWrapper = document.getElementById(folderId);
    const isOpen = activeWrapper.classList.contains("open");
    
    // Fermer tous les dossiers ouverts
    document.querySelectorAll(".folder-card-wrapper").forEach(wrapper => {
        wrapper.classList.remove("open");
    });
    
    // Si le dossier cliqué n'était pas ouvert, on l'ouvre
    if (!isOpen) {
        activeWrapper.classList.add("open");
        
        // Petite explosion de confettis sur le dossier cliqué
        const rect = activeWrapper.getBoundingClientRect();
        triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
}

// 4. LECTEUR VIDÉO IMMERSIF ET MODALE
const modal = document.getElementById("video-modal");
const modalClose = document.getElementById("modal-close");
const modalVideo = document.getElementById("modal-video-element");
const videoLoader = document.getElementById("video-loader");
const modalName = document.getElementById("modal-participant-name");

// Contrôles
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

let currentVideoFallbacks = [];
let currentFallbackIndex = 0;

function playSelectedVideo(participantId) {
    const memory = SKYROCK_MEMORIES.find(m => m.id === participantId);
    if (!memory) return;

    modalName.innerText = memory.name;
    const originalPath = memory.videoUrl;

    // Configurer le téléchargement originel
    downloadBtn.href = originalPath;
    const extension = originalPath.split('.').pop();
    downloadBtn.download = `Joyeux_Anniversaire_Lily_par_${memory.name}.${extension}`;

    // Construire les chemins de secours (fallbacks)
    currentVideoFallbacks = [originalPath];
    currentFallbackIndex = 0;

    const lastSlashIdx = originalPath.lastIndexOf('/');
    const basePath = originalPath.substring(0, lastSlashIdx + 1);
    const fileName = originalPath.substring(lastSlashIdx + 1);
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));

    // Ajouter des variations de formats de secours
    const formats = ['MOV', 'mov', 'mp4', 'MP4'];
    formats.forEach(f => {
        const altPath = basePath + nameWithoutExt + '.' + f;
        if (altPath !== originalPath && !currentVideoFallbacks.includes(altPath)) {
            currentVideoFallbacks.push(altPath);
        }
    });
    
    // Si c'est Ted ou Maxime, ajouter également une recherche générique vers "video.mp4", "video.MOV", etc.
    if (fileName !== 'video.mp4') {
        formats.forEach(f => {
            const genericPath = basePath + 'video.' + f;
            if (!currentVideoFallbacks.includes(genericPath)) {
                currentVideoFallbacks.push(genericPath);
            }
        });
    }

    // Charger la première option de vidéo
    videoLoader.classList.add("active");
    modalVideo.src = currentVideoFallbacks[0];

    // Réinitialiser les icônes et barres
    iconPlay.classList.remove("hidden");
    iconPause.classList.add("hidden");
    progressFilled.style.width = "0%";
    timeLabel.innerText = "0:00 / 0:00";

    // Ouvrir la modale et lancer les confettis
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
    // Si la lecture échoue, on tente le format suivant
    currentFallbackIndex++;
    if (currentFallbackIndex < currentVideoFallbacks.length) {
        console.log(`Format échoué. Essai avec : ${currentVideoFallbacks[currentFallbackIndex]}`);
        modalVideo.src = currentVideoFallbacks[currentFallbackIndex];
        
        // Mettre à jour le téléchargement vers le format fonctionnel actuel
        downloadBtn.href = currentVideoFallbacks[currentFallbackIndex];
        const extension = currentVideoFallbacks[currentFallbackIndex].split('.').pop();
        downloadBtn.download = `Joyeux_Anniversaire_Lily_par_${modalName.innerText}.${extension}`;
        
        modalVideo.load();
    } else {
        videoLoader.classList.remove("active");
        console.warn("Toutes les vidéos ou replis ont échoué à charger.");
    }
});

function closeModal() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
    currentVideoFallbacks = [];
    currentFallbackIndex = 0;
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// Contrôles du Lecteur
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

// 5. INITIALISATION
document.addEventListener("DOMContentLoaded", () => {
    animateConfettis();
    
    const btnExplore = document.getElementById("btn-explore");
    const heroContent = document.querySelector(".skyrock-hero-content");
    const skyrockContainer = document.querySelector(".skyrock-container");

    // Événement d'exploration : Animation d'apparition du Hub des dossiers
    btnExplore.addEventListener("click", (e) => {
        const rect = e.target.getBoundingClientRect();
        triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        
        // Début de l'animation de fondu de sortie du Hero de départ
        heroContent.classList.add("fade-out");
        
        setTimeout(() => {
            // Cacher le conteneur de Hero pour laisser place aux dossiers
            document.querySelector(".hero").style.display = "none";
            
            // Afficher la section principale
            skyrockContainer.style.display = "block";
            
            // Appliquer la transition d'entrée progressive (fade-in)
            setTimeout(() => {
                skyrockContainer.classList.add("reveal");
                triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 3);
                
                // Ouvrir automatiquement le dossier de Sarah après 500ms pour guider Lily
                setTimeout(() => {
                    toggleFolder('folder-sarah');
                }, 500);
            }, 50);
        }, 500);
    });

    // Déclencheur sur le clic de retour pour ajouter du fun
    document.getElementById("btn-back-home").addEventListener("click", (e) => {
        const rect = e.target.getBoundingClientRect();
        triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});
