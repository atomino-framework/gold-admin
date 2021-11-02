import {convertToOptionSet, valueLabelPair} from "../../form-input/option-set.interface";
import OptionSetApi from "../option-set-api";
import type I_OptionSetApi from "../option-set-api.interface";
import type I_OptionSet from "../option-set.interface";
import AbstractControl, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

@component(Component)
@layout("row")
export default class CheckboxesControl extends AbstractControl {

	public options: Array<I_OptionSet> = [];
	setOptions(options: Array<I_OptionSet>|valueLabelPair|Array<string>): this {
		this.options = convertToOptionSet(options);
		return this;
	}

	public api: I_OptionSetApi | null = null;
	setApi(api: I_OptionSetApi | string): this {
		this.api = typeof api === "string" ? api = new OptionSetApi(api) : api;
		return this;
	}
}
