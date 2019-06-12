var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

const colors = ["#00008B", "#8A2BE2", "#D2691E", "#E9967A", "#20B2AA", "#9932CC", "#008000"]

const BALL_COUNT = 300
const MIN_BALL_RADIUS = 10
const BALL_RADIUS_FACTOR = 10

const MAX_BALL_VEL = 1.5


class Ball {
	constructor(x, y, radius, xVel, yVel, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.xVel = xVel;
		this.yVel = yVel;

		this.color = colors[Math.floor(Math.random() * colors.length)]
	}

	move() {
		if (this.y + this.radius >= canvas.height) {
			this.yVel = -this.yVel;
		} else if (this.y - this.radius <= 0) {
			this.yVel = -this.yVel;
		}

		if (this.x - this.radius <= 0) {
			this.xVel = -this.xVel;
		} else if (this.x + this.radius >= canvas.width) {
			this.xVel = -this.xVel;
		}

		this.x += this.xVel;
		this.y += this.yVel;
	}

	draw() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	    context.fillStyle = this.color;
	    context.fill();
	}

	distanceTo(ball) {
		return Math.sqrt((ball.x - this.x) * (ball.x - this.x) + (ball.y - this.y) * (ball.y - this.y))
	}
}

var balls = []

for (var i = 0; i < BALL_COUNT; i++) {
	var ball = new Ball(Math.random() * (canvas.width - 50) + 25, Math.random() * (canvas.height - 50) + 25, 	/* Positions */
						Math.random() * BALL_RADIUS_FACTOR + MIN_BALL_RADIUS, 									/* Radius    */
						Math.random() * (2 * MAX_BALL_VEL) - MAX_BALL_VEL, 										/* Velocities*/
						Math.random() * (2 * MAX_BALL_VEL) - MAX_BALL_VEL);				

	balls.push(ball);
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "#FF0000"
	context.lineWidth = 2;
	context.strokeRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < balls.length; i++) {
		balls[i].move()
		balls[i].draw()
	}
}

setInterval(draw, 60/1000)

