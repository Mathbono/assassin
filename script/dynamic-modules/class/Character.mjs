import Map from './Map.mjs';
import {svgns} from '../constants.mjs';

export default class Character {
	character;
	id;
	x;
	y;
	direction;
	collision;
	r;
	fill;

	constructor(character, xPercent, yPercent) {
		this.character = character;
		this.id = this.character.name + this.character.id;
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
		this.direction = 'right';
		this.collision = false;
		this.r = 1.5;
		this.fill = character.color;
		if (this.character.name !== 'assassin') {
			const characterViewPathElement = document.createElementNS(
				svgns,
				'path'
			);
			characterViewPathElement.setAttribute('id', this.id + 'view');
			this.setCharacterViewPathElement(characterViewPathElement, true);
			characterViewPathElement.setAttribute('fill', 'rgb(0, 255, 0, .3)');
			document.querySelector('svg').appendChild(characterViewPathElement);
		}
		this.createCharacterCircleElement();
	}

	createCharacterCircleElement() {
		const characterCircleElement = document.createElementNS(svgns, 'circle');
		characterCircleElement.setAttribute('id', this.id);
		characterCircleElement.setAttribute('cx', this.x + '%');
		characterCircleElement.setAttribute('cy', this.y + '%');
		characterCircleElement.setAttribute('r', this.r + '%');
		characterCircleElement.setAttribute('fill', this.fill);
		document.querySelector('svg').appendChild(characterCircleElement);
	}

	setCharacterViewPathElement(viewPathElement, stop = false) {
		let characterX;
		let characterY;
		if (stop === true) {
			characterX = (this.x / 100) * document.body.offsetWidth;
			characterY = (this.y / 100) * document.body.offsetHeight;
		} else {
			characterX = this.x;
			characterY = this.y;
		}
		let curve;
		switch (this.direction) {
			case 'up':
				curve = `M${characterX - 50} ${characterY - 150} Q ${characterX} ${
					characterY + 150
				} ${characterX + 50} ${characterY - 150} Z`;
				break;
			case 'right':
				curve = `M${characterX + 150} ${characterY - 50} Q ${
					characterX - 150
				} ${characterY} ${characterX + 150} ${characterY + 50} Z`;
				break;
			case 'down':
				curve = `M${characterX - 50} ${characterY + 150} Q ${characterX} ${
					characterY - 150
				} ${characterX + 50} ${characterY + 150} Z`;
				break;
			case 'left':
				curve = `M${characterX - 150} ${characterY - 50} Q ${
					characterX + 150
				} ${characterY} ${characterX - 150} ${characterY + 50} Z`;
				break;
			default:
				return;
		}
		viewPathElement.setAttribute('d', curve);
	}

	detectWall(distance = 20) {
		const forbiddenDirections = [];
		for (let [point, segment, limit1, limit2] of Map.segments) {
			const characterCloseToSegment = point === 'x' ? this.x : this.y;
			const characterBetweenLimits = point === 'x' ? this.y : this.x;
			if (
				Math.abs(characterCloseToSegment - segment) < distance &&
				((limit1 < characterBetweenLimits &&
					characterBetweenLimits < limit2) ||
					(limit2 < characterBetweenLimits &&
						characterBetweenLimits < limit1) ||
					Math.abs(characterBetweenLimits - limit1) < 10 ||
					Math.abs(characterBetweenLimits - limit2) < 10)
			) {
				if (point === 'y' && segment < characterCloseToSegment) {
					forbiddenDirections.push('up');
				}
				if (point === 'x' && segment > characterCloseToSegment) {
					forbiddenDirections.push('right');
				}
				if (point === 'y' && segment > characterCloseToSegment) {
					forbiddenDirections.push('down');
				}
				if (point === 'x' && segment < characterCloseToSegment) {
					forbiddenDirections.push('left');
				}
			}
		}
		return forbiddenDirections;
	}

	move(direction, speed = false) {
		this.direction = direction;
		this.collision = false;
		const step =
			speed === false
				? this.character.baseSpeed
				: this.character.baseSpeed + 2;
		const character = document.getElementById(this.id);
		this.x = character.cx.baseVal.value;
		this.y = character.cy.baseVal.value;
		if (this.detectWall().includes(this.direction) === true) {
			this.collision = true;
			return;
		}
		switch (this.direction) {
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
		character.cx.baseVal.value = this.x;
		character.cy.baseVal.value = this.y;
		if (this.character.name !== 'assassin') {
			this.setCharacterViewPathElement(
				document.getElementById(this.id + 'view')
			);
		}
	}
}
