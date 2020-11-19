var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var gamestate="play";

function preload(){ 
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png", "sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(80,350,40,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  monkey.debug=false;
  monkey.setCollider("rectangle",0,0,500,570,0);
  
  ground = createSprite(190,370,900,60);
  ground.velocityX=-4;
  edges = createEdgeSprites();
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
   background("purple")
  if(gamestate==="play"){
     monkey.collide(ground);
  ground.shapeColor="green";
 
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")){
     monkey.velocityY = -8;
    }
  monkey.velocityY = monkey.velocityY +1;
  
    food();
    stones();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityY=0;
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    obstacleGroup.setLifetime=-1;
    FoodGroup.setLifetime=-1;
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    gamestate="end";
  }
  
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/getFrameRate()) 
  text("Survival Time: "+ survivalTime, 130,30);
  
drawSprites();  
  }else if(gamestate==="end"){
    textSize(40);
    fill("black");
    text("Game Over",130,200);
  }
 
}

function food(){
  if (frameCount % 80===0){
  banana=createSprite(370,200,10,30);
  banana.velocityX=-4
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifeime=50;
  banana.y=Math.round(random(120,200));
  FoodGroup.add(banana);
  }
}

function stones(){
  if (frameCount % 200===0){
    obstacle = createSprite(390,330,40,10);
    obstacle.velocityX=-4;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
}





