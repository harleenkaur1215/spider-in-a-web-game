
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
  //document.getElementById("page-mask").style.display = "none";
  document.getElementById("loginForm").style.display = "none";
  for (var x of document.getElementsByClassName("edgeButtons")){
    if (x.id != "login")
      x.disabled = false;
  }
  
}

function openSignupForm() {
  //document.getElementById("page-mask").style.display = "flex";
  document.getElementById("signupForm").style.display = "flex";
  for (var x of document.getElementsByClassName("edgeButtons")){
    if (x.id != "signup")
      x.disabled = true;
  }
}

function closeSignupForm() {
  //document.getElementById("page-mask").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  for (var x of document.getElementsByClassName("edgeButtons")){
    if (x.id != "signup")
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

var seedsPerpit = 3;
var pitsPerPlayer = 6;

function chooseSeedsPerPit(id){
  for(var x of document.getElementsByClassName("seed-buttons")){
    if (x.id == id){
      x.style.background = "Gray";
      if (x.id == 'threeseeds-button'){
        seedsPerpit = 3;
      }
      if (x.id == 'fourseeds-button'){
        seedsPerpit = 4;
      }
      if (x.id == 'fiveseeds-button'){
        seedsPerpit = 5;
      }
      if (x.id == 'sixseeds-button'){
        seedsPerpit = 6;
      }
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
      if (x.id == 'fourpits-button'){
        pitsPerPlayer = 4;
      }
      if (x.id == 'fivepits-button'){
        pitsPerPlayer = 5;
      }
      if (x.id == 'sixpits-button'){
        pitsPerPlayer = 6;
      }
      if (x.id == 'sevenpits-button'){
        pitsPerPlayer = 7;
      }
    }
    else{
      x.style.background = "White";
    }
  }
}


function startGame(){
  document.getElementById("game-configs").style.display = "none";
  buildBoard();
  setGridColumns();
  document.getElementById("game-board").style.display = "grid";
}

function setGridColumns(){
  board.style.setProperty('grid-template-columns', `repeat(${pitsPerPlayer}, 1fr)`)
}

function buildBoard(){
  document.getElementById("storage1").value=0;
  document.getElementById("storage2").value=pitsPerPlayer+1;
  document.getElementById("storageValue1").value=0;
  document.getElementById("storageValue2").value=pitsPerPlayer+1;
  for (let i=pitsPerPlayer; i > 0;i--){
    var newPit = document .createElement("pit");
    newPit.classList.add("allPits");
    newPit.value = i;
    var divAtual = document.getElementById("board");
    // for (let j = 0; j < seedsPerpit; j++){
    //   var newSeed = document.createElement("seed");
    //   newPit.appendChild(newSeed);
    // }
    var newSeed = document.createElement("seed");
    newPit.appendChild(newSeed);
    divAtual.appendChild(newPit); 
  }
  for (let i=pitsPerPlayer + 2; i < 2*pitsPerPlayer+2;i++){
    var newPit = document .createElement("pit");
    newPit.classList.add("allPits");
    newPit.value = i;
    var divAtual = document.getElementById("board");
    // for (let j = 0; j < seedsPerpit; j++){
    //   var newSeed = document.createElement("seed");
    //   newPit.appendChild(newSeed);
    // }
    var newSeed = document.createElement("seed");
    newPit.appendChild(newSeed);
    divAtual.appendChild(newPit); 
  }
  for (let i=pitsPerPlayer+2; i < 2*pitsPerPlayer+2;i++){
    var newSeedValue = document.createElement("seed-value");
    newSeedValue.classList.add("allValues");
    newSeedValue.value=i;
    value = document.createTextNode(seedsPerpit);
    newSeedValue.appendChild(value);
    var divAtual = document.getElementById("values1");
    divAtual.appendChild(newSeedValue);
  }
  for (let i=pitsPerPlayer; i > 0;i--){
    var newSeedValue = document.createElement("seed-value");
    newSeedValue.classList.add("allValues");
    newSeedValue.value=i;
    value = document.createTextNode(seedsPerpit);
    newSeedValue.appendChild(value);
    var divAtual = document.getElementById("values2");
    divAtual.appendChild(newSeedValue);
  }
}




function openHighscores(){

}

function closeHighscores(){

}

function openCommands(){

}

function closeCommands(){

}