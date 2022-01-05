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
    cavities;
    boardSize;

    constructor(size, numSeeds){
        this.boardSize = size;

        for(var s = 1; s < size; s++){
            if(s != (1+size/2)){
                for(var n = 0; n < numSeeds; n++){
                    cavities[s][n] = new Seed();
                }
            }
        }
    }

    checkPoints(){

    }

    move(player, cavity){
        var seeds = this.cavities[cavity].length;
        this.cavities[cavity].length = 0;

        var seedingCav = cavity;

        var counter = 0;
        while(counter < seeds){
            
            seedingCav++;
            if(seedingCav == this.boardSize){
                seedingCav = 0;
            }

            if((player == 1 && seedingCav == (1+this.boardSize/2)) || (player == 2 && seedingCav == 0)){
                continue;
            }
            else{
                counter++;
                this.cavities[seedingCav].push(new Seed());
            }
        }

        if(player == 1){
            if(seedingCav == 0)
                return -1;
            else if(seedingCav < (1+this.boardSize/2)){
                //pontos

            }
            else{
                return 0;
            }
        }
        else{
            if (seedingCav == (1+this.boardSize/2))
                return -1;
            else if(seedingCav > (1+this.boardSize/2)){
                //pontos
            }
            else{
                return 0;
            }
            
        }
        

    }


}

class Game{
    playerOne;
    playerTwo;
    board;

    constructor(size, numSeeds){
        this.board = new Board(size, numSeeds);
        this.playerOne = 0;
        this.playerTwo = 0;
    }

    move(player, cavity){
        if(player == 1){
            this.playerOne += this.board.move(cavity);
        }
        else{
            this.playerTwo += this.board.move(cavity);
        }
    }

}