const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const row = 20;
const col = column = 10;
const sq = squareSize = 20;
const vacant = "white";

function draw(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(0*sq,0*sq,sq,sq);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0*sq,0*sq,sq,sq);
}

let board = [];
for(r = 0; r < row; r++){
    board[r] = [];
    for(c = 0; c < col; c++){
        board[r][c] = vacant;
    }
}