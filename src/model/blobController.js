import { GameConstant } from "../contants";

export default class BlobController {
    constructor(){
        this.coliders = [];
    }
    wallCollision(y){
        let collision = undefined;
        if(y > GameConstant.SCREEN_HEIGHT - GameConstant.WALL_WIDTH - GameConstant.BLOB_HEIGHT){
            collision = "bottom";
        }else if (y < 0) {
            collision = "top";
        }
        return collision;
    }
}
