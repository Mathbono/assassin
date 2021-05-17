import {setHomeMusic} from './sound.mjs';
import setGame from './game.mjs';

setHomeMusic();

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

	levelElement.addEventListener('click', setGame);
}
