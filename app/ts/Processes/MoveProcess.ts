/// <reference path="IProcess" />
/// <reference path="../Components/Components" />
'use strict';

module Processes {

  export interface IMoveable {
    move():void;
  }

  export class MoveProcess implements IProcess {
    private _targets: Array<IMoveable> = [];

    addTarget(target: IMoveable): void {
      this._targets.push(target);
    }

    update(): void {
      for (var i in this._targets) {
        this._targets[i].move();
      }
    }
  }

}
