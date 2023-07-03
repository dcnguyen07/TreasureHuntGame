import { Container, Sprite, utils } from "pixi.js";
import { eventEmitter, getSpriteFromCache } from "../utils/utils";

import RectangleCollider from "../collision/rectCollider";
import { GameConstant } from "../contants";
import Collider from "../collision/collider";
import { ColliderTag } from "../collision/colliderTag";
import CollisionManager, { CollisionManagerEvent } from "../collision/collisionManager";

export default class Treasure extends Sprite {
    constructor(explorer) {
        super(utils.TextureCache[GameConstant.TREASURE_IMAGE]);
        this.explorer = explorer;
        this.setPosition();
        this.isCatched = false;
        this.isCollisionTreasure = false;
        this.rectangleCollider = new RectangleCollider();
        this.colliderTreasure = new Collider(ColliderTag.Treasure, 0, 0, ColliderTag.Treasure, 25, 20);
        this.colliderTreasure.pos = "treasure";
        this.addChild(this.colliderTreasure);
        CollisionManager.instance.addTag4(this.colliderTreasure);
        this.colliderTreasure.on(CollisionManagerEvent.Colliding, this.onCollide, this)
    }
onCollide(){
    this.isCatched = true;
}
    update() { 
        if (this.isCatched == true) {
            this.x = this.explorer.x;
            this.y = this.explorer.y;
        }
    }
    setPosition() {
        this.position.set(GameConstant.X_TREASURE, GameConstant.Y_TREASURE);
    }
}