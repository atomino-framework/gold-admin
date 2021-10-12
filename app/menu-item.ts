import type FaIcon from "../fa-icon";

export default class MenuItem{
	constructor(public label:string, public icon:FaIcon|null, public action:Function|Array<MenuItem>, public role:string|Array<string>|null = null) {
		if(typeof role === "string") this.role = [role];
	}
}
