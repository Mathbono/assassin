import Map from './class/Map.mjs';
import moveCharacter from './actions/moveCharacter.mjs';

const level = 1;

let LevelEntities;
let game;
let assassin;
let target;
let guards;

document.addEventListener('DOMContentLoaded', async () => {
	LevelEntities = await import(`./class/levels/Level${level}.mjs`).then(
		({default: mod}) => mod
	);
	game = new Map(new LevelEntities());
	assassin = game.levelCharacters.assassin;
	target = game.levelCharacters.target;
	guards = game.levelCharacters.guards;
	moveCharacter(target);
	for (let guard of guards) {
		moveCharacter(guard);
	}
});

let interval;
let keysPressed = {};
let moving = false;
let speed = false;

window.addEventListener('resize', () => {
	const segments = game.levelCharacters.getPointsLandscape();
	for (let segment of segments) {
		const id = segments.indexOf(segment) + 1;
		const pathElement = document.getElementById('path' + id);
		game.setPolylineElement(pathElement, segment);
	}
	game.setRenderLandscape();
	target.setPathElement(document.getElementById(target.id + 'view'), true);
	for (let guard of guards) {
		guard.setPathElement(document.getElementById(guard.id + 'view'), true);
	}
});

document.addEventListener('keydown', e => {
	keysPressed[e.key] = true;
	if (keysPressed[' ']) {
		console.log('MAP: ', Map.segments);
		console.log('X: ', assassin.x);
		console.log('Y: ', assassin.y);
		speed = true;
	}
	let direction;
	if (keysPressed['ArrowUp']) {
		direction = 'up';
	} else if (keysPressed['ArrowRight']) {
		direction = 'right';
	} else if (keysPressed['ArrowDown']) {
		direction = 'down';
	} else if (keysPressed['ArrowLeft']) {
		direction = 'left';
	}
	if (moving === false) {
		moving = true;
		interval = setInterval(() => assassin.move(direction, speed), 1);
	}
});

document.addEventListener('keyup', e => {
	delete keysPressed[e.key];
	moving = false;
	speed = false;
	clearInterval(interval);
});
