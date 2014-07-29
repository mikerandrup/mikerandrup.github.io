(function (w) {
	var oldLoad = w.onload;

	w.onload = function () {
		var iframes = document.querySelectorAll("iframe.video-youtube");

		for (var i=0; i<iframes.length; i++) {
			var el = iframes[i];
			el.setAttribute("width", el.clientWidth);
			el.setAttribute("height", el.clientWidth*0.75); // 4:3 aspect
			el.setAttribute("src", el.getAttribute("data-src"));
			el.removeAttribute("data-src");
		}
		oldLoad && oldLoad();
	}
}(this.window));