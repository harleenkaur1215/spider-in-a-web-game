class Seed{
    x;
    y;
    z;
    rotation;
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
    pits;
    boardSize;

    constructor(size, numSeeds){
        this.boardSize = size;

        for(var s = 1; s < size; s++){
            if(s != (size/2)){
                for(var n = 0; n < numSeeds; n++){
                    pits[s][n] = new Seed();
                }
            }
        }
    }

    checkPoints(player, cavity){
        if(pits[cavity].length != 1){
            return;
        }

        if(player == 1){
            pits[cavity].length = 0;
            
            var numSeeds = pits[cavity-this.boardSize].length + 1;
            pits[cavity-this.boardSize].length = 0;

            for(var c = 0; c < numSeeds; c++){
                pits[0].push(new Seed());
            }
        }
        else{
            pits[cavity].length = 0;
            
            var numSeeds = pits[this.boardSize - cavity].length + 1;
            pits[this.boardSize - cavity].length = 0;

            for(var c = 0; c < numSeeds; c++){
                pits[this.boardSize/2].push(new Seed());
            }
        }

        return;
    }

    move(player, cavity){
        var seeds = this.pits[cavity].length;
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
                checkPoints(player, seedingCav);
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
                checkPoints(player, seedingCav);
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
}

class Game{
    playerOne;
    playerTwo;
    board;
    turn;

    constructor(size, numSeeds, turn){
        this.board = new Board(size, numSeeds);
        this.playerOne = 0;
        this.playerTwo = 0;
        this.turn = turn;
    }

    getTurn(){
        return this.turn;
    }

    move(player, cavity){
        if(this.board.move(player, cavity) == 0){
            if(turn == 1) turn = 2;
            else turn = 1;
        }

        if(this.checkEndGame()){
            return this.board.getWinner();
        }
        
        return 0;
    }

}

var game; //variável global que contem o jogo

function StartGame(boardSize, numSeeds, turn) {
    game = new Game(boardSize, numSeeds, turn);
}