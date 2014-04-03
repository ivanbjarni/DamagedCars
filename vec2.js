function vec2(x,y) {
    this.x = x;
    this.y = y;
}

vec2.prototype.length = function()
{ return Math.sqrt((this.x*this.x)+(this.y*this.y)); }

vec2.prototype.dir = function()
{
	if(this.x==0&&this.y>=0)
		return Math.PI/2;
	if (this.x==0&&this.y<0)
		return Math.PI*3/2;
	if(this.x>0)
	return mmod(Math.atan(this.y/this.x),Math.PI*2);
	return mmod(Math.atan(this.y/this.x)+Math.PI,Math.PI*2);
}

vec2.prototype.normalize = function()
{
	var length = this.length()
	this.x /= length;
	this.y /= length;
	return this; 
}

vec2.prototype.multiplyBy = function(p)
{
	this.x *= p;
	this.y *= p;
	return this; 
}