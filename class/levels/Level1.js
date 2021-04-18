class Level1 {
	ASSASSIN;
	TARGET;
	GUARDS = [];

	getInitialCoordCharacters() {
		this.TARGET = new Character(new Target(), 10, 10);
		this.GUARDS.push(
			new Character(new Guard(), 25, 25),
			new Character(new Guard(), 75, 75)
		);
		this.ASSASSIN = new Character(new Assassin(), 50, 50);
	}

	getCoordWalls() {
		const W = document.body.offsetWidth;
		const H = document.body.offsetHeight;
		const walls = [
			[
				[0, 0],
				[0, H],
				[W, H],
				[W, 0],
				[0, 0]
			],
			[
				[80, 0],
				[80, 80],
				[150, 80],
				[150, 0]
			]
		];
		/*
		for (let path of walls) {
			for (let [x, y] of path) {
				y = H - y;
			}
		}
		*/
		return walls;
	}

	getDrawingWalls() {
		const walls = [];
		for (let path of this.getCoordWalls()) {
			for (let i = 0; i < path.length; i++) {
				if (i > 0) {
					const [x1, y1] = path[i - 1];
					const [x2, y2] = path[i];
					if (x1 === x2) {
						walls.push(['x', x1, y1, y2]);
					} else if (y1 === y2) {
						walls.push(['y', y1, x1, x2]);
					} else {
						alert("La diagonale n'est pas permise parmi les murs !");
					}
				}
			}
		}
		return walls;
	}
}
