export default function setDocument() {
	const title = document.createElement('h1');
	title.appendChild(document.createTextNode('Assassin'));
	document.body.appendChild(title);

	const levelButtonsElement = document.createElement('div');
	levelButtonsElement.setAttribute('id', 'levels');
	for (let i = 1; i <= 6; i++) {
		const levelButtonElement = document.createElement('button');
		levelButtonElement.setAttribute('class', 'level');
		levelButtonsElement.appendChild(levelButtonElement);
	}
	document.body.appendChild(levelButtonsElement);

	const musicSectionElement = document.createElement('section');
	musicSectionElement.setAttribute('id', 'music-volume');

	const musicInputElement = document.createElement('input');
	musicInputElement.setAttribute('type', 'range');
	musicInputElement.setAttribute('id', 'volume-control');
	musicInputElement.setAttribute('min', '0');
	musicInputElement.setAttribute('max', '2');
	musicInputElement.setAttribute('value', '1');
	musicInputElement.setAttribute('step', '0.01');
	musicSectionElement.appendChild(musicInputElement);

	const musicLabelElement = document.createElement('label');
	musicLabelElement.setAttribute('for', 'volume-control');
	musicLabelElement.appendChild(document.createTextNode('VOL'));
	musicSectionElement.appendChild(musicLabelElement);

	const musicAudioElement = document.createElement('audio');
	musicAudioElement.setAttribute('id', 'home-music');
	musicAudioElement.setAttribute('src', 'sound/shadow_of_the_beast.mp3');
	musicAudioElement.setAttribute('type', 'audio/mpeg');
	musicSectionElement.appendChild(musicAudioElement);

	const musicButtonElement = document.createElement('button');
	musicButtonElement.setAttribute('data-playing', 'false');
	musicButtonElement.setAttribute('id', 'tape-controls-play');
	musicButtonElement.setAttribute('role', 'switch');
	musicButtonElement.setAttribute('aria-checked', 'false');
	const musicSpanElement = document.createElement('span');
	musicSpanElement.appendChild(document.createTextNode('Play/Pause'));
	musicButtonElement.appendChild(musicSpanElement);
	musicSectionElement.appendChild(musicButtonElement);

	document.body.appendChild(musicSectionElement);
}
