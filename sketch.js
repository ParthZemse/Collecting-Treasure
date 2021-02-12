var sword,swordImg;
var PLAY=1;
var END=0;
var gameState=1;
var alien1,alien1Img,alien2,alien2Img;
var friut1,fruit1Img;
var fruit2,fruit2Img;
var fruit3,fruit3Img;
var fruit4,fruit4Img;
var fruit,fruitImg;
var fruitGroup;
var alienGroup;
var score=0
var gameOver,gameOverImg,gameOverSound;


function preload(){
  swordImg=loadImage("sword.png")
  alien1Img=loadImage("alien1.png")
  alien2Img=loadImage("alien2.png")
  fruit1Img=loadImage("fruit1.png")
  fruit2Img=loadImage("fruit2.png")
  fruit3Img=loadImage("fruit3.png")
  fruit4Img=loadImage("fruit4.png")
  gameOverImg=loadImage("gameover.png")
  gameOverSound=loadSound("gameover.mp3")
}
function setup(){
createCanvas(600,600);
  sword=createSprite(300,300) 
  sword.addImage("sword",swordImg)
  sword.scale=0.6
  //fruit.setColliderRadius()
  
  fruitGroup=new Group();
  alienGroup=new Group();
}


function draw(){
background("lightblue")
  
  text("SCORE=",200,20)
  text(score,253,20)
  
  
  if(gameState===PLAY){
    
    if(fruitGroup.isTouching(sword)){
       
       fruitGroup.destroyEach()

      score=score+1
    
       }
    
    if(alienGroup.isTouching(sword)){
      gameState=END
      alienGroup.velocityX=0;
      fruitGroup.velocityX=0;
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      sword.addImage(gameOverImg)
      gameOverSound.play();
       }
    spawnEnemy()
    spawnFruits();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    
     }
  if(gameState===END){
    reset()
     }
  
  drawSprites();
}

function spawnFruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2;
    //fruit.debug=true
    r=Math.round(random(1,4))
    if(r==1){
       fruit.addImage(fruit1Img)
       }
    else if(r==2){
      fruit.addImage(fruit2Img)
      }
    else if(r==3){
      fruit.addImage(fruit3Img)
    }
    else {
      fruit.addImage(fruit4Img)}
   
  fruit.y=Math.round(random(50,340))
    fruit.velocityX=-7;
    fruit.setLifeTime=100;
    fruitGroup.add(fruit)
  }
}

function spawnEnemy(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addAnimation("moving",alien1Img)
    alien.y=Math.round(random(100,300))
    alien.velocityX=-8;
    alien.setLifetime=50;
    
    alienGroup.add(alien);
    
     
     }
}
function reset(){
  
  gameOver=createSprite(400,200,20,20)
  gameOver.scale=1.5
  gameOver.addImage(gameOverImg)
  gameOver.x=200;
  gameOver.y=200;
 alienGroup.destroyEach()
  sword.destroy()
}
