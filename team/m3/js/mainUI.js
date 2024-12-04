let counter = 0;
let subCounter = 0;

function openNav() {
  document.getElementById("mySidenav").style.width = "19%";
  playAudio('audio/Opening UI.mp3');
  //document.getElementById("mySidenav").style.width = "10%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  playAudio('audio/Opening UI.mp3');
}

function checkNav() {
  counter++
  if (counter % 2 === 0) {
    if (subCounter % 2 !== 0) {
      closeSubSubNavGrid();
      closeSubSubNavDraw();
      togglePaint();
      subCounter++;
    }
    closeNav(); //opens the navigation
  }
  else
    openNav(); //closes the navigation 
}

function openSubSubNavGrid() {
  document.getElementById("subSideNavGridID").style.width = "29%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavGrid() {
  document.getElementById("subSideNavGridID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function openSubSubNavDraw() {
  document.getElementById("subSideNavDrawID").style.width = "29%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavDraw() {
  document.getElementById("subSideNavDrawID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function openSubSubNavDice() {
  document.getElementById("subSideNavDiceID").style.width = "29%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}

function closeSubSubNavDice() {
  document.getElementById("subSideNavDiceID").style.width = "0"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}


function checkSubNavGrid() {
    subCounter++;
    if (subCounter % 2 === 0)
      closeSubSubNavGrid();
    else 
      openSubSubNavGrid();
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