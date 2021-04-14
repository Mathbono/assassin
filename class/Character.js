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
		this.x = xPercent + '%';
		this.y = yPercent + '%';
		this.r = '20';
		this.fill = CHARACTER.color;
		this.createElement();
	}

	createElement() {
		const character = document.createElementNS(globalThis.svgns, 'circle');
		character.setAttribute('id', this.id);
		character.setAttribute('cx', this.x);
		character.setAttribute('cy', this.y);
		character.setAttribute('r', this.r);
		character.setAttribute('fill', this.fill);
		document.querySelector('svg').appendChild(character);
	}

	move(direction, speed) {
		const step =
			speed === false
				? this.CHARACTER.baseSpeed
				: this.CHARACTER.baseSpeed + 1;
		const character = document.getElementById(this.id);
		this.x = character.cx.baseVal.value;
		this.y = character.cy.baseVal.value;
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
