import { Container, Graphics } from "pixi.js";

import { eventEmitter } from "../utils/utils";
import { GameConstant } from "../contants";

export default class HealthBar extends Container {
    constructor(health) {
        super();
        this.w = 128;
        this.health = 100
        //Health Bar
        this.position.set(GameConstant.X_HEALTH_BAR, GameConstant.Y_HEALTH_BAR);

        this.maxHealth = health;
        this.health = health;

        this.innerBar = new Graphics();
        this.innerBar.beginFill(0x000000);
        this.innerBar.drawRoundedRect(0, 0, GameConstant.HEALTH_BAR_WIDTH, GameConstant.HEALTH_BAR_HEIGHT);
        this.innerBar.endFill;
        this.addChild(this.innerBar);

        this.outerBar = new Graphics();
        this.outerBar.beginFill(0xFF00111);
        this.outerBar.drawRoundedRect(0, 0, GameConstant.HEALTH_BAR_WIDTH, GameConstant.HEALTH_BAR_HEIGHT);
        this.outerBar.endFill();
        this.addChild(this.outerBar);

        this.outer = this.outerBar;
        this.width = GameConstant.HEALTH_BAR_WIDTH;

        this.isRunning = false;
    }
    // updateHealth(percent){
    //     this.health  += percent
    //     this.outer.width = Math.floor(this.health/100 * this.w);
    // }

    setPercentHealthBar(percent) {
        let count = 0;

        if (this.isRunning) {
            return;
        }

        this.isRunning = true;

        this.health = this.maxHealth - this.maxHealth * (percent / 100);
        this.healthBar = this.width - this.width * (this.health / this.maxHealth);
        this.outer.width -= this.healthBar;
    

        if (this.outer.width <= 0) {
            this.outer.width = 0;
            eventEmitter.emit("gameLoss");
        }

    }

}