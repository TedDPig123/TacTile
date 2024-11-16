import {DataForm} from "../js/DataForm.js";
import {DatabaseConnection } from "../js/DatabaseConnection.js";
import {Image} from "../js/image.js";

const battleGrid = document.getElementById('battle-grid');
//start of emily's edit
//initializing indexdb for object and image, initializing the object token and image import class
const objectDB = new DatabaseConnection("ObjectStore");
objectDB.openDatabase();
const imageDB = new DatabaseConnection("ImageStore");

const ObjForm = document.getElementById("object_form");
ObjForm.style.display= "none";

const dataObjForm = new DataForm(objectDB);
dataObjForm.clickForm()

const img = new Image(document.getElementById("object_form"), imageDB)
const imgInput = document.getElementById("imageInput");
imgInput.addEventListener("change", (event) => img.PreviewImg(event))

const objectGrid = document.getElementById('object-grid');
objectGrid.style.zIndex="1"

//Switch between battle and object grid
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
//end of emily's edit


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
                // Toggle terrain type on click
                //emily's edit: this if statement is so that you can't change tiles that are where the object occupy
                if(!event.target.classList.contains("object-tile")){
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

    //start of rudy edit
// JavaScript for Zooming and Dragging the Grid
let scale = 1;
const zoomStep = 0.1;
const maxZoom = 2;
const minZoom = 0.5;
let isDragging = false;
let startX, startY;
//const battleGrid = document.getElementById('battle-grid');

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
    
    //start of emily's edit
    //add the event listener for add/update object form, including delete, cancel, create and update
    dataObjForm.render();
    img.render();
    dataObjForm.renderWhenLoad()
    .then(result => {
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
                result.id.forEach(i => {
                    img.createImageElement(document.getElementById(String(i)));
                })
            })
        } 
    });

    updateButton.addEventListener("click", (event) => {
        dataObjForm.updateObject()
        .then(result => {
            result.id.forEach(i => {
                img.updateImageElement(document.getElementById(String(i)))        
            })
        })
    });

    deleteButton.addEventListener("click", (event) => {
        dataObjForm.deleteObject()
        .then(result => {
            result.id.forEach(i => {
                img.deleteImageElement(i)
            })
        })    
    });
    //end of emily's edit
}
