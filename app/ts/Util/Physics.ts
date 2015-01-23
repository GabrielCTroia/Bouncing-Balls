/// <reference path="../Shapes/Ball" />
/// <reference path="../Util/Physics" />
'use strict';

module Util {

  export module Physics {

    export function isOverlapping(ballA: Shapes.IBall, ballB: Shapes.IBall): boolean {
      return Geometry.getDistance(ballA.getPosition(), ballB.getPosition()) <= (ballA.getRadius() + ballB.getRadius());
    }

  }

}
