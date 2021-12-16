
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


function openHighscores(){

}

function closeHighscores(){

}

function openCommands(){

}

function closeCommands(){

}