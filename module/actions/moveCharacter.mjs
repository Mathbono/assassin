export default function moveCharacter(
	character,
	initialPosition,
	forbiddenDirection = null
) {
	const allowedDirections = ['up', 'right', 'down', 'left'];
	if (forbiddenDirection !== null) {
		allowedDirections.splice(
			allowedDirections.indexOf(forbiddenDirection),
			1
		);
	}
	const randomDirection =
		allowedDirections[getRandomIntegerTo(allowedDirections.length)];
	const randomDistanceToTravelX = getRandomNumberFromTo(100, 400);
	const randomDistanceToTravelY = getRandomNumberFromTo(100, 400);
	const interval = setInterval(() => {
		character.move(randomDirection);
		if (
			character.x - initialPosition.x > randomDistanceToTravelX ||
			character.y - initialPosition.y > randomDistanceToTravelY ||
			character.collision === true
		) {
			clearInterval(interval);
			setTimeout(
				() =>
					moveCharacter(
						character,
						{x: character.x, y: character.y},
						randomDirection
					),
				2000
			);
		}
	}, 1);
}

function getRandomIntegerTo(max) {
	return Math.floor(Math.random() * max);
}

function getRandomNumberFromTo(min, max) {
	return Math.random() * (max - min) + min;
}
