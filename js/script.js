
function darkenElements(){
  
}

function lightupElements(){}


function openLoginForm() {
    
    document.getElementById("loginForm").style.display = "flex";
    for (var x of document.getElementsByClassName("edgeButtons")){
      if (x.id != "login")
        x.disabled = true;
    }
  }
  
function closeLoginForm() {
  document.getElementById("loginForm").style.display = "none";
  for (var x of document.getElementsByClassName("edgeButtons")){
    if (x.id != "login")
      x.disabled = false;
  }
  
}



var buttonStage = 0;

function gamemodeButtonClick(){
  changeGamemode;
  var background = document.getElementById("toggle_gamemode").style.background;
  if (buttonStage == 1){
    document.getElementById("difficulty-input").style.display = "flex";
    document.getElementById("toggle_gamemode").style.background = "url(images/toggle_left.png)";
    buttonStage = 0;
  }
  else{
    document.getElementById("difficulty-input").style.display = "none";
    document.getElementById("toggle_gamemode").style.background = "url(images/toggle_right.png)";
    buttonStage = 1;
  }
}


function changeGamemode(){

}

function chooseSeedsPerPit(id){
  for(var x of document.getElementsByClassName("seed-buttons")){
    if (x.id == id){
      x.style.background = "Gray";
    }
    else{
      x.style.background = "White";
    }
  }
}

function choosePitsPerPlayer(id){
  for(var x of document.getElementsByClassName("pits-buttons")){
    if (x.id == id){
      x.style.background = "Gray";
    }
    else{
      x.style.background = "White";
    }
  }
}


function startGame(){
  document.getElementById("game-configs").style.display = "none";
}




function openHighscores(){

}

function closeHighscores(){

}

function openCommands(){

}

function closeCommands(){

}