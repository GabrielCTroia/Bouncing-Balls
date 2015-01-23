/// <reference path="Shape" />
'use strict';

module Shapes {

  export class Point extends Shape implements IShape {

    private _size: number;

    public constructor(context, position: IPoint, size: number = 5) {
      this._size = size;

      super(context, position);
    }

    public render(): void {
      this._context.fillRect(this._position.x, this._position.y, this._size, this._size);
    }

  }

}
