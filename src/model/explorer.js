import { Sprite, utils } from "pixi.js";
import { GameConstant } from "../contants";
import PlayerController from "../manager/playerController";
import ExplorerCollisder from "../collision/explorerCollider";
import { eventEmitter } from "../utils/utils";
import Collider from "../collision/collider";
import { ColliderTag } from "../collision/colliderTag";
import CollisionManager, { CollisionManagerEvent } from "../collision/collisionManager";
import HealthBar from "./health";
export default class Explorer extends Sprite{
    constructor(){
        super(utils.TextureCache[GameConstant.EXPLORER_IMAGE]);
        this.action = new PlayerController(this);
        this.explorerHit = true;
        this.explorerCollisder = new ExplorerCollisder();
        this.colliderExplorer = new Collider(ColliderTag.Explorer, 0, 0, ColliderTag.Explorer, 20, 25);
        this.colliderExplorer.pos = "explorer";
        this.addChild(this.colliderExplorer);
        CollisionManager.instance.addTag3(this.colliderExplorer);
        this.colliderExplorer.on(CollisionManagerEvent.Colliding, this.onCollide, this)
        this.checkEventEmitter(); 
     }
     onCollide(col){
        if(col.tag === ColliderTag.Treasure){
        } else{
            this.emit("collisionBlob");
            this.explorerHit = true;
            let interval = setInterval(() => {
                if (this.alpha == 1) this.alpha = 0.5;
                else this.alpha = 1;
            }, 500);

            setTimeout(() => {
                clearInterval(interval);
                this.alpha = 1;
                console.log("123");
                this.explorerHit = false;
            }, 1200);
        }
     }
    update(delta) {
        this.action.update(delta);
    }

    setPosition() {
        this.position.set(GameConstant.X_EXPLORER, GameConstant.Y_EXPLORER);
    }

    getLocation() {
        return [
            this.x,
            this.y
        ];
    }

    checkCollision() {

        this.collision = this.explorerCollisder.wallCollision(this.x, this.y);
        switch (this.collision) {
            case "bottom":
                this.y = GameConstant.SCREEN_HEIGHT - GameConstant.EXPLORER_HEIGHT * 2;
                break;
            case "top":
                this.y = 0;
                break;
            case "right":
                this.x = GameConstant.SCREEN_HEIGHT - GameConstant.EXPLORER_WIDTH;
                break;
            case "left":
                this.x = GameConstant.EXPLORER_WIDTH;
                break;

            default:
                break;
        }
    }
    checkEventEmitter() {
        eventEmitter.on("blur", () => {
            this.alpha = 0.5;
        });
        eventEmitter.on("normal", () => {
            this.alpha = 1;
        });
    }


}
