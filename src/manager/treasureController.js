import { Container } from "pixi.js";
import Treasure from "../model/treasure";

export default class TreasureController extends Container {
    constructor(explorer) {
        super();
      
        this.treasure = new Treasure(explorer);
        this.addChild(this.treasure);
    
    }
   

    update(delta, explorerLocation, doorLocation) {
        this.treasure.update(delta, explorerLocation, doorLocation);
    }
}
