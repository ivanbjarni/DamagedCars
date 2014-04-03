entityManager=
{
	cars:[]
}

entityManager.update = function(du)
{
	for(var i=0;i<this.cars.length;i++)
	{this.cars[i].update(du);}
	
	//this.checkCollisions();
}

entityManager.render = function(ctx)
{
	for(var i=0;i<this.cars.length;i++)
	{this.cars[i].render(ctx,i);}
}

entityManager.addCar = function(descr)
{
	this.cars[this.cars.length]= new Car(descr);
}

entityManager.remCar = function(i)
{
	this.cars.splice(i,1);
}

entityManager.checkCollisions= function(car)
{
for(var j=0;j<this.cars.length;j++)
	{car.carCollide(this.cars[j]);}
}

entityManager.findClosest = function(car)
{
	mindist = 100000;
	index=-1;
	for(var j=0;j<this.cars.length;j++)
	{
		dist = distance(car.cx,car.cy,this.cars[j].cx,this.cars[j].cy);
		if((dist<mindist)&&(this.cars[j]!==car))
		{
			mindist = dist;
			index=j;
		}
	}
	if (index===-1) return -1;
	return this.cars[index];
}
