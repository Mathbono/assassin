import setDocument from './document.mjs';
import {setMusic} from './sound.mjs';
import setGame from './game.mjs';
import {getStylesheetRules} from '../utilities.mjs';

setDocument();
setMusic();

let i = 0;
for (let levelButtonElement of document.getElementsByClassName('level')) {
	i++;
	levelButtonElement.id = `l${i}`;
	levelButtonElement.appendChild(document.createTextNode(i));

	window.addEventListener('scroll', () => {
		if (document.getElementById('password') !== null) {
			document.getElementById('password').remove();
		}
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

	levelButtonElement.addEventListener('click', e => {
		if (document.getElementById('password') !== null) {
			document.getElementById('password').remove();
		}
		const level = parseInt(e.currentTarget.id.slice(1));
		if (level > 1) {
			const levelPasswordInputElement = document.createElement('input');
			levelPasswordInputElement.setAttribute('id', 'password');
			levelPasswordInputElement.setAttribute('placeholder', 'Mot de passe');
			document
				.getElementById('levels')
				.insertBefore(levelPasswordInputElement, e.currentTarget);
			const levelPasswordInputElementStyle = getStylesheetRules(
				'main',
				'#password'
			);
			levelPasswordInputElementStyle.setProperty(
				'top',
				e.currentTarget.getBoundingClientRect().top + window.scrollY + 'px'
			);
			levelPasswordInputElementStyle.setProperty(
				'left',
				e.currentTarget.getBoundingClientRect().left + 'px'
			);
			levelPasswordInputElement.addEventListener('keydown', async e => {
				if (e.key === 'Enter') {
					const input = e.currentTarget.value.trim().toLowerCase();
					try {
						let response = await fetch('../../doc/password.txt', {
							mode: 'no-cors'
						});
						let password = await response.text();
						if (input === atob(password.split('\n')[level - 2])) {
							setGame(level);
						} else {
							alert('Perdu !');
						}
					} catch (e) {
						alert('Le niveau est momentanément indisponible');
					}
				}
			});
		} else {
			setGame(1);
		}
	});
}
