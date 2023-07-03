import { Sprite, utils } from "pixi.js";
import { GameConstant } from "../contants";

import RectangleCollider from "../collision/rectCollider";
import { eventEmitter } from "../utils/utils";
import Collider from "../collision/collider";
import CollisionManager, { CollisionManagerEvent } from "../collision/collisionManager";
import { ColliderTag } from "../collision/colliderTag";


export class Blob extends Sprite {
    constructor(number) {
        super(utils.TextureCache[GameConstant.BLOB_IMAGE]);
        this.number = number;

        this.number % 2 == 0 ? this.VY_BLOB = GameConstant.VY_BLOB : this.VY_BLOB = - GameConstant.VY_BLOB;
        this.vx = 0;
        this.vy = 1;
        this.colliderBlob = new Collider(ColliderTag.Blob, 0, 0,ColliderTag.Blob, 25, 25);
        this.colliderBlob.pos = "blob";
        this.addChild(this.colliderBlob);
        CollisionManager.instance.addTag1(this.colliderBlob);
        this.colliderBlob.on(CollisionManagerEvent.Colliding, this.onCollide, this)
     
    }
    
    onCollide(col) {
        if (col.tag === "wall") {
            if (col.pos === "top" && this.VY_BLOB < 0) {
              this.VY_BLOB *= -1;
            } else if (col.pos === "bottom" && this.VY_BLOB > 0) {
              this.VY_BLOB *= -1;
            }
          }
        
       
    }

    update(delta, explorerLocation) {

        this.y += this.VY_BLOB * delta;
        this.explorerLocation = explorerLocation;
        
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }

}