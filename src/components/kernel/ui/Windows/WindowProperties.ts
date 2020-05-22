
export enum WindowMode {
	Normal,
	Maximized,
	Minimized,
	Hidden
}

export class Point
{
	x = 0;
	y = 0;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

}