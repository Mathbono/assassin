export default class Map {
	static landscape;
	levelCharacters;

	constructor(levelCharacters) {
		this.levelCharacters = levelCharacters;
		this.createSvgElement();
		this.setRenderLandscape();
		this.levelCharacters.getInitialPointsCharacters();
		this.createPolylineElement();
	}

	createSvgElement() {
		const svg = document.createElementNS(globalThis.svgns, 'svg');
		svg.setAttribute('version', '1.1');
		svg.setAttribute('baseProfile', 'full');
		svg.setAttribute('xmlns', globalThis.svgns);
		document.body.appendChild(svg);
	}

	createPolylineElement() {
		const landscape = this.levelCharacters.getPointsLandscape();
		for (let pathPoints of landscape) {
			const id = landscape.indexOf(pathPoints) + 1;
			const pathElement = document.createElementNS(
				globalThis.svgns,
				'polyline'
			);
			pathElement.setAttribute('id', 'path' + id);
			this.setPolylineElement(pathElement, pathPoints);
			pathElement.setAttribute('fill', 'transparent');
			pathElement.setAttribute('stroke', '#3e2723');
			pathElement.setAttribute('stroke-width', 10);
			document.querySelector('svg').appendChild(pathElement);
		}
	}

	setPolylineElement(pathElement, pathPoints) {
		pathElement.setAttribute('points', pathPoints.toString());
	}

	getRenderLandscape() {
		const paths = [];
		for (let path of this.levelCharacters.getPointsLandscape()) {
			for (let i = 0; i < path.length; i++) {
				if (i > 0) {
					const [x1, y1] = path[i - 1];
					const [x2, y2] = path[i];
					if (x1 === x2) {
						paths.push(['x', x1, y1, y2]);
					} else if (y1 === y2) {
						paths.push(['y', y1, x1, x2]);
					} else {
						alert("La diagonale n'est pas permise parmi les murs !");
					}
				}
			}
		}
		return paths;
	}

	setRenderLandscape() {
		Map.landscape = this.getRenderLandscape();
	}
}
