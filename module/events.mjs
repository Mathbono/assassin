import Map from './class/Map.mjs';
import moveCharacter from './actions/moveCharacter.mjs';

function getStylesheetRules(sheetName, selectorName = null) {
	const rulesList = document.querySelector(`link[href*=${sheetName}]`).sheet
		.cssRules;
	if (selectorName) {
		for (let rule of rulesList) {
			if (rule.selectorText === selectorName) {
				return rule.style;
			}
		}
	}
	return rulesList;
}

const audioElement = document.getElementById('welcome-music');
const playButton = document.getElementById('tape-controls-play');

document.addEventListener('DOMContentLoaded', () => {
	playButton.dispatchEvent(new MouseEvent('click'));
});

playButton.addEventListener('click', function () {
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	let audioCtx;
	let track;
	if (!audioCtx) {
		audioCtx = new AudioContext();
		track = audioCtx.createMediaElementSource(audioElement);
		const gainNode = audioCtx.createGain();
		const volumeControl = document.querySelector('[data-action="volume"]');
		volumeControl.addEventListener(
			'input',
			function () {
				gainNode.gain.value = this.value;
			},
			false
		);
		track.connect(gainNode).connect(audioCtx.destination);
	}
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	if (this.dataset.playing === 'false') {
		audioElement.play();
		this.dataset.playing = 'true';
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	let state = this.getAttribute('aria-checked') === 'true' ? true : false;
	this.setAttribute('aria-checked', state ? 'false' : 'true');
});

audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute('aria-checked', 'false');
});

let LevelEntities;
let game;
let assassin;
let target;
let guards;

let i = 0;
for (let levelElement of document.getElementsByClassName('level')) {
	i++;
	levelElement.id = `l${i}`;
	levelElement.appendChild(document.createTextNode(i));

	levelElement.addEventListener('click', async () => {
		document.body.innerHTML = '';
		const bodyElementStyle = getStylesheetRules('main', 'body');
		bodyElementStyle.setProperty('background-image', 'none');
		bodyElementStyle.setProperty('background-color', 'black');
		LevelEntities = await import(
			`./class/levels/Level${levelElement.id.slice(1)}.mjs`
		).then(({default: mod}) => mod);
		game = new Map(new LevelEntities());
		assassin = game.levelCharacters.assassin;
		target = game.levelCharacters.target;
		guards = game.levelCharacters.guards;
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
			target.setPathElement(
				document.getElementById(target.id + 'view'),
				true
			);
			for (let guard of guards) {
				guard.setPathElement(
					document.getElementById(guard.id + 'view'),
					true
				);
			}
		});

		document.addEventListener('keydown', e => {
			keysPressed[e.key] = true;
			if (keysPressed[' ']) {
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
				interval = setInterval(() => assassin.move(direction, speed), 5);
			}
		});

		document.addEventListener('keyup', e => {
			delete keysPressed[e.key];
			moving = false;
			speed = false;
			clearInterval(interval);
		});
	});
}
