import { DatabaseConnection } from "./DatabaseConnection.js";

export class DataForm{
    #createButton;#cancelButton;#updateButton;#deleteButton;#ObjForm;
    #addObj;#nameObj;#descripObj;#numCopy;#c;#r;#ObjGrid;#idObj;#initR;#initC

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
        this.#ObjGrid = document.getElementById("object-grid");
        this.#initC = 1;
        this.#initR = 1;
        this.#idObj = document.createElement('idObj');

    }

    render(){
        this.objectDB.openDatabase();
        this.#ObjForm.appendChild(this.#idObj);
        this.#ObjForm.style.display= "none";
    }

    addWH(width, height){
        this.#c.max = width;
        this.#r.max = height;
    }

    renderWhenLoad(){
        const idArr = [];
        const areaArr = [];
        return new Promise((resolve) => {
            const allEvent = this.objectDB.getAllObject();
            allEvent
                .then(objArr => {
                    objArr.forEach(objData => {
                        const objectDiv = document.createElement("div");
                        objectDiv.classList.add("object");
                        objectDiv.classList.add("hoverBox");
                        const spanElement = document.createElement("span");
                        spanElement.classList.add("hovertext");
                        spanElement.textContent = "name: "+objData.name+"\ndescription: "+ objData.description;
                        objectDiv.setAttribute("id", objData.id); 
                        idArr.push(objData.id);
                        spanElement.setAttribute("id", String(objData.id)+"s"); 
                        objectDiv.appendChild(spanElement);
                        const rowE = Number(objData.r);
                        const colE = Number(objData.c);
                        objectDiv.style.gridArea = `${objData.initR}/${objData.initC}/${rowE+objData.initR}/${colE+objData.initC}`;
                        areaArr.push(objectDiv.style.gridArea);
                        objectDiv.addEventListener("click", (event) => {
                            if(event.target.classList.contains('object')){
                                this.#reopenForm(event);
                            }
                        })
                        this.#ObjGrid.appendChild(objectDiv);
                        this.clearForm();
                        this.#ObjForm.style.display= "none";
                    });
                    resolve({id:idArr, area:areaArr});
                })
                .catch(error => console.error('Error:', error)
                );
        })
    }

    clearForm(){
        this.#nameObj.value = "";
        this.#descripObj.value = "";
        this.#numCopy.value = 1;
        this.#c.value = 1;
        this.#r.value = 1;
    }

    #reopenForm(event){
        if(!event.target.classList.contains("dragging")){
            this.#ObjForm.style.display= "block";
            this.#deleteButton.style.display= "inline-block";
            this.#updateButton.style.display= "inline-block";
            this.#cancelButton.style.display= "none";
            this.#createButton.style.display= "none";
            console.log(event.target.id);
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
    }

    clickForm(){
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

    createObject(objData){
        const idArr = [];
        const areaArr = [];
        return new Promise((resolve) => {
            if(this.#nameObj.value===""){
                console.log("need name");
            }
            else{
                const objectDiv = document.createElement("div");
                objectDiv.classList.add("object");
                objectDiv.classList.add("hoverBox");
                const spanElement = document.createElement("span");
                spanElement.classList.add("hovertext");
                spanElement.textContent = "name: "+this.#nameObj.value+"\ndescription: "+ this.#descripObj.value;
                const rowE = Number(this.#r.value);
                const colE = Number(this.#c.value);
                const objectStore = {
                    name: this.#nameObj.value, 
                    description: this.#descripObj.value,
                    c:Number(this.#c.value),
                    r:Number(this.#r.value),
                    initC:this.#initC,
                    initR:this.#initR
                }
                objectDiv.style.gridArea = `${this.#initR}/${this.#initC}/${rowE+this.#initR}/${colE+this.#initC}`;
                areaArr.push(objectDiv.style.gridArea)
                let addEvent = this.objectDB.addObject(objectStore);
                addEvent
                .then(resp => {
                    objectDiv.setAttribute("id", resp); 
                    idArr.push(resp)
                    spanElement.setAttribute("id", String(resp)+"s"); 
                    objectDiv.appendChild(spanElement);
                    this.#ObjGrid.appendChild(objectDiv);
                    objectDiv.addEventListener("click", this.#reopenForm.bind(this));
                    this.clearForm();
                    this.#ObjForm.style.display= "none";
                    resolve({id:idArr, area:areaArr});
                }) 
                .catch(error => console.error('Error:', error));
            }
        })
    }

    deleteObject(){
        const idArr = [];
        const areaArr = [];
        return new Promise((resolve) => {
            const startIndex = this.#idObj.id.indexOf("temp");
            const result = this.#idObj.id.substring(0, startIndex);
            idArr.push(result)
            this.objectDB.deleteObject(Number(result));
            let objD = document.getElementById(result);
            areaArr.push(objD.style.gridArea);
            objD.remove();
            this.clearForm();
            this.#ObjForm.style.display= "none";
            resolve({id:idArr, area:areaArr});
        });
    }

    updateObject(){
        const idArr = [];
        const areaArrInit = [];
        const areaArrAfter = [];
        return new Promise((resolve)=> {
            const startIndex = this.#idObj.id.indexOf("temp");
            const result = this.#idObj.id.substring(0, startIndex);
            const objDiv = document.getElementById(result);
            idArr.push(result)
            const spanElement = document.getElementById(result+"s");
            const getEvent = this.objectDB.getObject(Number(result)); 
            getEvent
            .then(objData => {
                areaArrInit.push(`${objData.initR}/${objData.initC}/${Number(objData.r)+objData.initR}/${Number(objData.c)+objData.initC}`)
                objData.name = this.#nameObj.value;
                objData.description = this.#descripObj.value;
                objData.c = Number(this.#c.value);
                objData.r = Number(this.#r.value);
                const rowE = Number(objData.r);
                const colE = Number(objData.c);
                console.log(rowE, colE)
                this.#numCopy.value = 1; 
                this.objectDB.updateObject(objData);
                objDiv.style.gridArea = `${objData.initR}/${objData.initC}/${rowE+objData.initR}/${colE+objData.initC}`;
                areaArrAfter.push(objDiv.style.gridArea);
                spanElement.textContent = "name: "+objData.name+"\ndescription: "+ objData.description;
                this.clearForm();
                this.#ObjForm.style.display= "none";
                resolve({id:idArr, areaInit:areaArrInit, areaAfter: areaArrAfter});
            })
            .catch(error => console.error('Error:', error));
        })
    }
}