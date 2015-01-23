/// <reference path="../Components/Components" />
'use strict';

module Util {
  export module Geometry {

    /**
     * Returns the x and y units to increment the current position of the object.
     *
     * To see what Velocity is check http://en.wikipedia.org/wiki/Velocity
     *
     * @param velocity
     * @returns {{xunit: number, yunit: number}}
     */
    export function getVelocityUnits(velocity: Components.IVelocity): Components.IVelocityUnits {
      return {
        xunit: Math.cos(angleToRadians(velocity.angle)) * velocity.speed,
        yunit: Math.sin(angleToRadians(velocity.angle)) * velocity.speed
      }
    }

    export function angleToRadians(angle: number): number {
      return angle * Math.PI / 180;
    }

    export function radiansToAngle(radians: number): number {
      return radians * 180 / Math.PI;
    }

    export function getDistance(p1: Components.IPosition, p2: Components.IPosition): number {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
  }
}
