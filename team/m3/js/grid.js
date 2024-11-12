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