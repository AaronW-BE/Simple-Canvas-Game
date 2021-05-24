import Scene from "./scene.js";
import Sprite from "./sprite.js";
import Script from "./script.js";

class Runtime {
    constructor(ctx) {
        this.ctx = ctx;
        this.init();
        this.lastCallTime = performance.now();
        this.fps = 0;
        this.paused = false;
    }

    init() {

    }

    update() {
        this.scene && this.scene.update();
    }

    setScene(scene) {
        this.scene = scene;
        scene.setCtx(this.ctx);
    }

    showFps() {
        this.ctx.fillStyle = '#57ba55'
        this.ctx.font = "16px Arial"

        let delta = (performance.now() - this.lastCallTime) / 1000;
        this.fps = Math.floor(1 / delta);
        this.lastCallTime = performance.now();
        this.ctx.fillText("FPS:" + this.fps, this.ctx.canvas.width - 80, 20);
    }

    draw() {
        this.scene.draw(this.ctx);
        this.update.apply(this);

        this.aid = requestAnimationFrame(this.draw.bind(this));

        this.showFps();
    }

    pause() {
        this.aid && cancelAnimationFrame(this.aid);
        this.paused = true;
    }

    start() {
        if (this.scene) {
            this.draw();
            this.paused = false;
            return;
        }
        throw new Error("must have a scene");
    }
}

Runtime.Scene = Scene;
Runtime.Sprite = Sprite;
Runtime.Script = Script;

export default Runtime;
