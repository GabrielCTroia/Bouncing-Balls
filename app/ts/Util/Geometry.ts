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

  }
}
