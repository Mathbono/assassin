const assassin = new Assassin(50, 50);

let interval;
let moving = false;
let speed = false;

document.addEventListener('keydown', e => {
	if (e.key === ' ') {
		speed = true;
	}
	const step = speed === false ? 1 : 2;
	let direction;
	switch (e.key) {
		case 'ArrowUp':
			direction = 'up';
			break;
		case 'ArrowRight':
			direction = 'right';
			break;
		case 'ArrowDown':
			direction = 'down';
			break;
		case 'ArrowLeft':
			direction = 'left';
			break;
		default:
			return;
	}
	if (moving === false) {
		moving = true;
		interval = setInterval(() => assassin.move(direction, step), 1);
	}
});

document.addEventListener('keyup', () => {
	moving = false;
	speed = false;
	clearInterval(interval);
});
