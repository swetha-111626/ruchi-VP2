var dog,sitdog,jumpdog, database, foodS, foodStock,foodimg,food;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()

{
sitdog=loadImage("sit.png");
jumpdog=loadImage("drink.png");
foodimg=loadImage("images.png");
}

function setup() {
  createCanvas(700, 700);

  database=firebase.database();
  foodStock=database.ref('Food');
   foodStock.on("value",readStock);

dog=createSprite(350,450);
dog.addImage(jumpdog);
dog.scale=0.3;

food=createSprite(200,520);
food.addImage(foodimg);

feed=createButton("Feed");
feed.position(450,150);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(370,150);
addFood.mousePressed(addFoods);

foodObj=new Food();

} 
function draw(){
background(46, 139, 87);
foodObj.display();
drawSprites();
textSize(30);
fill("white");
text("Food Packs: "+foodS,20,40);
textSize(18);
text("Note:Press Up Arrow Key to feed Fudge(dog) the milk",20,70);

fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  
  }
function writeStock(x){
  if(x<=0){
    x=0
  }else{
  x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
};

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(sitdog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
