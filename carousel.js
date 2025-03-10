document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById('carousel-track');
    let lastGlowingCard = null;
    let animationPaused = false;

    function duplicateSlides() {
        if (track.dataset.duplicated) return; // Prevents multiple duplications
        track.dataset.duplicated = "true";

        const cards = Array.from(document.querySelectorAll('.team-card'));
        cards.forEach(card => {
            let clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Clone elements once to create infinite effect
    duplicateSlides();

    // Ensure animation only runs once and doesn’t reset incorrectly
    track.addEventListener('animationiteration', () => {
        if (!animationPaused) {
            track.style.animation = "none";
            void track.offsetWidth; // Force reflow
            track.style.animation = "scrollCarousel 60s linear infinite";
        }
    });

    function pauseCarousel() {
        if (!animationPaused) {
            track.style.animationPlayState = "paused";
            animationPaused = true;
        }
    }

    function resumeCarousel() {
        if (animationPaused) {
            track.style.animationPlayState = "running";
            animationPaused = false;
        }
    }

    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener("click", function (event) {
            event.stopPropagation();

            pauseCarousel();

            if (lastGlowingCard && lastGlowingCard !== card) {
                lastGlowingCard.classList.remove("active-glow");
                lastGlowingCard.style.transform = "scale(1)";
            }

            if (card.classList.contains("active-glow")) {
                card.classList.remove("active-glow");
                card.style.transform = "scale(1)";
                lastGlowingCard = null;
                resumeCarousel();
            } else {
                card.classList.add("active-glow");
                card.style.transform = "scale(1.1)";
                lastGlowingCard = card;
            }
        });
    });

    document.addEventListener("click", function () {
        if (lastGlowingCard) {
            lastGlowingCard.classList.remove("active-glow");
            lastGlowingCard.style.transform = "scale(1)";
            lastGlowingCard = null;
            resumeCarousel();
        }
    });
});
