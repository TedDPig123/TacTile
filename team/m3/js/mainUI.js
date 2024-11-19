function openNav() {
  document.getElementById("mySidenav").style.width = "19%";
  playAudio('audio/Opening UI.mp3');
}

function openSubNav() {
  document.getElementById("mySidenav").style.width = "39%"; //literally just making the existing ui even bigger 
  playAudio('audio/Opening UI.mp3');
}
  
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  playAudio('audio/Opening UI.mp3');
}

function playAudio(url) {
  new Audio(url).play();
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