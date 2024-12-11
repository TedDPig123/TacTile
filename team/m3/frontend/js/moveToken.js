export class moveToken{
    #initY;#initX;top;left

    //takes in the token id that this is being applied on
    constructor(id){
        this.id = id
        this.element = document.getElementById(this.id);
        this.top = undefined;
        this.left = undefined;
    }

    //gets the top and left px of the token when you refresh the page and apply them
    async render(){
        //GET: gets the token to update its information with the new location
        const response = await fetch("/tokens/token/"+this.id);
        if (!response.ok) {
            throw new Error("Failed to get token");
        };
        const data = await response.json();
        this.element.style.top = data.top;
        this.element.style.left = data.left;
    }

    //get the scale of the grid after zoom in/out
    getScale(){
        const tokenGrid = document.getElementById("object-grid");
        const transform = window.getComputedStyle(tokenGrid).transform
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

    //tracks the mouse movement and updates the token
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

    //removes class dragging after 150ml so it doesn't trigger the click eventlistener, save the final coordinate in the corresponding div element and sqlite database
    mouseUP(){
        this.element.addEventListener("mouseup", async () => {
            this.top = this.element.style.top;
            this.left = this.element.style.left;
            //GET: gets the token to update its information with the new location
            const response = await fetch("/tokens/token/"+this.id);
            if (!response.ok) {
                throw new Error("Failed to get token");
            };
            const data = await response.json();
            data.top = this.top;
            data.left = this.left;
            await fetch("/tokens/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            });
            setTimeout(()=> {
                this.element.style.zIndex = "auto"; 
                this.element.classList.remove("dragging");
            }, 150);
        });
    }
}