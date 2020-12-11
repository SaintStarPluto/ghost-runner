var tower, towerImage;

var door, doorImage, doorsGroup;

var climber, climberImage, climbersGroup;

var ghost, ghostImage;

var edge;

var invisibleBlock, invisibleBlockGroup;

var gameState = "play";



function preload(){
  
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
}


function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  
  climbersGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;
  
  edge = createEdgeSprites();
  
  invisibleBlockGroup = new Group();
  
}

function draw(){
  
  background(0);
  
  
  if(gameState==="play"){
    
  
  if(tower.y>400){
    
    tower.y = 300;
    
  }
  
  
  if(keyDown("right_arrow")){
    
    ghost.x = ghost.x + 3;
    
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x = ghost.x + -3;
    
  }  
  
  if(keyDown("space")){
    
    ghost.velocityY = -7;
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  ghost.collide(edge[3]);
  
 
  if(climbersGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    ghost.velocityX = 0;    
    
  }
  
  spawnDoors();
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    
    ghost.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    gameState = "end";
    
  }
   
  }
  
 drawSprites(); 
  
  
  if(gameState==="end"){
    
    fill("yellow");   
    textSize(30);
    text("Game Over", 230,250);
    
    tower.velocityY = 0;
    
  }
}


function spawnDoors(){
  
 if(frameCount% 240 === 0){
   
   door = createSprite(200,-50);
   door.addImage("door", doorImage);
   door.x = Math.round(random(140,400));
   door.velocityY = 1;
   door.lifetime = 800;
   doorsGroup.add(door);
   
   climber = createSprite(200,10);
   climber.addImage("climber", climberImage);
   climber.x = door.x;
   climber.velocityY = 1;
   climber.lifetime = 800;
   climbersGroup.add(climber);
   
   ghost.depth = door.depth;
   ghost.depth = ghost.depth + 1;
   
   invisibleBlock = createSprite(200,15);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   invisibleBlock.x = climber.x;
   invisibleBlock.velocityY = 1;
   invisibleBlock.debug = true;
   invisibleBlockGroup.add(invisibleBlock);
   
   
 } 
  
  
  
  
}




























