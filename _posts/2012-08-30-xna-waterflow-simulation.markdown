---
layout: post
title:  "Realtime 3D version of Water Flow Simulation written for Microsoft XNA Framework"
date:   2012-08-30 12:00:00
categories: graphics realtime3d 
---

Though this is admittedly from earlier this year, hopefully it's still interesting.  This is the realtime 3D experiment written on the Microsoft XNA (Xbox, Windows, Windows Phone) Gaming Framework in C#. This is some of my earliest work in the C# language, so much refactoring could occur.

I built in and ran the simuluation with several different styles of terrain, and steered and emitted water with keyboard shortcuts.

### Terraced Hillside

<iframe class="video-youtube" data-src="//www.youtube.com/embed/Rli_dNSI0vU?rel=0" frameborder="0" allowfullscreen></iframe>

Here the terrain is made up of several "bucket" shaped terraced levels.  The water is added from the top of the hill, and runs down to the bottom while remaining trapped in the bucket shapes.


### Islands and Tidal Wave

<iframe class="video-youtube" data-src="//www.youtube.com/embed/RSD95quZu98?rel=0" frameborder="0" allowfullscreen></iframe>

This is more of an island terrain with existing water level.  You can see a simple "tidal wave" effect created by rapidly adding water to the cells at the edge of the map.

### Source Code

Starting point is [tutorial from Riemer Grootjans](http://www.riemers.net/eng/Tutorials/XNA/Csharp/series4.php). This early [commit shows my work](https://github.com/mikerandrup/XNA_WaterFlow3D/commit/134e654f60b0dff71a5402227d2f058122ae1c86) between the base tutorial and full water simulation.

<script type="text/javascript" src="/javascript/youtube-video-sizer.js"></script>