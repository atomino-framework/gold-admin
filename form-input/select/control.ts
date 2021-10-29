import {convertToOptionSet} from "gold-admin/form-input/option-set.interface";
import type {valueLabelPair} from "gold-admin/form-input/option-set.interface";
import OptionSetApi from "../option-set-api";
import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"
import type I_OptionSetApi from "../option-set-api.interface";
import type I_OptionSet from "../option-set.interface";

@component(Component)
@layout("row")
export default class SelectControl extends AbstractInput {

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
