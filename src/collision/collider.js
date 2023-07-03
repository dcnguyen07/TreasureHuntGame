import { Sprite, Texture } from "pixi.js";
import { GameConstant } from "../contants";
import { eventEmitter } from "../utils/utils";

import CollisionManager from "./collisionManager";

export const ColliderEvent = Object.freeze({
    Colliding: "collider:colliding",
    NeedRemove: "collider:needremove"
});

export default class Collider extends Sprite {
    constructor(type, x, y, tag, width, height) {
        super(Texture.WHITE);
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height;
        this.id = Date.now();
        this.tag = tag;
        this.visible = GameConstant.DEBUG_COLLIDER;
    }
    
    getBouding(){
        return this.getBounds();
    }
}

