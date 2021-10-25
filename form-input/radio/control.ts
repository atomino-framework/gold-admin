import type I_ItemsApi from "gold-admin/form-input/items-api.interface";
import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"


export interface IOption {
	label: string,
	value: any
}

@component(Component)
@layout("row")
export default class RadioControl extends AbstractInput {

	public options: Array<IOption> = [];
	Options(options: Array<IOption>): this {
		this.options = options;
		return this;
	}

	public api: I_ItemsApi|null = null;
	Api(url: I_ItemsApi): this {
		this.api = url;
		return this;
	}
}
