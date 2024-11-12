import { DatabaseConnection } from "./DatabaseConnection.js";

export class DataForm{
    #createButton;#cancelButton;#updateButton;#deleteButton;#ObjForm;
    #addObj;#nameObj;#descripObj;#numCopy;#c;#r;#ObjGrid;#idObj;#initR;#initC;

    constructor(objectDB){
        this.objectDB = objectDB;
        this.#createButton = document.getElementById("create");
        this.#cancelButton = document.getElementById("cancel");
        this.#updateButton = document.getElementById("update");
        this.#deleteButton = document.getElementById("delete");
        this.#ObjForm = document.getElementById("object_form");
        this.#addObj = document.getElementById("object_button");
        this.#nameObj = document.getElementById("name");
        this.#descripObj = document.getElementById("description");
        this.#numCopy = document.getElementById("copy");
        this.#c = document.getElementById("c");
        this.#r = document.getElementById("r");
        this.#ObjGrid = document.getElementById("objGrid");
        this.#initC = 1;
        this.#initR = 1;
        this.#idObj = document.createElement('idObj');
    }

    render(){
        this.objectDB.openDatabase();
        this.#ObjForm.appendChild(this.#idObj);
        this.#ObjForm.style.display= "none";
        this.#renderWhenLoad();
        this.#cancelForm();
        this.#clickForm()
        this.#createObject();
        this.#deleteObject();
        this.#updateObject()
    }

    #renderWhenLoad(){
        const allEvent = this.objectDB.getAllObject();
        allEvent
        .then(objArr => {
          this.#initR = 1;
          this.#initC = 1;
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
            objectDiv.addEventListener("click", this.#reopenForm.bind(this))
            this.#initR = objData.initR+1;
            this.#ObjGrid.appendChild(objectDiv);
            this.#clearForm();
            this.#ObjForm.style.display= "none";
          })
        })
        .catch(error => console.error('Error:', error));
    }

    #clearForm(){
        this.#nameObj.value = "";
        this.#descripObj.value = "";
        this.#numCopy.value = 1;
        this.#c.value = 1;
        this.#r.value = 1;
    }

    #cancelForm(){
        this.#cancelButton.addEventListener("click", this.#clearForm.bind(this))
    }

    #reopenForm(event){
        this.#ObjForm.style.display= "block";
        this.#deleteButton.style.display= "inline-block";
        this.#updateButton.style.display= "inline-block";
        this.#cancelButton.style.display= "none";
        this.#createButton.style.display= "none";
        const getEvent = this.objectDB.getObject(Number(event.target.id)); 
        getEvent
        .then(objData => {
            this.#nameObj.value = objData.name;
            this.#descripObj.value = objData.description;
            this.#c.value = objData.c;
            this.#r.value = objData.r;
            this.#numCopy.value = 1;
            this.#idObj.setAttribute("id", String(objData.id)+"temp"); 
        }) 
        .catch(error => console.error('Error:', error))
    }

    #clickForm(){
        function clickFormInit(){
            if(this.#ObjForm.style.display==="none"){
                this.#ObjForm.style.display= "block";
            }
            else{
                this.#ObjForm.style.display= "none";
            }
            this.#createButton.style.display= "inline-block";
            this.#cancelButton.style.display= "inline-block";
            this.#updateButton.style.display= "none";
            this.#deleteButton.style.display= "none";
            this.#numCopy.value = 1;
            this.#c.value = 1;
            this.#r.value = 1;
        }
        this.#addObj.addEventListener("click",clickFormInit.bind(this));
    }

    #createObject(){
        function createObjectToken(objData){
            if(this.#nameObj.value===""){
              console.log("need name");
            }
            else{
              for(let i = 0; i<this.#numCopy.value;i++){
                const objectDiv = document.createElement("div");
                objectDiv.classList.add("object");
                objectDiv.classList.add("tooltip");
                const spanElement = document.createElement("span");
                spanElement.classList.add("tooltiptext");
                spanElement.textContent = "name: "+this.#nameObj.value+"\ndescription: "+ this.#descripObj.value;
                const rowE = Number(this.#r.value);
                const colE = Number(this.#c.value);
                const objectStore = {
                  name: this.#nameObj.value, 
                  description: this.#descripObj.value,
                  c:Number(this.#c.value),
                  r:Number(this.#r.value),
                  initR:this.#initR,
                  initC:this.#initC
                }
                objectDiv.style.gridArea = `${this.#initR}/${this.#initC}/${rowE+this.#initR}/${colE+this.#initC}`;
                this.#initR+=1;
                let addEvent = this.objectDB.addObject(objectStore);
                addEvent
                .then(resp => {
                  objectDiv.setAttribute("id", resp); 
                  spanElement.setAttribute("id", String(resp)+"s"); 
                  objectDiv.appendChild(spanElement);
                  this.#ObjGrid.appendChild(objectDiv);
                  objectDiv.addEventListener("click", this.#reopenForm.bind(this));
                }) 
                .catch(error => console.error('Error:', error));
              }
            }
            this.#clearForm();
            this.#ObjForm.style.display= "none";
          }
          
        this.#createButton.addEventListener("click", createObjectToken.bind(this));
    }

    #deleteObject(){
        function deleteObjectToken(){
            const startIndex = this.#idObj.id.indexOf("temp");
            const result = this.#idObj.id.substring(0, startIndex);
            this.objectDB.deleteObject(Number(result));
            let objD = document.getElementById(result);
            objD.remove();
            this.#clearForm();
            this.#ObjForm.style.display= "none";
        }
        this.#deleteButton.addEventListener("click", deleteObjectToken.bind(this));
    }

    #updateObject(){
        function updateObjectToken(){
            const startIndex = this.#idObj.id.indexOf("temp");
            const result = this.#idObj.id.substring(0, startIndex);
            const objDiv = document.getElementById(result);
            const spanElement = document.getElementById(result+"s");
            const getEvent = this.objectDB.getObject(Number(result)); 
            getEvent
            .then(objData => {
                objData.name = this.#nameObj.value;
                objData.description = this.#descripObj.value;
                objData.c = this.#c.value;
                objData.r = this.#r.value;
                const rowE = Number(objData.r);
                const colE = Number(objData.c);
                this.#numCopy.value = 1; 
                this.objectDB.updateObject(objData);
                objDiv.style.gridArea = `${objData.initR}/${objData.initC}/${rowE+objData.initR}/${colE+objData.initC}`;
                spanElement.textContent = "name: "+objData.name+"\ndescription: "+ objData.description;
                this.#clearForm();
                this.#ObjForm.style.display= "none";
            })
            .catch(error => console.error('Error:', error));
        }
        this.#updateButton.addEventListener("click", updateObjectToken.bind(this));
    }
}