'use strict';

module Processes {
  export interface IProcess {
    addTarget<T>(target: T):void;
    update():void;
  }
}
