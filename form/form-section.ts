import type AbstractControl from "../form-input/abstract-control";
import type FaIcon from "../fa-icon";

export default class FormSection {

	public controls: Array<AbstractControl> = [];
	public role:Array<string>|null = null;

	constructor(public title: string | null = null, public icon: FaIcon | null = null, public sizes:Array<string> = ['is-full']) {}

	addControl(control:AbstractControl){
		this.controls.push(control);
		return this;
	}

	public setRole(role:string|Array<string>):this{
		this.role = typeof role === "string" ? [role] : role;
		return this;
	}
}
