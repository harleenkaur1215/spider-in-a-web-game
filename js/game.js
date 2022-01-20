
class Seed{
    constructor(){
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
        this.z = Math.floor(Math.random() * 10);
        this.rotation = Math.floor(Math.random() * 10);
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

        var seeds = this.pits[cavity].length;

        if(seeds == 0){
            return -2; //wrongmove
        }

        this.pits[cavity].length = 0;

        var seedingCav = cavity;

        var counter = 0;
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

    checkEndGame(player){
        if(player == 1){
            for(var c = this.boardSize/2 + 1; c < this.boardSize; c++){
                if(this.pits[c].length != 0){
                    return false;
                }
            }
            
            var l;
            for(var c = 1; c < this.boardSize/2; c++){
                l = this.pits[c].length;
                this.pits[c].length = 0;
                for(var x = 0; x < l; x++){
                    this.pits[this.boardSize/2].push(new Seed());
                }
            }
        }

        else{
            for(var c = 1; c < this.boardSize/2; c++){
                if(this.pits[c].length != 0){
                    return false;
                }
            }
            
            var l;
            for(var c = this.boardSize/2+1; c < this.boardSize; c++){
                l = this.pits[c].length;
                this.pits[c].length = 0;
                for(var x = 0; x < l; x++){
                    this.pits[0].push(new Seed());
                }
            }
        }

        return true;
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
        var ret = new Board(this.boardSize, 1);

        var pitsCopy = [];
        for(var c = 0; c < this.boardSize; c++){
            pitsCopy[c] = [];
        }

        for(var n = 1; n < this.boardSize; n++){
            if(n != (this.boardSize/2)){
                for(var x = 0; x < this.pits[n].length; x++){
                    pitsCopy[n].push(new Seed());
                }
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

    getTurn(){
        return this.turn;
    }

    getBoard(){
        return this.board;
    }

    surrender(){

    }

    move(cavity){
        if(cavity == -1){ //surrend
            if(this.turn == 1) this.turn = 2;
            else this.turn = 1;
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
            this.show();
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
        var randomMove;
        var result;
        do{
            randomMove = Math.floor(Math.random() * (this.boardSize/2 - 1)) + 1;
            result = this.board.move(this.turn, randomMove);
        }while(result == -1)
        console.log("Insert value: " + randomMove);
    }

    botEasy(){
        var boardCpy = this.board.clone();
        var bestMove = bot(boardCpy, 1);
        this.board.move(this.turn, bestMove);
        console.log("Insert value: " + bestMove);
    }


    botMedium(){
        var boardCpy = this.board.clone();
        var bestMove = bot(boardCpy, 3);
        this.board.move(this.turn, bestMove);
        console.log("Insert value: " + bestMove);
    }

    botHard(){
        var boardCpy = this.board.clone();
        var bestMove = bot(boardCpy, 5);
        this.board.move(this.turn, bestMove);
        console.log("Insert value: " + bestMove);
    }

}

function bot(gameBoard, depth){
    var maxPointsDif = 0 - (Number.MAX_VALUE);
    var bestMove;


    var res;
    var pointDif;
    var boardCopy;
    var moveResult;
    for(var c = 1; c < gameBoard.getSize()/2; c++){
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

    var maxPointsDif = 0 - (Number.MAX_VALUE);
    var bestBoard;
    var pointDif;

    var res;
    var boardCopy;
    var moveResult;
    var pointDif;

    if(isMax){
        for(var c = 1; c < gameBoard.getSize()/2; c++){
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
        for(var c = gameBoard.getSize()/2+1; c < gameBoard.getSize(); c++){
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

//for testing

// function StartGameTesting(boardSize, numSeeds, turn, gameMode) {


//     var game;
//     game = new Game(boardSize, numSeeds, turn, gameMode);

//     var result;
//     do{
//         game.show();
//         // console.log("Player " + game.getTurn() + ": ");
//         const prompt = require("prompt-sync")();
//         input = prompt("Insert value: ");
//         result = game.move(input);

//     }while(result==-1)
//     game.show();
//     console.log("Winner: Player " + result);
// }

// StartGameTesting(14,4,1,4);



var board = Game.getBoard();
for(documents(allValues)){
    label.innerHtml = board[label.value].length;
}

for(documents())
