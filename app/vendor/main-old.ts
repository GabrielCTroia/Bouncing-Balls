///// <reference path="Shapes/Shape" />
///// <reference path="Shapes/Ball" />
///// <reference path="Shapes/Point" />
///// <reference path="Util/Angles" />
//
//var canv = document.createElement("canvas");
//
//function getWorld() {
//  console.log('creating the world');
//  canv.style.backgroundColor = "cyan";
//  canv.width = 600;
//  canv.height = 500;
//
//  document.body.appendChild(canv);
//
//  return canv.getContext("2d");
//}
//
//var world = getWorld();
//
//// ball 1
//
//var startPoint: Shapes.IShape = new Shapes.Point(world, {x: 23, y: 45});
//var endPoint: Shapes.IShape = new Shapes.Point(world, {x: 523, y: 245});
//
//var ball1 = new Shapes.Ball(world, startPoint.getPosition(), 50);
//
//var ball1Pos = ball1.getPosition();
//
//var ballSpeed = 10;
//var ballDistance = getDistance(startPoint.getPosition(), endPoint.getPosition());
//
//var ballMoves = getMoves(ballDistance, ballSpeed);
//var ballXunits = (endPoint.getPosition().x - startPoint.getPosition().x) / ballMoves;
//var ballYunits = (endPoint.getPosition().y - startPoint.getPosition().y) / ballMoves;
//
//
//// ball 2
//var ball2 = new Shapes.Ball(world, {x: 10, y: 300}, 10);
//var ball2Angle = -12;
//var ball2Radians = Util.Geometry.angleToRadians(ball2Angle);
//var ball2Speed = 5;
//
//var ball2Xunits = Math.cos(ball2Radians) * ball2Speed;
//var ball2Yunits = Math.sin(ball2Radians) * ball2Speed;
//
//var ball2Pos = ball2.getPosition();
//
//// ball 3
//
//var ball3 = new Shapes.Ball(world, {x: 400, y: 10}, 30);
//
//interface VectorUnits {
//  xunits: number;
//  yunits: number;
//}
//
//function getVectorUnits(angle: number, speed: number): VectorUnits {
//  var radians = Util.Geometry.angleToRadians(angle);
//  return {
//    xunits: Math.cos(radians) * speed,
//    yunits: Math.sin(radians) * speed
//  }
//}
//
//var ball3Speed = 30;
//var ball3Angle = 30;
//var ball3Pos = ball3.getPosition();
//
//var ball3VectorUnits = getVectorUnits(ball3Angle, ball3Speed);
//
//// points
//var points = [];
//
//function drawScreen() {
//  console.log('drawing');
//
//  // clean the canvas
//  world.clearRect(0, 0, 600, 500);
//
//
//  // ball 1 render & update. travel from point A to point B
//  ball1.update(ball1Pos);
//
//  ball1.render();
//  //startPoint.render();
//  //endPoint.render();
//
//
//  if (ballMoves > 0) {
//    ballMoves--;
//    ball1Pos.x += ballXunits;
//    ball1Pos.y += ballYunits;
//
//    points.push(new Shapes.Point(world, {x: ball1Pos.x, y: ball1Pos.y}, 3))
//  }
//
//  // ball 2 update & render. travel in a vector with an angle (direction) and a magnitude (speed)
//
//  ball2.update(ball2Pos);
//  ball2.render();
//
//  ball2Pos.x += ball2Xunits;
//  ball2Pos.y += ball2Yunits;
//
//  points.push(new Shapes.Point(world, {x: ball2Pos.x, y: ball2Pos.y}, 2));
//
//
//  // ball 3. reflect from a wall
//
//  ball3.update(ball3Pos);
//  ball3.render();
//
//  ball3Pos.x += ball3VectorUnits.xunits;
//  ball3Pos.y += ball3VectorUnits.yunits;
//
//  // If out of boundaries, change the angle to the exact opposite one
//  if (ball3Pos.x > canv.width || ball3Pos.x < 0) {
//    ball3Angle = 180 - ball3Angle;
//    ball3VectorUnits = getVectorUnits(ball3Angle, ball3Speed);
//  } else if (ball3Pos.y > canv.height || ball3Pos.y < 0) {
//    ball3Angle = 360 - ball3Angle;
//    ball3VectorUnits = getVectorUnits(ball3Angle, ball3Speed);
//  }
//
//  points.push(new Shapes.Point(world, {x: ball3Pos.x, y: ball3Pos.y}, 2));
//
//  // render tracing points
//
//  for (var i: number = 0; i < points.length; i++) {
//    points[i].render();
//  }
//}
//
//function getDistance(p1: Shapes.IPoint, p2: Shapes.IPoint): number {
//  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
//}
//
//function getMoves(distance: number, speed: number): number {
//  return Math.floor(distance / speed);
//}
//
//(function gameLoop(fps) {
//  setTimeout(function () {
//    gameLoop(fps);
//  }, 1000 / fps);
//  drawScreen();
//}(30));
//
