import type Form from "../../form/form";
import AbstractControl, {component, layout} from "../abstract-control";
import EntityMapApi from "../entity-map-api";
import type I_EntityMapApi from "../entity-map-api.interface";
import Component from "./component.svelte"


@component(Component)
@layout("row")
export default class ComboboxControl extends AbstractControl {

	public api: I_EntityMapApi | null = null;
	public multi: boolean | number = false;
	public form: typeof Form | null = null;
	public minChar: number = 3;

	setMinChar(minChar: number): this {
		this.minChar = minChar;
		return this;
	}

	setApi(api: I_EntityMapApi | string): this {
		this.api = typeof api === "string" ? api = new EntityMapApi(api) : api;
		return this;
	}

	setForm(form: typeof Form): this {
		this.form = form;
		return this;
	}

	setMulti(amount: true | number = true): this {
		this.multi = amount;
		return this;
	}
}
