 class mapTile{
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

// THIS DISPLAYS THE USER'S IMAGE AFTER UPLOAD
document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    if (file) {
        const img = new Image();
        img.onload = function () {
            const newWidth = 300;
            const aspectRatio = img.height / img.width;
            const newHeight = newWidth * aspectRatio;
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            ctx.putImageData(imageData, 0, 0);
        };
        img.src = URL.createObjectURL(file);
    }
});

function showTileMenu(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.tile-menu');
    const currentDisplay = tileMenu.currentStyle ? tileMenu.currentStyle["display"] : window.getComputedStyle ? window.getComputedStyle(tileMenu, null).getPropertyValue("display") : null;
    console.log(currentDisplay);
    tileMenu.style.display = 'flex';
}

function hideTileMenu(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.tile-menu');
    const currentDisplay = tileMenu.currentStyle ? tileMenu.currentStyle["display"] : window.getComputedStyle ? window.getComputedStyle(tileMenu, null).getPropertyValue("display") : null;
    console.log(currentDisplay);
    tileMenu.style.display = 'none';
}