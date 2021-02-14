var dog,sadDog,happyDog;
var feed,addFood;
var foodObj;
var foodStock,foodS;
var database;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food();
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);

  foodObj.display();

  drawSprites();
}



//function to read food Stock
  function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time

function feedDog(){

  dog.addImage( happyDog);

  if (foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
} 
else {
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)

}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
})
}
//function to add food in stock
function addFoods(){
  foodS++
  dataBase.ref('/').update({
    Food:foodS
})
}
