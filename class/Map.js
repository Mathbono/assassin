class Map {
	static walls;
	LEVELENTITIES;

	constructor(LEVELENTITIES) {
		this.LEVELENTITIES = LEVELENTITIES;
		this.createSvgElement();
		Map.walls = this.LEVELENTITIES.getDrawingWalls();
		this.LEVELENTITIES.getInitialCoordCharacters();
		for (let path of this.LEVELENTITIES.getCoordWalls()) {
			this.createPolylineElement(path);
		}
	}

	createSvgElement() {
		const svg = document.createElementNS(globalThis.svgns, 'svg');
		svg.setAttribute('width', 100 + '%');
		svg.setAttribute('height', 100 + '%');
		svg.setAttribute('version', '1.1');
		svg.setAttribute('baseProfile', 'full');
		svg.setAttribute('xmlns', globalThis.svgns);
		document.body.appendChild(svg);
	}

	createPolylineElement(path) {
		const wall = document.createElementNS(globalThis.svgns, 'polyline');
		wall.setAttribute('points', path.toString());
		wall.setAttribute('fill', 'transparent');
		wall.setAttribute('stroke', 'black');
		wall.setAttribute('stroke-width', 5);
		document.querySelector('svg').appendChild(wall);
	}
}
