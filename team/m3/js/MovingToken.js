export class MoveItem{
    #initY;#initX;top;left

    constructor(indexDb,element){
        this.element = element;
        this.top = undefined;
        this.left = undefined;
        this.indexDb = indexDb
    }

    getScale(){
        const objGrid = document.getElementById("object-grid");
        const transform = window.getComputedStyle(objGrid).transform
        if (transform === 'none') {
            return 1;
        }
        else{
            const matrix =  transform.replace("matrix(", "").split(",");
            return Number(matrix[0]);
        }
    }

    //adds class dragging after 200ml so it doesn't trigger the click eventlistener
    mouseDown(){
        this.element.addEventListener("mousedown", (event) => {
            const c = this.getScale();
            setTimeout(()=> {
                this.element.classList.add("dragging")
                this.element.style.zIndex = "10"; 
            }, 200)            
            this.#initX = (event.clientX-this.element.offsetLeft*c);
            this.#initY =(event.clientY-this.element.offsetTop*c);
        })
    }

    //tracks the mouse movement and updates the object
    mouseMove(){
        this.element.addEventListener("mousemove", (event) => {
            if (this.element.classList.contains("dragging")) {
                const c = this.getScale();
                const currentX = (event.clientX - this.#initX)/c;
                const currentY = (event.clientY - this.#initY)/c;

                this.element.style.left = currentX + "px";
                this.element.style.top = currentY + "px";
            }
        });
    }

    //removes class dragging after 150ml so it doesn't trigger the click eventlistener, save the final coordinate in the corresponding div element
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