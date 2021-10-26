import OptionSetApi from "../option-set-api";
import AbstractInput, {component, layout} from "../abstract-control";
import type I_OptionSetApi from "../option-set-api.interface";
import type I_OptionSet from "../option-set.interface";
import Component from "./component.svelte"


@component(Component)
@layout("row")
export default class RadioControl extends AbstractInput {

	public options: Array<I_OptionSet> = [];
	setOptions(options: Array<I_OptionSet>): this {
		this.options = options;
		return this;
	}

	public api: I_OptionSetApi | null = null;
	setApi(api: I_OptionSetApi | string): this {
		if (typeof api === "string") api = OptionSetApi.factory(api);
		this.api = api;
		return this;
	}
}
