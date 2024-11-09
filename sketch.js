const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platfrom;
var constrainedLog; 
var slingshot;

var gameState = "onSling";
var bg = "sprites/bg.png";
var score = 0;

/*var arr1 = [1,2,3,4,5] 
//console.log(arr1)

var arr2 = ["Cereal",3,true] 
//console.log(arr2)

var arr3 = [[1,2],[43,23],[48,90]]
console.log(arr3);
//arr3.push("Cereal");
arr3.pop();
console.log(arr3);*/

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImg();
}

function setup(){
    Canvas = createCanvas(1400,400);
    Canvas.center()
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,10000,20)
    ground1 = new Ground (-20,10,20,1000)
    techo = new Ground (-20,-100,10000,20)
    platfrom = new Ground(150,305,300,170)

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    pig1 = new Pig(810, 350);
    pig2 = new Pig(810, 220);

    log1 = new Log(810,260,300, PI/2);
    log2 = new Log(810,180,300, PI/2);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);

    bird = new Bird(400,50);
    slingshot = new Slingshot(bird.body,{x:200, y:50});
}  



function draw(){
    if(backgroundImg)
    background(backgroundImg);

    noStroke();
    textSize(35);
    fill("white");
    text("Score " + score, width-300, 50)

    Engine.update(engine);
    //console.log(box2.body.position.x);
    //console.log(box2.body.position.y);
    //console.log(box2.body.angle);
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();

    log1.display();
    log2.display();
    log3.display();
    log4.display();

    slingshot.display();
    bird.display();
    platfrom.display();
    ground.display();
    ground1.display();

}

function mouseDragged(){
    //if(gameState!== "launched"){
        //if(mouseX > 0 && mouseX < 700){
        Matter.Body.setPosition(bird.body, {x:mouseX, y:mouseY});
        ///console.log("mouseDragged"+gameState)
    //}
    //}
}
function mouseReleased(){
    slingshot.fly();
    gameState = "launched"
    console.log("mouseReleased"+gameState)
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 3){
        bird.trajectory =[];
        Matter.Body.setPosition(bird.body, {x:200 , y: 50});
        slingshot.attach(bird.body);
        //gameState = "onSling";
        //console.log("KeyPressed"+gameState)
    }
}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/America/Monterrey");
    var responseJSON = await response.json();
    console.log(responseJSON);

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);

    if(hour>=6 && hour<=19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg"
    }

    backgroundImg = loadImage(bg)
}

// to be continued


/*const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810,350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810,220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new Slingshot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();
    console.log(bird.body.speed);    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}*/