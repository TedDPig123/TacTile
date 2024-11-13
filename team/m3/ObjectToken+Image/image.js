export class Image{
    #inputElement
    #inputImg
    constructor(divElement, imageDB){
        this.#inputImg = document.createElement("img");
        this.#inputImg.id = "preview";
        this.#inputImg.alt = "Image Preview";
        this.#inputElement = document.createElement("input");
        this.#inputElement.type = "file"
        this.#inputElement.id = "imageInput"
        this.#inputElement.accept = "image/*"
        divElement.appendChild(this.#inputElement);
        divElement.appendChild(this.#inputImg);
        this.imageDB = imageDB;
        this.imageDB.openDatabase();
    }

    render(){
        this.imageDB.getAllObject()
        .then(objArr => {
            objArr.forEach(objData => {
                const parentDiv = document.getElementById(objData.id.split("i")[0])
                if(parentDiv){
                    const imgElement = document.createElement("img");
                    imgElement.classList.add("imageToken")
                    imgElement.setAttribute("id", objData.id)
                    imgElement.src = objData.src;
                    parentDiv.appendChild(imgElement);
                }
            })
        })

    }

    PreviewImg(event){
        let image  = this.#inputImg;
        if (event.target.files&&event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
               image.src = e.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        else{
            image.removeAttribute("src")
        }
    }

    clearImage(){
        let image = this.#inputImg;
        image.removeAttribute("src");
        this.#inputElement.value="";
    }

    createImageElement(parentDiv){
        let image = this.#inputImg;
        if(image.src){
            const imgElement = document.createElement("img");
            imgElement.classList.add("imageToken")
            imgElement.setAttribute("id", String(parentDiv.id)+"img")
            imgElement.src = image.src;
            parentDiv.appendChild(imgElement)
            this.imageDB.addObject({id:String(parentDiv.id)+"img", src:imgElement.src})
        }
    }

    deleteImageElement(parentDiv){
        this.imageDB.deleteObject(String(parentDiv)+"img");
    }

    updateImageElement(parentDiv){
        console.log(parentDiv)
        const image  = this.#inputImg;
        if(image.src){
            if(parentDiv.querySelector('img')){
                const imageToUpdate = document.getElementById(String(parentDiv.id)+"img");
                this.imageDB.getObject(String(parentDiv.id)+"img")
                .then(imageDB => {
                    imageToUpdate.src = image.src;
                    imageDB.src = imageToUpdate.src;
                    this.imageDB.updateObject({id:String(parentDiv.id)+"img", src:imageToUpdate.src})
                })
            }
            else{
                const imgElement = document.createElement("img");
                imgElement.classList.add("imageToken")
                imgElement.setAttribute("id", String(parentDiv.id)+"img")
                imgElement.src = image.src;
                parentDiv.appendChild(imgElement)
                this.imageDB.addObject({id:String(parentDiv.id)+"img", src:imgElement.src})
            }
        }
        else{
            if(parentDiv.querySelector('img')){
                const imageToDel = document.getElementById(String(parentDiv.id)+"img")
                imageToDel.remove();  
                this.deleteImageElement(String(parentDiv.id))          
            }
        }
    }
}