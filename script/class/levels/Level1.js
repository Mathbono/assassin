class Level1 {
	ASSASSIN;
	TARGET;
	GUARDS = [];

	getInitialPointsCharacters() {
		this.TARGET = new Character(new Target(), 10, 10);
		this.GUARDS.push(
			new Character(new Guard(), 20, 20),
			new Character(new Guard(), 75, 75)
		);
		this.ASSASSIN = new Character(new Assassin(), 50, 50);
	}

	getPointsLandscape() {
		const W = document.body.offsetWidth;
		const H = document.body.offsetHeight;
		const paths = [
			[
				[0, 0],
				[0, H],
				[W, H],
				[W, 0],
				[0, 0]
			],
			[
				[W / 4, H],
				[W / 4, (H * 3) / 4],
				[W / 2, (H * 3) / 4],
				[W / 2, H]
			]
		];
		for (let path of paths) {
			for (let point of path) {
				point[1] = H - point[1];
			}
		}
		return paths;
	}
}
