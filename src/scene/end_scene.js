import { Container, Text, TextStyle } from "pixi.js";
import { GameConstant } from "../contants";

export default class EndScene extends Container {
    constructor(status){
        super();
        this.status = status;
        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 64,
            fill: "red"
        });
        this.winMess = new Text("YOU WIN", this.style);
        this.winMess.position.set(GameConstant.X_MESS, GameConstant.Y_MESS);
        this.winMess.visible = false;
        this.addChild(this.winMess);

        this.lossMess = new Text("YOU LOSE", this.style);
        this.lossMess.position.set(GameConstant.X_MESS, GameConstant.Y_MESS);
        this.lossMess.visible = false;
        this.addChild(this.lossMess);

        this.checkEventEmitter();
    }

    checkEventEmitter() {
        if (this.status === "win") {
            this.winMess.visible = true;
            this.lossMess.visible = false;
        } else if (this.status === "loss") {
            this.lossMess.visible = true;
            this.winMess.visible = false;
        }
    }
}