//Create variables here
var dog,happyDog,database,foodS,foodStock,lastFed,fedTime,foodObj;
var feed,addFood,dogimg;

var gameState;
var bedroomimg, gardenimg, washroomimg;
var readState;
function preload(){
  //load images here
  dogimg=loadImage("images/dogImg.png")
  dogimg1=loadImage("images/dogImg1.png")
  dogimg2=loadImage("happydog.png")

  bedroomimg=loadImage("Bed Room.png")
  gardenimg=loadImage("Garden.png")
  washroomimg=loadImage("Wash Room.png")
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,250,50,50)
  dog.addImage("dog",dogimg)
  dog.scale=0.5;

  gameState=0;

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  foodObj=new Food(200,200)
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)
  
  foodObj.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  if(gameState!="Hungry"){
    feed.hide()
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show()
    addFood.show()
    dog.addImage(dogimg)
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry")
    foodObj.display();
  }

  drawSprites();
  
  //add styles here
  //fill("white")
  //text("Food Remaining:"+ foodS,150,50)

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}



function feedDog(){
  dog.addImage(dogimg2)
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}