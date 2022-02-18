import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"
import type I_OptionSet from "../option-set.interface";
import {convertToOptionSet} from "../option-set.interface";

@component(Component)
@layout("column")
export default class TagControl extends AbstractInput {

	public limit: number = Infinity;
	public initialData: any = null;
	public collection: Array<I_OptionSet> = [];
	public allowInsert: boolean = false;

	setAllowInsert(allowInsert: boolean = true) {
		this.allowInsert = allowInsert;
		return this;
	}

	setLimit(limit: number = 1) {
		this.limit = limit;
		return this;
	}

	setCollection(collection: Array<I_OptionSet>): this {
		this.collection = convertToOptionSet(collection);
		return this;
	}
}
