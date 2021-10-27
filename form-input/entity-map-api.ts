import {handleOptionSetResult} from "gold-admin/form-input/option-set.interface";
import handleFetch from "gold-admin/handle-fetch";
import type I_OptionSet from "./option-set.interface";
import type I_EntityMapApi from "./entity-map-api.interface";
import AbstractApi from "../abstract-api";

export default class EntityMapApi extends AbstractApi implements I_EntityMapApi {

	static factory(url: string): I_EntityMapApi {return new this(url)}

	public urlPostfix = {
		get: "/get",
		search: "/search"
	}

	async get(value: Array<number | string> | number | string, id: number | string | null): Promise<Array<I_OptionSet>> {
		if (typeof value === "number" || typeof value === "string") value = [value];
		return await fetch(this.url + this.urlPostfix.get, {method: "POST", body: JSON.stringify({value, id}), headers: this.headers})
			.then(handleFetch)
			.then(handleOptionSetResult);
	}

	async search(search: string, id: number | string | null): Promise<Array<I_OptionSet>> {
		return await fetch(this.url + this.urlPostfix.search, {method: "POST", body: JSON.stringify({search, id}), headers: this.headers})
			.then(handleFetch)
			.then(handleOptionSetResult);
	}
}
