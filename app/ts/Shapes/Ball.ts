/// <reference path="Shape" />
/// <reference path="Point" />
/// <reference path="../Processes/RenderProcess" />
/// <reference path="../Processes/MoveProcess" />
/// <reference path="../Processes/CollisionProcess" />
/// <reference path="../Components/Components" />
/// <reference path="../Util/Geometry" />
'use strict';

module Shapes {

  export interface IBall extends IShape {
    getRadius():number;
  }

  export class Ball extends Shape implements IShape, Processes.IRenderable, Processes.IMoveable, Processes.ICollidable {
    private _radius: number;
    private _velocity: Components.IVelocity;

    public constructor(context, position: IPoint, radius, velocity: Components.IVelocity) {
      super(context, position);

      this._radius = radius;
      this._velocity = velocity;
    }

    getRadius() {
      return this._radius;
    }

    move(): void {
      var velocityUnits = Util.Geometry.getVelocityUnits(this._velocity);

      this._position.x += velocityUnits.xunit;
      this._position.y += velocityUnits.yunit;
    }

    render(): void {
      this._context.strokeStyle = "#000000";
      this._context.fillStyle = "#FFF000";
      this._context.beginPath();
      this._context.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, true);
      this._context.closePath();
      this._context.stroke();
      this._context.fill();
    }

    reflect(world: Processes.IWorldBoundaries, others?): void {
      if (this._position.x + this._radius > world.width || this._position.x - this._radius < 0) {
        this._velocity.angle = 180 - this._velocity.angle;
      } else if (this._position.y + this._radius > world.height || this._position.y - this._radius < 0) {
        this._velocity.angle = 360 - this._velocity.angle;
      }
    }

  }
}
