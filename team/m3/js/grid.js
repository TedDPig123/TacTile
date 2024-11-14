document.getElementById('create-grid').addEventListener('click', function() {
    const width = parseInt(document.getElementById('grid-width').value);
    const height = parseInt(document.getElementById('grid-height').value);
    createGrid(width, height);
});

function createGrid(width, height) {
    const battleGrid = document.getElementById('battle-grid');
    battleGrid.innerHTML = ''; // Clear any existing grid
    battleGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    battleGrid.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-tile');
            tile.addEventListener('click', () => {
                // Toggle terrain type on click
                if (tile.classList.contains('grass')) {
                    tile.classList.remove('grass');
                    tile.classList.add('stone');
                } else if (tile.classList.contains('stone')) {
                    tile.classList.remove('stone');
                    tile.classList.add('castle');
                } else if (tile.classList.contains('castle')) {
                    tile.classList.remove('castle');
                } else {
                    tile.classList.add('grass');
                }
            });
            battleGrid.appendChild(tile);
        }
    }
}

//start of rudy edit
// JavaScript for Zooming and Dragging the Grid
let scale = 1;
const zoomStep = 0.1;
const maxZoom = 2;
const minZoom = 0.5;
let isDragging = false;
let startX, startY;
const battleGrid = document.getElementById('battle-grid');

// Zoom In and Zoom Out Functions
document.getElementById('zoom-in').addEventListener('click', () => {
    if (scale < maxZoom) {
        scale += zoomStep;
        updateGridTransform();
    }
});

document.getElementById('zoom-out').addEventListener('click', () => {
    if (scale > minZoom) {
        scale -= zoomStep;
        updateGridTransform();
    }
});

// Function to Update Grid Transform
function updateGridTransform() {
    battleGrid.style.transform = `scale(${scale})`;
}

// Dragging Functionality
battleGrid.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - battleGrid.offsetLeft;
    startY = e.clientY - battleGrid.offsetTop;
    battleGrid.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - startX;
        const y = e.clientY - startY;
        battleGrid.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    battleGrid.style.cursor = 'grab';
});

//end of rudy edit
