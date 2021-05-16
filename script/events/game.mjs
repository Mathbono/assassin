import {getStylesheetRules} from '../dynamic-modules/utilities.mjs';

export default async function setGame() {
	document.body.innerHTML = '';
	const bodyElementStyle = getStylesheetRules('main', 'body');
	bodyElementStyle.setProperty('background-image', 'none');
	bodyElementStyle.setProperty('background-color', 'black');
	const audioElement = document.createElement('audio');
	audioElement.setAttribute('id', 'footstep-sound');
	const audioSourceElement = document.createElement('source');
	audioSourceElement.setAttribute('src', '../sound/courir_sur_beton.wav');
	audioSourceElement.setAttribute('type', 'audio/wav');
	audioElement.appendChild(audioSourceElement);
	document.body.appendChild(audioElement);

	const Map = await import(`../dynamic-modules/class/Map.mjs`).then(
		({default: mod}) => mod
	);

	const LevelEntities = await import(
		`../dynamic-modules/class/levels/Level${this.id.slice(1)}.mjs`
	).then(({default: mod}) => mod);

	const game = new Map(new LevelEntities());
	const assassin = game.levelCharacters.assassin;
	const target = game.levelCharacters.target;
	const guards = game.levelCharacters.guards;

	const moveCharacter = await import(
		`../dynamic-modules/actions/moveCharacter.mjs`
	).then(({default: mod}) => mod);

	moveCharacter(target, {x: target.x, y: target.y});
	for (let guard of guards) {
		moveCharacter(guard, {x: guard.x, y: guard.y});
	}

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
		let keyDirectionPressed = false;
		if (keysPressed[' ']) {
			speed = true;
			keyDirectionPressed = true;
		}
		let direction;
		if (keysPressed['ArrowUp']) {
			direction = 'up';
			keyDirectionPressed = true;
		} else if (keysPressed['ArrowRight']) {
			direction = 'right';
			keyDirectionPressed = true;
		} else if (keysPressed['ArrowDown']) {
			direction = 'down';
			keyDirectionPressed = true;
		} else if (keysPressed['ArrowLeft']) {
			direction = 'left';
			keyDirectionPressed = true;
		}
		if (moving === false) {
			moving = true;
			if (keyDirectionPressed === true) {
				document.getElementById('footstep-sound').play();
				interval = setInterval(() => assassin.move(direction, speed), 5);
			}
		}
	});

	document.addEventListener('keyup', e => {
		delete keysPressed[e.key];
		moving = false;
		speed = false;
		document.getElementById('footstep-sound').pause();
		clearInterval(interval);
	});
}
