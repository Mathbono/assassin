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

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
const audioElement = document.getElementById('welcome-music');
let track;
const playButton = document.getElementById('tape-controls-play');

document.addEventListener('DOMContentLoaded', () => {
	playButton.dispatchEvent(new MouseEvent('click'));
});

playButton.addEventListener(
	'click',
	function () {
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
	},
	false
);

audioElement.addEventListener(
	'ended',
	() => {
		playButton.dataset.playing = 'false';
		playButton.setAttribute('aria-checked', 'false');
	},
	false
);

let i = 0;
for (let levelElement of document.getElementsByClassName('level')) {
	i++;
	levelElement.id = `l${i}`;
	levelElement.appendChild(document.createTextNode(i));

	window.addEventListener('scroll', () => {
		const middleScreen = window.innerHeight / 2;
		const levelElementTop = levelElement.getBoundingClientRect().top;

		if (levelElementTop > middleScreen) {
			levelElement.style.opacity = 1;
		}
		if (levelElementTop < middleScreen) {
			levelElement.style.opacity = 0.9;
		}
		if (levelElementTop < middleScreen - 20) {
			levelElement.style.opacity = 0.8;
		}
		if (levelElementTop < middleScreen - 40) {
			levelElement.style.opacity = 0.7;
		}
		if (levelElementTop < middleScreen - 60) {
			levelElement.style.opacity = 0.6;
		}
		if (levelElementTop < middleScreen - 80) {
			levelElement.style.opacity = 0.5;
		}
		if (levelElementTop < middleScreen - 100) {
			levelElement.style.opacity = 0.4;
		}
		if (levelElementTop < middleScreen - 120) {
			levelElement.style.opacity = 0.3;
		}
		if (levelElementTop < middleScreen - 140) {
			levelElement.style.opacity = 0.2;
		}
		if (levelElementTop < middleScreen - 160) {
			levelElement.style.opacity = 0.1;
		}
		if (levelElementTop < middleScreen - 180) {
			levelElement.style.opacity = 0;
		}
	});

	levelElement.addEventListener('click', async () => {
		document.body.innerHTML = '';
		const bodyElementStyle = getStylesheetRules('main', 'body');
		bodyElementStyle.setProperty('background-image', 'none');
		bodyElementStyle.setProperty('background-color', 'black');

		const Map = await import(`./class/Map.mjs`).then(({default: mod}) => mod);

		const LevelEntities = await import(
			`./class/levels/Level${levelElement.id.slice(1)}.mjs`
		).then(({default: mod}) => mod);

		const game = new Map(new LevelEntities());
		const assassin = game.levelCharacters.assassin;
		const target = game.levelCharacters.target;
		const guards = game.levelCharacters.guards;

		const moveCharacter = await import(`./actions/moveCharacter.mjs`).then(
			({default: mod}) => mod
		);

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
