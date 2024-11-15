import { DatabaseConnection } from "../ObjectToken/DatabaseConnection.js";
export class existingTileForm{
    
}

export class customTileForm{
    #typeInput;
    #detailsInput;
    #tileVisual;

    constructor(tileObjectDB){
        this.#typeInput = document.getElementById('tile-name');
        this.#detailsInput = document.getElementById('details');
        this.#tileVisual = document.getElementById('tile-preview');
    }
}

export class editTileForm{
    
}