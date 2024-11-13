export class Image{
    #inputElement
    #inputImg
    constructor(divElement){
        this.#inputImg = document.createElement("img");
        this.#inputImg.id = "preview";
        this.#inputImg.alt = "Image Preview";
        this.#inputElement = document.createElement("input");
        this.#inputElement.type = "file"
        this.#inputElement.id = "imageInput"
        this.#inputElement.accept = "image/*"
        divElement.appendChild(this.#inputElement);
        divElement.appendChild(this.#inputImg);

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
        let image  = this.#inputImg;
        image.removeAttribute("src");
        this.#inputElement.value="";
    }



//    createImage(){
//     <input type="file" id="imageInput" accept="image/png, image/jpeg">

//    } 
}