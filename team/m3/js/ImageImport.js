export class ImageForToken{
    #inputElement
    #inputImg
    
    //creates the input element for choosing file and the element for the image preview
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

    //takes all image saved in indexDb and adds them to their corresponding token
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
        .catch(error => console.error('Error:', error))
    }

    //shows what the image looks like when user choses the image file
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

    //clear the image input and preview
    clearImage(){
        let image = this.#inputImg;
        image.removeAttribute("src");
        this.#inputElement.value="";
    }

    //adds the image element to the parentDiv(token created)
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
        this.#inputElement.value = ""
    }

    //delete the img element for the specific token, takes in the div of the token
    deleteImageElement(parentDiv){
        this.imageDB.deleteObject(String(parentDiv)+"img");
    }

    //show the image of the token when you click on it to update or delete, takes in the id of the token
    renderImage(id){
        if(document.getElementById(String(id)).querySelector('img')){
            let image  = this.#inputImg;
            this.imageDB.getObject(String(id)+"img")
            .then(img => {
                image.src =img.src;
            })
            .catch(error => console.error('Error:', error))
        }
    }

    //updates the image of the token when you click the update button, takes in the div of the token
    updateImageElement(parentDiv){
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
                .catch(error => console.error('Error:', error))
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
        this.#inputElement.value = "";
    }
}