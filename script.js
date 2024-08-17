const button = document.getElementById('resetButton');
const input = document.getElementById('inputBox');
const container = document.querySelector('.container');
const resetButton = document.createElement('button');

resetButton.textContent = "Reset";
document.body.appendChild(resetButton);

function resetClick() {
    clearBoxes();
    showControls();
}

function hideControls() {
input.classList.add('hidden');
button.classList.add('hidden');
}

function showControls() {
    input.classList.remove('hidden');
    button.classList.remove('hidden');
}

button.textContent = "Generate Boxes";

function getRandomColor() {
const r = Math.floor(Math.random() * 256);
const g = Math.floor(Math.random() * 256);
const b = Math.floor(Math.random() * 256);
return `rgb(${r},${g},${b})`;
}

function darkenColor(color, percent) {
const [r, g, b] = color.match(/\d+/g).map(Number);
const factor = (100 - percent) / 100;
return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
}

function createBox() {
    const box = document.createElement('div');
    box.className = 'box';
    box.style.backgroundColor = getRandomColor();
    box.dataset.darkening = 0;
    box.addEventListener('mouseenter', handleMouseEnter);
    box.addEventListener('mouseleave', handleMouseExit);
    return box;
}

function clearBoxes() {
    container.innerHTML="";
}

function onClick() {
    const num = parseInt(input.value, 10);

    clearBoxes();
    hideControls();

    if (isNaN(num) || num <= 0) {
        return;
    } else if (num > 100) {
        for (let i = 0; i < 100; i++) {
            container.appendChild(createBox());
        }
    } else {
        for (let i=0; i < num; i++) {
            container.appendChild(createBox());
        }
    }
    input.value = '';
    }

function handleMouseEnter(event) {
    const box = event.target;
    let darkening = parseInt(box.dataset.darkening, 10);

    if (darkening < 100) {
        darkening += 10;
        box.style.backgroundColor = darkenColor(box.style.backgroundColor, darkening);
        box.dataset.darkening = darkening;
    }
}

function handleMouseExit (event) {
    const box = event.target;
    let darkening = parseInt(box.dataset.darkening, 10);

    if (darkening >= 100) {
        box.style.backgroundColor = "white";
}
}

button.addEventListener('click', onClick);

resetButton.addEventListener('click', resetClick);