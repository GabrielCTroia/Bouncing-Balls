/// <reference path="IProcess" />

module Processes {

  export interface ICollidable {
    reflect(world: IWorldBoundaries, others?):void;
  }

  export interface IWorldBoundaries {
    width:number;
    height:number
  }

  export class CollisionProcess {
    private _targets: Array<ICollidable> = [];

    addTarget(target: ICollidable): void {
      this._targets.push(target);
    }

    public update(walls: IWorldBoundaries, others?): void {
      for (var i in this._targets) {
        this._targets[i].reflect(walls, others);
      }
    }

  }

}
