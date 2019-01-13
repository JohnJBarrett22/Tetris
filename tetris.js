const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const row = 20;
const col = column = 10;
const sq = squareSize = 20;
const vacant = "white";

const scoreElement = document.getElementById("score");
let score = 0;

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

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * pieces.length);
    return new Piece(pieces[r][0], pieces[r][1]);
}

let p = randomPiece();

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
    if(!this.collision(0, 1, this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
        p = randomPiece();
    }
}

Piece.prototype.moveRight = function(){
    if(!this.collision(1, 0, this.activeTetromino)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

Piece.prototype.moveLeft = function(){
    if(!this.collision(-1, 0, this.activeTetromino)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

Piece.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let shift = 0;
    if(this.collision(0, 0, nextPattern)){
        if(this.x > col/2){
            shift = -1;
        }else{
            shift = 1;
        }
    }
    if(!this.collision(shift, 0, nextPattern)){
        this.unDraw();
        this.x += shift;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

Piece.prototype.lock = function(){
    for(r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            if(!this.activeTetromino[r][c]){
                continue;
            }
            if(this.y + r < 0){
                alert("Game Over");
                gameOver = true;
                break;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    for(r = 0; r < row; r++){
        let isRowFull = true;
        for(c = 0; c < col; c++){
            isRowFull = isRowFull && (board[r][c] != vacant);
        }
        if(isRowFull){
            for(y = r; y > 1; y--){
                for(c = 0; c < col; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            for(c = 0; c < col; c++){
                board[0][c] = vacant;
            }
            score +=10;
        }
    }
    drawBoard();
    scoreElement.innerHTML = score;
}

Piece.prototype.collision = function(x, y, piece){
    for(r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            if(!piece[r][c]){
                continue;
            }
            let newX = this.x + c +x;
            let newY = this.y + r +y;

            if(newX < 0 || newX >= col || newY >= row){
                return true;
            }
            if(newY < 0){
                continue;
            }
            if(board[newY][newX] != vacant){
                return true;
            }
        }
    }
    return false;
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
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver){
        requestAnimationFrame(drop);
    }
}

p.draw();
drop();
