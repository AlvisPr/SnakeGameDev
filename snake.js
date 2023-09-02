const canvas= document.getElementById('game'); 
const c = canvas.getContext('2d'); 

//Creating a game loop 

/*
There are three ways to set this up

1. requestAnimationFrame
2. setInterval xtimes per second 
3. setTimeOut / Gets called once but we can call it again
It defines how often our screen gets updated. 

*/

class SnakePart{
   constructor(x,y){
      this.x=x; 
      this.y=y; 
   }
}



//game loop 
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2; 


let xVelocity=0;
let yVelocity=0;  


let appleX= 5; 
let appleY= 5; 

let score = 0; 

function drawGame() {
   let result = isGameOver();
   if (result){
      return; 
   }

  clearScreen(); 
  changeSnakePosition();
  checkAppleCollision(); 
  drawApple();
  drawSnake(); 
  
  drawScore(); 
  
  setTimeout(drawGame, 1000 / speed);
}




function isGameOver() {
   let gameOver = false;

   //walls
   if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
      gameOver = true;
   }

if(gameOver) {
   c.fillStyle="white"; 
   c.font = "50px Verdana"; 
   c.fillText("Game Over", canvas. width / 6.5, canvas.height / 2)
}

return gameOver; 
}





function drawScore() {
   c.fillStyle="white"; 
   c.font = "20px Verdana"
   c.fillText("Score" + score, canvas.width - 100, 30)
}



//Black Screen Of Snake Game
function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

//Snake Character 
function drawSnake() {
  c.fillStyle = "orange";
  c.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize); // Multiply by tileSize to get pixel coordinates

  c.fillStyle = 'green'; 
  for(var i = 0 ; i<snakeParts.length; i++) {
   const part = snakeParts[i]; 
   c.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize); 
  }


  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
     snakeParts.shift(); 
  }
  

}




//ChangingPositionOfSnake
function changeSnakePosition() {
   headX = headX + xVelocity; 
   headY = headY + yVelocity; 
}

// Drawing Apple Snake Can Eat 
function drawApple() {
   c.fillStyle= "red"; 
   c.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize); 
}

//Verifying if we collide with Apple
function checkAppleCollision () {
   if (appleX == headX && appleY == headY){
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
      tailLength++; 
      score++;
   }   
}


//Key Events With Restrictions
document.body.addEventListener('keydown', keyDown );
function keyDown(event) {
// up 
   if(event.keyCode == 38) {
      if(yVelocity == 1){
         return; 
      }
   yVelocity= -1; 
   xVelocity= 0; 
   }

  // down
   if(event.keyCode == 40) {
      if(yVelocity== -1) {
         return; 
      }
      yVelocity= 1; 
      xVelocity= 0; 
      }
   
  // left
   if(event.keyCode == 37) {
     if(xVelocity == 1){
       return; 
     }
         yVelocity= 0; 
         xVelocity= -1; 
         }


  // right 
   if(event.keyCode == 39) {
      if(xVelocity == -1) {
         return; 
      }
            yVelocity= 0; 
            xVelocity= 1; 
            }
}



drawGame();

//The end 
console.log("Hello World"); 