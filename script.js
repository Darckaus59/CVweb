// Sélection des éléments
const cardsContainer = document.querySelector('.cards');
const cards = document.querySelectorAll('.card');

const totalCards = cards.length;
let currentIndex = 0;
let isAnimating = false;

// Fonction pour mettre à jour la position des cartes
function updateCards() {
    // Calculer la largeur réelle d'une carte
    const cardWidth = cards[0].offsetWidth; // Largeur d'une seule card
    const newTranslateX = -(currentIndex * cardWidth);

    // Appliquer la translation exacte
    cardsContainer.style.transform = `translateX(${newTranslateX}px)`;
}

// Navigation avec les boutons
/*
prevButton.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    // Aller à la carte précédente
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;

    updateCards();

    // Bloquer temporairement les actions durant l'animation
    setTimeout(() => {
        isAnimating = false;
    }, 500);
});

nextButton.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    // Aller à la carte suivante
    currentIndex = (currentIndex + 1) % totalCards;

    updateCards();

    // Bloquer temporairement les actions durant l'animation
    setTimeout(() => {
        isAnimating = false;
    }, 500);
});
*/

// Glisser avec le doigt ou la souris
let startX = 0;
let isDragging = false;
let swipeThreshold = 50; // Distance minimale pour considérer un swipe valide

cardsContainer.addEventListener('mousedown', startDrag);
cardsContainer.addEventListener('touchstart', startDrag);
cardsContainer.addEventListener('mousemove', dragMove);
cardsContainer.addEventListener('touchmove', dragMove);
cardsContainer.addEventListener('mouseup', endDrag);
cardsContainer.addEventListener('touchend', endDrag);
cardsContainer.addEventListener('mouseleave', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.pageX;
    cardsContainer.style.transition = "none"; // Désactiver temporairement la transition
}

function dragMove(e) {
    if (!isDragging) return;
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.pageX;
    const deltaX = currentX - startX;

    // Calculer la largeur d'une card
    const cardWidth = cards[0].offsetWidth;

    // Appliquer le mouvement temporaire
    cardsContainer.style.transform = `translateX(calc(-${currentIndex * cardWidth}px + ${deltaX}px))`;
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    // Récupérer la fin du mouvement et calculer
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.pageX;
    const deltaX = endX - startX;

    if (deltaX > swipeThreshold) {
        // Swipe vers la gauche
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    } else if (deltaX < -swipeThreshold) {
        // Swipe vers la droite
        currentIndex = (currentIndex + 1) % totalCards;
    }

    cardsContainer.style.transition = "transform 0.5s ease-in-out";
    updateCards();
}
