carColors = ["green","black","red","blue","orange"]

// A generic constructor which accepts an arbitrary descriptor object
function Car(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.color = carColors[Math.floor(Math.random()*carColors.length)]
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Car.prototype.vel = new vec2(0,0);
Car.prototype.pos = new vec2(100,100);
Car.prototype.halfWidth = 11;
Car.prototype.halfHeight = 7;
Car.prototype.direction = 0;
Car.prototype.acc = 0.6;
Car.prototype.friction = 0.01;
Car.prototype.tires = 0.02;
Car.prototype.color = "green"
Car.prototype.steering = 0.05;
Car.prototype.topSpeed = 9;
Car.prototype.topSteeringSpeed = 9;
Car.prototype.minSteeringSpeed = 3;


Car.prototype.update = function (du) {
    if (g_keys[this.GO_UP]) {
        this.vel.x += Math.cos(this.direction)*this.acc * du;
        this.vel.y += Math.sin(this.direction)*this.acc * du;
    } else if (g_keys[this.GO_DOWN]) {
        this.vel.x -= Math.cos(this.direction)*this.acc * du;
        this.vel.y -= Math.sin(this.direction)*this.acc * du;
    }

    if(this.vel.length()>=this.topSpeed)
        this.vel = this.vel.normalize().multiplyBy(this.topSpeed);

    mss = this.minSteeringSpeed;
    tss = this.topSteeringSpeed;
    add = angleDiff(this.vel.dir(),this.direction);
    var swayFactor = Math.min((1-((this.vel.length()-mss)/(tss-mss))*Math.max(1-(add/(Math.PI/2)),0)),1);
    console.log(swayFactor);
    if (g_keys[this.GO_RIGHT]) {
        this.direction += this.steering*du;
        this.vel.sway(this.steering*du*swayFactor);
    } else if (g_keys[this.GO_LEFT]) {
        this.direction -= this.steering*du;
        this.vel.sway(-this.steering*du*swayFactor);
    }
    this.pos.x += this.vel.x*du;
    this.pos.y += this.vel.y*du;
    this.vel.x /= 1+this.friction+this.tires*angleDiff(this.vel.dir(),this.direction);
    this.vel.y /= 1+this.friction+this.tires*angleDiff(this.vel.dir(),this.direction);
    this.direction = mmod(this.direction,2*Math.PI)

    

    if (g_keys[this.GO_RESET])
        {this.pos.x=100;
         this.pos.y=100;}  

    this.addTireParticles();
};

Car.prototype.addTireParticles = function()
{   
    var amount = Math.round(Math.abs(this.tires*Math.pow(angleDiff(this.vel.dir(),this.direction),4)*this.vel.length()*3))
    //Rear Tire Left
    particleManager.addSParticle(this.pos.x-Math.cos(this.direction)*5+Math.sin(this.direction)*3,this.pos.y-Math.sin(this.direction)*5-Math.cos(this.direction)*3,"tireMarks",amount);
    //Rear Tire right
    particleManager.addSParticle(this.pos.x-Math.cos(this.direction)*5-Math.sin(this.direction)*3,this.pos.y-Math.sin(this.direction)*5+Math.cos(this.direction)*3,"tireMarks",amount,["yellow"]);
};

Car.prototype.render = function (ctx) {
    // (pos.x, pos.y) is the centre; must offset it for drawing
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.pos.x,this.pos.y)
    ctx.rotate(this.direction);
    ctx.translate(-this.pos.x,-this.pos.y)
    ctx.fillRect(this.pos.x - this.halfWidth,
                 this.pos.y - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
    ctx.restore();
};

Car.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var CarEdge = this.pos.x;
    // Check X coords
    if ((nextX - r < CarEdge && prevX - r >= CarEdge) ||
        (nextX + r > CarEdge && prevX + r <= CarEdge)) {
        // Check Y coords
        if (nextY + r >= this.pos.y - this.halfHeight &&
            nextY - r <= this.pos.y + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};
