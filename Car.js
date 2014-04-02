// A generic constructor which accepts an arbitrary descriptor object
function Car(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Car.prototype.vx = 0;
Car.prototype.vy = 0;
Car.prototype.halfWidth = 11;
Car.prototype.halfHeight = 7;
Car.prototype.direction = 0;
Car.prototype.acc = 0.5;
Car.prototype.friction = 0.02;
Car.prototype.tires = 0.05;


Car.prototype.update = function (du) {
    if (g_keys[this.GO_UP]) {
        this.vx += Math.cos(this.direction)*this.acc * du;
        this.vy += Math.sin(this.direction)*this.acc * du;
    } else if (g_keys[this.GO_DOWN]) {
        this.vx -= Math.cos(this.direction)*this.acc * du;
        this.vy -= Math.sin(this.direction)*this.acc * du;
    }
    if (g_keys[this.GO_RIGHT]) {
        this.direction += 0.1*du;
    } else if (g_keys[this.GO_LEFT]) {
        this.direction -= 0.1*du;
    }
    this.cx += this.vx*du;
    this.cy += this.vy*du;
    this.vx /= 1+this.friction;
    this.vy /= 1+this.friction;
    this.direction = mmod(this.direction,2*Math.PI)
};

Car.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.save();
    ctx.translate(this.cx,this.cy)
    ctx.rotate(this.direction);
    ctx.translate(-this.cx,-this.cy)
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
    ctx.restore();
};

Car.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var CarEdge = this.cx;
    // Check X coords
    if ((nextX - r < CarEdge && prevX - r >= CarEdge) ||
        (nextX + r > CarEdge && prevX + r <= CarEdge)) {
        // Check Y coords
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};
