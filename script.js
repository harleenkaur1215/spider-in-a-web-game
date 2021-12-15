
function openLoginForm() {
    //document.getElementById("page-mask").style.display = "flex";
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("signup").disabled = true;
  }
  
function closeLoginForm() {
  //document.getElementById("page-mask").style.display = "none";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signup").disabled = false;
}

function openSignupForm() {
  //document.getElementById("page-mask").style.display = "flex";
  document.getElementById("signupForm").style.display = "flex";
  document.getElementById("login").disabled = true;
}

function closeSignupForm() {
  //document.getElementById("page-mask").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("login").disabled = false;
}


function openHighscores(){

}

function closeHighscores(){

}

function openCommands(){

}

function closeCommands(){

}