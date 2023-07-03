import { Application, Container, Loader } from "pixi.js";
import { GameConstant } from "../contants";
import { Dungeon } from "../model/dungeon";
import Door from "../model/door";
import HealthBar from "../model/health";
import Explorer from "../model/explorer";
import ExplorerController from "../manager/explorerController";
import TreasureController from "../manager/treasureController";
import BlobManager from "../manager/blobManager";
import GameManager from "../manager/gameManager";
import EndScene from "./end_scene";
import CollisionManager from "../collision/collisionManager";
import { eventEmitter } from "../utils/utils";


export default class gameScene extends Application {
    constructor() {
        super({
            width: GameConstant.SCREEN_WIDTH,
            height: GameConstant.SCREEN_HEIGHT
        });
        this.renderer.backgroundColor = 0x061639;
        document.body.appendChild(this.view);

        this.gameScene = new Container();
        this.stage.addChild(this.gameScene);
    }
    load() {
        Loader.shared.add("images/treasureHunter.json")
        .load(() => {
            this.setup();
        });
    }
    setup(){
        this.dungeon = new Dungeon();
        this.gameScene.addChild(this.dungeon);

        this.door = new Door();
        this.door.on("collisionTreasure", ()=> {
            eventEmitter.emit("winGame");
         
        })
        this.gameScene.addChild(this.door);
        
        this.healthBar = new HealthBar(500);
        this.gameScene.addChild(this.healthBar);
        
        this.explorerController = new ExplorerController();
        this.explorerController.explorer.on("collisionBlob", ()=> {
            this.healthBar.outerBar.width -= 2;
            if(this.healthBar.outerBar.width <= 0){
                this.healthBar.outerBar.width = 0;
                eventEmitter.emit("gameLoss");
            }
        })
        this.gameScene.addChild(this.explorerController);

        this.treasureController = new TreasureController(this.explorerController.explorer);
        this.gameScene.addChild(this.treasureController);

        this.blobsManager = new BlobManager();
        this.gameScene.addChild(this.blobsManager);

        this.gameManager = new GameManager(this, this.healthBar);
        this.gameManager.checkEventEmitter();

        this.ticker.add((delta) => {
            this.loop(delta);
        })
    }
    loop(delta){
        this.explorerLocation = this.explorerController.update(delta);
        // this.doorLocation = this.door.update(delta);
        this.blobsManager.update(delta, this.explorerLocation);
        this.treasureController.update(delta, this.explorerLocation, this.doorLocation);
        CollisionManager.instance.update(delta);
    }
    end(status) {
        this.gameScene.visible = false;
        this.endScene = new EndScene(status);
        this.stage.addChild(this.endScene);
    }
}
