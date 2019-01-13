const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const row = 20;
const col = column = 10;
const sq = squareSize = 20;
const vacant = "white";

function drawSquare(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x*sq, y*sq, sq, sq);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*sq, y*sq, sq, sq);
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
            drawSquare(c, r, board[r][c])
        }
    }
}

drawBoard();

const pieces = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

let p = new Piece(pieces[0][0], pieces[0][1]);

function Piece(tetromino, color){
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    this.x = 3;
    this.y = 0;
}

Piece.prototype.fill = function(color){
    for(r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            if(this.activeTetromino[r][c]){
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

Piece.prototype.draw = function(){
    this.fill(this.color);
}

Piece.prototype.unDraw = function(){
    this.fill(vacant);
}

Piece.prototype.moveDown = function(){
    this.unDraw();
    this.y++;
    this.draw();
}

Piece.prototype.moveRight = function(){
    this.unDraw();
    this.x++;
    this.draw();
}

Piece.prototype.moveLeft = function(){
    this.unDraw();
    this.x--;
    this.draw();
}

Piece.prototype.rotate = function(){
    this.unDraw();
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
}

document.addEventListener("keydown", control);

function control(event){
    if(event.keyCode == 37){
        p.moveLeft();
    }else if(event.keyCode == 38){
        p.rotate();
    }else if(event.keyCode == 39){
        p.moveRight();
    }else if(event.keyCode == 40){
        p.moveDown()
    }
}

let dropStart = Date.now();
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
}

p.draw();
drop();
