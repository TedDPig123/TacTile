import {DataForm} from "./DataForm.js";
import {DatabaseConnection } from "./DatabaseConnection.js";

const objectDB = new DatabaseConnection();
objectDB.openDatabase();
const dataObjForm = new DataForm(objectDB);
const ObjForm = document.getElementById("object_form");
ObjForm.style.display= "none";

const objectGrid = document.getElementById('object-grid');
const battleGrid = document.getElementById('battle-grid');

objectGrid.addEventListener("click", (event) => {
    if(!event.target.classList.contains("object")){
        objectGrid.style.zIndex = "0";
        battleGrid.style.zIndex = "1";
        console.log("under")
    }
})

battleGrid.addEventListener("click", (event) => {
    if(event.target.classList.contains("object-tile")){
        battleGrid.style.zIndex = "0";
        objectGrid.style.zIndex = "1";
    }
})

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

    //added ObjectGrid
    const objectGrid = document.getElementById('object-grid');
    objectGrid.innerHTML = ''; // Clear any existing grid
    objectGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    objectGrid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    const c = dataObjForm.addWH(width, height);
    console.log(c)
    //added ObjectGrid

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-tile');
            tile.addEventListener('click', (event) => {
                if(!event.target.classList.contains("object-tile")){
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
                }
            });
            battleGrid.appendChild(tile);
        }
    }
    dataObjForm.render();
}

