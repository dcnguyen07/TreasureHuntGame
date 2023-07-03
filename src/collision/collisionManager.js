import { eventEmitter } from "../utils/utils";

export const CollisionManagerEvent = Object.freeze({
    Colliding: "collisionmanager:colliding"
});

export default class CollisionManager{

    static get instance(){
        if(this._instance){
            return this._instance;
        } else {
            this._instance = new CollisionManager();
        }
        return this._instance;
    }

    constructor() {
        this.coliders = [];
        this.tag1 = [];
        this.tag2 = [];
        this.tag3 = [];
        this.tag4 = [];
    }

    addTag1(col){
        this.tag1.push(col);
    }

    addTag2(col){
        this.tag2.push(col);
    }
    
    addTag3(col){
        this.tag3.push(col);
    }
    addTag4(col){
        this.tag4.push(col);
    }

    add(coliders) {
        this.coliders.push(coliders);
    }

    remove(collider) {
        const index = this.coliders.indexOf(collider);
        if (index !== -1) {
            this.coliders.splice(index, 1);
        }
    }

    update() {
        for (let i = 0; i < this.tag1.length; i++) {
            for (let j = 0; j < this.tag2.length; j++) {
                let col1 = this.tag1[i];
                let col2 = this.tag2[j];
                if(this.isCollide(col1.getBouding(), col2.getBouding())){
                    col1.emit(CollisionManagerEvent.Colliding, col2);
                    col2.emit(CollisionManagerEvent.Colliding, col1);
                }
            }
        }
        for (let i = 0; i< this.tag1.length; i++){
            for (let j = 0; j < this.tag3.length; j++){
                let col1 = this.tag1[i];
                let col3 = this.tag3[j];
                if(this.isCollide(col1.getBouding(), col3.getBouding())){ 
                    col1.emit(CollisionManagerEvent.Colliding, col3);
                    col3.emit(CollisionManagerEvent.Colliding, col1);
                }
            }
        }
        for (let i = 0; i< this.tag4.length; i++){
            for (let j = 0; j < this.tag3.length; j++){
                let col4 = this.tag4[i];
                let col3 = this.tag3[j];
                if(this.isCollide(col4.getBouding(), col3.getBouding())){ 
                    col4.emit(CollisionManagerEvent.Colliding, col3);
                    col3.emit(CollisionManagerEvent.Colliding, col4);
                }
            }
        }
        
    }

    isCollide(col1, col2){
        return col1.x < col2.x + col2.width &&
        col1.x + col1.width > col2.x &&
        col1.y < col2.y + col2.height &&
        col1.y + col1.height > col2.y
    }
    
}
