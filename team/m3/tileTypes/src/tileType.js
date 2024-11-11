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

document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    if (file) {
        const img = new Image();
        img.onload = function () {
            // canvas.width = img.width;
            // canvas.height = img.height;
            // ctx.drawImage(img, 0, 0);
            const newWidth = 300;
            const aspectRatio = img.height / img.width;
            const newHeight = newWidth * aspectRatio;
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const width = newWidth;
            

            for (let y = 0; y < canvas.height; y++) { //going through rows
                let row = [];

                for (let x = 0; x < width; x++) { //going through columns of row to get rgb data
                    const index = (y * width + x)*4;
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2]; //array will be like [[r1,g1,b1], [r2,b2,g2]...]
                    row.push([r, g, b]);
                }
                
                let greyScaleRow = [];
                for (let i = 0; i < data.length; i++) {
                    const index = (y * width + i)*4;
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];
                    const grey = getLuminance(r, g, b);
                    greyScaleRow.push([grey,grey,grey]);
                }
                
                const thresholdVal = 40; //change threshold val for different results
                for (let i = 0; i < data.length; i++) {
                    const pixelVal = greyScaleRow[i][0];
                    if(pixelVal >= thresholdVal){
                        greyScaleRow[i][0] = greyScaleRow[i][1] = greyScaleRow[i][2] = 255;
                    }else{
                        greyScaleRow[i][0] = greyScaleRow[i][1] = greyScaleRow[i][2] = 0;
                    }
                }
                
                let contrastMask = findWhiteParts(greyScaleRow);
                let sortedRow = sortOnlyWhiteParts(row, contrastMask);
                
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    data[index] = sortedRow[x][0];
                    data[index + 1] = sortedRow[x][1];
                    data[index + 2] = sortedRow[x][2]; 
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };
        img.src = URL.createObjectURL(file);
    }
});