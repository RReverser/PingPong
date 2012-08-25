	var video, canvas, context, detector = new AR.Detector(), dynamic;

	function tick() {
		requestAnimationFrame(tick);

		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			context.drawImage(video, canvas.width, 0, -canvas.width, canvas.height);

			var markers = detector.detect(context.getImageData(0, 0, canvas.width, canvas.height));

			if (!markers.length) return;

			markers.sort(function(m1, m2) { return m1.id - m2.id });

			drawCorners(markers);
			drawId(markers);

			var avgPoints = markers.map(function(marker) {
				var avgPoint = marker.corners.reduce(function(a, b) {
					return {x: a.x + b.x, y: a.y + b.y};
				});

				avgPoint.x /= marker.corners.length;
				avgPoint.y /= marker.corners.length;

				return avgPoint;
			});

			dynamic.move.apply(dynamic, avgPoints);
		}
	}

	addEventListener('load', function() {

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

		if (!navigator.getUserMedia) {
			throw new Error('Your browser does not support camera.');
		}

		['video', 'canvas'].forEach(function(name) {
			window[name] = document.getElementById(name);
		});

		context = canvas.getContext('2d');

		dynamic = new Dynamic(canvas.height, canvas.width);

		navigator.getUserMedia({video: true}, function (stream) {
			video.src = window.webkitURL ? window.webkitURL.createObjectURL(stream) : stream;
		});

		requestAnimationFrame(tick);
	});

	function drawCorners(markers){

		var corners, corner, i, j;

		context.lineWidth = 3;

		for (i = 0; i !== markers.length; ++ i){
			corners = markers[i].corners;

			context.strokeStyle = "red";
			context.beginPath();

			for (j = 0; j !== corners.length; ++ j){
				corner = corners[j];
				context.moveTo(corner.x, corner.y);
				corner = corners[(j + 1) % corners.length];
				context.lineTo(corner.x, corner.y);
			}

			context.stroke();
			context.closePath();

			context.strokeStyle = "green";
			context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
		}

      //console.log(markers);
  }

  function drawId(markers){
    /*
      var corners, corner, x, y, i, j;
      
      context.strokeStyle = "blue";
      context.lineWidth = 1;
      
      for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        
        x = Infinity;
        y = Infinity;
        
        for (j = 0; j !== corners.length; ++ j){
          corner = corners[j];
          
          x = Math.min(x, corner.x);
          y = Math.min(y, corner.y);
        }

        context.strokeText(markers[i].id, x, y)
      }
      */
  }
