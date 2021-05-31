import {
	setFootstepSound,
	playFootstepSound,
	pauseFootstepSound,
	setStabSound,
	playStabSound
} from './sound.mjs';
import passwords from '../auth.mjs';
import {getStylesheetRules} from '../utilities.mjs';

export default async function setGame(level) {
	document.body.innerHTML = '';
	const bodyElementStyle = getStylesheetRules('main', 'body');
	bodyElementStyle.setProperty('background-image', 'none');
	bodyElementStyle.setProperty('background-color', 'black');

	setFootstepSound();
	setStabSound();

	const Map = await import(`../dynamic-modules/class/Map.mjs`).then(
		({default: mod}) => mod
	);

	const LevelEntities = await import(
		`../dynamic-modules/class/levels/Level${level}.mjs`
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
			const characterViewPathElement = document.getElementById('path' + id);
			game.setWallsPolylineElement(characterViewPathElement, segment);
		}
		game.setRenderLandscape();
		target.setCharacterViewPathElement(
			document.getElementById(target.id + 'view'),
			true
		);
		for (let guard of guards) {
			guard.setCharacterViewPathElement(
				document.getElementById(guard.id + 'view'),
				true
			);
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
				playFootstepSound();
				interval = setInterval(() => {
					assassin.move(direction, speed);
					if (
						Math.abs(assassin.x - target.x) < 15 &&
						Math.abs(assassin.y - target.y) < 15
					) {
						pauseFootstepSound();
						playStabSound();
						const wonDivElement = document.createElement('div');
						wonDivElement.setAttribute('id', 'won');
						wonDivElement.appendChild(
							document.createTextNode(
								'Gagné ! Mot de passe pour la mission suivante : ' +
									atob(passwords[level - 1]).toUpperCase() +
									'. Conservez-le bien ! '
							)
						);
						const terminateButtonElement =
							document.createElement('button');
						terminateButtonElement.appendChild(
							document.createTextNode('Terminer')
						);
						wonDivElement.appendChild(terminateButtonElement);
						document.body.appendChild(wonDivElement);
						terminateButtonElement.addEventListener('click', () => {
							document.location.reload();
						});
					}
				}, 5);
			}
		}
	});

	document.addEventListener('keyup', e => {
		delete keysPressed[e.key];
		moving = false;
		speed = false;
		pauseFootstepSound();
		clearInterval(interval);
	});
}
