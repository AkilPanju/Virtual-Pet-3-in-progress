var dog, sadDog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var FeedPetButton, AddFoodButton;
var foodObj;
var bedrmImage, gardenImage, wshrmImage;
var changeGameState, readGameState, gameState;
var currenttime;

function preload() {
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milkImage = loadImage("Milk.png");
  bedrmImage = loadImage("virtual pet images/Bed Room.png");
  gardenImage = loadImage("virtual pet images/Garden.png");
  wshrmImage = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  //creating the database
  database = firebase.database();

  //creating the canvas
  createCanvas(1000, 1000);

  //creating the dog sprite
  dog = createSprite(100, 100, 50, 50);

  //making the dog look like a dog
  dog.addImage(dogImg);
  dog.scale = 0.3;

  readGameState = database.ref('gamestate');
  readGameState.on("value", function (data) {
    gameState = data.val();
  });

  //storing the value under Food in the database in foodStock
  foodStock = database.ref("Food");
  //if the value of Food in the database changes then function readStock will happen
  foodStock.on("value", readStock);

  //creating a new food class object
  foodObj = new Food();

  //to make the feed pet button
  FeedPetButton = createButton("Feed The Pet");
  FeedPetButton.position(700, 95);
  FeedPetButton.mousePressed(FeedDog);

  //to make the add food button
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

}


function draw() {

  //setting the background colour
  background(46, 139, 87)

  //storing the feed time from the database in "fedTime"
  fedTime = database.ref("FeedTime");
  //if the value of feed time changes in the database then it will store that new value in lastFed
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  //displaying foodObj  
  foodObj.display();

  drawSprites();

  //setting the time format
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed % 12 + "PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + "AM,350,30");
  }

  if (gameState !== "hungry") {
    FeedPetButton.hide();
    addFood.hide();
    dog.remove();
  } else {
    FeedPetButton.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  currentTime=hour();
  if (currenttime == (lastFed + 1)) {
    foodObj.garden();
    update("Playing");
  }
  else if (currenttime == lastFed + 2) {
    foodObj.washroom();
    update("Bathing");
  } else if (currentTime == (lastFed + 2)) {
    update("Sleeping");
    foodObj.bedroom();
  } else {
    update("Hungry")
    foodObj.display();
  }

}


//storing data.val in foodS
function readStock(data) {
  foodS = data.val();
  console.log(foodS);

}

//
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }


  database.ref('/').update({
    Food: x
  })
}



function FeedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodS - 1);
  //console.log(foodObj.getFoodStock());
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoodS() {
  foodS = foodS + 1;
  console.log(foodS);
  foodObj.updateFoodStock(foodS);
  database.ref('/').update({
    Food: foodS
  })
}

function update(gameState) {
  database.ref('/').update({
    gameState: gameState
  });
}