
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
        var seeds = this.pits[cavity].length;

        if(seeds == 0){
            return -1;
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
                    this.pits[this.boardSize/2].push(new Seed());
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
            return 3;
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
}

class Game{

    constructor(size, numSeeds, turn, gameMode){
        this.board = new Board(size, numSeeds);
        this.playerOne = 0;
        this.playerTwo = 0;
        this.turn = turn;
    }

    getTurn(){
        return this.turn;
    }

    move(cavity){
        if(this.board.move(this.turn, cavity) == 0){
            if(this.turn == 1) this.turn = 2;
            else this.turn = 1;
        }

        if(this.board.checkEndGame()){
            return this.board.getWinner();
        }
        
        return 0;
    }

    show(){
        console.log("Turn: Player " + this.turn);
        this.board.showBoard();
    }

    botEasy(){

    }

    botMedium(){

    }

    botHard(){

    }

}

// var game;

function StartGame(boardSize, numSeeds, turn) {
    var game;
    // game = new Game(boardSize, numSeeds, turn);
    game = new Game(boardSize, numSeeds, turn);
    var result;
    do{
        game.show();
        // console.log("Player " + game.getTurn() + ": ");
        const prompt = require("prompt-sync")();
        input = prompt("Insert value: ");
        result = game.move(input);

    }while(result==0)
    game.show();
    console.log("Winner: Player " + result);
}

StartGame(1,1,1);


