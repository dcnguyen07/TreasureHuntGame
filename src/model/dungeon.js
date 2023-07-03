import { Sprite, utils } from "pixi.js";
import { GameConstant } from "../contants";
import Collider from "../collision/collider";
import { ColliderTag } from "../collision/colliderTag";
import CollisionManager from "../collision/collisionManager";


export class Dungeon extends Sprite {
    constructor() {
        super(utils.TextureCache[GameConstant.DUNGEON_IMAGE]);

        this.width = GameConstant.SCREEN_WIDTH;
        this.height = GameConstant.SCREEN_HEIGHT;

        this._initColliders();
    }

    _initColliders(){
        this.colliderLeft = new Collider(ColliderTag.Wall, 5, 0, ColliderTag.Wall, 5, 25);
        this.addChild(this.colliderLeft);

        this.colliderTop = new Collider(ColliderTag.Wall, 0, 0, ColliderTag.Wall, 500, 5);
        this.colliderTop.pos = "top";
        this.addChild(this.colliderTop);

        this.colliderBottom = new Collider(ColliderTag.Wall,0, 480, ColliderTag.Wall , 500, 5 );
         this.colliderBottom.pos = "bottom";
         this.addChild(this.colliderBottom);

        CollisionManager.instance.addTag2(this.colliderTop);
        CollisionManager.instance.addTag2(this.colliderBottom);
    }

    setPosition(){
        this.position.set(0, 0);
    }
    checkCollision(){

    }
    }