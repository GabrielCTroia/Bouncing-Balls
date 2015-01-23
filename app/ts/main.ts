/// <reference path="Shapes/Shape" />
/// <reference path="Shapes/Ball" />
/// <reference path="Shapes/Point" />
/// <reference path="Util/Geometry" />
/// <reference path="Util/Mathematics" />
/// <reference path="Util/Physics" />
/// <reference path="Processes/RenderProcess" />

var canv = document.createElement("canvas");

function getWorld() {
  console.log('creating the world');
  canv.style.backgroundColor = "cyan";
  canv.width = window.innerWidth - 50;
  canv.height = window.innerHeight - 50;

  document.body.appendChild(canv);

  return canv.getContext("2d");
}

var world = getWorld();

// config
var maxShapes = 50;

var minRadius = 20;
var maxRadius = canv.width / 10;

var minSpeed = 5;
var maxSpeed = 5;


// processes
var renderProcess = new Processes.RenderProcess();
var moveProcess = new Processes.MoveProcess();
var collisionProcess = new Processes.CollisionProcess();


var balls: Shapes.Ball[] = [];

for (var i = 0; i < maxShapes; i++) {
  do {
    console.log('try to fit')
    var ballRadius = Util.Mathematics.randomIn(minRadius, maxRadius);
    var ball = new Shapes.Ball(
      world,
      {
        x: Util.Mathematics.randomIn(ballRadius + 1, canv.width - ballRadius - 1),
        y: Util.Mathematics.randomIn(ballRadius + 1, canv.height - ballRadius - 1)
      },
      ballRadius,
      {
        angle: Util.Mathematics.randomIn(0, 360),
        speed: Util.Mathematics.randomIn(minSpeed, maxSpeed)
      });
  } while (overlaps(ball, balls));

  balls.push(ball);

  renderProcess.addTarget(ball);
  moveProcess.addTarget(ball);
  collisionProcess.addTarget(ball);
}

function overlaps(ball, balls) {
  for (var b = 0; b < balls.length; b++) {
    if (Util.Physics.isOverlapping(ball, balls[b]))
      return true;
  }
  return false;
}


// gameloop

(function gameLoop(fps) {
  setTimeout(function () {
    gameLoop(fps);
  }, 1000 / fps);
  drawScreen();
}(30));


function drawScreen() {
  // take out for a cool effect
  world.clearRect(0, 0, canv.width, canv.height);

  renderProcess.update();
  //moveProcess.update();
  collisionProcess.update(canv);
}


