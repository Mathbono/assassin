class Assassin {
	x;
	y;
	r;
	fill;
	stroke;
	strokeWidth;

	constructor(xPercent, yPercent) {
		if (
			isNaN(xPercent) ||
			xPercent < 0 ||
			xPercent > 100 ||
			isNaN(yPercent) ||
			yPercent < 0 ||
			yPercent > 100
		) {
			alert('Assassin mal initialisé. Voir constructeur.');
			return;
		}
		this.x = xPercent + '%';
		this.y = yPercent + '%';
		this.r = '20';
		this.fill = 'transparent';
		this.stroke = 'green';
		this.strokeWidth = '10';
		this.createElement();
	}

	createElement() {
		const assCircle = document.createElementNS(globalThis.svgns, 'circle');
		assCircle.setAttribute('id', 'assassin');
		assCircle.setAttribute('cx', this.x);
		assCircle.setAttribute('cy', this.y);
		assCircle.setAttribute('r', this.r);
		assCircle.setAttribute('fill', this.fill);
		assCircle.setAttribute('stroke', this.stroke);
		assCircle.setAttribute('stroke-width', this.strokeWidth);
		document.querySelector('svg').appendChild(assCircle);
	}

	move(direction, step) {
		const assCircle = document.getElementById('assassin');
		this.x = assCircle.cx.baseVal.value;
		this.y = assCircle.cy.baseVal.value;
		switch (direction) {
			case 'up':
				this.y -= step;
				break;
			case 'right':
				this.x += step;
				break;
			case 'down':
				this.y += step;
				break;
			case 'left':
				this.x -= step;
				break;
			default:
				return;
		}
		assCircle.cx.baseVal.value = this.x;
		assCircle.cy.baseVal.value = this.y;
	}
}
