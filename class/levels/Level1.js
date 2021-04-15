class Level1 {
	ASSASSIN;
	TARGET;
	GUARDS = [];

	defineCoordCharacters() {
		this.TARGET = new Character(new Target(), 10, 10);
		this.GUARDS.push(
			new Character(new Guard(), 25, 25),
			new Character(new Guard(), 75, 75)
		);
		this.ASSASSIN = new Character(new Assassin(), 50, 50);
	}

	defineCoordWalls() {
		const W = document.body.offsetWidth;
		const H = document.body.offsetHeight;
		const map = [
			[
				[0, 0],
				[0, H],
				[W, H],
				[W, 0],
				[0, 0]
			]
		];
		for (let path of map) {
			for (let [x, y] of path) {
				y = H - y;
			}
		}
		return map;
	}
}
