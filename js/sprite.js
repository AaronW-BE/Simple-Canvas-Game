import { randomRGB } from './utils/random-utils.js'
import {sidGenerator} from "./utils/seq-utils.js";

class Sprite {
    static sidGenerator = sidGenerator();

    constructor() {
        this.alive = true;
        this.visible = true;
        this.x = 200;
        this.y = 200;
        this.height = 50;
        this.width = 50;
        this.degree = 0;
        this.color = randomRGB(100, 250);

        this.colliderType = Sprite.ColliderTypes.BOX

        this.script = null;
        this.__scene = null;

        this._sid = Sprite.sidGenerator.nextSid();
    }

    get scene() {
        return this.__scene;
    }

    setScript(s) {
        s.setTarget(this);
        s.init();
        this.script = s
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
    }

    rotate(deg) {
        // this.ctx.rotate(this.degree += deg);
        // this.ctx.translate(0, 0);
    }

    update() {
        this.script && this.script.update();
    }

    onCollision(target) {
        this.script && this.script.onCollision({
            t: Date.now(),
            target,
            self: this
        })
    }

    draw(ctx) {
        ctx.save();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.visible) {
            ctx.fillStyle = this.color;

            this.rotate(Math.PI / 2 / 90);

            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
}

Sprite.ColliderTypes = {
    BOX: 1, CIRCLE: 2, ELLIPSE: 3, CUSTOM: 4
};
export default Sprite;
