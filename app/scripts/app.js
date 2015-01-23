'use strict';
var Shapes;
(function (Shapes) {
    var Shape = (function () {
        function Shape(context, position) {
            this._context = context;
            this._setPosition(position);
        }
        Shape.prototype._setPosition = function (newPosition) {
            // set position by cloning it!
            this._position = {
                x: newPosition.x,
                y: newPosition.y
            };
        };
        Shape.prototype.update = function (newPosition) {
            this._setPosition(newPosition);
        };
        Shape.prototype.getPosition = function () {
            return this._position;
        };
        return Shape;
    })();
    Shapes.Shape = Shape;
})(Shapes || (Shapes = {}));
'use strict';
/// <reference path="IProcess" />
'use strict';
var Processes;
(function (Processes) {
    var RenderProcess = (function () {
        function RenderProcess() {
            this._targets = [];
        }
        RenderProcess.prototype.addTarget = function (target) {
            this._targets.push(target);
        };
        RenderProcess.prototype.update = function () {
            console.log('Render Process: updating');
            for (var i = 0; i < this._targets.length; i++) {
                this._targets[i].render();
            }
        };
        return RenderProcess;
    })();
    Processes.RenderProcess = RenderProcess;
})(Processes || (Processes = {}));
'use strict';
/// <reference path="IProcess" />
/// <reference path="../Components/Components" />
'use strict';
var Processes;
(function (Processes) {
    var MoveProcess = (function () {
        function MoveProcess() {
            this._targets = [];
        }
        MoveProcess.prototype.addTarget = function (target) {
            this._targets.push(target);
        };
        MoveProcess.prototype.update = function () {
            for (var i in this._targets) {
                this._targets[i].move();
            }
        };
        return MoveProcess;
    })();
    Processes.MoveProcess = MoveProcess;
})(Processes || (Processes = {}));
/// <reference path="IProcess" />
var Processes;
(function (Processes) {
    var CollisionProcess = (function () {
        function CollisionProcess() {
            this._targets = [];
        }
        CollisionProcess.prototype.addTarget = function (target) {
            this._targets.push(target);
        };
        CollisionProcess.prototype.update = function (walls, others) {
            for (var i in this._targets) {
                this._targets[i].reflect(walls, others);
            }
        };
        return CollisionProcess;
    })();
    Processes.CollisionProcess = CollisionProcess;
})(Processes || (Processes = {}));
/// <reference path="../Components/Components" />
'use strict';
var Util;
(function (Util) {
    var Geometry;
    (function (Geometry) {
        /**
         * Returns the x and y units to increment the current position of the object.
         *
         * To see what Velocity is check http://en.wikipedia.org/wiki/Velocity
         *
         * @param velocity
         * @returns {{xunit: number, yunit: number}}
         */
        function getVelocityUnits(velocity) {
            return {
                xunit: Math.cos(angleToRadians(velocity.angle)) * velocity.speed,
                yunit: Math.sin(angleToRadians(velocity.angle)) * velocity.speed
            };
        }
        Geometry.getVelocityUnits = getVelocityUnits;
        function angleToRadians(angle) {
            return angle * Math.PI / 180;
        }
        Geometry.angleToRadians = angleToRadians;
        function radiansToAngle(radians) {
            return radians * 180 / Math.PI;
        }
        Geometry.radiansToAngle = radiansToAngle;
    })(Geometry = Util.Geometry || (Util.Geometry = {}));
})(Util || (Util = {}));
/// <reference path="Shape" />
/// <reference path="../Processes/RenderProcess" />
/// <reference path="../Processes/MoveProcess" />
/// <reference path="../Processes/CollisionProcess" />
/// <reference path="../Components/Components" />
/// <reference path="../Util/Geometry" />
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shapes;
(function (Shapes) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(context, position, radius, velocity) {
            _super.call(this, context, position);
            this._radius = radius;
            this._velocity = velocity;
        }
        Ball.prototype.move = function () {
            var velocityUnits = Util.Geometry.getVelocityUnits(this._velocity);
            this._position.x += velocityUnits.xunit;
            this._position.y += velocityUnits.yunit;
        };
        Ball.prototype.render = function () {
            this._context.strokeStyle = "#000000";
            this._context.fillStyle = "#FFF000";
            this._context.beginPath();
            this._context.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, true);
            this._context.closePath();
            this._context.stroke();
            this._context.fill();
        };
        Ball.prototype.reflect = function (world, others) {
            if (this._position.x + this._radius > world.width || this._position.x - this._radius < 0) {
                this._velocity.angle = 180 - this._velocity.angle;
            }
            else if (this._position.y + this._radius > world.height || this._position.y - this._radius < 0) {
                this._velocity.angle = 360 - this._velocity.angle;
            }
        };
        return Ball;
    })(Shapes.Shape);
    Shapes.Ball = Ball;
})(Shapes || (Shapes = {}));
/// <reference path="Shape" />
'use strict';
var Shapes;
(function (Shapes) {
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(context, position, size) {
            if (size === void 0) { size = 5; }
            this._size = size;
            _super.call(this, context, position);
        }
        Point.prototype.render = function () {
            this._context.fillRect(this._position.x, this._position.y, this._size, this._size);
        };
        return Point;
    })(Shapes.Shape);
    Shapes.Point = Point;
})(Shapes || (Shapes = {}));
'use strict';
var Util;
(function (Util) {
    var Mathematics;
    (function (Mathematics) {
        function randomIn(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        Mathematics.randomIn = randomIn;
    })(Mathematics = Util.Mathematics || (Util.Mathematics = {}));
})(Util || (Util = {}));
/// <reference path="Shapes/Shape" />
/// <reference path="Shapes/Ball" />
/// <reference path="Shapes/Point" />
/// <reference path="Util/Geometry" />
/// <reference path="Util/Mathematics" />
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
var maxRadius = canv.width / 10;
var maxSpeed = 15;
// processes
var renderProcess = new Processes.RenderProcess();
var moveProcess = new Processes.MoveProcess();
var collisionProcess = new Processes.CollisionProcess();
for (var i = 0; i < maxShapes; i++) {
    var ballRadius = Util.Mathematics.randomIn(10, maxRadius);
    var ball = new Shapes.Ball(world, {
        x: Util.Mathematics.randomIn(ballRadius + 1, canv.width - ballRadius - 1),
        y: Util.Mathematics.randomIn(ballRadius + 1, canv.height - ballRadius - 1)
    }, ballRadius, {
        angle: Util.Mathematics.randomIn(0, 360),
        speed: Util.Mathematics.randomIn(2, maxSpeed)
    });
    renderProcess.addTarget(ball);
    moveProcess.addTarget(ball);
    collisionProcess.addTarget(ball);
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
    moveProcess.update();
    collisionProcess.update(canv);
}
