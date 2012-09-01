function Vector(a, b) {
	if (a && b && !isNaN(a.x) && !isNaN(a.y) && !isNaN(b.x) && !isNaN(b.y)) {
		this.x = b.x - a.x;
		this.y = b.y - a.y;
	}

	return this;
}

Vector.prototype = {
	x: 0,
	y: 0,
	getLength: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	getAngle: function () {
		var angle = Math.asin(this.y / this.getLength()) / Math.PI * 180;
		if (this.x < 0) {
			angle = 180 - angle;
		}
		return angle;
	}
}

function Dynamic(options) {
	$.extend(this, options);

	$('#field').css({
		'width': this.width + 'px',
		'height': this.height + 'px'
	});

	this.jqBall = $('#ball');
	this.jqPlayer = $('.player');
	this.jqScore = $('.score');
}

Dynamic.prototype = {
	speed: 5,
	angle: -Math.PI / 3,
	doCheck: true
}

Dynamic.prototype.check = function () {
	if (!this.doCheck) {
		this.doCheck = true;
		this.speed -= 20;
		return false;
	}

	var ballPos = this.jqBall.position();

	if ((ballPos.left + 16 >= this.width) && (ballPos.top > 75) && (ballPos.top < 225)) {
		this.jqScore.eq(1).html(function (index, n) { return Number(n) + 1 });

		this.jqBall.css({left: 380, top: 2});

		this.angle = 5 * Math.PI / 4;

		return false;
	}

	if ((ballPos.left <= 1) && (ballPos.top > 75) && (ballPos.top < 225)) {
		this.jqScore.eq(0).html(function (index, n) { return Number(n) + 1 });

		this.jqBall.css({left: 2, top: 2});

		this.angle = -Math.PI / 4;

		return false;
	}

	if (((ballPos.left + 15 >= this.width) || (ballPos.left <= 1)) && ((ballPos.top < 75) || (ballPos.top > 225))) {
		this.angle = Math.PI - this.angle;
	}

	if ((ballPos.top >= this.height - 16) || (ballPos.top <= 1)) {
		this.angle = -this.angle;
	}

	var dynamic = this;

	this.jqPlayer.each(function () {
		var $this = $(this),
			an = 90 - parseFloat($this.rotate()),
			k = Math.tan(-an * Math.PI / 180),
			c = $this.position().top - k * $this.position().left,
			r = Math.abs((ballPos.top) + (-k * ballPos.left) - c) / Math.sqrt(Math.pow(k, 2) + 1);

		if (Math.abs(r) <= 4) {
			dynamic.angle = Math.PI - dynamic.angle + an / 180 * Math.PI;
			dynamic.doCheck = false;
			dynamic.speed = 25;
		}
	});

	ballPos.top -= this.speed * Math.sin(this.angle);
	ballPos.left += this.speed * Math.cos(this.angle);

	this.jqBall.css(ballPos);
}

Dynamic.prototype.move = function (p11, p12, p21, p22) {
	var dynamic = this;

	[
		[p11, p12],
		[p21, p22]
	]
	.forEach(function (points, index) {
		if (!points[0]) return;

		//this.jqPlayer[0].stop().animate({'top':top1+'px','left':left1+'px', 'rotate':vectorAngle({x: p12.x - p11.x, y: p12.y - p11.y})+'deg'}, 200);
		var $player = dynamic.jqPlayer.eq(index);

		$player.css({
			left: points[0].x - 2,
			top: points[0].y - 15
		});

		$player.rotate(Vector.apply(new Vector, points).getAngle() + 'deg');
	});
}