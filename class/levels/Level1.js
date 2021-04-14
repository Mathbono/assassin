class Level1 {
	ASSASSIN;
	TARGET;
	GUARDS = [];

	constructor() {}

	displayCharacters() {
		this.TARGET = new Character(new Target(), 10, 10);
		this.GUARDS.push(
			new Character(new Guard(), 25, 25),
			new Character(new Guard(), 75, 75)
		);
		this.ASSASSIN = new Character(new Assassin(), 50, 50);
	}

	displayWalls() {}
}
