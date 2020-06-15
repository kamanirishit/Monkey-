//Global Variables
var Gorilla,monkey,jungleimage,jungle,stonegroup,gameState,invisbleground,stone, banana, bananan,score,restart,game,g


function preload(){
  Gorilla=loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png", "Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png","Monkey10.png");
 jungleimage=loadImage("WhatsApp Image 2020-06-11 at 12.55.09 PM.jpeg");
  Stone=loadImage("stone.png");
  ban=loadImage( "Banana.png");
  Game=loadImage("gameOver.png");
  Restart=loadImage("restart.png");
  g=loadImage("Monkey1.png");
}


function setup() {
  createCanvas(600,300);
  score=0;
  jungle=createSprite(100,10);
  jungle.addImage(jungleimage);
  jungle.scale=1.2;
  console.log(jungle.x);
  monkey=createSprite(70,230,10,11);
  monkey.addAnimation("t",Gorilla);
  monkey.scale=0.2;
  monkey.setCollider("circle",0,0,170);
  invisbleground=createSprite(70,260,90,3);
  invisbleground.visible=false;
  game=createSprite(320,140,10,10);
  game.addImage(Game);
  game.scale=0.9;
  restart=createSprite(320,190);
  restart.addImage(Restart);
 stonegroup=new Group();
   bananan=new Group();
gameState="play";
  
}


function draw(){
 background("white"); 
  
  if(jungle.x<20){
   jungle.x=300;
 }
  console.log(gameState);
  switch(score){
  case 100:monkey.scale=0.25;
    break;
    case 200:monkey.scale=0.3;
    break;
  default:break;
}
  if(gameState==="play"){
    score=score+Math.round(frameRate()/60);
     jungle.velocityX=-(9+score/50);
    restart.visible=false;
    game.visible=false;
  }
  if(frameCount%80===0&&gameState==="play"){
    stone=createSprite(600,230);
    stone.addImage(Stone);
    stone.scale=0.2;
    stone.velocityX=-(9+score/50);
   stonegroup.add(stone);
  }
  if(frameCount%80===30&&gameState==="play"){
    rand=random(100,130);
    banana=createSprite(600,rand);
    banana.addImage(ban);
     banana.scale=0.1;
     banana.velocityX=-(9+score/50);
    bananan.add( banana);
  }
  /*switch(gameState){
    case "play":monkey.addAnimation("t",Gorilla);
      break;
      case "end":monkey.addImage(g);
      break;
      default:break;
  }*/
  //console.log(frameCount);
  if(keyDown("space")&&gameState==="play"&&monkey.y>=200.5){
    monkey.velocityY=-13.7;
  }
  monkey.velocityY=monkey.velocityY+0.6;
  monkey.collide(invisbleground);
  if(monkey.collide(stonegroup)){
    stone.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    jungle.velocityX=0;
   gameState="end";
    banana.velocityX=0;
    //monkey.addImage(stop);
  }
  if(bananan.collide(monkey)){
    banana.destroy();
    score=score+10;
  }
  if(gameState==="end"){
    restart.visible=true;
    game.visible=true;
  }
  if(mousePressedOver(restart)&&gameState==="end"){
    restarts();
  }
  drawSprites();
  textSize(40);
  fill("yellow"); 
  text(score,500,50);
}
function restarts(){
  gameState="play";
 stone.destroy();
  banana.destroy();
  score=0;
  monkey.scale=0.2;
  monkey.x=70;
}