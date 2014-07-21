(function() {
	var s = shapes.create("canvas");
	s.setSize(window.innerWidth, window.innerHeight);


	var demo = {

		circle: function() {
			for(var x = 100; x < s.width - 50; x += 100) {
				for(var y = 100; y < s.height - 50; y += 100) {
					s.strokeCircle(x, y, 40);
				}
			}
		},

		ellipse: function() {
			for(var x = 100; x < s.width - 50; x += 100) {
				for(var y = 100; y < s.height - 50; y += 100) {
					s.strokeEllipse(x, y, Math.random() * 50 + 10, Math.random() * 50 + 10, Math.random() * Math.PI * 2);
				}
			}
		},

		roundRect: function() {
			for(var i = 0; i < 10; i++) {
				s.strokeRoundRect(10 + i * 100, s.height / 2 - 25, 90, 90, 5 + i * 3);
			}
		},

		poly: function() {
			for(var i = 0; i < 10; i++) {
				s.strokePolygon(100 + i * 110, s.height / 2 - 100, 50, i + 3);
			}
			for(i = 0; i < 20; i++) {
				s.strokePolygon(100 + i * 55, s.height / 2 + 100, 50, 5, i * .1);
			}
		},

		star: function() {
			for(var i = 0; i < 10; i++) {
				s.strokeStar(100 + i * 110, s.height / 2 - 150, 24, 50, i + 3);
			}
			for(var i = 0; i < 10; i++) {
				s.strokeStar(100 + i * 110, s.height / 2, 40 - i * 4, 50, 5);
			}
			for(i = 0; i < 20; i++) {
				s.strokeStar(100 + i * 55, s.height / 2 + 150, 25, 50, 5, i * .1);
			}
		},

		path: function() {
			var path = [];
			draw();

			function draw() {
				s.clear();
				s.context.font = "40px Arial";
				s.context.fillText("click", 100, 100);
				s.strokePath(path);
			}

			s.canvas.addEventListener("click", function(event) {
				console.log("click");
				path.push({
					x: event.clientX,
					y: event.clientY
				});
				draw();
			})
		},

		splat: function() {
			for(var x = 50; x <= s.width - 50; x += 100) {
				for(var y = 50; y <= s.height - 50; y += 100) {
					s.context.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
					s.fillSplat(x, y, 3 + Math.floor(Math.random() * 6), 50, 1 + Math.random() * 20, Math.random() * .5, Math.random() * .8);
				}
			}
		},

		multiCurve: function() {
			var path = [];
			for(var x = 0; x <= s.width; x += 100) {
				path.push({
					x: x + Math.random() * 100 - 50,
					y: Math.random() * s.height
				});
			}
			s.strokeMultiCurve(path);
		},

		hair: function() {
			var path = [];
			for(var y = 0; y < s.height; y += 200) {
				path.push({
					x: Math.random() * 100 - 50,
					y: y
				});
			}
			var x = 0, y = 0;
			drawHair();
			function drawHair() {
				s.setLineWidth(0.5);
				s.setShadow("rgba(0,0,0,0.5", 5, 5, 5);
				for(var j = 0; j < 20; j++) {
					s.setStroke(Math.random() * 20 + 100, Math.random() * 20 + 40, Math.random() * 20, 0.5);
					s.saveContext();
					s.translate(x + Math.random() * 40 - 20, -10);
					for(var i = 1; i < path.length; i++) {
						path[i].x += Math.random() * i * 4 - 2 * i;
						path[i].y += Math.random() * i * 2 - i;
					}
					s.strokeMultiCurve(path);
					s.restoreContext();
				}
				x += 2;
				if(x < s.width) {
					requestAnimationFrame(drawHair);
				}
			}
		},

		multiCurveLoop: function() {
			var path = [];
			for(var i = 0; i < 20; i++) {
				path.push({
					x: Math.random() * s.width,
					y: Math.random() * s.height
				});
			}
			s.strokeMultiCurveLoop(path);
		},

		fractalLine: function() {
			s.strokeFractalLine(0, s.height / 2, s.width, s.height / 2, s.width * .1, .6, 10);
		},

		heart: function() {
			s.context.fillStyle = "red";
			for(var x = 50; x < s.width; x += 100) {
				for(var y = 50; y < s.height; y += 100)  {
					s.strokeHeart(x, y, 75 + Math.random() * 50 - 25, 75 + Math.random() * 50 - 25);
				}
			}
		},

		grid: function() {
			s.context.strokeStyle = "rgba(0, 0, 0, 0.5)";
			s.strokeGrid(0, 0, s.width, s.height, 50);
			s.context.strokeStyle = "rgba(0, 0, 0, 0.25)";
			s.strokeGrid(0, 0, s.width, s.height, 25);
		},

		flowerdraw: function() {
			s.setLineWidth(0.25);
			s.strokeGrid(0, 0, s.width, s.height, 20);
			s.setShadow("rgba(0,0,0,0.5", 10, 10, 20);
			document.body.addEventListener("mousemove", function(event) {
				var x = event.clientX + Math.random() * 100 - 50,
					y = event.clientY + Math.random() * 100 - 50,
					r1 = 5 + Math.random() * 5,
					r2 = 20 + Math.random() * 30,
					nodes = Math.round(Math.random() * 5 + 4);

				s.setFill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
				s.fillSplat(x, y, nodes, r2, r1, .3, .3);
				s.setFill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
				s.fillCircle(x, y, r1 - 3);
			});
		},

		heartdraw: function() {
			s.setLineWidth(0.25);
			s.strokeGrid(0, 0, s.width, s.height, 20);
			s.setShadow("rgba(0,0,0,0.5", 10, 10, 20);
			document.body.addEventListener("mousemove", function(event) {
				var x = event.clientX + Math.random() * 100 - 50,
					y = event.clientY + Math.random() * 100 - 50,
					w = Math.random() * 40 + 60,
					h = Math.random() * 40 + 60,
					r = Math.random() * Math.PI / 3 - Math.PI / 6;
				var g = Math.random() * 220,
					b = g + Math.random() * 40 - 20;
				s.setFill(255, g, b);
				s.fillHeart(x, y, w, h, r);
			});
		},

		rubberbands: function() {
			s.setLineWidth(0.25);
			s.strokeGrid(0, 0, s.width, s.height, 20);
			s.setShadow("rgba(0,0,0,0.75", 5, 5, 5);
			s.setLineWidth(5);
			var path = [];
			document.body.addEventListener("mousemove", function(event) {
				var x = event.clientX + Math.random() * 100 - 50,
					y = event.clientY + Math.random() * 100 - 50;

				for(var i = 0; i < 6; i++) {
					var angle = Math.PI * 2 / 6 * i,
						r = Math.random() * 120 + 20;

					path[i] = {
						x: x + Math.cos(angle) * r,
						y: y + Math.sin(angle) * r
					};
				}
				s.setStroke(Math.random() * 255, Math.random() * 255, Math.random() * 255);
				s.strokeMultiCurveLoop(path);
			});
		}
	};


	var func = window.location.search.substring(1).split("=")[1];
	if(demo[func]) {
		demo[func]();
	}
	else {
		demo.circle();
		// demo.ellipse();
		// demo.roundRect();
		// demo.poly();
		// demo.star();
		// demo.path();
		// demo.splat();
		// demo.multiCurve();
		// demo.hair();
		// demo.multiCurveLoop();
		// demo.rubberbands();
		// demo.fractalLine();
		// demo.heart();
		// demo.grid();
		// demo.flowerdraw();
		// demo.heartdraw();
	}



}());