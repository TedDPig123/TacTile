window.addEventListener("DOMContentLoaded", (event) => {
    const tilePreview = document.getElementById("tile-preview");
    if (tilePreview) {
        tilePreview.getContext("2d", { willReadFrequently: true });
    }
});

function showCustom(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.custom');
    const greyOverlay = document.getElementById('screen-overlay');
    greyOverlay.style.display = 'flex';
    tileMenu.style.display = 'flex';
}

function hideCustom(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.custom');
    const greyOverlay = document.getElementById('screen-overlay');
    tileMenu.style.display = 'none';
    greyOverlay.style.display = 'none';
}

function showExisting(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.existing');
    const greyOverlay = document.getElementById('screen-overlay');
    greyOverlay.style.display = 'flex';
    tileMenu.style.display = 'flex';
}

function hideExisting(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.existing');
    const greyOverlay = document.getElementById('screen-overlay');
    tileMenu.style.display = 'none';
    greyOverlay.style.display = 'none';
}

function showEdit(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.edit');
    const greyOverlay = document.getElementById('screen-overlay');
    greyOverlay.style.display = 'flex';
    tileMenu.style.display = 'flex';
}

function hideEdit(){
    console.log("toggle works!")
    const tileMenu = document.querySelector('.edit');
    const greyOverlay = document.getElementById('screen-overlay');
    tileMenu.style.display = 'none';
    greyOverlay.style.display = 'none';
}

function changeTilePreviewColor(){
    const tilePreviewBox = document.getElementById("tile-preview");
    const colorVal = document.getElementById("tile-color").value;
    let ctx = tilePreviewBox.getContext("2d");

    if(colorVal.match(/#([0-9]|[A-F]|[a-f]){6}/)){
        document.getElementById("tile-color").style.backgroundColor = "white"; 
        console.log('updated color')
        ctx.clearRect(0, 0, tilePreviewBox.width, tilePreviewBox.height);
        ctx.fillStyle = hexToRgba(colorVal);
        ctx.fillRect(0, 0, tilePreviewBox.width, tilePreviewBox.height);
    }else{
        document.getElementById("tile-color").style.backgroundColor = "red"; 
    }
}

function hexToRgba(hex) {
    hex = hex.replace('#', '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b})`;
}

window.addEventListener("DOMContentLoaded", (event) => {
    const upload = document.getElementById('img-upload');
    if (upload) {
        upload.addEventListener('change', function (event) {
            const file = event.target.files[0];
            const canvas = document.getElementById('tile-preview');
            const ctx = canvas.getContext('2d');
            
            if (file) {
                console.log('success');
                const img = new Image();
                img.onload = function () {
                    const newWidth = 200;
                    const newHeight = 200;
                    
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
                    ctx.putImageData(imageData, 0, 0);
                };
                img.src = URL.createObjectURL(file);
            }
        });
    }
});

window.addEventListener("DOMContentLoaded", (event) => {
    const dropDown = document.querySelector(".tile-dropdown-content");
    if (dropDown) {
        dropDown.addEventListener("click", function(event) {
            if (event.target.tagName === "A") {
                document.getElementById("displayed-tile").textContent = event.target.textContent;
            }
        });
    }
});