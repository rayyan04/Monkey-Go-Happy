//Creating Global variables
var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime
var score
function preload(){
  //loading images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(600, 400);
  //giving animation and scale
  monkey1= createSprite(50,360);
  monkey1.addAnimation("running", monkey_running);
  monkey1.scale = 0.1;
  
  ground = createSprite(400,360,1500,10);
  ground.x = ground.width/2;
  ground.velocityX=-4
  //create Obstacle and Cloud Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  //setting collider
  monkey1.setCollider("rectangle",0,0,monkey1.width,monkey1.height);
 
  //survival time
  survivalTime = 0;  

}

function draw() {
  //background color
background("white")
 //increasing survival time
stroke("black")
textSize(20)
fill("black")
survivalTime= Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 240,50 )

  
    //scoring
score = score + Math.round(getFrameRate()/100);
    
     //infinite ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //monkey jumping when space key is pressed
    //jump when the space key is pressed
    if(keyDown("space")&& monkey1.y >= 100) {
        monkey1.velocityY = -12;
      
    }
    
    //add gravity
    monkey1.velocityY = monkey1.velocityY + 0.8
  
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    
   //stop trex from falling down
  monkey1.collide(ground);
  
  drawSprites();
  obstacles()
  food()
}

function obstacles(){
  //functions for the obstacles to appear
if (frameCount % 300 === 0){
  var obstacle = createSprite(700,360);   
  
obstacle.velocityX = -8 
obstacle.addImage(obstacleImage);
//assign scale and lifetime to the obstacle           
obstacle.scale = 0.2;
obstacle.setCollider("rectangle",0,0,width-20,height-20)
obstacle.collide(ground)
  
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}


function food() {
  //Functions for food to appear
  if (frameCount % 80 === 0) {
    var banana = createSprite(700,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
//add each food to the group
    FoodGroup.add(banana);
  }
}