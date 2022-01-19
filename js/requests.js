

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


////////////////////////////////////////////////////////////////////////////////////////////


const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
      if (response.status >= 400) {
        // !response.ok
        return response.json().then(errResData => {
          const error = new Error('Something went wrong!');
          error.data = errResData;
          throw error;
        });
      }
      return response.json();
    });
  };
  
  const getData = () => {
    sendHttpRequest('GET', 'https://reqres.in/api/users').then(responseData => {
      console.log(responseData);
    });
  };
  
  const sendData = () => {
    sendHttpRequest('POST', 'https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in'
      // password: 'pistol'
    })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  };
  


  ////////////////////////////////////////////////////////////////////////////////////////////
/*http://twserver.alunos.dcc.fc.up.pt:8008/*/

const register = (nickname, pass) => {
    sendHttpRequest('POST', 'http://twserver.alunos.dcc.fc.up.pt:8008/register', {
      nick: nickname,
      password: pass
    })
      .then(responseData => {
        console.log(responseData);
        hideForms();
      })
      .catch(err => {
        console.log(err, err.data);
        giveRegisterError();
      });
};

function hideForms(){
    for (var x of document.getElementsByClassName("registerForms")){
        x.style.display= "none";
    }
}

function giveRegisterError(){
    document.getElementById("feedbackLogin").innerHTML = "Credentials Wrong";
    
}

function hideForms(){
    document.getElementById("feedbackLogin").innerHTML = " ";
    closeLoginForm();
}

function login(){
  var nick = document.getElementById("loginNick").value;
  var pass = document.getElementById("loginPass").value;
  register(nick, pass)
}
