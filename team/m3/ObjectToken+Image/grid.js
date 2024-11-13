import {DataForm} from "./DataForm.js";
import {DatabaseConnection } from "./DatabaseConnection.js";
import { Image } from "./image.js";

const objectDB = new DatabaseConnection("ObjectStore");
objectDB.openDatabase();
const dataObjForm = new DataForm(objectDB);
const ObjForm = document.getElementById("object_form");
ObjForm.style.display= "none";
dataObjForm.clickForm()

const objectGrid = document.getElementById('object-grid');
const battleGrid = document.getElementById('battle-grid');

//needs double click to switch between grid
objectGrid.addEventListener("click", (event) => {
    if(!event.target.classList.contains("object")){
        objectGrid.style.zIndex = "0";
        battleGrid.style.zIndex = "1";
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

//start of emily's edit
//to make sure you can click on the tile and object
    const img = new Image(document.getElementById("object_form"))
    const imgInput = document.getElementById("imageInput");
    imgInput.addEventListener("change", (event) => img.PreviewImg(event))

    dataObjForm.render();
    dataObjForm.renderWhenLoad()
    .then(result => {
        result.area.forEach(a => 
            addTagtoTile(a, width)
        )
        result.id.forEach(i => console.log(i))

    })

    const createButton = document.getElementById("create");
    const updateButton = document.getElementById("update");
    const deleteButton = document.getElementById("delete");

    createButton.addEventListener("click", (event) => {
        const numCopy = document.getElementById("copy").value;
        console.log(numCopy)
        for(let i = 0; i<numCopy; i++){
            dataObjForm.createObject(event)
            .then(result => {
                result.area.forEach(a => 
                    addTagtoTile(a, width)            
                )
                result.id.forEach(i => console.log(i))
            })
            img.clearImage();
        }  
    });

    updateButton.addEventListener("click", (event) => {
        dataObjForm.updateObject()
        .then(result => {
            result.areaInit.forEach(a => deleteTagtoTile(a, width));
            result.areaAfter.forEach(a => addTagtoTile(a, width));
            result.id.forEach(i => console.log(i))
        })
    });

    deleteButton.addEventListener("click", (event) => {
        dataObjForm.deleteObject()
        .then(result => {
            result.area.forEach(a => 
                deleteTagtoTile(a, width)
            )
            result.id.forEach(i => console.log(i))
        })    
    });

}

function addTagtoTile(gridA, width){
    const gridArea = gridA;
    const num = gridArea.split("/")
    const tile = document.getElementsByClassName("grid-tile");
    const s = (num[0]-1)*(width);
    const t = (num[0]-1)*(width)+(num[2]-num[0]-1)*(width)+(num[3]-num[1]);
    for(let i = s; i<t; i+=(width)){
        for(let j = i; j<i+(num[3]-num[1]);j++){
            tile[j].classList.add('object-tile');
            tile[j].style.backgroundColor= "aqua";
        }
    }
}

function deleteTagtoTile(gridA, width){
    const gridArea = gridA;
    const num = gridArea.split("/")
    const tile = document.getElementsByClassName("grid-tile");
    const s = (num[0]-1)*(width);
    const t = (num[0]-1)*(width)+(num[2]-num[0]-1)*(width)+(num[3]-num[1]);
    for(let i = s; i<t; i+=(width)){
        for(let j = i; j<i+(num[3]-num[1]);j++){
            tile[j].classList.remove('object-tile');
            tile[j].style.removeProperty("background-color"); 
        }
    }
}
//the end of emily's edit