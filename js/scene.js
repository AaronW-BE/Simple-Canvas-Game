class Scene {
    static sid = 0;
    constructor(ctx) {
        this.ctx = ctx;
        this.sprites = [];
        this._sid = this.nextSid();
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }
    nextSid() {
        return Scene.sid++;
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
            sprite.draw(this.ctx);
        }
    }

    addSprite(sprite) {
        this.sprites.push(sprite)
    }

    removeSprite(sprite) {
        const findIndex = this.sprites.findIndex(s => s.sid === sprite._sid);
        this.sprites.splice(findIndex, 1);
    }
}

export default Scene;
