import type {SvelteComponent} from "svelte";

export default class AbstractControl {
	static component: typeof SvelteComponent;
	static layout: "column" | "row" = "column";
	public layout: "column" | "row" = "column";
	public hint: string | null = null;
	public role: Array<string> | null = null;

	constructor(public field: string, public label: string | null = null) {
		this.label = this.label !== null ? this.label : this.field.toString();
		this.layout = (this.constructor as typeof AbstractControl).layout;
	}

	get component(): typeof SvelteComponent { return (this.constructor as typeof AbstractControl).component;}

	Hint(hint: string): this {
		this.hint = hint;
		return this;
	}

	Layout(layout: "column" | "row"): this {
		this.layout = layout;
		return this;
	}

	Role(role: string | Array<string>): this {
		this.role = typeof role === "string" ? [role] : role;
		return this;
	}
}

export function component(component: typeof SvelteComponent) {
	return function (constructor: typeof AbstractControl) {
		constructor.component = component;
	}
}

export function layout(layout: "column" | "row") {
	return function (constructor: typeof AbstractControl) {
		constructor.layout = layout;
	}
}
