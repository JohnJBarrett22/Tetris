const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const row = 20;
const col = column = 10;
const sq = squareSize = 20;
const vacant = "white";

function drawSquare(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x*sq,y*sq,sq,sq);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*sq,y*sq,sq,sq);
}

let board = [];
for(r = 0; r < row; r++){
    board[r] = [];
    for(c = 0; c < col; c++){
        board[r][c] = vacant;
    }
}

function drawBoard(){
    for(r = 0; r < row; r++){
        for(c = 0; c < col; c++){
            drawSquare(c,r,board[r][c])
        }
    }
}

drawBoard();

function piece(tetromino, color){

}