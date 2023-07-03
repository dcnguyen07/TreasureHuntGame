import { Container, Sprite, utils } from "pixi.js";
import { getSpriteFromCache } from "../utils/utils";
import { GameConstant } from "../contants";
import Collider from "../collision/collider";
import { ColliderTag } from "../collision/colliderTag";
import CollisionManager, { CollisionManagerEvent } from "../collision/collisionManager";


export default class Door extends Sprite {
    constructor() {
        super(utils.TextureCache[GameConstant.DOOR_IMAGE]);
        this.setPosition();
        this.colliderDoor = new Collider(ColliderTag.Door, 0, 0, ColliderTag.Door, 30, 30);
        this.colliderDoor.pos = "door";
        this.addChild(this.colliderDoor);
        CollisionManager.instance.addTag3(this.colliderDoor);
        this.colliderDoor.on(CollisionManagerEvent.Colliding, this.onCollide, this)
    }
    onCollide(){
        this.emit("collisionTreasure");
    }
    update(delta) {
        return [
            this.x,
            this.y
        ];
    }
    setPosition() {
        this.position.set(GameConstant.X_DOOR, GameConstant.Y_DOOR);
    }
    checkCollision() {
    }
}
