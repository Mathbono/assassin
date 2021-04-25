class Guard {
	static id = 0;
	id;
	name;
	color;
	baseSpeed;

	constructor() {
		this.id = ++Guard.id;
		this.name = 'guard';
		this.color = 'black';
		this.baseSpeed = 1;
	}
}
