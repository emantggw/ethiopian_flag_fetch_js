/*




			



							++==	+==	   ==+	===+  ++===+    |
							||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									Created at 2019/8/4
										Flag









*/
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


function range(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function Flag(x, y, r, co, txt) {
	this.r = r;
	this.x = x
	this.y = y;
	this.freq = 0;
	this.lamda = 3;
	this.amp = 4;
	this.rad = Math.PI / 2;
	this.col = co;
	this.capacity = range(2, 13) / 10;
	this.txt = txt;

	this.update = () => {

		if (this.rad >= -this.capacity) {
			this.rad -= Math.random() / range(100, 200);
			this.freq += range(3, 6) / 10;
		} else {
			this.freq += 0.3;
		}
		this.draw();
	};
	this.draw = () => {
		c.beginPath();
		c.strokeStyle = this.col;
		for (var i = 0.0; i < Math.PI * 2; i += 0.01) {
			c.lineTo(this.x + Math.cos(i) * this.r, this.y + Math.sin(i) * this.r);
		}
		c.stroke();
		c.closePath();
		c.beginPath();
		c.strokeStyle = this.col;
		for (var j = Math.PI / 2; j > this.rad; j -= 0.01) {
			for (var i = 0.0; i < Math.PI; i += 0.01) {
				c.lineTo(this.x + Math.cos(i) * (this.r * Math.cos(j)), this.y + Math.sin(j) * this.r + Math.sin(i * this.lamda + this.freq) * this.amp);
				c.lineTo(this.x + Math.cos(i) * (this.r * Math.cos(j)), this.y + this.amp + Math.sin(j) * this.r);
			}
		}
		c.stroke();
		c.closePath();
		c.beginPath();
		c.font = 'bold 42pt Impact';
		c.fillStyle = 'black';
		c.fillText(this.txt, this.x - 14 * (txt.length), this.y + 42 / 3);
		c.closePath();

	};
}
var flag;
function init() {
	flag = [];
	var r = 100;
	var x = innerWidth / 2 - 2 * r;
	var y = innerHeight / 2 - r / 2;
	flag.push(new Flag(x - 10, y, r, 'green', 'ETH'));
	flag.push(new Flag(x + 2 * r, y, r, 'yellow', 'IOP'));
	flag.push(new Flag(x + 4 * r + 10, y, r, 'red', 'IAN'));



}
function animate() {
	requestAnimationFrame(animate);
	//c.fillStyle='rgba(0,0,0,0.4)';
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.fillRect(0, 0, innerWidth, innerHeight);
	flag.forEach(e => {
		e.update();
	});
}
init();
animate();


