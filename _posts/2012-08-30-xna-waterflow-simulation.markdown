---
layout: post
title:  "Realtime 3D version of Water Flow Simulation written for Microsoft XNA Framework"
date:   2012-08-30 12:00:00
categories: c# xna graphics
---



Though this is admittedly from earlier this year, hopefully it's still interesting.  This is the realtime 3D experiment written on the Microsoft XNA (Xbox, Windows, Windows Phone) Gaming Framework in C#. This is some of my earliest work in the C# language, so much refactoring could occur.

I ran it with several different styles of terrain, and steered and emitted water with keyboard shortcuts.

<iframe width="489" height="275" src="//www.youtube.com/embed/Rli_dNSI0vU?rel=0" frameborder="0" allowfullscreen></iframe>

The here terrain is made up of several "bucket" shaped terraced levels.  The water is added from the top of the hill, and runs down to the bottom while remaining trapped in the bucket shapes.

<iframe width="489" height="275" src="//www.youtube.com/embed/RSD95quZu98?rel=0" frameborder="0" allowfullscreen></iframe>

This is more of an island terrain with existing water level.  You can see a simple "tidal wave" effect created by rapidly adding water to the cells at the edge of the map.

Starting point is [tutorial from Riemer Grootjans](http://www.riemers.net/eng/Tutorials/XNA/Csharp/series4.php). The below commit shows my work between the base tutorial and full water simulation.

[All additions to the tutorial](https://github.com/mikerandrup/XNA_WaterFlow3D/commit/134e654f60b0dff71a5402227d2f058122ae1c86) can be viewed in this early commit.