/// <reference path="IProcess" />
'use strict';

module Processes {

  export interface IRenderable {
    render ():void;
  }

  export class RenderProcess implements IProcess {

    private _targets: Array<IRenderable> = [];

    public addTarget(target: IRenderable): void {
      this._targets.push(target);
    }

    public update(): void {
      console.log('Render Process: updating');
      for (var i = 0; i < this._targets.length; i++) {
        this._targets[i].render();
      }
    }
  }

}
