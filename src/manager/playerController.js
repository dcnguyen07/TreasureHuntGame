import { Container, Sprite } from "pixi.js";
import { GameConstant } from "../contants";



var key = {};
export default class PlayerController extends Container {
    constructor(move){
        super();
        this.move = move;

        window.addEventListener("keydown", function (e) {
            key[e.keyCode || e.which] =  true;
        }, true);
        window.addEventListener("keyup", function (e) {
            key[e.keyCode || e.which] =  false;
        }, true);
    }
    update(delta) {
        if (key[37]) {
            this.move.x -= GameConstant.EXPLORER_MOVE * delta;
        }
        if (key[38]) {
            this.move.y -= GameConstant.EXPLORER_MOVE * delta;
        }
        if (key[39]) {
            this.move.x += GameConstant.EXPLORER_MOVE * delta;
        }
        if (key[40]) {
            this.move.y += GameConstant.EXPLORER_MOVE * delta;
        }
    }

}