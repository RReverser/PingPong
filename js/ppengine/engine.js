//x,y -position
//speed - is a speed vector
function Ball(p, s){
	this.p = p;
	this.s = s;
}

//x,y - position
//n - normale vector of surface
function Bat(p, n, l){
	this.l = l;
	this.p = p;
	this.n = n;
}

//2*(V.N)*N-V
//Where '*' is the scalar multiplication operator, '.' is the dot product of two vectors, and '-' is the subtraction operator for two vectors. v is reflected off of the surface, and gives a reflection vector v' which is used as the new velocity of the object. 
//gl-matrix lib is used
function reflectBall(ball, bat){
	var VV = ball.s;
	var NN = vec2.normalize(bat.n);
	var dotP = 2*vec2.dot(VV,NN, [0,0]);
	var mult = vec2.multiply([dotP, dotP], NN, [0,0]);
	ball.s = vec2.subtract(VV, mult, [0,0]);
	return ball;
}

var ba = new Ball([0,0],[1,0]);
var bt = new Bat([0,0],[1,0], 400);

var ba = reflectBall(ba,bt);

console.log(ba.s);


function moveBall(ball){
	vec2.add(ball.p,ball.s,ball.p);
	return ball;
}

function playground(){
	this.objects=[];
	this.wall1 = new Bat([200, 0], [1,0], 400);
	this.wall2 = new Bat([200, 400], [0,1], 400);
	this.ball = new Ball([200,0], [1,1]);
	loop();
	function loop(){
		if(this.ball.p[1]>400 || this.ball.p[1]<0){
			this.ball=reflectBall(this.ball, this.wall2);
		};
		if(this.ball.p[0]>400 || this.ball.p[0]<0){
			this.ball=reflectBall(this.ball, this.wall1);
		}
		console.log(this.ball.p);
		this.ball=moveBall(this.ball);
		setTimeout(loop, 10);		
	}
}
