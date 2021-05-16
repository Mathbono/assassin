export default function setHomeMusic() {
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	let audioCtx;
	const audioHomeElement = document.getElementById('home-music');
	let track;
	const audioHomeButton = document.getElementById('tape-controls-play');

	document.addEventListener('DOMContentLoaded', () => {
		audioHomeButton.dispatchEvent(new MouseEvent('click'));
	});

	audioHomeButton.addEventListener(
		'click',
		function () {
			if (!audioCtx) {
				audioCtx = new AudioContext();
				track = audioCtx.createMediaElementSource(audioHomeElement);
				const gainNode = audioCtx.createGain();
				const volumeControl = document.getElementById('volume-control');
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
				audioHomeElement.play();
				this.dataset.playing = 'true';
			} else if (this.dataset.playing === 'true') {
				audioHomeElement.pause();
				this.dataset.playing = 'false';
			}
			let state =
				this.getAttribute('aria-checked') === 'true' ? true : false;
			this.setAttribute('aria-checked', state ? 'false' : 'true');
		},
		false
	);

	audioHomeElement.addEventListener(
		'ended',
		() => {
			audioHomeButton.dataset.playing = 'false';
			audioHomeButton.setAttribute('aria-checked', 'false');
		},
		false
	);
}
