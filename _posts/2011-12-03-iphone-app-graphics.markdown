---
layout: post
title:  "iPhone App Graphics & Animation"
date:   2011-12-03 12:00:00
categories: graphics animation
---

<iframe class="video-youtube" data-src="//www.youtube.com/embed/0OWAP2DY5PE?rel=0" frameborder="0" allowfullscreen></iframe>

Hopefully it makes for a nicer wait as the XML downloads in the background.  At any rate, it was fun to create.  The end deliverable for the animation was an 18 frame looping sequence.  It didn't take up much memory or room in the IPA file, and loops to run as long as needed.  I also provided several other button graphics for the user interface.

<img src="/images/content/loading-anim-iphonescreenshot.jpg" width="115" height="251" class="content-image float-right"/> Earlier this year, I worked on the graphics used in a Native iPhone App (<strike>now</strike> <em>no longer</em> live) on the App Store for Splash Coupons.  The app lists offers for home improvement savings for people in the North Dallas, Texas area.  When the App first launches, it downloads the latest set of coupons from a data server via XML.  During this process, which can take a couple of seconds, I wanted to display a visually interesting animation.  So out came the storyboard, and a new After Effects project was born.

Conceptually, the animation was designed to show a user that "coupons" are going "into their iPhone".  The After Effects project was relatively simple.  The coupon image assets I created were animated along paths from off screen into the pulsing iPhone in the middle.  The screen of the iPhone has an AJAX-style busy cursor superimposed on it.  Two layers of After Effects "Particle Playground" effects were blending with a glow effect.  Since the particle filter naturally emits from the center outward, I time reversed the particle composition so the particles would flow into the iPhone.  There is a colored glow in the center, and concentric circles pulsing inward.  The last element, "droplet" pieces of the Splash Coupons logo, fly outward from the phone.  The color decisions were based on the style guide for the Splash Coupons logo and brand.

<script type="text/javascript" src="/javascript/youtube-video-sizer.js"></script>