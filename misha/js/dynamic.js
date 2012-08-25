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
	moveX = 'left';
	moveY = 'down';
	
	setInterval(function() {
		var l = $ball.position().left;
		var t = $ball.position().top;
		var t1 = parseInt($('.player1').position().top);
		var t2 = $('.player2').position().top;
		var l1 = $('.player1').position().left;
		var l2 = $('.player2').position().left;
		// lets check the ball's position
		if (t >= h-16) moveY = 'up';
		if (t <= 1) moveY = 'down';
		if ( (l >= w-16//) || (
				//(l >= parseInt($('.player2').position().left)-16) && 
				//(t < parseInt($('.player2').position().top)) &&
				//(t > parseInt($('.player2').position().top)+16)
			)) moveX = 'right';
		if ((l <= 1) || ( (l <= l1+10) && (t>t1) && (t<t1+40) ) ) moveX = 'left';
		if (moveY == 'down') {
			t += speed;
		} else {
			t -= speed;
		}
		if (moveX == 'left') {
			l += speed;
		} else {
			l -= speed;
		}
//$ball.stop().animate({'top':t+'px','left':l+'px'},100);
		$ball.css({'top':t+'px','left':l+'px'});
	}, 10);
}

Dynamic.prototype.move = function(_x1, _y1, _x2, _y2) {
		var top1 = _x1-15;
		var top2 = _x2-15;
		var left1 = _y1-2;
		var left2 = _y2-2;
		$('.player1').stop().animate({'top':top1+'px','left':left1+'px'}, 400);
		$('.player2').stop().animate({'top':top2+'px','left':left2+'px'}, 400);
}