let level = 1;
levelEntities = Function(`'use strict';return new Level${level}()`)();
const game = new Map(levelEntities);

const assassin = game.LEVELENTITIES.ASSASSIN;
const target = game.LEVELENTITIES.TARGET;
const guards = game.LEVELENTITIES.GUARDS;

function moveCharacter(character, forbiddenDirection = null) {
	const allowedDirections = ['up', 'right', 'down', 'left'];
	if (forbiddenDirection !== null) {
		allowedDirections.splice(
			allowedDirections.indexOf(forbiddenDirection),
			1
		);
	}
	const direction =
		allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
	const interval = setInterval(() => {
		character.move(direction, false);
		if (character.collision === true) {
			clearInterval(interval);
			setTimeout(() => moveCharacter(character, direction), 2000);
		}
	}, 1);
}
