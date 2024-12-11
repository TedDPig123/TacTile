export class imageForToken{
    #divElement;
    #inputElement;
    #inputImg;
    
    //takes in the id of the token this is being applied on
    constructor(id){
        this.id = id;
        this.#divElement = document.getElementById(this.id);
        this.#inputElement = document.getElementById("imageInput");
        this.#inputImg = document.getElementById("preview");
    }

    //if the token had an img, it will add the corresponding div element and img src when you refresh page
    async render(){
        const response = await fetch ("/tokens/token/"+this.id);
        if (!response.ok) {
            throw new Error("Failed to get token");
        };
        const data = await response.json();
        if (data.img) {
            const imgElement = document.createElement("img");
            imgElement.classList.add("imageToken")
            imgElement.setAttribute("id", this.id+"img")
            this.#divElement.appendChild(imgElement);
            imgElement.setAttribute("src", data.mime+", "+data.img)
        }
    }

    //adds the image element to the parentDiv(token)
    async createImageElement(){
        //if an img was chosen
        if(this.#inputImg.src){
            const imgElement = document.createElement("img");
            imgElement.classList.add("imageToken")
            imgElement.setAttribute("id", this.id+"img")
            imgElement.src = this.#inputImg.src;
            this.#divElement.appendChild(imgElement);
            const response = await fetch ("/tokens/token/"+this.id);
            if (!response.ok) {
                throw new Error("Failed to get token");
            };
            const data = await response.json();
            //the base64 img string
            data.img = imgElement.src.split(",")[1];
            //the type of the img(data:(type);base64
            data.mime = imgElement.src.split(",")[0];
            //PUT: updates the data of this token in sqlite database
            await fetch("/tokens/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            });
        }
        //clears the form
        this.#inputElement.value = ""
        this.#inputImg.removeAttribute("src");
    }

    //show the image of the token when you click on it to update or delete.
    async renderImage(){
        if(document.getElementById(this.id).querySelector('img')){
            const response = await fetch ("/tokens/token/"+this.id);
            if (!response.ok) {
                throw new Error("Failed to get token");
            };
            const data = await response.json();
            this.#inputImg.src = data.mime+", "+data.img;
        }
    }

    // updates the image of the token when you click the update button
    async updateImageElement(){
        const image  = this.#inputImg;
        //if there is an img
        if(image.src){
            //if the token already has an img before update
            if(this.#divElement.querySelector('img')){
                const imageToUpdate = document.getElementById(this.id+"img");
                //if the new img is different from the old image
                if(imageToUpdate.src!==image.src){
                    imageToUpdate.src = image.src;
                    //GET: gets the token to update its information with the new img
                    const response = await fetch ("/tokens/token/"+this.id);
                    if (!response.ok) {
                        throw new Error("Failed to get token");
                    };
                    const data = await response.json()
                    data.img = image.src.split(",")[1];
                    data.mime = image.src.split(",")[0]
                    //PUT: updates the token
                    await fetch("/tokens/update", {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data), 
                    });
                }
            }
            //if the token doesn't have an image before, create a new image element for the token
            else{
                this.createImageElement();
            }
        }
        //if no image was chosen
        else{
            //if the token had an img before, delete the img div and the data related to img
            if(this.#divElement.querySelector('img')){
                const imageToDel = document.getElementById(this.id+"img")
                imageToDel.remove();  
                //GET: gets the token to update its information with the new img(none)
                const response = await fetch ("/tokens/token/"+this.id);
                if (!response.ok) {
                    throw new Error("Failed to get token");
                };
                const data = await response.json();
                data.img = null;
                data.mime = null;
                //PUT: updates the token
                await fetch("/tokens/update", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), 
                });         
            }
        }
        //clears the form
        this.#inputElement.value = "";
        this.#inputImg.removeAttribute("src");
    }
}