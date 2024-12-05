let counter = 0;
let subCounter = 0;

function openNav() {
  document.getElementById("mySidenav").style.width = "19%";
  document.getElementById("mySidenav").style.transitionDelay = "0.1s";
  playAudio('audio/Opening UI.mp3');
  //document.getElementById("mySidenav").style.width = "10%";
  let sideNavButtonArray = document.getElementsByClassName("sidenavUIbuttons");
  let subSideNavArray = document.getElementsByClassName("subsidenavUI");
  for (let i = 0; i < sideNavButtonArray.length; i++) {
    sideNavButtonArray[i].style.transitionDelay= "0.5s";  
    sideNavButtonArray[i].style.transitionDuration = "2s";
    sideNavButtonArray[i].style.opacity = 1;

    subSideNavArray[i].style.transitionDuration = "0.8s"
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.transitionDelay = "0.5s";
  playAudio('audio/Opening UI.mp3');  //sidenavUI
  let sideNavButtonArray = document.getElementsByClassName("sidenavUIbuttons");
  let subSideNavArray = document.getElementsByClassName("subsidenavUI");
  for (let i = 0; i < sideNavButtonArray.length; i++) {
    sideNavButtonArray[i].style.transitionDelay = "0s";  
    sideNavButtonArray[i].style.transitionDuration = "1s";
    sideNavButtonArray[i].style.opacity = 0;

    subSideNavArray[i].style.transitionDuration = "0.5s"
  }
}

function checkNav() {
  counter++
  if (counter % 2 === 0) {
    if (subCounter % 2 !== 0) {
      closeSubSubNavGrid();
      closeSubSubNavDraw();
      togglePaint();   // when you close the menu, this will stop you from being able to continue drawing 
      closeSubSubNavDice();
      closeSubSubNavToken();
    }
    closeNav(); //opens the navigation
  }
  else
    openNav(); //closes the navigation 
}

function openSubSubNavGrid() {
  document.getElementById("subSideNavGridID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavGrid() {
  document.getElementById("subSideNavGridID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function openSubSubNavDraw() {
  document.getElementById("subSideNavDrawID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavDraw() {
  document.getElementById("subSideNavDrawID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function openSubSubNavDice() {
  document.getElementById("subSideNavDiceID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavDice() {
  document.getElementById("subSideNavDiceID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function openSubSubNavToken() {
  document.getElementById("subSideNavTokenID").style.width = "20%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavToken() {
  document.getElementById("subSideNavTokenID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}


function checkSubNavGrid() {
    subCounter++;
    if (subCounter % 2 === 0)
      closeSubSubNavGrid();
    else {
      openSubSubNavGrid();
    }
}

function checkSubNavDraw() {
  subCounter++;
  if (subCounter % 2 === 0)
    closeSubSubNavDraw();
  else 
    openSubSubNavDraw();
}

function checkSubNavDice() {
  subCounter++;
  if (subCounter % 2 === 0)
    closeSubSubNavDice();
  else 
    openSubSubNavDice();
}

function checkSubNavToken() {
  subCounter++;
  if (subCounter % 2 === 0)
    closeSubSubNavToken();
  else 
    openSubSubNavToken();
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