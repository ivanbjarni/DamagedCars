entityManager=
{
	balls:[]
}

entityManager.update = function(du)
{
	for(var i=0;i<this.balls.length;i++)
	{this.balls[i].update(du);}
	
	//this.checkCollisions();
}

entityManager.render = function(ctx)
{
	for(var i=0;i<this.balls.length;i++)
	{this.balls[i].render(ctx,i);}
}

entityManager.addBall = function(descr)
{
	this.balls[this.balls.length]= new Ball(descr);
}

entityManager.remBall = function(i)
{
	this.balls.splice(i,1);
}

entityManager.checkCollisions= function(ball)
{
for(var j=0;j<this.balls.length;j++)
	{ball.ballCollide(this.balls[j]);}
}

entityManager.findClosest = function(ball)
{
	mindist = 100000;
	index=-1;
	for(var j=0;j<this.balls.length;j++)
	{
		dist = distance(ball.cx,ball.cy,this.balls[j].cx,this.balls[j].cy);
		if((dist<mindist)&&(this.balls[j]!==ball))
		{
			mindist = dist;
			index=j;
		}
	}
	if (index===-1) return -1;
	return this.balls[index];
}
