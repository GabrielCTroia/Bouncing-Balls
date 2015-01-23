'use strict';

module Shapes {

  export interface IPoint {
    x:number;
    y:number;
  }

  export interface IShape {
    //new():IShape;
    //update (position: IPoint):void;
    getPosition(): IPoint;
  }

  export class Shape {

    protected _position: IPoint;
    protected _context;

    public constructor(context, position: IPoint) {
      this._context = context;

      this._setPosition(position);
    }

    public _setPosition(newPosition) {
      // set position by cloning it!
      this._position = {
        x: newPosition.x,
        y: newPosition.y
      };
    }

    public update(newPosition: IPoint): void {
      this._setPosition(newPosition);
    }

    public getPosition(): IPoint {
      return this._position;
    }
  }
}
