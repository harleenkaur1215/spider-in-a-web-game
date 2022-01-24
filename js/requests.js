// const { elementAcceptingRef } = require("@mui/utils");

class Seed{
  constructor(){
      this.x = 10 + Math.floor(Math.random() * 70);
      this.y = 10 + Math.floor(Math.random() * 70);
      this.z = 10 + Math.floor(Math.random() * 70);
      this.rotation = Math.floor(Math.random() * 100);
  }

  randomizePos() {
      this.x = Math.floor(Math.random() * 10);
      this.y = Math.floor(Math.random() * 10);
      this.z = Math.floor(Math.random() * 10);
      this.rotation = Math.floor(Math.random() * 10);
  }

  getX(){
      return this.x;
  }
  getY(){
      return this.y;
  }
  getZ(){
      return this.z;
  }
  getRotation(){
      return this.rotation;
  }
}

class Board{

  constructor(size, numSeeds){
      this.boardSize = size;
      this.pits = [];
      for(var c = 0; c < size; c++){
          this.pits[c] = [];
      }

      for(var s = 1; s < size; s++){
          if(s != (size/2)){
              for(var n = 0; n < numSeeds; n++){
                  this.pits[s].push(new Seed());
              }
          }
      }
  }

  getPits(){
      return this.pits;
  }

  setPits(pits){
      this.pits = pits;
  }

  getSize(){
      return this.boardSize;
  }

  checkPoints(player, cavity){
      if(this.pits[cavity].length != 1){
          return;
      }

      this.pits[cavity].length = 0;      
      var numSeeds = this.pits[this.boardSize - cavity].length + 1;
      this.pits[this.boardSize - cavity].length = 0;
      

      if(player == 1){
          for(var c = 0; c < numSeeds; c++){
              this.pits[0].push(new Seed());
          }
      }
      else{
          for(var c = 0; c < numSeeds; c++){
              this.pits[this.boardSize/2].push(new Seed());
          }
      }

      return;
  }

  move(player, cavity){
      if((player == 1) && (cavity < this.boardSize/2)){
          return -2; //wrongmove
      }
      if((player == 2) && (cavity > this.boardSize/2)){
          return -2; //wrongmove
      }

      let seeds = this.pits[cavity].length;

      if(seeds == 0){
          return -2; //wrongmove
      }

      this.pits[cavity].length = 0;

      let seedingCav = cavity;

      let counter = 0;
      while(counter < seeds){
          
          seedingCav++;
          if(seedingCav == this.boardSize){
              seedingCav = 0;
          }

          if((player == 1 && seedingCav == (this.boardSize/2)) || (player == 2 && seedingCav == 0)){
              continue;
          }
          else{
              counter++;
              this.pits[seedingCav].push(new Seed());
          }
      }

      if(player == 1){
          if(seedingCav == 0)
              return -1;
          else if(seedingCav > (this.boardSize/2)){
              this.checkPoints(player, seedingCav);
              return 0;
          }
          else{
              return 0;
          }
      }
      else{
          if (seedingCav == (this.boardSize/2))
              return -1;
          else if(seedingCav < (this.boardSize/2)){
              this.checkPoints(player, seedingCav);
              return 0;
          }
          else{
              return 0;
          }
          
      }
      

  }

  checkEndGame(){

    let empty = true;
      

    for(var c = this.boardSize/2 + 1; c < this.boardSize; c++){
        if(this.pits[c].length != 0){
            empty = false;
            break;
        }
    }
    
    if(empty){
        var l;
        for(var c = 1; c < this.boardSize/2; c++){
            l = this.pits[c].length;
            this.pits[c].length = 0;
            for(var x = 0; x < l; x++){
                this.pits[this.boardSize/2].push(new Seed());
            }
        }
        return true;
    }
      


    empty = true;
      
    for(var c = 1; c < this.boardSize/2; c++){
        if(this.pits[c].length != 0){
            empty = false;
            break;
        }
    }
    
    if(empty){
        var l;
        for(var c = this.boardSize/2+1; c < this.boardSize; c++){
            l = this.pits[c].length;
            this.pits[c].length = 0;
            for(var x = 0; x < l; x++){
                this.pits[0].push(new Seed());
            }
        }
        return true;
    }
      

    return false;
  }

  getNumSeeds(c){
      return this.pits[c].length;
  }

  getWinner(){
      if(this.pits[0].length == this.pits[this.boardSize/2].length){
          return 0;
      }
      else if(this.pits[0].length > this.pits[this.boardSize/2].length){
          return 1;
      }
      else{
          return 2;
      }
  }

  showBoard(){
      var line = "    ";
      for(var c = this.boardSize/2-1; c > 0; c--){
          line += " | " + this.pits[c].length + " | "
      }
      console.log(line)
      line = "    ";
      console.log( "| " + this.pits[this.boardSize/2].length + " |" + "                                          " + "| " +this.pits[0].length + " |")
      for(var c = this.boardSize/2+1; c < this.boardSize; c++){
          line += " | " + this.pits[c].length + " | "
      }
      console.log(line)
  }

  clone(){
      let ret = new Board(this.boardSize, 1);

      let pitsCopy = [];
      for(var c = 0; c < this.boardSize; c++){
          pitsCopy[c] = [];
      }

      for(var n = 0; n < this.boardSize; n++){
              for(var x = 0; x < this.pits[n].length; x++){
                  pitsCopy[n].push(new Seed());
              }
      }

      ret.setPits(pitsCopy);
      return ret;
  }
}

class Game{

  //gameMode: 1->PvsP 2->PvsBotE 3->PvsBotM 4-> PvsBotH

  constructor(size, numSeeds, turn, gameMode){
      this.boardSize = size;
      this.board = new Board(size, numSeeds);
      this.playerOne = 0;
      this.playerTwo = 0;
      this.turn = turn;
      this.gameMode = gameMode;
  }

  getSize(){
      return this.boardSize;
  }

  getTurn(){
      return this.turn;
  }

  getBoard(){
      return this.board;
  }

  move(cavity){
      if(cavity == -1){ //surrend
          if(this.turn == 1) return 2;
          else return 1;
      }

      var ret = this.board.move(this.turn, cavity);

      if(this.board.checkEndGame()){
          return this.board.getWinner();
      }

      if(ret == 0){
          if(this.turn == 1) this.turn = 2;
          else this.turn = 1;
      }


      if(this.turn == 2 && this.gameMode != 1){
          //this.show();
          switch(this.gameMode){
              case 2:
                  this.botRandom();
                  break;
              
              case 3:
                  this.botEasy();
                  break;
              
              case 4:
                  this.botMedium();
                  break;
              case 5:
                  this.botHard();
              default:
                  break;
          }

          this.turn = 1;

          if(this.board.checkEndGame()){
              return this.board.getWinner();
          }
      }
      
      return -1;
  }

  show(){
      console.log("Turn: Player " + this.turn);
      this.board.showBoard();
  }

  botRandom(){
      let randomMove;
      let result;
      do{
          randomMove = Math.floor(Math.random() * (this.boardSize/2 - 1)) + 1;
          result = this.board.move(this.turn, randomMove);
      }while(result == -1)
      console.log("Insert value: " + randomMove);
  }

  botEasy(){
    let ret;
    let boardCpy;
    let bestMove;
    do{
      boardCpy = this.board.clone();
      bestMove = bot(boardCpy, 2);
      ret = this.board.move(2, bestMove);

      if(this.board.checkEndGame()){
          return this.board.getWinner();
      }
    }while(ret == -1)
  }


  botMedium(){
      let ret;
      let boardCpy;
      let bestMove;
      do{
        boardCpy = this.board.clone();
        bestMove = bot(boardCpy, 4);
        ret = this.board.move(2, bestMove);

        if(this.board.checkEndGame()){
            return this.board.getWinner();
        }
      }while(ret == -1)
  }

  botHard(){
      let ret;
      let boardCpy;
      let bestMove;
      do{
        boardCpy = this.board.clone();
        bestMove = bot(boardCpy, 6);
        ret = this.board.move(2, bestMove);

        if(this.board.checkEndGame()){
            return this.board.getWinner();
        }
      }while(ret == -1)
    
  }

}

function bot(gameBoard, depth){
  let maxPointsDif = 0 - (Number.MAX_VALUE);
  let bestMove;


  let res;
  let pointDif;
  let boardCopy;
  let moveResult;
  for(let c = 1; c < gameBoard.getSize()/2; c++){
      boardCopy = gameBoard.clone();
      moveResult = boardCopy.move(2, c);


      if (moveResult == -2) {
          continue;
      }
      else if(moveResult == -1){
          res = minimax(boardCopy, depth-1, true);
      }
      else{
         
          res = minimax(boardCopy, depth-1, false);
      }
      
  
      pointDif = res.getPits()[gameBoard.getSize()/2].length - res.getPits()[0].length;

      if(pointDif > maxPointsDif){
          maxPointsDif = pointDif
          bestMove = c;
      }
          
      
  }

  return bestMove;
}

function minimax(gameBoard, depth, isMax){
  if(depth == 0 || gameBoard.checkEndGame()){
      return gameBoard;
  }

  let maxPointsDif = 0 - (Number.MAX_VALUE);
  let bestBoard = gameBoard;;
  let pointDif;

  let res;
  let boardCopy;
  let moveResult;


  if(isMax){
      for(let c = 1; c < gameBoard.getSize()/2; c++){
          boardCopy = gameBoard.clone();
          moveResult = boardCopy.move(2, c);


          if (moveResult == -2) 
              continue;
          else if(moveResult == -1)
              res = minimax(boardCopy, depth-1, true);
          else{
              res = minimax(boardCopy, depth-1, false);
          }


          pointDif = res.getPits()[gameBoard.getSize()/2].length - res.getPits()[0].length;

          if(pointDif > maxPointsDif){
              maxPointsDif = pointDif
              bestBoard = res;
          }
          
      }
  }
  else{
      for(let c = gameBoard.getSize()/2+1; c < gameBoard.getSize(); c++){
          boardCopy = gameBoard.clone();
          moveResult = boardCopy.move(1, c);


          if (moveResult == -2) 
              continue;
          else if(moveResult == -1)
              res = minimax(boardCopy, depth-1, false);
          else{
              res = minimax(boardCopy, depth-1, true);
          }


          pointDif = res.getPits()[0].length - res.getPits()[gameBoard.getSize()/2].length;

          if(pointDif > maxPointsDif){
              maxPointsDif = pointDif
              bestBoard = res;
          }
          
      }
  }

  return bestBoard;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

function changeGamemode(){

}


function gamemodeButtonClick(){
  changeGamemode();
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

function giveUp(){
    var x = game.move(-1);
    console.log(x);
    var newMessage = document .createElement("message");
    newMessage.appendChild(document.createTextNode("Player " + x + " gave up!\n"));
    document.getElementById("messages").appendChild(newMessage);
    console.log(document.getElementById("giveup-button").style.display);
    document.getElementById("giveup-button").style.display = "none";
    var pits = document.getElementsByClassName("allPits");

    Array.prototype.forEach.call(pits, function(pit){
        console.log(pit.removeEventListener("click", makeMove(pit.value)));
    });
}

function back(){
    document.getElementById("game-configs").style.display = "flex";
    document.getElementById("game-board").style.display = "none";
    document.getElementById("back-button").style.display = "none";
    reset();
}

function reset(){

    while(document.getElementById("board").firstChild){
        document.getElementById("board").removeChild(document.getElementById("board").firstChild);
    }
    while(document.getElementById("values1").firstChild){
        document.getElementById("values1").removeChild(document.getElementById("values1").firstChild);
    }

    while(document.getElementById("values2").firstChild){
        document.getElementById("values2").removeChild(document.getElementById("values2").firstChild);
    }

    while(document.getElementById("messages").firstChild){
        document.getElementById("messages").removeChild(document.getElementById("messages").firstChild);
    }
}
var buttonStage = 0;
var seedsPerpit = 3;
var pitsPerPlayer = 6;
var gameMode = 2;
var game;
var serverBoard;
var start;




function instructionsRankings(id){
    for(var x of document.getElementsByClassName("instructions-rankings-buttons")){
        if (x.id == id){
          x.style.background = "Gray";
          if ( x.id == 'instructions-button'){
              document.getElementById("rankings").style.display="none";
              document.getElementById("instructions").style.display="block";
          }
          else{
            document.getElementById("instructions").style.display="none";
            document.getElementById("rankings").style.display="block";
          }
        }
        else{
          x.style.background = "White";
        }
      }
}

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

function play(){
    document.getElementById("main-page").style.display="none";
    document.getElementById("game").style.display="block";
}


function updateBoard(){
     //delete all seeds divs
    let board;
    if(buttonStage == 0){
         board = game.getBoard();
    }
    else{
        board = serverBoard;
    }
    var seeds = document.getElementsByClassName("allSeeds");
    var pits = document.getElementsByClassName("allPits");

    Array.prototype.forEach.call(pits, function(pit){
        while(pit.firstChild){
            pit.removeChild(pit.firstChild);
        }
    });

    var values = document.getElementsByClassName("allValues")
    Array.prototype.forEach.call(values, function(val){
        while(val.firstChild){
            val.removeChild(val.firstChild);
        }
    });

    Array.prototype.forEach.call(values, function(val1){
        for(let i = 0; i < board.getSize();i++){
            if(i == val1.value){
                val1.appendChild(document.createTextNode(board.getNumSeeds(i)));
            }
        }
    });

    Array.prototype.forEach.call(pits, function(pit){
        for(let i = 0; i < board.getSize();i++){
            if(i == pit.value){
                for(let j = 0; j < board.getNumSeeds(i);j++){
                    
                    var newSeed = document.createElement("seed");
                    newSeed.classList.add("allSeeds");
                    newSeed.style.top = (board.getPits()[i][j].getY() + '%');
                    newSeed.style.left = (board.getPits()[i][j].getX() + '%');
                    newSeed.style.zIndex = (board.getPits()[i][j].getZ() + '%');
                    newSeed.style.transform = 'rotate('+ board.getPits()[i][j].getRotation()+'deg)';
                    pit.appendChild(newSeed);
                }
            }
        }
    });

    var newMessage = document.createElement("message");
    newMessage.appendChild(document.createTextNode("It's your turn Player " + game.getTurn() + ":\n"));
    document.getElementById("messages").appendChild(newMessage);
}

var serverBoardArray;
var serverBoardSize;

function saveOpponentNick(server_update){
    for(var usrnm in server_update.stores){
        if(usrnm != loginNick)
            opponentNick = usrnm;
    }
}

function updateSeeds(index, numSeeds){
    if(serverBoardArray[index].length > numSeeds){
        serverBoardArray[index].length = numSeeds;
    }
    else if(serverBoardArray[index].length < numSeeds){
        while(serverBoardArray[index].length != numSeeds){
            serverBoardArray[index].push(new Seed());
        }
    }
    
}


function updateServerBoard(server_update){
    serverBoardArray = serverBoard.getPits();
    serverBoardSize = serverBoard.getSize();

    updateSeeds(0, server_update.board.sides[loginNick].store);
    updateSeeds(serverBoardSize/2, server_update.board.sides[opponentNick].store);
    
    let sideSize = server_update.board.sides[loginNick].pits.length;

    let index = serverBoardSize/2+1;
    for(let x = 0; x < sideSize; x++){
        updateSeeds(index+x, server_update.board.sides[loginNick].pits[x]);
       
    }
    
    index = 1;
    for(let x = 0; x < sideSize; x++){
        updateSeeds(index+x, server_update.board.sides[opponentNick].pits[x]);
    }

    serverBoard.setPits(serverBoardArray);

    updateBoard();
}



function makeMove(pit){
    if (buttonStage == 1){
        notify(loginNick, LoginPassword, game_id, pit-1-(game.getSize()/2));
        
    }
    else{
        let ret = game.move(pit);
        console.log(ret);
        if(ret != -1){
            if (ret == 0){
                var newMessage = document .createElement("message");
                newMessage.appendChild(document.createTextNode("It's a tie!"));
                document.getElementById("messages").appendChild(newMessage);
            }
            else
            {
                
                var newMessage = document .createElement("message");
                newMessage.appendChild(document.createTextNode("Player "+ ret + "won" ));
                document.getElementById("messages").appendChild(newMessage);
                document.getElementById("back-button").style.display = "block";
            }
        }
        else {
            var newMessage = document .createElement("message");
                newMessage.appendChild(document.createTextNode("You chose pit: " + pit + "\n"));
                document.getElementById("messages").appendChild(newMessage);
                document.getElementById("messages").scrollTop =  document.getElementById("messages").scrollHeight;
        }
    }
    updateBoard();

    

}

function startGame(){
  document.getElementById("game-configs").style.display = "none";
  buildBoard();
  setGridColumns();
  document.getElementById("game-board").style.display = "grid";
  if(buttonStage == 1){
      serverBoard = new Board(2*pitsPerPlayer+2, 0);
    join(loginNick, LoginPassword, pitsPerPlayer, seedsPerpit);
  }
  else{
      let difficulty = document.getElementById("difficulty");
      gameMode = parseInt(difficulty.value);
  }
//   if(document.getElementById("start").checked){
//       start = 2;
//   }
//   else{
//       start = 1;
//   }
  
  game = new Game(2*pitsPerPlayer+2, seedsPerpit, 1, gameMode);
  updateBoard();
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
    divAtual.appendChild(newPit); 
  }

  for (let i=pitsPerPlayer + 2; i < 2*pitsPerPlayer+2;i++){
    var newPit = document .createElement("pit");
    newPit.classList.add("allPits");
    newPit.value = i;
    newPit.addEventListener("click", function(){makeMove(i)});
    var divAtual = document.getElementById("board");
    divAtual.appendChild(newPit); 
  }

  for (let i=pitsPerPlayer+2; i < 2*pitsPerPlayer+2;i++){
    var newSeedValue = document.createElement("seed-value");
    newSeedValue.classList.add("allValues");
    newSeedValue.value=i;
    var divAtual = document.getElementById("values1");
    divAtual.appendChild(newSeedValue);
  }

  for (let i=pitsPerPlayer; i > 0;i--){
    var newSeedValue = document.createElement("seed-value");
    newSeedValue.classList.add("allValues");
    newSeedValue.value=i;
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
/*localHost*/

var localHost = 'http://127.0.0.1:9075/';

var serverFcup = 'http://twserver.alunos.dcc.fc.up.pt:8008/';

var currentServer = serverFcup;

var loginNick;
var LoginPassword;
var opponentNick;
var game_id;
var error_msg;
var player_ranking;
var server_response;

function addTestEvent(){
    document.getElementById('Butao').addEventListener("click", function(){ranking();});
    document.getElementById('leavebt').addEventListener("click", function(){leave(game_id, loginNick, LoginPassword);});

}

addTestEvent();


/*Register*/ 

const register = (nickname, pass) => {
    sendHttpRequest('POST', currentServer + 'register', {
      nick: nickname,
      password: pass
    })
      .then(responseData => {
        console.log(responseData);
        loginNick = nickname;
        LoginPassword = pass;
        hideForms();
      })
      .catch(err => {
        console.log(err, err.data);
        giveRegisterError();
      });
};

/*join*/

const join = (nickname, pass, pitsPerPlayer, seedsPerpit) => {
  sendHttpRequest('POST', currentServer + 'join', {
    group: 71101,
    nick: nickname,
    password: pass,
    size: pitsPerPlayer,
    initial: seedsPerpit
    
  })
    .then(responseData => {
      console.log(responseData);
      game_id = responseData.game;
      update();
    })
    .catch(err => {
      console.log(err, err.data);
      document.innerHtml = "You need to be logged in first"
    });
};



/*leave*/

const leave = (game_id, nickname, pass) => {
    sendHttpRequest('POST', currentServer + 'leave', {
      game: game_id,
      nick: nickname,
      password: pass
      
    })
      .then(responseData => {
        console.log(responseData);
        
      })
      .catch(err => {
        console.log(err, err.data);
        
      });
  };


/*notify*/

const notify = (nickname, pass, game_id, move_input) => {
    sendHttpRequest('POST', currentServer +'notify', {
        nick: nickname,
        password: pass,
        game: game_id,
        move: move_input
        
      })
      .then(responseData => {
        console.log(responseData);
        
      })
      .catch(err => {
        console.log(err, err.data);
        error = err.data;
      });
  };



/*ranking*/

const ranking = () => {
    sendHttpRequest('POST', currentServer +'ranking', {})
      .then(responseData => {
        console.log(responseData);
        player_ranking = responseData;
      })
      .catch(err => {
        console.log(err, err.data);
        error = err.data;
      });
  };


/*update*/

  const update = () => {
    let game_server = new EventSource(currentServer +'update?nick=' + loginNick +'&game='+ game_id);
    game_server.onmessage = response => {
        let server_update = JSON.parse(response.data)
        console.log(server_update);

        if (server_update.winner != undefined){
            if (server_update.winner == loginNick){
                // changeVictoryForm("victory-title");
                // show('victory-form');
            }
            else{
                // changeVictoryForm("defeat-title");
                // show('victory-form');
            }
            game_server.close();
        }
        else{
            saveOpponentNick(server_update);
            updateServerBoard(server_update);
        }
    
    }
    game_server.onerror = error => {
        error_msg = JSON.parse(error)
        console.log(error_msg);
    }
}

