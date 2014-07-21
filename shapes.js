(function() {
	var shapes = {
		canvas: null,
		context: null,
		width: 0,
		height: 0,

		create: function(canvas) {
			var obj = Object.create(this);
			if(typeof canvas === "string") {
				canvas = document.getElementById(canvas);
			}
			obj.canvas = canvas;
			obj.context = obj.canvas.getContext("2d");
			obj.width = obj.canvas.width;
			obj.height = obj.canvas.height;
			return obj;
		},

		setSize: function(width, height) {
			this.canvas.width = this.width = width;
			this.canvas.height = this.height = height;
		},

		clear: function(color) {
			if(color == null) {
				this.context.clearRect(0, 0, this.width, this.height);
			}
			else {
				this.context.save();
				this.context.fillStyle = color;
				this.context.fillRect(0, 0, this.width, this.height);
				this.context.restore();
			}
		},

		setFill: function(r, g, b, a) {
			if(typeof r === "string") {
				this.context.fillStyle = r;
			}
			else if(a == null) {
				this.context.fillStyle = "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
			}
			else {
				this.context.fillStyle = "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ", " + a + ")";
			}
		},

		setStroke: function(r, g, b, a) {
			if(typeof r === "string") {
				this.context.strokeStyle = r;
			}
			else if(a == null) {
				this.context.strokeStyle = "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
			}
			else {
				this.context.strokeStyle = "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ", " + a + ")";
			}
		},

		setLineWidth: function(w) {
			this.context.lineWidth = w;
		},

		setShadow: function(color, offsetX, offsetY, blur) {
			this.context.shadowColor = color;
			this.context.shadowOffsetX = offsetX;
			this.context.shadowOffsetY = offsetY;
			this.context.shadowBlur = blur;
		},

		rotate: function(angle) {
			this.context.rotate(angle);
		},

		translate: function(tx, ty) {
			this.context.translate(tx, ty);
		},

		scale: function(sx, sy) {
			this.context.scale(sx, sy);
		},

		saveContext: function() {
			this.context.save();
		},

		restoreContext: function() {
			this.context.restore();
		},

		beginPath: function() {
			this.context.beginPath();
		},

		stroke: function() {
			this.context.stroke();
		},

		fill: function() {
			this.context.fill();
		},

		moveTo: function(x, y) {
			this.context.moveTo(x, y);
		},

		lineTo: function(x, y) {
			this.context.lineTo(x, y);
		},

		rect: function(x, y, w, h) {
			this.context.rect(x, y, w, h);
		},

		fillRect: function(x, y, w, h) {
			this.context.fillRect(x, y, w, h);
		},

		strokeRect: function(x, y, w, h) {
			this.context.strokeRect(x, y, w, h);
		},

		roundRect: function(x, y, w, h, r) {
			this.context.moveTo(x + r, y);
			this.context.lineTo(x + w - r, y);
			this.context.arcTo(x + w, y, x + w, y + r, r);
			this.context.lineTo(x + w, y + h - r);
			this.context.arcTo(x + w, y + h, x + w - r, y + h, r);
			this.context.lineTo(x + r, y + h);
			this.context.arcTo(x, y + h, x, y + h - r, r);
			this.context.lineTo(x, y + r);
			this.context.arcTo(x, y, x + r, y, r);

		},

		fillRoundRect: function(x, y, w, h, r) {
			this.context.beginPath();
			this.roundRect(x, y, w, h, r);
			this.context.fill();
		},

		strokeRoundRect: function(x, y, w, h, r) {
			this.context.beginPath();
			this.roundRect(x, y, w, h, r);
			this.context.stroke();
		},

		arc: function(x, y, r, start, end, antiClockwise) {
			this.context.arc(x, y, r, start, end, antiClockwise);
		},

		arcTo: function(x1, y1, x2, y2, r) {
			this.context.arcTo(x1, y1, x2, y2, r);
		},

		circle: function(x, y, r, antiClockwise) {
			this.context.arc(x, y, r, 0, Math.PI * 2, antiClockwise);
		},

		fillCircle: function(x, y, r) {
			this.context.beginPath();
			this.circle(x, y, r);
			this.context.fill();
		},

		strokeCircle: function(x, y, r) {
			this.context.beginPath();
			this.circle(x, y, r);
			this.context.stroke();
		},

		ellipse: function(x, y, xr, yr, rotation) {
			this.context.save();
			this.context.translate(x, y);
			this.context.rotate(rotation || 0);
			this.context.scale(xr / 100, yr / 100);
			this.circle(0, 0, 100);
			this.context.restore();
		},

		fillEllipse: function(x, y, xr, yr, rotation) {
			this.context.beginPath();
			this.ellipse(x, y, xr, yr, rotation);
			this.context.fill();
		},

		strokeEllipse: function(x, y, xr, yr, rotation) {
			this.context.beginPath();
			this.ellipse(x, y, xr, yr, rotation);
			this.context.stroke();
		},

		bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
			this.context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
		},

		quadraticCurveTo: function(x1, y1, x2, y2) {
			this.context.quadraticCurveTo(x1, y1, x2, y2);
		},

		polygon: function(x, y, r, sides, rotation) {
			this.context.save();
			this.context.translate(x, y);
			this.context.rotate(rotation || 0);
			this.context.moveTo(r, 0);
			for(var i = 1; i < sides; i++) {
				var angle = Math.PI * 2 / sides * i;
				this.context.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
			}
			this.context.lineTo(r, 0);
			this.context.restore();
		},

		fillPolygon: function(x, y, r, sides, rotation) {
			this.context.beginPath();
			this.polygon(x, y, r, sides, rotation);
			this.context.fill();
		},

		strokePolygon: function(x, y, r, sides, rotation) {
			this.context.beginPath();
			this.polygon(x, y, r, sides, rotation);
			this.context.stroke();
		},

		star: function(x, y, r1, r2, points, rotation) {
			this.context.save();
			this.context.translate(x, y);
			this.context.rotate(rotation || 0);
			this.context.moveTo(r2, 0);
			for(var i = 1; i < points * 2; i++) {
				var angle = Math.PI / points  * i;
				if(i % 2) {
					this.context.lineTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
				}
				else {
					this.context.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
				}
			}
			this.context.lineTo(r2, 0);
			this.context.restore();

		},

		fillStar: function(x, y, r1, r2, points, rotation) {
			this.context.beginPath();
			this.star(x, y, r1, r2, points, rotation);
			this.context.fill();
		},

		strokeStar: function(x, y, r1, r2, points, rotation) {
			this.context.beginPath();
			this.star(x, y, r1, r2, points, rotation);
			this.context.stroke();
		},

		path: function(points, closed) {
			if(points.length <= 0) return;
			this.context.moveTo(points[0].x, points[0].y);
			for(var i = 1; i < points.length; i++) {
				this.context.lineTo(points[i].x, points[i].y);
			}
			if(closed) {
				this.context.lineTo(points[0].x, points[0].y);
			}

		},

		fillPath: function(points, closed) {
			this.context.beginPath();
			this.path(points, closed);
			this.context.fill();
		},

		strokePath: function(points, closed) {
			this.context.beginPath();
			this.path(points, closed);
			this.context.stroke();
		},

	    splat: function(x, y, numNodes, radius, innerRadius, curve, variation, rotation) {
	        var points = [], 
	        	slice = Math.PI * 2 / (numNodes * 2), 
	        	angle = 0, 
	        	radiusRange = radius - innerRadius,
	        	r;
	        curve = curve || 0	;
	        variation = variation || 0;

	        for(var i = 0; i < numNodes; i++) {
	            r = radius + variation * (Math.random() * radiusRange * 2 - radiusRange);
	            points.push(makePoint(angle - slice * (1 + curve), innerRadius));
	            points.push(makePoint(angle + slice * curve, innerRadius));
	            points.push(makePoint(angle - slice * curve, r));
	            points.push(makePoint(angle + slice * (1 + curve), r));
	            angle += slice * 2;
	        }

	        this.context.save();
	        this.context.translate(x, y);
	        this.context.rotate(rotation || 0);
	        this.multiCurveLoop(points);
	        this.context.restore();
		    
		    function makePoint(angle, radius) {
		        return {
		        	x: Math.cos(angle) * radius, 
		        	y: Math.sin(angle) * radius
		        };
		    }
	    },

		fillSplat: function(x, y, numNodes, radius, innerRadius, curve, variation, rotation) {
			this.context.beginPath();
			this.splat(x, y, numNodes, radius, innerRadius, curve, variation, rotation);
			this.context.fill();
		},

		strokeSplat: function(x, y, numNodes, radius, innerRadius, curve, variation, rotation) {
			this.context.beginPath();
			this.splat(x, y, numNodes, radius, innerRadius, curve, variation, rotation);
			this.context.stroke();
		},

		multiCurve: function(points) {
			var mids = [];
			for(var i = 0; i < points.length - 1; i++) {
				mids.push({
					x: (points[i].x + points[i + 1].x) / 2,
					y: (points[i].y + points[i + 1].y) / 2
				});
			}

			this.context.moveTo(points[0].x, points[0].y);
			for(i = 1; i < points.length - 2; i++) {
				this.context.quadraticCurveTo(points[i].x, points[i].y, mids[i].x, mids[i].y);
			}
			this.context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);

		},

		fillMultiCurve: function(points) {
			this.context.beginPath();
			this.multiCurve(points, closed);
			this.fill();
		},

		strokeMultiCurve: function(points) {
			this.context.beginPath();
			this.multiCurve(points, closed);
			this.stroke();
		},

		multiCurveLoop: function(points) {
			var mids = [];
			for(var i = 0; i < points.length - 1; i++) {
				mids.push({
					x: (points[i].x + points[i + 1].x) / 2,
					y: (points[i].y + points[i + 1].y) / 2
				});
			}
			mids.push({
				x: (points[i].x + points[0].x) / 2,
				y: (points[i].y + points[0].y) / 2
			});

			this.context.moveTo(mids[0].x, mids[0].y);
			for(i = 1; i < points.length; i++) {
				this.context.quadraticCurveTo(points[i].x, points[i].y, mids[i].x, mids[i].y);
			}
			this.context.quadraticCurveTo(points[0].x, points[0].y, mids[0].x, mids[0].y);

		},

		fillMultiCurveLoop: function(points) {
			this.context.beginPath();
			this.multiCurveLoop(points, closed);
			this.fill();
		},

		strokeMultiCurveLoop: function(points) {
			this.context.beginPath();
			this.multiCurveLoop(points, closed);
			this.stroke();
		},

		fractalLine: function(x1, y1, x2, y2, offset, roughness, iterations) {
			roughness = roughness || 0.5;
			iterations = iterations || 5;
			if(offset == null) {
				var dx = x2 - x1,
					dy = y2 - y1;
				offset = Math.sqrt(dx * dx + dy * dy) * .15;
			}

			var path = [{x: x1, y: y1}, {x: x2, y: y2}];
			for(var i = 0; i < iterations; i++) {
				for(var j = path.length - 1; j > 0; j--) {
					path.splice(j, 0, {
						x: (path[j].x + path[j - 1].x) / 2 + Math.random() * offset * 2 - offset,
						y: (path[j].y + path[j - 1].y) / 2 + Math.random() * offset * 2 - offset
					});
				}
				offset *= roughness;
			}
			this.path(path);
		},

		strokeFractalLine: function(x1, y1, x2, y2, offset, roughness, iterations) {
			this.context.beginPath();
			this.fractalLine(x1, y1, x2, y2, offset, roughness, iterations);
			this.stroke();
		},

		heart: function(x, y, w, h, r) {
			this.context.save();
			this.context.translate(x, y);
			this.context.rotate(r);
			var points = [{ x: 0,          y: h *  0.5   },
						  { x: 0,          y: h *  0.375 },
						  { x: w * -0.625, y: h * -0.125 },
						  { x: w * -0.25,  y: h * -0.625 },
						  { x: 0,          y: h * -0.375 }];

			this.multiCurve(points);
			for(var i = 0; i < points.length; i++) {
				points[i].x *= -1;
			}
			this.multiCurve(points);
			this.context.restore();
		},

		fillHeart: function(x, y, w, h, r) {
			this.context.beginPath();
			this.heart(x, y, w, h, r);
			this.fill();
		},

		strokeHeart: function(x, y, w, h, r) {
			this.context.beginPath();
			this.heart(x, y, w, h, r);
			this.stroke();
		},

		grid: function(x, y, w, h, xres, yres) {
			yres = yres || xres;
			for(var i = x; i <= x + w; i += xres) {
				this.context.moveTo(i, y);
				this.context.lineTo(i, y + h);
			}
			for(i = y; i <= y + h; i += yres) {
				this.context.moveTo(x, i);
				this.context.lineTo(x + w, i);
			}
		},

		strokeGrid: function(x, y, w, h, xres, yres) {
			this.context.beginPath();
			this.grid(x, y, w, h, xres, yres);
			this.context.stroke();
		}
	}
	
	if (typeof define === "function" && define.amd) {
	    define(shapes);
	} else {
	   window.shapes = shapes;
	}

}());
