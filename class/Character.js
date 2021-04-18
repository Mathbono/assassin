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

	detectWall(direction) {
		for (let [segment, point, limit1, limit2] of Map.walls) {
			const pointCloseToSegment = segment === 'x' ? this.x : this.y;
			const pointBetweenEnds = segment === 'x' ? this.y : this.x;
			if (
				Math.abs(pointCloseToSegment - point) < 20 &&
				((limit1 < pointBetweenEnds && pointBetweenEnds < limit2) ||
					(limit2 < pointBetweenEnds && pointBetweenEnds < limit1))
			) {
				if (segment === 'y' && point < pointCloseToSegment) {
					if (direction !== 'north') {
						return false;
					}
				}
				if (segment === 'y' && point > pointCloseToSegment) {
					if (direction !== 'south') {
						return false;
					}
				}
				if (segment === 'x' && point < pointCloseToSegment) {
					if (direction !== 'west') {
						return false;
					}
				}
				if (segment === 'x' && point > pointCloseToSegment) {
					if (direction !== 'east') {
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
			case 'north':
				this.y -= step;
				break;
			case 'east':
				this.x += step;
				break;
			case 'south':
				this.y += step;
				break;
			case 'west':
				this.x -= step;
				break;
			case 'northeast':
				this.y -= step;
				this.x += step;
				break;
			case 'southeast':
				this.x += step;
				this.y += step;
				break;
			case 'southwest':
				this.x -= step;
				this.y += step;
				break;
			case 'northwest':
				this.x -= step;
				this.y -= step;
				break;
			default:
				return;
		}
		character.cx.baseVal.value = this.x;
		character.cy.baseVal.value = this.y;
	}
}
