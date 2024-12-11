
//These are the boolean values that will be used to determine whether the sub navigation menu should be considered opened or not. If it's marked as true, 
//then only one of them will be open. Otherwise, it will refuse to open. This logic will be further explained later down in the code.
let isOpenToken = false;
let isOpenDice = false;
let isOpenDraw = false;
let isOpenGrid = false;

let isOpenMain = false;

let isOpenSubNav = false;

//This function is meant to open the navigation bar (that consists of 5 buttons). It has the fade in effect, but only works for the buttons 
function openNav() {
  document.getElementById("mySidenav").style.width = "19%";
  document.getElementById("mySidenav").style.transitionDelay = "0.1s";
  playAudio('audio/Opening UI.mp3');
  let sideNavButtonArray = document.getElementsByClassName("sidenavUIbuttons"); //Collect the variables with the class name and construct an array
  let subSideNavArray = document.getElementsByClassName("subsidenavUI");
  for (let i = 0; i < sideNavButtonArray.length; i++) { //Loops through the array and plays the animation for each button present on screen 
    sideNavButtonArray[i].style.transitionDelay= "0.5s";  //Delays opening animation 
    sideNavButtonArray[i].style.transitionDuration = "2s"; //Duration of opening animation 
    sideNavButtonArray[i].style.opacity = 1; //Opacity of navigation bar

    subSideNavArray[i].style.transitionDuration = "0.8s"
  }
}

//This function is meant to close the navigation bar (that consists of 5 buttons). It has the fade out effect, but only works for the buttons 
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.transitionDelay = "0.5s";
  playAudio('audio/Opening UI.mp3');  
  let sideNavButtonArray = document.getElementsByClassName("sidenavUIbuttons");
  let subSideNavArray = document.getElementsByClassName("subsidenavUI");
  for (let j = 0; j < sideNavButtonArray.length; j++) {
    sideNavButtonArray[j].style.transitionDelay = "0s";  //Unlike for openNav(), there is no animation delay
    sideNavButtonArray[j].style.transitionDuration = "1s"; //Unlike for openNav(), the animation duration is shortened by 1 second 
    sideNavButtonArray[j].style.opacity = 0; //This prevents the user from seeing the buttons, giving the 'fade out' effect

    subSideNavArray[j].style.transitionDuration = "0.5s"
  }
}

//This function is meant to fade in the buttons within the sub navigation bar (aka after clicking on a button within the navigation bar, 
// the user is then sent to a sub navigation bar and that's when the fade in animation for those buttons occur. This function has a 
// parameter, so this code can be reused all throughout the 5 different sub navigation menus. Without the parameter, the fade in effect will 
//only occur for the first sub navigation menu that gets activated
function fadingIn(fadeButtons) {
  var sideNavFadeOutButtonArrays = document.getElementsByClassName(fadeButtons);
  for(let k = 0; k < sideNavFadeOutButtonArrays.length; k++) { 
    sideNavFadeOutButtonArrays[k].style.transitionDelay = "0.3s";  
    sideNavFadeOutButtonArrays[k].style.transitionDuration = "1.7s";
    sideNavFadeOutButtonArrays[k].style.opacity = 1;
  }  

  sideNavFadeOutButtonArrays = []; //this is meant to 'reset' the array when it's ready to be called in a different part of the code that requires a new array
}


//The inverse of the function above.
function fadingOut(fadeButtons) {
  var sideNavFadeOutButtonArrays = document.getElementsByClassName(fadeButtons);

  for(let k = 0; k < sideNavFadeOutButtonArrays.length; k++) {
    sideNavFadeOutButtonArrays[k].style.transitionDelay = "0s";  
    sideNavFadeOutButtonArrays[k].style.transitionDuration = "0.25s";
    sideNavFadeOutButtonArrays[k].style.opacity = 0;
  }

  sideNavFadeOutButtonArrays = []; //this is meant to 'reset' the array when it's ready to be called in a different part of the code that requires a new array
}

//If the user decides to close the navigation menu while still having something from the sub navigation menu present, then it'll automatically close it 
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

//the following group of functions are meant to just open or close the sub navigation menu. If you open a sub navigation menu, a sound effect will play
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

//The following set of functions are meant to prevent users from opening up multiple sub navigation menus. Aka, it 
//should be able to switch between sub navigation menus pretty easily
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
=======
//this is meant as an easier way to type out the sound/audio that's meant to play during specific actions upon the code
function playAudio(url) {
  new Audio(url).play();
}
