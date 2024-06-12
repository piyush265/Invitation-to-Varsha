let currentScreen = 1;
const typingSpeed = 50;
let noButtonMoves = 0;
const maxMoves = 50;

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
        if (noButtonMoves < maxMoves) {
            let noButton = document.getElementById('no-button');
            let maxTop = window.innerHeight - noButton.offsetHeight;
            let maxLeft = window.innerWidth - noButton.offsetWidth;
            noButton.style.position = 'absolute';
            noButton.style.top = Math.random() * maxTop + 'px';
            noButton.style.left = Math.random() * maxLeft + 'px';
            noButtonMoves++;
        } else {
            document.getElementById('final-response').innerText = 'Oh no, you clicked No!';
            nextScreen();
        }
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
