const game = new Map(new Level1());

let interval;
let keysPressed = {};
let moving = false;
let speed = false;

window.addEventListener('resize', () => {
	const landscape = game.LEVELENTITIES.getPointsLandscape();
	for (let pathPoints of landscape) {
		const id = landscape.indexOf(pathPoints) + 1;
		const pathElement = document.getElementById('path' + id);
		game.setPolylineElement(pathElement, pathPoints, id);
	}
	game.setRenderLandscape();
	const target = game.LEVELENTITIES.TARGET;
	target.setPathElement(document.getElementById(target.id + 'view'));
	for (let guard of game.LEVELENTITIES.GUARDS) {
		guard.setPathElement(document.getElementById(guard.id + 'view'));
	}
});

document.addEventListener('keydown', e => {
	keysPressed[e.key] = true;
	if (keysPressed[' ']) {
		console.log('MAP: ', Map.landscape);
		console.log('X: ', game.LEVELENTITIES.ASSASSIN.x);
		console.log('Y: ', game.LEVELENTITIES.ASSASSIN.y);
		speed = true;
	}
	let direction;
	if (keysPressed['ArrowUp']) {
		direction = 'up';
	} else if (keysPressed['ArrowRight']) {
		direction = 'left';
	} else if (keysPressed['ArrowDown']) {
		direction = 'bottom';
	} else if (keysPressed['ArrowLeft']) {
		direction = 'right';
	}
	if (moving === false) {
		moving = true;
		interval = setInterval(
			() => game.LEVELENTITIES.ASSASSIN.move(direction, speed),
			1
		);
	}
});

document.addEventListener('keyup', e => {
	delete keysPressed[e.key];
	moving = false;
	speed = false;
	clearInterval(interval);
});
