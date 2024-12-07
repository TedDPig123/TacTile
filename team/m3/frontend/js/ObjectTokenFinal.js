import {tokenForm} from "./tokenForm.js";
import {DatabaseConnection } from "./DatabaseConnection.js";
import {ImageForToken} from "./imageForToken.js";
import { MoveItem } from "./moveToken.js";

const battleGrid = document.getElementById('battle-grid');

//open the indexdb for map and object token
const objectDB = new DatabaseConnection("ObjectStore");
objectDB.openDatabase();
const imageDB = new DatabaseConnection("ImageStore");

const ObjForm = document.getElementById("object_form");
ObjForm.style.display= "none";

//create new ImageForToken class and DataForm class 
const dataObjForm = new DataForm(objectDB);
dataObjForm.clickForm()

const img = new ImageForToken(document.getElementById("object_form"), imageDB)
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

    //happens at the very start after you click create grid, basic setup is done for ImageForToken for object form
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
            document.getElementById(String(i)).addEventListener("click", (event) => {
                if(!event.target.classList.contains("dragging")){
                    img.renderImage(i)
                }
            })
        })
    })


    const createButton = document.getElementById("create");
    const updateButton = document.getElementById("update");
    const deleteButton = document.getElementById("delete");
    const cancelButton = document.getElementById("cancel");
    const deleteAllButton = document.getElementById("deleteAll");


    //below are event listener for all the object form button, they combine ImageForToken, DataForm and MoveItem to create the full object creating form

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
                    document.getElementById(String(i)).addEventListener("click", (event) => {
                        if(!event.target.classList.contains("dragging")){
                            img.renderImage(i)
                        }
                    })
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

    deleteAllButton.addEventListener("click", () => {
        objectDB.deleteDatabse();
        imageDB.deleteDatabse();
        alert("please refresh the page"); 
    })
})
