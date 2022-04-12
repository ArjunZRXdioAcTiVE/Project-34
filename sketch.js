const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var floodedCityImg, building;
var supplyCrate_1, supplyCrate_2, supplyCrate_3; 
var supplyCrateOpened, supplyCrateClosed, isAttached = false;
var helicopter, rope, startedMoving = false; 
var helicopterStill_Img, helicopterMoving_Img;
var strandedPerson1, strandedPerson2, strandedPerson3;
var strandedPerson1_Img, strandedPerson2_Img, strandedPerson3_Img;
var ground;


let supplyCrates = [
  supplyCrate_1, 
  supplyCrate_2, 
  supplyCrate_3
];

let strandedPeople = [
  strandedPerson1,
  strandedPerson2,
  strandedPerson3
];

let strandedPeopleImg = [
  strandedPerson1_Img,
  strandedPerson2_Img,
  strandedPerson3_Img
];

function preload () {
  floodedCityImg = loadImage ("AssetsThisProject/floodedCity.jpg");
  
  supplyCrateOpened = loadImage ("AssetsThisProject/supplyCrateOpened_2.png");
  supplyCrateClosed = loadImage ("AssetsThisProject/supplyCrateClosed_2.png");
  
  helicopterStill_Img = loadImage ("AssetsThisProject/helicopterStill.png");
  helicopterMoving_Img = loadImage ("AssetsThisProject/helicopterMoving.png");

  strandedPeopleImg[0] = loadImage ("AssetsThisProject/strandedPeople/strandedPerson_1.png");
  strandedPeopleImg[1] = loadImage ("AssetsThisProject/strandedPeople/strandedPerson_2.png");
  strandedPeopleImg[2] = loadImage ("AssetsThisProject/strandedPeople/strandedPerson_3.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  // Create Ground
  ground = Bodies.rectangle (width/2, height - 20, width, 40, {isStatic : true});
  World.add (world, ground);

  // Create Helicopter
  helicopter = createSprite (width/2 - 430, 170);
  helicopter.addImage ("still", helicopterStill_Img);
  helicopter.addImage ("moving", helicopterMoving_Img);
  helicopter.scale = 0.13;

  // Create Supply Crates
  var x = 230;
  for (i = 0; i < supplyCrates.length; i++) {
    supplyCrates[i] = new SupplyCrate (
      width/2 - x,
      height/2 - 72,
      50, 
      50
    );
    x += 30;
  }

  // Create sprites
  var posX = width/2 + 220;
  var posY = height/2 - 65;
  for (var i = 0; i < strandedPeople.length; i++) {
   
   if (i == 1) {
     posY = height/2 - 94
    } else if (i == 2) {
      posY = height/2 - 75;
    }

   strandedPeople[i] = createSprite (posX, posY);
   strandedPeople[i].addImage (strandedPeopleImg[i]);
   strandedPeople[i].scale = 0.067;

   posX += 100;
  }
}


function draw() {
  imageMode (CENTER);
  image (floodedCityImg, width/2, height/2, width, height);

  for (i = 0; i < supplyCrates.length; i++) {
    supplyCrates[i].display ();
  }

  if (keyDown (UP_ARROW) && helicopter.position.y > 75) {
    helicopter.position.y -= 10;
    helicopter.changeImage ("moving");
    startedMoving = true;
  } else if (
    keyDown (LEFT_ARROW) && helicopter.position.x > 150 && startedMoving) {
    helicopter.position.x -= 10; 
  } else if  (keyDown (RIGHT_ARROW) &&  helicopter.position.x < width - 150 && startedMoving) {
    helicopter.position.x += 10;
  } else if (keyDown (DOWN_ARROW) && helicopter.position.y < height - 150 && startedMoving) {
    helicopter.position.y += 10;
  } else if (keyDown ("space") && startedMoving) {
    var posX = helicopter.position.x;
    var posY = helicopter.position.y;
    
    var dist = supplyCrates[0].body.position.y - posY;

    if (helicopter.position.y < supplyCrates[0].body.position.y) {
      rope = new Rope (posX, posY, dist);
    }
  }

  if (rope) {
    // if (rope.body !== null) {
      rope.display ();
      if (!isAttached) {
        for (i = 0; i<supplyCrates.length; i++) {
          if (supplyCrates[i].body !== null) {
            rope.attachCrate (i);
          }
        }
      } 
    // }
  }

  Engine.update(engine);
  drawSprites ();  
}

// Chance vs. skill
