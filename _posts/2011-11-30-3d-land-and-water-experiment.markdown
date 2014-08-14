---
layout: post
title:  "3D Land & Water Coding Experiment"
date:   2012-08-30 12:00:00
categories: graphics prerendered
---

Have you ever played the video game called From Dust? It contains intriguing land, water, and lava simulation. Since first playing it, I have been fascinated with the results of Ubisoft’s very interesting simulation system. I developed an inspired guess as to how the basic algorithm and technique might work. During some holiday downtime, I put code to the concept and came up with the following.

### Pre-rendered Heightmaps & Results

<iframe class="video-youtube" data-src="//www.youtube.com/embed/QUKnzkeWxOI?rel=0" frameborder="0" allowfullscreen></iframe>

The algorithm steps through a pair of 2 Dimensional arrays containing the height of land and water at each coordinate in the grid. During each step, it determines if and where the water would run downhill, then adjusts the old and new values accordingly. The resolution of the grid was limited by the performance of Flash, which I could no doubt have improved dramatically by using more advanced stage drawing techniques. After running and adjusting the simulations in Flash, I switched the movie to export a JPG image of each frame. That sequence was then run through After Effects (frame blend) to smooth the adjustments. The final sequences were then applied as separate Y-axis displacement maps on “land” and “water” objects in Lightwave 3D.

In the first of the two animations (mountain springs running downhill into a valley), a trio of simple “water emitters” put out a finite amount of water at the tops of the hills, and the algorithm runs it downhill to pool at the bottom. The land was generated with high values at the edges, and low values at the center, with a touch of randomization of the terrain (a “valley”).

In the second (sea mountain rising), a flat land mass with water sitting on top (an “ocean”) is affected by a strong “land emitter” which pushes a mountain out of the sea floor. The water is reacting by being displaced downhill from the land. The circular wave of water was the natural product of the algorithm I created, which seems to indicate being on the right track for how the video game works internally.

Why generate the frames in Flash AS3? Frankly, that choice was due to my own limitations as a programmer. Also, my algorithm fails to ever resolve the water to a natural state of a flat surface.

I now have an even greater sense of awe for what the Ubisoft team achieved with their amazing video game. For example, the game contains dynamic water foam textures which give realistic cues to how the water runs downhill and around obstacles.

The Flash AS3 source code is below. I realize my coding techniques are horrible, and not even object oriented. Had this been for anything other than a proof-of-concept fun project, many loose ends would be wrapped up. There was nothing else in the Flash movie, as it creates all needed movieclips dynamically. If you want to try it, just create a new Flash (ActionScript v3) document and paste the below into the frame 1 actions. It reflects the coding for the “mountain rising out of the sea” effect.

{% highlight javascript %}

import flash.display.MovieClip;
import flash.events.MouseEvent;
import flash.events.KeyboardEvent;
import flash.geom.Matrix;
//import com.adobe.images.JPGEncoder; // external library used for saving frames

stop();
var frameNum:int = 99;

var resX:int = 40;
var resY:int = resX;

var paintStrength:Number = 1;

var tileSpacing:int = 0;
var tileWidth:int = stage.stageWidth/(resX+(resX*tileSpacing));
var tileHeight:int = stage.stageHeight/(resY+(resY*tileSpacing));

var alreadyEmitted:Number = 0;
var maxEmitted:Number = 0;

var edgeValue:Number =  0;
var maxBoundary:int = resX-1;
var drawValue:Number = paintStrength;
var editMode:String = "water";
var hideLand:Boolean = false;
var hideWater:Boolean = false;

var waterInit:Number = 0.1;
var landInit:Number = 0.05;

var updateTimer:Timer = new Timer(250);
updateTimer.addEventListener(TimerEvent.TIMER, advanceFrame);
updateTimer.start();

// used to capture frames in non-realtime
//stage.addEventListener(KeyboardEvent.KEY_DOWN, advanceFrame);

function advanceFrame(e:TimerEvent):void{
	updateMap(null)//commands
}

var parent_mc:MovieClip = new MovieClip();
stage.addChild(parent_mc);

var landMap:Array = new Array();
var landHeight:Number = 0;
landMap.push(new Array());
for (var yInit:int=0; yInit<resy ; yInit++) {
	var newRow:Array = new Array();
	//newRow.splice(0,newRow.length);
	newRow[0] = new Array();
	for (var xInit:int=0; xInit<resX; xInit++) {
		landHeight = landInit;//+(Math.random()*.1);
		newRow[0].push(landHeight);
	}
	landMap[0].push(newRow);
}

var waterMap:Array = new Array();
waterMap.push(new Array());
for (yInit=0; yInit<resY; yInit++) {
	var waterRow:Array = new Array();
	//newRow.splice(0,newRow.length);
	waterRow[0] = new Array();
	for (xInit=0; xInit<resX; xInit++) {
		waterRow[0].push(waterInit);
	}
	waterMap[0].push(waterRow);
}

function calculate_new(x:int, y:int):void {
	var newVal:Number = 0;
	var newDelta:Number = 0;
	var proposedX:int = 0;
	var proposedY:int = 0;
	
	var minLevel:Number = 100;
	var minX:int = 0;
	var minY:int = 0;
	
	var curLand:Number;
	var curWater:Number;
	var checkLand:Number;
	var checkWater:Number;
	
	curLand = landMap[0][y][0][x];
	curWater = waterMap[0][y][0][x];
	for ( var neighborX:int=-1; neighborX<=1; neighborX++) {
		for ( var neighborY:int=-1; neighborY<=1; neighborY++) {

			proposedX = x+neighborX;
			proposedY = y+neighborY;
			if (
				(proposedX&lt;0) || (proposedY&lt;0) ||
				(proposedX>maxBoundary) || (proposedY>maxBoundary) 
			) {
				//trace('skipping edge');
			}
			else {
				checkLand = landMap[0][proposedY][0][proposedX];
				checkWater = waterMap[0][proposedY][0][proposedX];
				if (neighborX==0 && neighborY==0) {
					//trace('skipping self');
				}
				else {
					if ((checkLand+checkWater)<minlevel ) {
						minLevel = checkLand+checkWater;
						minX = proposedX;
						minY = proposedY;
						//trace('new tallness found: ' + minLevel);
					}
				}
			}
		}
	}
	compare_cells(x, y, minX, minY);
}

function compare_cells(curX:int, curY:int, checkX:int, checkY:int):void {
	var delta:Number;
	var curLand:Number = landMap[0][curY][0][curX];
	var curWater:Number = waterMap[0][curY][0][curX];
	var checkLand:Number = landMap[0][checkY][0][checkX];
	var checkWater:Number = waterMap[0][checkY][0][checkX];
	var idealLevel:Number = 0;

	// if there is water here
	if (curWater > 0) {
		//if this water should fall
		if ((curLand+curLand) > (checkLand+checkWater) ) { 
			
			// get the goal average height between the two including water
			idealLevel = (curLand + curWater + checkLand + checkWater)/2;
			if (idealLevel > curLand) { idealLevel = curLand};

			delta = curLand + curWater - idealLevel;
			delta *= 0.3;
			waterMap[0][curY][0][curX] -= delta;
			waterMap[0][checkY][0][checkX] += delta;
		}
	}
}

function updateMap(eventObject:MouseEvent):void {
	frameNum++;
		
	// clean up stage from last update
    if(parent_mc.numChildren!=0){
        var cond:int = parent_mc.numChildren;
        while( cond -- ) {
            parent_mc.removeChildAt( cond );
        }
    }
	
	var shading:Number = 0;
	for (var k in waterMap[0]) {
		for (var i in waterMap[0][k][0]) {
			var square:Shape = new Shape();
			var squareMC:MovieClip = new MovieClip();
			calculate_new(i,k);
			
			if (waterMap[0][k][0][i]>0.001 ) { // water is on this spot
				shading = get_water_color(k,i);
			}
			else { // land is showing on this spot
				shading = get_land_color(k,i);
			}
	
			square.graphics.beginFill(shading);
			square.graphics.drawRect(0, 0, tileWidth, tileHeight);
			square.graphics.endFill();
	
			squareMC.addChild(square);
			squareMC.x = (i * (tileWidth + tileSpacing + tileSpacing)) + tileSpacing;
			squareMC.y = (k * (tileHeight + tileSpacing + tileSpacing)) + tileSpacing;
			
			parent_mc.addChild(squareMC);
		}
	}

	//save_screenshot();  // used to capture frames in non-realtime
	
	// water emmitters
	emit_water();
	progress_land();
	trace(frameNum);
}

function get_land_color(y:int, x:int):Number {
	var color:Number = (int)(landMap[0][y][0][x] * 0xFF);
	if (color < 0) { color = 0 }
	if (color > 255) { color = 255 }
	color = (color < < 16) | (color << 8) | color; // maps to grey of RGB
	return(color);
}

function get_water_color(y:int, x:int):Number {
	var color:Number = 0;
	if (waterMap[0][y][0][x] >0)
		color = (waterMap[0][y][0][x] + landMap[0][y][0][x]) * 0xFF;
	
	if (color < 0) { color = 0 }
	if (color > 255) { color = 255 }

	// the below line draws the water in greyscale, otherwise shades of blue
	// as in an RGB value, the blue is in the least significant digits
	//color = (color < < 16) | (color << 8) | color; // maps to grey of RGB
	return(color);
}

/* 
function save_screenshot():void {
	var jpgSource:BitmapData = new BitmapData (stage.stageWidth, stage.stageHeight);
	jpgSource.draw(stage);
	
	var jpgEncoder:JPGEncoder = new JPGEncoder(100);
	var jpgStream:ByteArray = jpgEncoder.encode(jpgSource);
	var file:FileReference = new FileReference();
	
	file.save(jpgStream, 'riseLand-'+frameNum+'.jpg');
}
*/

function emit_water():void {
	if (alreadyEmitted < maxEmitted) {
		if (waterMap[0][int(resY*.30)][0][int(resX*0.95)]<.3) {
			waterMap[0][int(resY*.30)][0][int(resX*0.95)] += .2;
			alreadyEmitted += .2;
		}
		if (waterMap[0][int(resY*.10)][0][int(resX*0.45)]<.3) {
			waterMap[0][int(resY*.10)][0][int(resX*0.45)] += .1;
			alreadyEmitted += .1;
		}
			
		if (waterMap[0][int(resY*.85)][0][int(resX*0.15)]<.3) {
			waterMap[0][int(resY*.85)][0][int(resX*0.15)]+= .05;
			alreadyEmitted += .05;
		}
	}
}

var landAdded:Number = 0;
var landMax:Number = 200;
var cur_landshift:Number = 0;
var max_landshift:Number = 100;

function progress_land():void {
	var proposedX:int;
	var proposedY:int;

	// these are the land emitters in the center.
	if (landAdded < landMax) {
		landMap[0][int(resY*.5)][0][int(resX*0.5)]+= 2;
		landAdded += 2;
	}
	
	cur_landshift++;
	if (cur_landshift > max_landshift) { return; }

	
	for (var k in landMap[0]) {
		for (var i in landMap[0][k][0]) {
			for ( var neighborX:int=-1; neighborX< =1; neighborX++) {
				for ( var neighborY:int=-1; neighborY<=1; neighborY++) {
					proposedX = i+neighborX;
					proposedY = k+neighborY;
					if (
						(proposedX&lt;0) || (proposedY&lt;0) ||
						(proposedX>resX-1) || (proposedY>resY-1) 
					) {
						//trace('skipping land edge');
					}
					else {
						shift_land(i, k, proposedX, proposedY);
					}
				}
			}
		}
	}
}

function shift_land(curX:int, curY:int, checkX:int, checkY:int):void {
	var delta:Number = landMap[0][curY][0][curX] - landMap[0][checkY][0][checkX];
	delta *= .5;
	landMap[0][curY][0][curX] -= delta;
	landMap[0][checkY][0][checkX] += delta;
}
{% endhighlight %}
<script type="text/javascript" src="/javascript/youtube-video-sizer.js"></script>