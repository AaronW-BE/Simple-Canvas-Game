import Runtime from "../js/core.js";
import {rand} from "../js/utils/random-utils.js";
import Script from "../js/script.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const runtime = new Runtime(ctx);

const scene = new Runtime.Scene();

const sprite = new Runtime.Sprite();
const sprite2 = new Runtime.Sprite();


class MyScript extends Script {

    constructor() {
        super();
        let speed = rand(5, 15), force = 3;
        let angle = rand(Math.PI / 90, Math.PI);
        this.vx = speed * Math.cos(angle)
        this.vy = speed * Math.sin(angle)
        this.ax = force * Math.cos(angle)
        this.ay = force * Math.sin(angle)
    }

    init() {
        this.target.x = Math.random() * 800;
        this.target.y = Math.random() * 600;
        this.target.height = rand(50, 200)
    }

    onCollision(target) {
        this.vx = -this.vx;
        this.vy = -this.vy;
    }

    update() {
        const target = this.target;
        target.x += this.vx;
        target.y += this.vy;

        this.ax -= 0.01;
        this.ay -= 0.01;

        if ((target.y + target.height) >= ctx.canvas.height || target.y < 0) {
            this.vy = -this.vy;
        }

        if ((target.x + target.width) >= ctx.canvas.width || target.x < 0) {
            this.vx = -this.vx;
        }
    }
}


const t1 = new MyScript();
const t2 = new MyScript();


sprite.setScript(t1);
sprite2.setScript(t2);

scene.addSprite(sprite);
scene.addSprite(sprite2);
runtime.setScene(scene);

runtime.start();

document.addEventListener('click', () => {
    runtime.paused ? runtime.start() : runtime.pause();
});
