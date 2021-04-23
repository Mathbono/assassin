class Character {
	CHARACTER;
	id;
	x;
	y;
	r;
	fill;

	constructor(CHARACTER, xPercent, yPercent) {
		this.CHARACTER = CHARACTER;
		this.id = this.CHARACTER.name + this.CHARACTER.id;
		if (
			isNaN(xPercent) ||
			xPercent < 0 ||
			xPercent > 100 ||
			isNaN(yPercent) ||
			yPercent < 0 ||
			yPercent > 100
		) {
			alert(this.id + ' initialisé hors de la Map !');
			return;
		}
		this.x = xPercent;
		this.y = 100 - yPercent;
		this.r = 2;
		this.fill = CHARACTER.color;
		this.createCircleElement();
		if (this.CHARACTER.name !== 'assassin') {
			const view = document.createElementNS(globalThis.svgns, 'path');
			this.setPathElement(view);
			document.querySelector('svg').appendChild(view);
		}
	}

	createCircleElement() {
		const character = document.createElementNS(globalThis.svgns, 'circle');
		character.setAttribute('id', this.id);
		character.setAttribute('cx', this.x + '%');
		character.setAttribute('cy', this.y + '%');
		character.setAttribute('r', this.r + '%');
		character.setAttribute('fill', this.fill);
		document.querySelector('svg').appendChild(character);
	}

	setPathElement(view) {
		const W = document.body.offsetWidth;
		const H = document.body.offsetHeight;
		const characterX = (this.x / 100) * W - 50;
		const characterY = (this.y / 100) * H - 150;
		view.setAttribute('id', this.id + 'view');
		view.setAttribute(
			'd',
			'M' + characterX + ' ' + characterY + ' q 50 300 100 0 Z'
		);
		view.setAttribute('fill', 'rgb(0, 255, 0, .3)');
	}

	detectWall(direction) {
		for (let [point, segment, limit1, limit2] of Map.landscape) {
			const pointCloseToSegment = point === 'x' ? this.x : this.y;
			const pointBetweenEnds = point === 'x' ? this.y : this.x;
			if (
				Math.abs(pointCloseToSegment - segment) < 20 &&
				(Math.abs(pointBetweenEnds - limit1) < 10 ||
					Math.abs(pointBetweenEnds - limit2) < 10)
			) {
				return true;
			}
			if (
				Math.abs(pointCloseToSegment - segment) < 20 &&
				((limit1 < pointBetweenEnds && pointBetweenEnds < limit2) ||
					(limit2 < pointBetweenEnds && pointBetweenEnds < limit1))
			) {
				if (point === 'y' && segment < pointCloseToSegment) {
					if (direction !== 'up') {
						return false;
					}
				}
				if (point === 'y' && segment > pointCloseToSegment) {
					if (direction !== 'bottom') {
						return false;
					}
				}
				if (point === 'x' && segment < pointCloseToSegment) {
					if (direction !== 'right') {
						return false;
					}
				}
				if (point === 'x' && segment > pointCloseToSegment) {
					if (direction !== 'left') {
						return false;
					}
				}
				return true;
			}
		}
		return false;
	}

	move(direction, speed) {
		const step =
			speed === false
				? this.CHARACTER.baseSpeed
				: this.CHARACTER.baseSpeed + 1;
		const character = document.getElementById(this.id);
		this.x = character.cx.baseVal.value;
		this.y = character.cy.baseVal.value;
		if (this.detectWall(direction) === true) {
			return;
		}
		switch (direction) {
			case 'up':
				this.y -= step;
				break;
			case 'left':
				this.x += step;
				break;
			case 'bottom':
				this.y += step;
				break;
			case 'right':
				this.x -= step;
				break;
			default:
				return;
		}
		character.cx.baseVal.value = this.x;
		character.cy.baseVal.value = this.y;
	}
}
