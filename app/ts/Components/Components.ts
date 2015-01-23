'use strict';

module Components {

  export interface IPosition {
    x: number;
    y:number;
  }

  export interface IVelocity {
    angle: number;
    speed: number;
  }

  export interface IVelocityUnits {
    xunit: number;
    yunit: number;
  }

}
