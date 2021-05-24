import {sidGenerator} from "./utils/seq-utils.js";
import Sprite from "./sprite.js";
import {isNnBoxArea} from "./utils/area-utils.js";

class Scene {
    static sidGenerator = sidGenerator();
    constructor(ctx) {
        this.ctx = ctx;
        this.sprites = [];
        this._sid = Scene.sidGenerator.nextSid();
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }

    update() {
        for (let sprite of this.sprites) {
            sprite.update();
        }
    }

    draw() {
        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i];
            if (!sprite.alive) {
                this.removeSprite(sprite);
                continue;
            }

            this.collisionTest(sprite, this.sprites);
            sprite.draw(this.ctx);
        }
    }

    collisionTest(current, sprites) {
        for (let sprite of sprites) {
            if (current._sid === sprite._sid) {
                continue;
            }
            switch (current.colliderType) {
                case Sprite.ColliderTypes.BOX:
                    if (isNnBoxArea(current.x, current.y, sprite.x, sprite.y, sprite.width, sprite.height)
                        ||
                        isNnBoxArea(current.x + current.width, current.y, sprite.x, sprite.y, sprite.width, sprite.height)
                        ||
                        isNnBoxArea(current.x, current.y + current.height, sprite.x, sprite.y, sprite.width, sprite.height)
                        ||
                        isNnBoxArea(current.x + current.width, current.y + current.height, sprite.x, sprite.y, sprite.width, sprite.height)
                        ||
                        isNnBoxArea(sprite.x, sprite.y, current.x, current.y, current.width, current.height)
                        ||
                        isNnBoxArea(sprite.x + sprite.width, sprite.y, current.x, current.y, current.width, current.height)
                        ||
                        isNnBoxArea(sprite.x, sprite.y + sprite.height, current.x, current.y, current.width, current.height)
                        ||
                        isNnBoxArea(sprite.x + sprite.width, sprite.y + sprite.height, current.x, current.y, current.width, current.height)
                    ) {

                        current.onCollision(sprite);
                        return;
                    }
                    break;
                case Sprite.ColliderTypes.CIRCLE:
                    break;
                case Sprite.ColliderTypes.ELLIPSE:
                    break;
                case Sprite.ColliderTypes.CUSTOM:
                    break;
            }
        }
    }

    addSprite(sprite) {
        sprite.__scene = this;
        this.sprites.push(sprite)
    }

    removeSprite(sprite) {
        const findIndex = this.sprites.findIndex(s => s._sid === sprite._sid);
        this.sprites.splice(findIndex, 1);
    }
}

export default Scene;
