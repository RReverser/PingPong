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
		var t1 = $('.player1').position().top;
		var t2 = $('.player2').position().top;
		var l1 = $('.player1').position().left;
		var l2 = $('.player2').position().left;
		// lets check the ball's position
		if (t >= h-16) moveY = 'up';
		if (t <= 1) moveY = 'down';
		if ( (l >= w-16) || ( (l >= l2-16) && (t>=t2) && (t+16<t2+40) ) )
			moveX = 'right';
		if ((l <= 1) || ( (l <= l1+1) && (t>=t1) && (t+16<t1+40) ) ) 
			moveX = 'left';
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

Dynamic.prototype.move = function(p1, p2) {
	if (p1) {
		var top1 = p1.y - 15;
		var left1 = p1.x - 2;
		$('.player1').stop().animate({'top':top1+'px','left':left1+'px'}, 400);
	}
		
	if (p2) {
		var top2 = p2.y - 15;
		var left2 = p2.x - 2;
		$('.player2').stop().animate({'top':top2+'px','left':left2+'px'}, 400);
	}
}