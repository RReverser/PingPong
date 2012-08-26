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
	angle = 0;//-Math.PI/2.5;
	$ball = $('.ball');
}

Dynamic.prototype.check = function() {
	var l = $ball.position().left;
	var t = $ball.position().top;
	var t1 = $('.player1').position().top;
	var t2 = $('.player2').position().top;
	var l1 = $('.player1').position().left;
	var l2 = $('.player2').position().left;
	
	if ((l+16>=w) && (t>75) && (t<225)) {
		n = parseInt($('.score span').eq(1).html());
		$('.score span').eq(1).html(n+1);
		$ball.css({'top':'2px','left':'380px'});
		angle = 5*Math.PI/4;
		return false;
	}
	if ((l<=1) && (t>75) && (t<225)) {
		n = parseInt($('.score span').eq(0).html());
		$('.score span').eq(0).html(n+1);
		$ball.css({'top':'2px','left':'2px'});
		angle = -Math.PI/4;
		return false;
	}
	if ( ((l+15>=w)||(l<=1)) && ( (t<75)||(t>255) )) {
		angle = Math.PI-angle;		
	}
	
	if ((t >= h-16) || (t <= 1)) angle = -angle;
	
	if ((t>t1-10) && (t<t1+40)) {
		var an1 = 90-parseFloat( $('.player1').rotate() );
		var k1 = Math.tan(-an1*Math.PI/180);
		var c1 = t1-k1*l1;
		var r1 = Math.abs((t)+(-k1*l)-c1)/Math.sqrt(Math.pow(k1,2)+1);
		if (Math.abs(r1) <= 4) angle = -angle+an1;
	}
	if ((t>t2-10) && (t<t2+40)) {
		var an2 = 90-parseFloat( $('.player2').rotate() );
		var k2 = Math.tan(-an2*Math.PI/180);
		var c2 = t2-k2*l2;
		var r2 = Math.abs((t)+(-k2*l)-c2)/Math.sqrt(Math.pow(k2,2)+1);
		if (Math.abs(r2) <= 4) angle = -angle+an2;
	}

	t -= speed*Math.sin(angle);
	l += speed*Math.cos(angle);
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