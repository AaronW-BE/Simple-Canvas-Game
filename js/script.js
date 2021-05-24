class Script {
    constructor() {
        this.nextScript = null;
        this.target = null;
    }

    setNext(s) {
        this.nextScript = s;
    }

    setTarget(t) {
        this.target = t;
    }

    onCollision(target) {
        if (this.nextScript) {
            this.nextScript.onCollision(target);
        }
    }

    init() {

    }

    /**
     * not implementation
     */
    fixedUpdate() {

    }

    update() {

    }
}

export default Script;
