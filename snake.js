var blockSize=25;
var rows=20;
var columns=20;
var board;
var context;

//snake
var snakeX=blockSize * 5;
var snakeY=blockSize * 5;
//speed
var velocityX=0;
var velocityY=0;
//bodythegetbig
var snakeBody=[];
//gameover
var gameOver=false;

//food
var foodX;
var foodY;

window.onload=function(){
    board=document.getElementById("board");
    board.height=rows * blockSize;
    board.width=columns * blockSize;
    context=board.getContext("2d");
placeFood();
document.addEventListener("keyup",changeDirection);
    setInterval(update,1000/10);

} 

function changeDirection(e){
if(e.code=='ArrowUp' && velocityY !=1){
    velocityX=0;
    velocityY=-1;
}
else if(e.code=='ArrowDown' && velocityY !=-1){
    velocityX=0;
    velocityY=1;
}
else if(e.code=='ArrowLeft' && velocityX !=1){
    velocityX=-1;
    velocityY=0;
}
if(e.code=='ArrowRight' && velocityX !=-1){
    velocityX=1;
    velocityY=0;
}

}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="pink";
    context.fillRect(foodX,foodY,blockSize,blockSize);
    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY])
        placeFood();
    }
for(let i=snakeBody.length-1;i>0;i--)
{
    snakeBody[i]=snakeBody[i-1];
}
if(snakeBody.length){
    snakeBody[0]=[snakeX,snakeY]
}
    context.fillStyle="lime";
    snakeX +=velocityX * blockSize;
    snakeY +=velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
for(let i=0;i<snakeBody.length;i++){
    context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
}
   if(snakeX <0 || snakeX>columns*blockSize-1 || snakeY < 0 || snakeY > rows*blockSize-1){
    gameOver=true;
    alert("Game Over");
   }

   for(let i=0;i<snakeBody.length;i++){
    if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
        gameOver=true;
        alert("Game Over")
    }
   }
}
function placeFood(){
    foodX=Math.floor(Math.random()*columns)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;
}