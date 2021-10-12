export default class FaIcon {

	static s(icon: string): FaIcon {return new FaIcon('fas', icon);}
	static r(icon: string): FaIcon {return new FaIcon('far', icon);}
	static l(icon: string): FaIcon {return new FaIcon('fal', icon);}
	static b(icon: string): FaIcon {return new FaIcon('fab', icon);}
	static d(icon: string): FaIcon {return new FaIcon('fad', icon);}


	constructor(public pack: string, public icon: string) {
		if (this.icon.substr(0, 3) === 'fa-') this.icon = this.icon.substr(3);
	}

	public animation: string | null = null;
	spin() { this.animation = "spin"; return this; }
	pulse() { this.animation = "pulse"; return this; }

	protected faa:FaAnim|null = null;
	public anim:any = {
		wrench: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("wrench", speed, reverse, hover); return this; },
		ring: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("ring", speed, reverse, hover); return this; },
		horizontal: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("horizontal", speed, reverse, hover); return this; },
		vertical: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("vertical", speed, reverse, hover); return this; },
		flash: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("flash", speed, reverse, hover); return this; },
		bounce: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("bounce", speed, reverse, hover); return this; },
		spin: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("spin", speed, reverse, hover); return this; },
		float: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("float", speed, reverse, hover); return this; },
		pulse: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("pulse", speed, reverse, hover); return this; },
		shake: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("shake", speed, reverse, hover); return this; },
		tada: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("tada", speed, reverse, hover); return this; },
		passing: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("passing", speed, reverse, hover); return this; },
		burst: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("burst", speed, reverse, hover); return this; },
		falling: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("falling", speed, reverse, hover); return this; },
		rising: (speed:number = 2, reverse:boolean = false, hover:boolean = false) => { this.faa = new FaAnim("rising", speed, reverse, hover); return this; },
	}

	toString() {return this.pack + ' fa-' + this.icon + (this.animation !== null ? " fa-" + this.animation : '') + (this.faa !== null ? this.faa : '')}
	get tag():string{ return '<i class="'+this.toString()+'"/>'; }
	get Icon():string{ return '<span class="icon">' + this.tag + '</span>'; }
	Tag(...classes:Array<string>):string{	return '<i class="'+this.toString()+' '+classes.join(' ')+'"/>';}
}

class FaAnim{
	constructor(public anim:string, public speed:number = 2, public reverse:boolean = false, public hover:boolean = false) {}

	toString(){
		return (
			" faa-" + this.anim +
			(this.speed < 2 ? " faa-slow" : "") +
			(this.speed > 2 ? " faa-fast" : "") +
			(this.hover ? " animated-hover" : " animated") +
			(this.reverse ? " faa-reverse" : "")
		);
	}
}
