'use strict';

module Util {
  export module Mathematics {
    export function randomIn(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
