export class mapTile{
    constructor(){
        this.tileColor = color(255,255,255); //white will be default
        this.tileText = "Enter all relevant stats and information here."
        this.tileXCoord = undefined;
        this.tileYCoord = undefined;
        this.imageSrc = "";
    }

    getTileColor(){
        return this.tileColor;
    }

    getTileText(){
        return this.getTileText;
    }
}