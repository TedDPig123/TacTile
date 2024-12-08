import { initializeBattleGrid } from "./TileLogic.js"; //geri imported function here
import { DatabaseConnection } from "./DatabaseConnection.js";
import {addTileCoordinate} from "./TileClientRequests.js";

//class for tile coordinate object
export class tileCoord{
    tileID;
    x;
    y;
    constructor(tileID, x, y){
        this.tileID = tileID;
        this.x = x;
        this.y = y;
    }
}

//indexeddb database object for tile coordinates
export const dbTileCoords = new DatabaseConnection();

// Variables for zoom and drag
let scale = 1;
const zoomStep = 0.1;
const maxZoom = 2;
const minZoom = 0.5;
let isDragging = false;
let startX, startY;
const objectGrid = document.getElementById('object-grid');
const battleGrid = document.getElementById('battle-grid');

// Function to update grid transform (zoom)
function updateGridTransform() {
    battleGrid.style.transform = `scale(${scale})`;
    objectGrid.style.transform = `scale(${scale})`;
}

let gridDraggingListeners = {}; // Object to store listeners

function enableDragging(grid) {
    const mouseDownHandler = (e) => {
        if (!e.target.classList.contains("object")) {
            isDragging = true;

            const computedStyle = window.getComputedStyle(grid);
            const transform = computedStyle.transform;

            const translateMatch = /translate\(([^)]+)\)/.exec(transform);
            const [currentX, currentY] = translateMatch
                ? translateMatch[1].split(',').map(v => parseFloat(v))
                : [0, 0];

            startX = e.clientX - currentX;
            startY = e.clientY - currentY;

            grid.style.cursor = 'grabbing';
        }
    };

    const mouseMoveHandler = (e) => {
        if (isDragging) {
            const x = e.clientX - startX;
            const y = e.clientY - startY;
            grid.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
    };

    const mouseUpHandler = () => {
        isDragging = false;
        grid.style.cursor = 'grab';
    };

    grid._draggingListeners = { mouseDownHandler, mouseMoveHandler, mouseUpHandler };

    grid.addEventListener('mousedown', mouseDownHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}

function disableDragging(grid) {
    const listeners = grid._draggingListeners;

    // stop the drags
    isDragging = false;

    if (listeners) {
        grid.removeEventListener('mousedown', listeners.mouseDownHandler);
        document.removeEventListener('mousemove', listeners.mouseMoveHandler);
        document.removeEventListener('mouseup', listeners.mouseUpHandler);

        delete grid._draggingListeners; // Clean up references
    }

    //locock the grid's current position 
    const computedStyle = window.getComputedStyle(grid);
    const transform = computedStyle.transform;
    grid.style.transform = transform === "none" ? "translate(0, 0) scale(1)" : transform;
    grid.style.cursor = 'default';
}

// Function for zoom in and zoom out
function zoomIn() {
    if (scale < maxZoom) {
        scale += zoomStep;
        updateGridTransform();
    }
}

function zoomOut() {
    if (scale > minZoom) {
        scale -= zoomStep;
        updateGridTransform();
    }
}

// Start of emily's edit
document.getElementById('create-grid').addEventListener('click', function () {
    const width = parseInt(document.getElementById('grid-width').value);
    const height = parseInt(document.getElementById('grid-height').value);
    createGrid(width, height);
});

// Create the grid
async function createGrid(width, height) {
    const battleGrid = document.getElementById('battle-grid');
    battleGrid.innerHTML = ''; // Clear any existing grid
    battleGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    battleGrid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    battleGrid.style.zIndex = 3;

    // start of emily's edit
    // added ObjectGrid
    const objectGrid = document.getElementById('object-grid');
    objectGrid.innerHTML = ''; // Clear any existing grid
    objectGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    objectGrid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    // end of emily's edit

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-tile');
            //geri edit - keeping track of x and y coordinates of each tile:
            tile.dataset.x = x;
            tile.dataset.y = y;

            //indexed db database update for tile coordinates
            const newTileCoord = new tileCoord(null,x,y);
            await dbTileCoords.addObject(newTileCoord);

            battleGrid.appendChild(tile);
        }
    }

    // start of geri's edit
    // adds event listener for all tiles on the battle grid
    initializeBattleGrid(battleGrid);
    // end of geri's edit
}

// Add zoom in/out event listeners
document.getElementById('zoom-in').addEventListener('click', zoomIn);
document.getElementById('zoom-out').addEventListener('click', zoomOut);

// Enable dragging for both grids
enableDragging(battleGrid);
enableDragging(objectGrid);

// EDIT MODE
const editButton = document.getElementById("edit-mode-toggle");

let isEditMode = false;

editButton.addEventListener('click', function () {
    isEditMode = !isEditMode;
    if (isEditMode) {
        editButton.innerText = 'Disable Edit Mode';
        disableDragging(battleGrid);
        disableDragging(objectGrid);
    } else {
        editButton.innerText = 'Enable Edit Mode';
        enableDragging(battleGrid);
        enableDragging(objectGrid);
    }
});