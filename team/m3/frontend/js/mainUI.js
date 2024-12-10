let isOpenToken = false;
let isOpenDice = false;
let isOpenDraw = false;
let isOpenGrid = false;

let isOpenMain = false;
let isOpenSubNav= false;
// let subCounter = 0;

function openNav() {
  document.getElementById("mySidenav").style.width = "19%";
  document.getElementById("mySidenav").style.transitionDelay = "0.1s";
  playAudio('audio/Opening UI.mp3');
  //document.getElementById("mySidenav").style.width = "10%";
  let sideNavButtonArray = document.getElementsByClassName("sidenavUIbuttons");
  let subSideNavArray = document.getElementsByClassName("subsidenavUI");
  for (let i = 0; i < sideNavButtonArray.length; i++) {
    sideNavButtonArray[i].style.transitionDelay= "0.5s";  //Main menu button 
    sideNavButtonArray[i].style.transitionDuration = "2s"; //Main menu button 
    sideNavButtonArray[i].style.opacity = 1; //Main menu button 

    subSideNavArray[i].style.transitionDuration = "0.8s"
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.transitionDelay = "0.5s";
  playAudio('audio/Opening UI.mp3');  //sidenavUI
  let sideNavButtonArray = document.getElementsByClassName("sidenavUIbuttons");
  let subSideNavArray = document.getElementsByClassName("subsidenavUI");
  for (let j = 0; j < sideNavButtonArray.length; j++) {
    sideNavButtonArray[j].style.transitionDelay = "0s";  
    sideNavButtonArray[j].style.transitionDuration = "1s";
    sideNavButtonArray[j].style.opacity = 0;

    subSideNavArray[j].style.transitionDuration = "0.5s"
  }
}

function fadingIn(fadeButtons) {
  var sideNavFadeOutButtonArrays = document.getElementsByClassName(fadeButtons);
  for(let k = 0; k < sideNavFadeOutButtonArrays.length; k++) {
    sideNavFadeOutButtonArrays[k].style.transitionDelay = "0.3s";  
    sideNavFadeOutButtonArrays[k].style.transitionDuration = "1.7s";
    sideNavFadeOutButtonArrays[k].style.opacity = 1;
  }  
  sideNavFadeOutButtonArrays = [];
}

function fadingOut(fadeButtons) {
  var sideNavFadeOutButtonArrays = document.getElementsByClassName(fadeButtons);

  for(let k = 0; k < sideNavFadeOutButtonArrays.length; k++) {
    sideNavFadeOutButtonArrays[k].style.transitionDelay = "0s";  
    sideNavFadeOutButtonArrays[k].style.transitionDuration = "0.25s";
    sideNavFadeOutButtonArrays[k].style.opacity = 0;
  }
  sideNavFadeOutButtonArrays = [];
}


function checkNav() {
  if (isOpenMain === true) {
    isOpenMain = false;

    isOpenGrid = false;
    closeSubSubNavGrid();
    isOpenToken = false;
    closeSubSubNavToken();
    isOpenDraw = false;
    closeSubSubNavDraw();
    togglePaint();
    isOpenDice = false;
    closeSubSubNavDice();
    closeNav(); //opens the navigation
  }
  else {
    isOpenMain = true;
    openNav(); //closes the navigation 
  }
}


function openSubSubNavGrid() {
  fadingIn("fadeGridButtons");
  document.getElementById("subSideNavGridID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavGrid() {
  fadingOut("fadeGridButtons");
  document.getElementById("subSideNavGridID").style.width = "0"; //literally just making the existing ui even bigger
}

function openSubSubNavToken() {
  fadingIn("fadeTokenButtons");
  document.getElementById("subSideNavTokenID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavToken() {
  fadingOut("fadeTokenButtons");
  document.getElementById("subSideNavTokenID").style.width = "0"; //literally just making the existing ui even bigger 
}

function openSubSubNavDraw() {
  fadingIn("fadeDrawButtons");
  document.getElementById("subSideNavDrawID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavDraw() {
  fadingOut("fadeDrawButtons");
  document.getElementById("subSideNavDrawID").style.width = "0"; //literally just making the existing ui even bigger 
}

function openSubSubNavDice() {
  fadingIn("fadeDiceButtons");
  document.getElementById("subSideNavDiceID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavDice() {
  fadingOut("fadeDiceButtons");
  document.getElementById("subSideNavDiceID").style.width = "0"; //literally just making the existing ui even bigger 
}

function checkSubNavGrid() {
  if (isOpenGrid === true) {
    isOpenGrid = false;
    closeSubSubNavGrid();
  }
  else {
    isOpenGrid = true;
    openSubSubNavGrid();
    isOpenToken = false;
    closeSubSubNavToken();
    isOpenDraw = false;
    closeSubSubNavDraw();
    togglePaint();
    isOpenDice = false;
    closeSubSubNavDice();
  }
}

function checkSubNavToken() {
  if (isOpenToken === true) {
    isOpenToken = false;
    closeSubSubNavToken();
  }
  else {
    isOpenGrid = false;
    closeSubSubNavGrid();
    isOpenToken = true;
    openSubSubNavToken();
    isOpenDraw = false;
    closeSubSubNavDraw();
    togglePaint();
    isOpenDice = false;
    closeSubSubNavDice();
  }
}

function checkSubNavDraw() {
  if (isOpenDraw === true) {
    isOpenDraw = false;
    togglePaint();
    closeSubSubNavDraw();
  }
  else { 
    isOpenGrid = false;
    closeSubSubNavGrid();
    isOpenToken = false;
    closeSubSubNavToken();
    isOpenDraw = true;
    openSubSubNavDraw();
    isOpenDice = false;
    closeSubSubNavDice();
  }
}

function checkSubNavDice() {
  if (isOpenDice === true) {
    isOpenDice = false;
    closeSubSubNavDice();
  }
  else {
    isOpenGrid = false;
    closeSubSubNavGrid();
    isOpenToken = false;
    closeSubSubNavToken();
    isOpenDraw = false;
    closeSubSubNavDraw();
    togglePaint();
    isOpenDice = true;
    openSubSubNavDice();
  }
}

function playAudio(url) {
  new Audio(url).play();
}


function loadingScreen() {
  var loadingScreen = document.querySelector(".loadingScreen");
  window.addEventListener('load',function() {
    loadingScreen.style.display = 'none';
  })
}


//https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function fadeOut(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}