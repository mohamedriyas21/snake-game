 const gameboard=document.getElementById("gameboard")
 const context=gameboard.getContext("2d")
 const scoreText = document.getElementById("scoreVal")

 const width = gameboard.width
 const height = gameboard.height
 const unit = 25

 let foodX;
 let foodY;
 let xVel = 25;
 let yVel = 0;
 let score = 0;
 let active=true;
 let started = false;


 let snake = [
   {x:unit*3,y:0},
   {x:unit*2,y:0},
   {x:unit,y:0},
   {x:0,y:0}
]
 window.addEventListener('keydown',keyPress);

 startGame()

 function startGame(){
    context.fillstyle="#212121"
    context.fillRect(0,0,width,height)
    createFood()
    displayFood()
    drawSnake()
    nextTick()
 }

 function clearBoard(){
   context.fillStyle = '#212121';
   //fillRect(xStart,yStart,width,height)
   context.fillRect(0,0,width,height);
}


 function createFood(){
   foodX = Math.floor(Math.random()*width/unit)*unit;
   foodY = Math.floor(Math.random()*height/unit)*unit;

 }
 function displayFood(){
   context.fillStyle = "red"
   context.fillRect(foodX,foodY,unit,unit)
}

function drawSnake(){
   context.fillStyle = "aqua"
   context.strokeStyle = "#212121"
   snake.forEach((snakePart) => {
       context.fillRect(snakePart.x,snakePart.y,unit,unit)
       context.strokeRect(snakePart.x,snakePart.y,unit,unit)
   })
}

function moveSnake(){
   const head = {x:snake[0].x+xVel,
      y:snake[0].y+yVel}
snake.unshift(head)
if(snake[0].x==foodX && snake[0].y==foodY){
   score += 1
   scoreText.textContent = score
   createFood()
}
 else
  snake.pop()
}

function nextTick(){
   if(active){
      setTimeout(() => {
       clearBoard();
       displayFood();
       moveSnake();
       drawSnake();
       checkGameOver();
       nextTick();
      }, 200);
   }
   else if(!active){
      clearBoard();
      context.font = "bold 50px serif";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Game Over!!",width/2,height/2)
  }
}


function keyPress(event){
   if(!started){
      started = true;
      nextTick();
  }
   active=true;
   const left = 37
   const up = 38
   const right = 39
   const down = 40

   switch(true){
      case(event.keyCode==left && xVel!=unit):
      xVel =-unit;
      yVel = 0;
      break
      case(event.keyCode==right && xVel!=-unit):
      xVel =unit;
      yVel = 0;
      break
      case(event.keyCode==up  && yVel!=unit):
      xVel =0
      yVel =-unit
      break
      case(event.keyCode==down  && yVel!=-unit):
      xVel=0
      yVel=unit
      break
   }

}

function checkGameOver(){
   switch(true){
      case(snake[0].x<0):
      case(snake[0].x>=width):
      case(snake[0].y<0):
      case(snake[0].y>=height):
       active=false;
       break;
  }

}

