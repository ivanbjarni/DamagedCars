// =====
// UTILS
// =====

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}

function sgn(x)
{
    if(x>=0) return  x;
    return -x;
}

function mmod(x,p)
{
	res = x%p;
	if(res >= 0)
		return res;
	return res + p;
}

function angleDiff(x,y)
{
    return Math.min(Math.abs(x-y),Math.abs(x-y-Math.PI*2),Math.abs(x-y+Math.PI*2));
}