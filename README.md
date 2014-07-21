shapes
====

The drawing API of HTML Canvas's Context2D is very powerful, but also rather low level, with a limited number of commands. The fact that there is not even a circle or ellipse method is a huge lack. *shapes* is a library of useful drawing functions designed to make drawing common shapes (or uncommon, but useful shapes) easier. The shapes object is a wrapper for both Canvas and Context2D. It has been designed so that you can work almost exclusively with the shapes object, and access the underlying context as little as possible. Thus, most of the common methods of Context2D have been proxied onto shapes. Additionally, many more methods have been added.

Most of the shape drawing methods have a stroke version and, where applicable, a fill version as well, following the pattern of rect, strokeRect and fillRect.

### Drawing Methods:

These could use some documentation, but are mostly self-explanatory. The demo file should fill in any gaps for now.

	beginPath()
	stroke()
	fill()
	moveTo(x, y)
	lineTo(x, y)
	rect(x, y, w, h)
	fillRect(x, y, w, h)
	strokeRect(x, y, w, h)
	roundRect(x, y, w, h, r)
	fillRoundRect(x, y, w, h, r)
	strokeRoundRect(x, y, w, h, r)
	arc(x, y, r, start, end, antiClockwise)
	arcTo(x1, y1, x2, y2, r)
	circle(x, y, r, antiClockwise)
	fillCircle(x, y, r)
	strokeCircle(x, y, r)
	ellipse(x, y, xr, yr, rotation)
	fillEllipse(x, y, xr, yr, rotation)
	strokeEllipse(x, y, xr, yr, rotation)
	bezierCurveTo(x1, y1, x2, y2, x3, y3)
	quadraticCurveTo(x1, y1, x2, y2)
	polygon(x, y, r, sides, rotation)
	fillPolygon(x, y, r, sides, rotation)
	strokePolygon(x, y, r, sides, rotation)
	star(x, y, r1, r2, points, rotation)
	fillStar(x, y, r1, r2, points, rotation)
	strokeStar(x, y, r1, r2, points, rotation)
	path(points, closed)
	fillPath(points, closed)
	strokePath(points, closed)
    splat(x, y, numNodes, radius, innerRadius, curve, variation, rotation)
	fillSplat(x, y, numNodes, radius, innerRadius, curve, variation, rotation)
	strokeSplat(x, y, numNodes, radius, innerRadius, curve, variation, rotation)
	multiCurve(points)
	fillMultiCurve(points)
	strokeMultiCurve(points)
	multiCurveLoop(points)
	fillMultiCurveLoop(points)
	strokeMultiCurveLoop(points)
	fractalLine(x1, y1, x2, y2, offset, roughness, iterations)
	strokeFractalLine(x1, y1, x2, y2, offset, roughness, iterations)
	heart(x, y, w, h)
	fillHeart(x, y, w, h)
	strokeHeart(x, y, w, h)
	grid(x, y, w, h, xres, yres)
	strokeGrid(x, y, w, h, xres, yres)

### Other Methods:

Create a shapes object using 
	
	var myShape = shapes.create(canvas)

canvas can be a reference to a canvas object, or a string containing the id of a canvas element on the page. All other methods get called on the shapes instance itself.

	setSize(width, height) // sets the size of the underlying canvas.
	clear(color) // clears the canvas. If a color value is passed, it will clear to that color.
	setFill(r, g, b, a) // sets the fill style to the rgb and optionally a channels given.
	setFill(colorString) // sets the fill style to the color string given.
	setStroke(r, g, b, a) // sets the stroke style to the rgb and optionally a channels given.
	setStroke(colorString) // sets the stroke style to the color string given.
	setShadow(color, offsetX, offsetY, blur) // a simpler way of setting shadows than setting four separate properties.

The rest of these are pretty much straight proxies to the underlying respective Context2D methods.

	setLineWidth(w)
	rotate(angle)
	translate(tx, ty)
	scale(sx, sy)
	saveContext()
	restoreContext()
