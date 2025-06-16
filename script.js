document.addEventListener('DOMContentLoaded', () => {
    const colorDisplay = document.getElementById('color-display');
    const colorBoxes = document.getElementById('color-boxes');
    const resetButton = document.getElementById('reset-button');
    const message = document.getElementById('message');
    const easyButton = document.getElementById('easy-button');
    const hardButton = document.getElementById('hard-button');

    let colors = [];
    let correctColor = '';
    let mode = 'hard'; // Default mode

    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function generateColors(numColors) {
        colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(generateRandomColor());
        }
        correctColor = colors[Math.floor(Math.random() * colors.length)];
        colorDisplay.textContent = correctColor;
    }

    function createColorBoxes() {
        colorBoxes.innerHTML = '';
        colors.forEach(color => {
            const box = document.createElement('div');
            box.classList.add('color-box');
            box.style.backgroundColor = color;
            box.addEventListener('click', () => checkColor(box, color));
            colorBoxes.appendChild(box);
        });
    }

    function checkColor(box, color) {
        if (color === correctColor) {
            message.textContent = 'Correct!';
            colorBoxes.querySelectorAll('.color-box').forEach(b => {
                b.style.backgroundColor = correctColor;
                b.classList.add('correct');
            });
        } else {
            message.textContent = 'Try Again';
            box.style.backgroundColor = '#232323';
        }
    }

    function resetGame() {
        generateColors(mode === 'easy' ? 3 : 6);
        createColorBoxes();
        message.textContent = '';
        colorBoxes.querySelectorAll('.color-box').forEach(b => b.classList.remove('correct'));
    }

    resetButton.addEventListener('click', resetGame);
    easyButton.addEventListener('click', () => {
        mode = 'easy';
        resetGame();
    });
    hardButton.addEventListener('click', () => {
        mode = 'hard';
        resetGame();
    });

    // Initialize the game
    resetGame();
});