// Script pour les interactions des cartes
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('flipped');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('flipped');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const highlight = document.querySelector('.highlight');
    const links = document.querySelectorAll('.navbar a');
    const activeLink = document.querySelector('.navbar a.active');

    const updateHighlight = (link) => {
        const linkRect = link.getBoundingClientRect();
        const navRect = link.closest('.navbar').getBoundingClientRect();
        highlight.style.width = `${linkRect.width}px`;
        highlight.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    };

    // Initial placement on page load
    if (activeLink) {
        updateHighlight(activeLink);
    }

    // Update placement and styling on hover
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Move the highlight
            updateHighlight(link);

            // Add the "hovered" class to the active link
            if (activeLink && activeLink !== link) {
                activeLink.classList.add('hovered');
            }
        });

        link.addEventListener('mouseleave', () => {
            // Return the highlight to the active link
            if (activeLink) {
                updateHighlight(activeLink);
                activeLink.classList.remove('hovered');
            }
        });
    });

    // Recalculate position on window resize
    window.addEventListener('resize', () => {
        if (activeLink) {
            updateHighlight(activeLink);
        }
    });
});