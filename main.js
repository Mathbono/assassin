const circle = document.querySelector('circle');
let interval;
let moving = false;

function moveCircle(direction) {
	let x = circle.cx.baseVal.value;
	let y = circle.cy.baseVal.value;
	switch (direction) {
		case 'up':
			y--;
			break;
		case 'right':
			x++;
			break;
		case 'down':
			y++;
			break;
		case 'left':
			x--;
			break;
		default:
			return;
	}
	circle.cx.baseVal.value = x;
	circle.cy.baseVal.value = y;
}

document.addEventListener('keydown', e => {
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
		interval = setInterval(moveCircle, 1, direction);
	}
});

document.addEventListener('keyup', () => {
	moving = false;
	clearInterval(interval);
});
