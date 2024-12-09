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

    const updateHighlight = () => {
        const activeLink = document.querySelector('.navbar a.active');
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = activeLink.parentElement.parentElement.getBoundingClientRect();
            highlight.style.width = `${linkRect.width}px`;
            highlight.style.height = `40px`;
            highlight.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        }
    };

    // Initial placement on page load
    updateHighlight();

    // Update placement on hover
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const linkRect = e.target.getBoundingClientRect();
            const navRect = e.target.parentElement.parentElement.getBoundingClientRect();
            highlight.style.width = `${linkRect.width}px`;
            highlight.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        });

        link.addEventListener('mouseleave', () => {
            updateHighlight();
        });
    });

    // Recalculate on window resize
    window.addEventListener('resize', updateHighlight);
});