importScripts('aruco/src/cv.js', 'aruco/src/aruco.js');

var detector = new AR.Detector();

addEventListener('message', function(event) {
	postMessage(detector.detect(event.data));
});