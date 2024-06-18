let currentScreen = 1;
const typingSpeed = 50;

function typeText(element, text, callback) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, typingSpeed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function nextScreen() {
    const currentElement = document.getElementById(`screen${currentScreen}`);
    currentElement.classList.remove('active');
    currentScreen++;
    const nextElement = document.getElementById(`screen${currentScreen}`);
    nextElement.classList.add('active');

    const typingElements = nextElement.querySelectorAll('.typing');
    typingElements.forEach(element => {
        element.textContent = '';
        typeText(element, element.getAttribute('data-text'));
    });
}

function response(answer) {
    if (answer === 'yes') {
        document.getElementById('final-response').innerText = 'Wohooooo!';
        nextScreen();
    } else {
        let noButton = document.getElementById('no-button');
        let moveCount = 0;
        const maxMoves = 50;

        function moveButton() {
            if (moveCount < maxMoves) {
                noButton.style.position = 'absolute';
                noButton.style.top = Math.random() * (window.innerHeight - 50) + 'px';
                noButton.style.left = Math.random() * (window.innerWidth - 100) + 'px';
                moveCount++;
            }
        }
        
        noButton.addEventListener('mouseover', moveButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const firstScreen = document.getElementById(`screen${currentScreen}`);
    const typingElements = firstScreen.querySelectorAll('.typing');
    typingElements.forEach(element => {
        element.textContent = '';
        typeText(element, element.getAttribute('data-text'));
    });
});
