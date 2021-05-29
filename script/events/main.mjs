import setDocument from './document.mjs';
import {setMusic} from './sound.mjs';
import setGame from './game.mjs';

setDocument(1);
setMusic();

let i = 0;
for (let levelButtonElement of document.getElementsByClassName('level')) {
	i++;
	levelButtonElement.id = `l${i}`;
	levelButtonElement.appendChild(document.createTextNode(i));

	window.addEventListener('scroll', () => {
		const middleScreen = window.innerHeight / 2;
		const levelButtonElementTop =
			levelButtonElement.getBoundingClientRect().top;

		if (levelButtonElementTop > middleScreen) {
			levelButtonElement.style.opacity = 1;
		}
		if (levelButtonElementTop < middleScreen) {
			levelButtonElement.style.opacity = 0.9;
		}
		if (levelButtonElementTop < middleScreen - 20) {
			levelButtonElement.style.opacity = 0.8;
		}
		if (levelButtonElementTop < middleScreen - 40) {
			levelButtonElement.style.opacity = 0.7;
		}
		if (levelButtonElementTop < middleScreen - 60) {
			levelButtonElement.style.opacity = 0.6;
		}
		if (levelButtonElementTop < middleScreen - 80) {
			levelButtonElement.style.opacity = 0.5;
		}
		if (levelButtonElementTop < middleScreen - 100) {
			levelButtonElement.style.opacity = 0.4;
		}
		if (levelButtonElementTop < middleScreen - 120) {
			levelButtonElement.style.opacity = 0.3;
		}
		if (levelButtonElementTop < middleScreen - 140) {
			levelButtonElement.style.opacity = 0.2;
		}
		if (levelButtonElementTop < middleScreen - 160) {
			levelButtonElement.style.opacity = 0.1;
		}
		if (levelButtonElementTop < middleScreen - 180) {
			levelButtonElement.style.opacity = 0;
		}
	});

	levelButtonElement.addEventListener('click', setGame);
}
