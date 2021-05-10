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
		this.i = 0;
		this.direction = 'right';
		this.collision = false;
		this.r = 1.5;
		this.fill = character.color;
		if (this.character.name !== 'assassin') {
			const viewElement = document.createElementNS(svgns, 'path');
			viewElement.setAttribute('id', this.id + 'view');
			this.setPathElement(viewElement, true);
			viewElement.setAttribute('fill', 'rgb(0, 255, 0, .3)');
			document.querySelector('svg').appendChild(viewElement);
		}
		this.createCircleElement();
	}

	createCircleElement() {
		const characterElement = document.createElementNS(svgns, 'circle');
		characterElement.setAttribute('id', this.id);
		characterElement.setAttribute('cx', this.x + '%');
		characterElement.setAttribute('cy', this.y + '%');
		characterElement.setAttribute('r', this.r + '%');
		characterElement.setAttribute('fill', this.fill);
		document.querySelector('svg').appendChild(characterElement);
	}

	setPathElement(viewElement, stop = false) {
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
		viewElement.setAttribute('d', curve);
	}

	detectWall() {
		const forbiddenDirections = [];
		for (let [point, segment, limit1, limit2] of Map.segments) {
			const characterCloseToSegment = point === 'x' ? this.x : this.y;
			const characterBetweenLimits = point === 'x' ? this.y : this.x;
			if (
				Math.abs(characterCloseToSegment - segment) < 20 &&
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
		return forbiddenDirections.includes(this.direction);
	}

	move(direction, speed = false) {
		this.direction = direction;
		this.collision = false;
		const step =
			speed === false
				? this.character.baseSpeed
				: this.character.baseSpeed + 1;
		const character = document.getElementById(this.id);
		this.x = character.cx.baseVal.value;
		this.y = character.cy.baseVal.value;
		if (this.detectWall() === true) {
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
			this.setPathElement(document.getElementById(this.id + 'view'));
		}
	}
}
