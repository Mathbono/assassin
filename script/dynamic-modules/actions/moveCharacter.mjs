import {getRandomIntegerTo, getRandomNumberFromTo} from '../../utilities.mjs';

export default function moveCharacter(
	character,
	initialPosition,
	allowedDirections = null
) {
	if (allowedDirections === null) {
		allowedDirections = ['up', 'right', 'down', 'left'];
	}
	const randomDirection =
		allowedDirections[getRandomIntegerTo(allowedDirections.length)];
	const randomDistanceToTravel = getRandomNumberFromTo(100, 400);
	const interval = setInterval(() => {
		character.move(randomDirection);
		if (
			(character.x > initialPosition.x &&
				character.x - initialPosition.x > randomDistanceToTravel) ||
			(character.y > initialPosition.y &&
				character.y - initialPosition.y > randomDistanceToTravel) ||
			(character.x < initialPosition.x &&
				initialPosition.x - character.x > randomDistanceToTravel) ||
			(character.y < initialPosition.y &&
				initialPosition.y - character.y > randomDistanceToTravel) ||
			character.collision === true
		) {
			clearInterval(interval);
			allowedDirections = ['up', 'right', 'down', 'left'];
			if (allowedDirections.includes(character.direction)) {
				allowedDirections.splice(
					allowedDirections.indexOf(character.direction),
					1
				);
			}
			if (character.detectWall(100).length > 0) {
				switch (character.direction) {
					case 'up':
						allowedDirections.splice(
							allowedDirections.indexOf('right'),
							1
						);
						allowedDirections.splice(
							allowedDirections.indexOf('left'),
							1
						);
						break;
					case 'right':
						allowedDirections.splice(allowedDirections.indexOf('up'), 1);
						allowedDirections.splice(
							allowedDirections.indexOf('down'),
							1
						);
						break;
					case 'down':
						allowedDirections.splice(
							allowedDirections.indexOf('right'),
							1
						);
						allowedDirections.splice(
							allowedDirections.indexOf('left'),
							1
						);
						break;
					case 'left':
						allowedDirections.splice(allowedDirections.indexOf('up'), 1);
						allowedDirections.splice(
							allowedDirections.indexOf('down'),
							1
						);
						break;
					default:
						return;
				}
			} else {
				for (let forbiddenDirection of character.detectWall(300)) {
					if (allowedDirections.length === 1) break;
					if (allowedDirections.includes(forbiddenDirection)) {
						allowedDirections.splice(
							allowedDirections.indexOf(forbiddenDirection),
							1
						);
					}
				}
			}
			setTimeout(
				() =>
					moveCharacter(
						character,
						{x: character.x, y: character.y},
						allowedDirections
					),
				character.character.name === 'target' ? 500 : 1500
			);
		}
	}, 5);
}
