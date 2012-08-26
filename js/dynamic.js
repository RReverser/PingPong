Dynamic = function(height, width) {

	w = width;
	h = height;
	this.x1 = 0;
	this.x2 = 0;
	this.y1 = 0;
	this.y2 = 0;
	
	ballX = 0;
	ballY = 0;
	
	console.log("Field created: "+w+'x'+h);
	$('div.field').css({'width':w,'height':h});	

	speed = 5;
	$ball = $('.ball');
	moveX = 'right';
	moveY = 'down';
}

Dynamic.prototype.check = function() {
	var l = $ball.position().left;
	var t = $ball.position().top;
	var t1 = $('.player1').position().top;
	var t2 = $('.player2').position().top;
	var l1 = $('.player1').position().left;
	var l2 = $('.player2').position().left;
	// lets check the goal
	if ((l+16>=w) && (t>75) && (t<225)) {
		n = parseInt($('.score span').eq(1).html());
		$('.score span').eq(1).html(n+1);
		$ball.css({'top':'0px','left':'390px'});
		moveX = 'left';
		moveY = 'down';
		return false;
	}
	if ((l<=1) && (t>75) && (t<225)) {
		n = parseInt($('.score span').eq(0).html());
		$('.score span').eq(0).html(n+1);
		$ball.css({'top':'0px','left':'0px'});
		moveX = 'right';
		moveY = 'down';
		return false;
	}
	// lets check the ball's position
	if (t >= h-16) moveY = 'up';
	if (t <= 1) moveY = 'down';
	if ( (l >= w-16) || ( (l+16 >= l2) && (t>=t2) && (t+16<t2+40) && (l-5<l2) ) )
		moveX = 'left';
	if ((l <= 1) || ( (l <= l1+1) && (t>=t1) && (t+16<t1+40) && (l>l1-5) ) ) 
		moveX = 'right';
	if (moveY == 'down') {
		t += speed;
	} else {
		t -= speed;
	}
	if (moveX == 'right') {
		l += speed;
	} else {
		l -= speed;
	}
//$ball.stop().animate({'top':t+'px','left':l+'px'},100);
	$ball.css({'top':t+'px','left':l+'px'});
}

Dynamic.prototype.move = function(p11, p12, p21, p22) {
	function vectorLength(vector) {
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	}

	function vectorAngle(vector) {
		var angle = Math.asin(vector.y / vectorLength(vector)) / Math.PI * 180;
		if (vector.x < 0) angle = 180 - angle;
		return angle;
	}

	if (p11) {
		var top1 = p11.y - 15;
		var left1 = p11.x - 2;
		$('.player1').stop().animate({'top':top1+'px','left':left1+'px', 'rotate':vectorAngle({x: p12.x - p11.x, y: p12.y - p11.y})+'deg'}, 200);
	}
		
	if (p21) {
		var top2 = p21.y - 15;
		var left2 = p21.x - 2;
		$('.player2').stop().animate({'top':top2+'px','left':left2+'px', 'rotate':vectorAngle({x: p22.x - p21.x, y: p22.y - p21.y})+'deg'}, 200);
	}
}