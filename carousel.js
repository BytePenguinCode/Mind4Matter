document.addEventListener("DOMContentLoaded", function () {
    const tracks = document.querySelectorAll('.carousel-track');
    let lastGlowingCard = null;

    tracks.forEach(track => {
        // If not duplicated yet, add extra copies to fill space
        if (!track.dataset.duplicated) {
            track.dataset.duplicated = "true";

            const cards = Array.from(track.querySelectorAll('.team-card'));
            // Duplicate multiple times so short carousels (like 2 members) don’t leave empty space
            const numberOfDuplicates = 3; 
            for (let i = 0; i < numberOfDuplicates; i++) {
                cards.forEach(card => {
                    let clone = card.cloneNode(true);
                    track.appendChild(clone);
                });
            }
        }

        // Set up event listeners for pausing/resuming on click
        track.querySelectorAll('.team-card').forEach(card => {
            card.addEventListener("click", function (event) {
                event.stopPropagation();

                // Pause this carousel
                track.style.animationPlayState = "paused";

                // Remove glow from previously clicked card if it's different
                if (lastGlowingCard && lastGlowingCard !== card) {
                    lastGlowingCard.classList.remove("active-glow");
                    lastGlowingCard.style.transform = "scale(1)";
                }

                // Toggle glow on this card
                if (card.classList.contains("active-glow")) {
                    // If it’s already glowing, remove glow and resume
                    card.classList.remove("active-glow");
                    card.style.transform = "scale(1)";
                    lastGlowingCard = null;
                    track.style.animationPlayState = "running";
                } else {
                    // Make this card glow
                    card.classList.add("active-glow");
                    card.style.transform = "scale(1.1)";
                    lastGlowingCard = card;
                }
            });
        });

        // Clicking anywhere else in document removes glow and resumes
        document.addEventListener("click", function () {
            if (lastGlowingCard) {
                lastGlowingCard.classList.remove("active-glow");
                lastGlowingCard.style.transform = "scale(1)";
                lastGlowingCard = null;
                track.style.animationPlayState = "running";
            }
        });
    });
});
