class Map {
	LEVEL;

	constructor(LEVEL) {
		this.LEVEL = LEVEL;
		this.createElement();
		this.LEVEL.displayCharacters();
		this.LEVEL.displayWalls();
	}
	createElement() {
		const svg = document.createElementNS(globalThis.svgns, 'svg');
		svg.setAttribute('width', '100%');
		svg.setAttribute('height', '100%');
		svg.setAttribute('version', '1.1');
		svg.setAttribute('baseProfile', 'full');
		svg.setAttribute('xmlns', globalThis.svgns);
		document.body.appendChild(svg);
	}
}
