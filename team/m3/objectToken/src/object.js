import { ObjectData } from "./database.js";

//Object Interface

//these two value are just so you can see the number of object created, once Drag and drop is implemented this will go away
//and instead just save 1 and 1(no increment)
let initR = 1;
let initC = 1;

const objectDB = new ObjectData("ObjectBase");
objectDB.openDatabase();
//list of all the input/button in the html file
const createButton = document.getElementById("create");
const cancelButton = document.getElementById("cancel");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");
const ObjForm = document.getElementById("object_form");
const addObj = document.getElementById("object_button");
const nameObj = document.getElementById("name");
const descripObj = document.getElementById("description");
const numCopy = document.getElementById("copy");
const c = document.getElementById("c");
const r = document.getElementById("r");
const ObjGrid = document.getElementById("objGrid");

ObjForm.style.display= "none";
render();
const idObj = document.createElement('idObj');
ObjForm.appendChild(idObj);

//load all the previous object token in indexdb
function render(){
  const allEvent = objectDB.getAllTasks();
  allEvent
  .then(objArr => {
    initR = 1;
    initC = 1;
    objArr.forEach(objData => {
      const objectDiv = document.createElement("div");
      objectDiv.classList.add("object");
      objectDiv.classList.add("tooltip");
      const spanElement = document.createElement("span");
      spanElement.classList.add("tooltiptext");
      spanElement.textContent = "name: "+objData.name+"\ndescription: "+ objData.description;
      objectDiv.setAttribute("id", objData.id); 
      spanElement.setAttribute("id", String(objData.id)+"s"); 
      objectDiv.appendChild(spanElement);
      const rowE = Number(objData.r);
      const colE = Number(objData.c);
      objectDiv.style.gridArea = `${objData.initR}/${objData.initC}/${rowE+objData.initR}/${colE+objData.initC}`;
      objectDiv.addEventListener("click", reopenForm)
      initR = objData.initR+1;
      ObjGrid.appendChild(objectDiv);
      clearForm();
      ObjForm.style.display= "none";
    })
  })
  .catch(error => console.error('Error:', error));
}

//function for when you click the objform
function clickForm(){
  if(ObjForm.style.display==="none"){
    ObjForm.style.display= "block";
  }
  else{
    ObjForm.style.display= "none";
  }
  createButton.style.display= "inline-block";
  cancelButton.style.display= "inline-block";
  updateButton.style.display= "none";
  deleteButton.style.display= "none";
  numCopy.value = 1;
  c.value = 1;
  r.value = 1;
}

addObj.addEventListener("click",clickForm);

//clear the input filed of the form
function clearForm(){
  nameObj.value = "";
  descripObj.value = "";
  numCopy.value = 1;
  c.value = 1;
  r.value = 1;
}

cancelButton.addEventListener("click", clearForm)

//create and add object token to map and indexdb
function createObject(objData){
  if(nameObj.value===""){
    console.log("need name");
  }
  else{
    for(let i = 0; i<numCopy.value;i++){
      const objectDiv = document.createElement("div");
      objectDiv.classList.add("object");
      objectDiv.classList.add("tooltip");
      const spanElement = document.createElement("span");
      spanElement.classList.add("tooltiptext");
      spanElement.textContent = "name: "+nameObj.value+"\ndescription: "+ descripObj.value;
      const rowE = Number(r.value);
      const colE = Number(c.value);
      const objectStore = {
        name: nameObj.value, 
        description: descripObj.value,
        c:Number(c.value),
        r:Number(r.value),
        initR:initR,
        initC:initC
      }
      objectDiv.style.gridArea = `${initR}/${initC}/${rowE+initR}/${colE+initC}`;
      initR+=1;
      let addEvent = objectDB.addTask(objectStore);
      addEvent
      .then(resp => {
        objectDiv.setAttribute("id", resp); 
        spanElement.setAttribute("id", String(resp)+"s"); 
        objectDiv.appendChild(spanElement);
        ObjGrid.appendChild(objectDiv);
        objectDiv.addEventListener("click", reopenForm);
      }) 
      .catch(error => console.error('Error:', error));
    }
  }
  clearForm();
  ObjForm.style.display= "none";
}

createButton.addEventListener("click", createObject);

//the function of what happens when you click on a object token
function reopenForm(event){
  ObjForm.style.display= "block";
  deleteButton.style.display= "inline-block";
  updateButton.style.display= "inline-block";
  cancelButton.style.display= "none";
  createButton.style.display= "none";
  const getEvent = objectDB.getTasks(Number(event.target.id)); 
  getEvent
  .then(objData => {
    nameObj.value = objData.name;
    descripObj.value = objData.description;
    c.value = objData.c;
    r.value = objData.r;
    numCopy.value = 1;
    idObj.setAttribute("id", String(objData.id)+"temp"); 
  }) 
  .catch(error => console.error('Error:', error))
}

//delete an object token
function deleteObject(){
    const startIndex = idObj.id.indexOf("temp");
    const result = idObj.id.substring(0, startIndex);
    objectDB.deleteTask(Number(result));
    let objD = document.getElementById(result);
    objD.remove();
    clearForm();
    ObjForm.style.display= "none";
}

deleteButton.addEventListener("click", deleteObject);

//update an object token
function updateObject(){
    const startIndex = idObj.id.indexOf("temp");
    const result = idObj.id.substring(0, startIndex);
    const getEvent = objectDB.getTasks(Number(result)); 
    const objDiv = document.getElementById(result);
    const spanElement = document.getElementById(result+"s");
    getEvent
    .then(objData => {
        objData.name = nameObj.value;
        objData.description = descripObj.value;
        objData.c = c.value;
        objData.r = r.value;
        const rowE = Number(objData.r);
        const colE = Number(objData.c);
        numCopy.value = 1; 
        objectDB.updateTask(objData);
        objDiv.style.gridArea = `${objData.initR}/${objData.initC}/${rowE+objData.initR}/${colE+objData.initC}`;
        spanElement.textContent = "name: "+objData.name+"\ndescription: "+ objData.description;
        clearForm();
        ObjForm.style.display= "none";
    })
    .catch(error => console.error('Error:', error));
}

updateButton.addEventListener("click", updateObject);
