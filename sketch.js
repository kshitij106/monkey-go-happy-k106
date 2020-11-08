//making of monkey 
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;

//making of game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{  
//loading of images and Animation
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
//making of canvas
createCanvas(400,400);
  
//Groups
FoodGroup = new Group();
obstacleGroup = new Group();
TimeGroup = new Group();
  
//Making of monkey
monkey = createSprite(50, 250, 10, 10);
monkey.addAnimation("monkey",monkey_running);
monkey.scale = 0.1;
  
//making of ground
ground = createSprite(70, 350, 800, 10);
ground.velocityX = -4;
ground.x=ground.width/2;
  
//score and survialtime
score = 0;
survialTime = 0; 
}

//Draw
function draw() 
{
//Background
background (180);
  
//displaying survialtime
stroke("black");
fill("black");
textSize(20);
text("Survial Time:"+  survialTime, 100, 50);
  
//displaying score
stroke("black");
fill("black");
textSize(20);
text("Score:"+  score, 300, 100);
  
//PLAY
if(gameState === PLAY){
    monkey.changeAnimation("running", monkey_running);
    monkey.collide(ground);
    survialTime = Math.ceil(frameCount/frameRate());
        
if (ground.x < 0){
ground.x = ground.width/2;
}
    
    //jump when the space key is pressed
if(keyDown("space")) {
        monkey.velocityY = -12;
}    
    
if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
}
   
  //making of gravity so monkey can walk on ground
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);

  //Adding Functions
  food();
  obstacles();
    
if(obstacleGroup.isTouching(monkey))
{   
gameState = END; 
    }
  }
  //END
if (gameState === END) 
   {
    ground.velocityX = 0;
    monkey.velocityY = 0;
     
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    
    survialTime.visible = false;
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("red");
       textSize(30);
     text("monkey is caught ", 100, 240);
   }
 
  //draw Sprites
  drawSprites();
}

//Banana function
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}