var w, 
	maxDistance,
	halfWidth, halfHeight
;

function setup() {
	createCanvas(640, 360);

	halfWidth = width * 0.5;
	halfHeight = height * 0.5;
	maxDistance = Math.sqrt((halfWidth * halfWidth) + (halfHeight * halfHeight))
	w = new Walker();
}

function draw() {
	background(51);
	w.display();
	w.update();
}

function Walker(){

	this.l = 50;
	this.h = this.l / Math.sqrt(3);
	this.a = this.l * 0.5;
	this.o = this.h * Math.sin(radians(30));


	this.pos = createVector(width/2, height/2);
	this.vel = createVector(0, 0);
	this.acc = p5.Vector.fromAngle(random(TWO_PI));
	this.acc.setMag(0.05);

	this.heading = 0;
	this.speed = 0;
	this.distance = 0;
	this.fillValue = 0;

	this.update = function(){

		var mouse = createVector(mouseX, mouseY),
			toMouse = p5.Vector.sub(mouse, this.pos)
		;

		this.heading = toMouse.heading() + radians(90);
		this.distance = p5.Vector.dist(this.pos, mouse);
		this.speed = map(this.distance, 0, maxDistance, 0, 0.05, true);
		this.fillValue = map(this.distance, 0, maxDistance, 0, 255, true);

		this.acc = p5.Vector.sub(mouse, this.pos);
		this.acc.normalize();
		this.acc.mult(this.speed);

		this.vel.add(this.acc);
		this.pos.add(this.vel);
	}

	this.display = function(){
		
		fill(this.fillValue, 0, 0);

		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		triangle(0, -this.h, this.a, this.o, -this.a, this.o);
		pop();
	}
}