const game = new Map(new Level1());

let interval;
let keysPressed = {};
let moving = false;
let speed = false;

window.addEventListener('resize', () => {
	for (let wall of document.getElementsByTagName('polyline')) {
		wall.remove();
	}
	for (let path of game.LEVELENTITIES.defineCoordWalls()) {
		game.createPolylineElement(path);
	}
});

document.addEventListener('keydown', e => {
	keysPressed[e.key] = true;
	if (keysPressed[' ']) {
		speed = true;
	}
	let direction;
	if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
		direction = 'northeast';
	} else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
		direction = 'southeast';
	} else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
		direction = 'southwest';
	} else if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
		direction = 'northwest';
	} else if (keysPressed['ArrowUp']) {
		direction = 'north';
	} else if (keysPressed['ArrowRight']) {
		direction = 'east';
	} else if (keysPressed['ArrowDown']) {
		direction = 'south';
	} else if (keysPressed['ArrowLeft']) {
		direction = 'west';
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
