import type I_OptionSet from "./option-set.interface";
import type I_EntityMapApi from "./entity-map-api.interface";
import AbstractApi from "../abstract-api";

export default class EntityMapApi extends AbstractApi implements I_EntityMapApi {

	static factory(url: string): I_EntityMapApi {return new this(url)}

	async get(value: Array<number | string> | number | string, id: number | string | null): Promise<Array<I_OptionSet>> {
		if (typeof value === "number") value = [value];
		let result = await fetch(this.url + '/select/get', {method: "POST", body: JSON.stringify({value, id}), headers: this.headers})
		return await result.json();
	}

	async search(search: string, id: number | string | null): Promise<Array<I_OptionSet>> {
		let result = await fetch(this.url + '/select/search', {method: "POST", body: JSON.stringify({search, id}), headers: this.headers})
		return await result.json();
	}
}
