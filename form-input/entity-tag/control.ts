import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"
import type I_OptionSet from "../option-set.interface";
import {convertToOptionSet} from "../option-set.interface";
import type I_EntityMapApi from "../entity-map-api.interface";
import EntityMapApi from "../entity-map-api";
import type Form from "../../form/form";

@component(Component)
@layout("column")
export default class EntityTagControl extends AbstractInput {

	public limit: number = Infinity;
	public api: I_EntityMapApi | null = null;
	public form: typeof Form | null = null;
	public viewOnly: boolean = false;
	public fullWidth: boolean = false;

	setFullWidth(fullWidth = true) {
		this.fullWidth = fullWidth;
		return this;
	}

	setViewOnly(viewOnly = true) {
		this.viewOnly = viewOnly;
		return this;
	}

	setLimit(limit: number = 1) {
		this.limit = limit;
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
}
