import {DataForm} from "./DataForm.js";
import {DatabaseConnection } from "./DatabaseConnection.js";
import { Image } from "./image.js";

const battleGrid = document.getElementById('battle-grid');

//start of emily's edit
//initializing indexdb for object, initializing the object token and image
const objectDB = new DatabaseConnection("ObjectStore");
objectDB.openDatabase();
const dataObjForm = new DataForm(objectDB);
const imageDB = new DatabaseConnection("ImageStore");

const ObjForm = document.getElementById("object_form");
ObjForm.style.display= "none";
dataObjForm.clickForm()

const objectGrid = document.getElementById('object-grid');

const img = new Image(document.getElementById("object_form"), imageDB)
const imgInput = document.getElementById("imageInput");
imgInput.addEventListener("change", (event) => img.PreviewImg(event))
//end of emily's edit

objectGrid.style.zIndex="1"
//needs double click to switch between grid
const switchButton = document.getElementById("switch_button");
switchButton.addEventListener("click", function x(){
    if(objectGrid.style.zIndex==="1"){
        objectGrid.style.zIndex = "0";
        battleGrid.style.zIndex = "1";
        switchButton.value = "switch grid:Object-Grid"
    }
    else{
        battleGrid.style.zIndex = "0";
        objectGrid.style.zIndex = "1";
        switchButton.value = "switch grid:Battle-Grid"
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

    //start of emily's edit
    //added ObjectGrid
    const objectGrid = document.getElementById('object-grid');
    objectGrid.innerHTML = ''; // Clear any existing grid
    objectGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    objectGrid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    const c = dataObjForm.addWH(width, height);
    //end of emily's edit

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-tile');
            tile.addEventListener('click', (event) => {
                //emily's edit: this if statement is so that you can't change tiles that are where the object occupy
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
    //add the event listener for add/update object form, including delete, cancel, create and update
    dataObjForm.render();
    img.render();
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
    const cancelButton = document.getElementById("cancel");

    cancelButton.addEventListener("click", () => {
        dataObjForm.clearForm();
        img.clearImage();
    })

    createButton.addEventListener("click", (event) => {
        const numCopy = document.getElementById("copy").value;
        for(let i = 0; i<numCopy; i++){
            dataObjForm.createObject(event)
            .then(result => {
                result.area.forEach(a => 
                    addTagtoTile(a, width)            
                )
                result.id.forEach(i => {
                    img.createImageElement(document.getElementById(String(i)));
                })
            })
        } 
    });



    updateButton.addEventListener("click", (event) => {
        dataObjForm.updateObject()
        .then(result => {
            result.areaInit.forEach(a => deleteTagtoTile(a, width));
            result.areaAfter.forEach(a => addTagtoTile(a, width));
            result.id.forEach(i => {
                img.updateImageElement(document.getElementById(String(i)))        
            })
        })
    });

    deleteButton.addEventListener("click", (event) => {
        dataObjForm.deleteObject()
        .then(result => {
            result.area.forEach(a => 
                deleteTagtoTile(a, width)
            )
            result.id.forEach(i => {
                img.deleteImageElement(i)
            })
        })    
    });
    //end of emily's edit
}

//start of emily's edit
//function to make sure you can click on the tile and object, adds object tile to tiles in battle grid corresponding with object in object grid
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
//end of emily's edit