var $;

function Dynamic(height, width) {

	this.width = width;
	this.height = height;

	$('div.field').css({
		'width': this.width,
		'height': this.height
	});

	this.speed = 5;
	this.angle = -Math.PI / 3;
	this.jqBall = $('.ball');
	this.jqPlayer1 = $('.player1');
	this.jqPlayer2 = $('.player2');
	this.doCheck = true;

	var ballPos = this.jqBall.position();
	this.ball = new Ball([ballPos.left, ballPos.top], [Math.cos(this.angle), Math.sin(this.angle)]);
	this.walls = [
		new Bat([0,0], [0,1], this.width),
		new Bat([this.width,0], [-1,0], this.height),
		new Bat([0,this.height], [0,-1], this.width),
		new Bat([0,0], [1,0], this.height)
	];

	var player1Pos = this.jqPlayer1.position(), player2Pos = this.jqPlayer2.position();
	this.player1 = new Bat([player1Pos.left, player1Pos.top], [1,0]);
	this.player2 = new Bat([player2Pos.left, player2Pos.top], [-1,0]);
}

Dynamic.prototype.check = function () {
	var l = this.jqBall.position().left;
	var t = this.jqBall.position().top;
	var t1 = this.jqPlayer1.position().top;
	var t2 = this.jqPlayer2.position().top;
	var l1 = this.jqPlayer1.position().left;
	var l2 = this.jqPlayer2.position().left;

	if ((l + 16 >= this.width) && (t > 75) && (t < 225)) {
		$('.score span').eq(1).html(function(index, n) { return n + 1 });
		this.jqBall.css({
			'top': '2px',
			'left': '380px'
		});
		this.angle = 5 * Math.PI / 4;
		return false;
	}
	if ((l <= 1) && (t > 75) && (t < 225)) {
		$('.score span').eq(0).html(function(index, n) { return n + 1 });
		this.jqBall.css({
			'top': '2px',
			'left': '2px'
		});
		this.angle = -Math.PI / 4;
		return false;
	}
	if (((l + 15 >= this.width) || (l <= 1)) && ((t < 75) || (t > 225))) {
		this.angle = Math.PI - this.angle;
	}

	if ((t >= this.height - 16) || (t <= 1)) this.angle = -this.angle;

	if ((t > t1 - 10) && (t < t1 + 40) && (l < l1 + 40) && (l > l1 - 40)) {
		var an1 = 90 - parseFloat(this.jqPlayer1.rotate());
		var k1 = Math.tan(-an1 * Math.PI / 180);
		var c1 = t1 - k1 * l1;
		var r1 = Math.abs((t) + (-k1 * l) - c1) / Math.sqrt(Math.pow(k1, 2) + 1);
		an1 = an1 / 180 * Math.PI;
		if (Math.abs(r1) <= 4) {
			this.angle = Math.PI - this.angle + an1;
			this.doCheck = false;
			this.speed += 20;
		}
	}
	if ((t > t2 - 10) && (t < t2 + 40) && (l < l2 + 40) && (l > l2 - 40)) {
		var an2 = 90 - parseFloat(this.jqPlayer2.rotate());
		var k2 = Math.tan(-an2 * Math.PI / 180);
		var c2 = t2 - k2 * l2;
		var r2 = Math.abs((t) + (-k2 * l) - c2) / Math.sqrt(Math.pow(k2, 2) + 1);
		an2 = an2 / 180 * Math.PI;
		if (Math.abs(r2) <= 4) {
			this.angle = Math.PI - this.angle + an2;
			this.doCheck = false;
			this.speed += 20;
		}
	}

	t -= this.speed * Math.sin(this.angle);
	l += this.speed * Math.cos(this.angle);
	this.jqBall.css({
		'top': t + 'px',
		'left': l + 'px'
	});
}

Dynamic.prototype.move = function (p11, p12, p21, p22) {
	function vectorLength(vector) {
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	}

	function vectorAngle(vector) {
		var this.angle = Math.asin(vector.y / vectorLength(vector)) / Math.PI * 180;
		if (vector.x < 0) this.angle = 180 - this.angle;
		return this.angle;
	}

	if (p11) {
		var top1 = p11.y - 15;
		var left1 = p11.x - 2;
		this.jqPlayer1.stop().animate({
			'top': top1 + 'px',
			'left': left1 + 'px',
			'rotate': vectorAngle({
				x: p12.x - p11.x,
				y: p12.y - p11.y
			}) + 'deg'
		}, 200);
	}

	if (p21) {
		var top2 = p21.y - 15;
		var left2 = p21.x - 2;
		this.jqPlayer2.stop().animate({
			'top': top2 + 'px',
			'left': left2 + 'px',
			'rotate': vectorAngle({
				x: p22.x - p21.x,
				y: p22.y - p21.y
			}) + 'deg'
		}, 200);
	}
}