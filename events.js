const game = new Map(new Level1());

const assassin = game.LEVELENTITIES.ASSASSIN;
const target = game.LEVELENTITIES.TARGET;
const guards = game.LEVELENTITIES.GUARDS;

let interval;
let keysPressed = {};
let moving = false;
let speed = false;

setInterval(() => target.move('up', false), 10);

window.addEventListener('resize', () => {
	const landscape = game.LEVELENTITIES.getPointsLandscape();
	for (let pathPoints of landscape) {
		const id = landscape.indexOf(pathPoints) + 1;
		const pathElement = document.getElementById('path' + id);
		game.setPolylineElement(pathElement, pathPoints);
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
		console.log('MAP: ', Map.landscape);
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
		interval = setInterval(() => assassin.move(direction, speed), 10);
	}
});

document.addEventListener('keyup', e => {
	delete keysPressed[e.key];
	moving = false;
	speed = false;
	clearInterval(interval);
});
