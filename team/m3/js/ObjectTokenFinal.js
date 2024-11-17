import {DataForm} from "./ObjectForm.js";
import {DatabaseConnection } from "../js/DatabaseConnection.js";
import {Image} from "./ImageImport.js";
import { MoveItem } from "./MovingToken.js";

const battleGrid = document.getElementById('battle-grid');

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
switchButton.addEventListener("click", ()=>{
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

document.getElementById('create-grid').addEventListener('click', ()=> {
    const width = parseInt(document.getElementById('grid-width').value);
    const height = parseInt(document.getElementById('grid-height').value);
    dataObjForm.addWH(width, height);
    dataObjForm.render();
    img.render();
    dataObjForm.renderWhenLoad()
    .then(result => {
        result.id.forEach(i => {
            const moveItem = new MoveItem(objectDB,document.getElementById(String(i)));
            moveItem.mouseDown();
            moveItem.mouseMove();
            moveItem.mouseUP();
            objectDB.getObject(i)
            .then(obj => {
                document.getElementById(String(obj.id)).style.top = obj.top;
                document.getElementById(String(obj.id)).style.left = obj.left
            })
        })
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
                    const moveItem = new MoveItem(objectDB,document.getElementById(String(i)));
                    moveItem.mouseDown();
                    moveItem.mouseMove();
                    moveItem.mouseUP();
                })
            })
        }
    });

    updateButton.addEventListener("click", (event) => {
        dataObjForm.updateObject()
        .then(result => {
            result.id.forEach(i => {
                img.updateImageElement(document.getElementById(String(i)));
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
})