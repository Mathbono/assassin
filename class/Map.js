class Map {
	static landscape;
	LEVELENTITIES;

	constructor(LEVELENTITIES) {
		this.LEVELENTITIES = LEVELENTITIES;
		this.createSvgElement();
		this.setRenderLandscape();
		this.LEVELENTITIES.getInitialPointsCharacters();
		const landscape = this.LEVELENTITIES.getPointsLandscape();
		for (let pathPoints of landscape) {
			const id = landscape.indexOf(pathPoints);
			const pathElement = document.createElementNS(
				globalThis.svgns,
				'polyline'
			);
			this.setPolylineElement(pathElement, pathPoints, id);
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

	setPolylineElement(pathElement, pathPoints, id) {
		pathElement.setAttribute('id', 'path' + id);
		pathElement.setAttribute('points', pathPoints.toString());
		pathElement.setAttribute('fill', 'transparent');
		pathElement.setAttribute('stroke', 'black');
		pathElement.setAttribute('stroke-width', 5);
		document.querySelector('svg').appendChild(pathElement);
	}

	getRenderLandscape() {
		const paths = [];
		for (let path of this.LEVELENTITIES.getPointsLandscape()) {
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
