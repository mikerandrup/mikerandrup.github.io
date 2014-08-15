---
layout: post
title:  "Find Point along Bezier Curve in JavaScript"
date:   2012-08-15 12:00:00
categories: javascript graphics
---

I adapted this from an excellent C++ example yesterday and wanted to share. This is for an HTML5 game (like) project I'm working on where interpolating along vector art created in Adobe Illustrator is needed (more on that in a future post hopefully!)

{% highlight javascript %}
///////////////////////////////////////////////////////////////
// JavaScript Implementation of the DeCasteljau Algorithm
// Based on C++ Implementation from 
//       http://cubic.org/docs/bezier.htm
// which credits Nils Pipenbrinck aka Submissive/Cubic & $eeN
// this particular implementation written by Mike Randrup Aug 30 2012
///////////////////////////////////////////////////////////////
 
/* Usage:
	// A & D are the start and end points of the line
	// B & C are the handle (influence) points

	myPointA = bezier.point(40,100);
	myPointB = bezier.point(80,20);
	myPointC = bezier.point(150,180);
	myPointD = bezier.point(260,100);

	time = 0.5; // halfway through curve
	resultPoint = bezier.calc(
		myPointA, myPointB,
		myPointC, myPointD,
		time
	);
*/   

var bezier = (function(){

	var Point = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
		return this;
	}
	var interpolateLinear = function (pointA, pointB, time) {
		return {
			x: pointA.x + (pointB.x - pointA.x) * time,
			y: pointA.y + (pointB.y - pointA.y) * time,
		}
	}

	var bezObj = {
		point: function(x, y) {
			return new Point(x, y);
		},

		calc: function(p1, p2, p3, p4, time) {
			var ab = interpolateLinear(p1, p2, time),
				bc = interpolateLinear(p2, p3, time),
				cd = interpolateLinear(p3, p4, time),
				abbc = interpolateLinear(ab, bc, time),
				bccd = interpolateLinear(bc, cd, time);

			return interpolateLinear(abbc, bccd, time);
		},
	}
	return bezObj;
}());
console.log("bezier loaded", bezier);   

{% endhighlight %}

Plotting and animating the resulting curve in a canvas is a good way to see it working. Here is what that might look like.

{% highlight html %}
<!DOCTYPE html>
<html lang="us-en">
<head>
<title>Bezier curve test by Mike Randrup</title>
</head>
<body>
<canvas id="output" width="600" height="400"></canvas>
<script type="text/javascript" src="https://cdn.rawgit.com/mikerandrup/BezierJS/master/bezier.js"></script>
<script type="text/javascript">
   window.onload = function() {

		console.log("main running");

		var i,
			t,
			steps = 200,
			resultPoint,

			myPointA = bezier.point(40,100),
			myPointB = bezier.point(80,20),
			myPointC = bezier.point(700,180),
			myPointD = bezier.point(550,100),

			canvasEl = document.getElementById("output"),
			canvasContext = canvasEl.getContext("2d");

		var nextFrame = function() {
			moveControlPoints();
			drawCurve();
		};

		var moveControlPoints = function() {
			if (myPointA.x>0 && myPointA.x < 600) myPointA.x++;
			if (myPointB.x>0 && myPointB.x < 600) myPointB.x++;

			if (myPointC.y>0 && myPointC.y < 400) myPointC.y--;
			if (myPointD.x>0 && myPointD.x < 600) myPointD.x--;

		};

		var drawCurve = function () {
			canvasContext.fillStyle = "#FFF";
			canvasContext.fillRect(0,0,600,400);

			canvasContext.fillStyle = "#F00";

			for (i=0; i<steps ; i++) {
				t = i / (steps-1);
				resultPoint = bezier.calc(
					myPointA, myPointB,
					myPointC, myPointD,
					t
				);

				canvasContext.fillRect(resultPoint.x, resultPoint.y, 2, 2);
			}
		};

		setInterval(nextFrame, 50); // should be requestAnimationFrame
	}
</script></body></html>

{% endhighlight %}