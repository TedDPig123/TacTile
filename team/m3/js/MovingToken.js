export class MoveItem{
    #initY;#initX;top;left

    constructor(indexDb,element){
        this.element = element;
        this.top = undefined;
        this.left = undefined;
        this.indexDb = indexDb
    }

    mouseDown(){
        this.element.addEventListener("mousedown", (event) => {
            setTimeout(()=> {
                this.element.classList.add("dragging")
                this.element.style.zIndex = "10"; 
            }, 200)            
            this.#initX = event.clientX-this.element.offsetLeft;
            this.#initY = event.clientY-this.element.offsetTop;
        })
    }

    mouseMove(){
        this.element.addEventListener("mousemove", (event) => {
            if (this.element.classList.contains("dragging")) {
                const currentX = event.clientX - this.#initX;
                const currentY = event.clientY - this.#initY;

                this.element.style.left = currentX + "px";
                this.element.style.top = currentY + "px";
            }
        });
    }

    mouseUP(){
        this.element.addEventListener("mouseup", () => {
            this.top = this.element.style.top;
            this.left = this.element.style.left;
            this.indexDb.getObject(Number(this.element.id))
            .then(objData => {
                objData["top"] = this.top;
                objData["left"] = this.left;
                this.indexDb.updateObject(objData)
            })
            .catch(error => console.error('Error:', error));
            setTimeout(()=> {
                this.element.style.zIndex = "auto"; 
                this.element.classList.remove("dragging");
            }, 150);
        });
    }
}