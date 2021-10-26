import type I_EntityMap from "./entity-map.interface";
import type I_EntityMapApi from "./entity-map-api.interface";
import AbstractApi from "../abstract-api";

export default class EntityMapApi extends AbstractApi implements I_EntityMapApi {

	static factory(apiBase: string): I_EntityMapApi {return new this(apiBase)}

	async get(value: Array<number> | number): Promise<Array<I_EntityMap>> {
		if (typeof value === "number") value = [value];
		let result = await fetch(this.url + '/select/get', {method: "POST", body: JSON.stringify({value}), headers: this.headers})
		return await result.json();
	}

	async search(search: string): Promise<Array<I_EntityMap>> {
		let result = await fetch(this.url + '/select/search', {method: "POST", body: JSON.stringify({search}), headers: this.headers})
		return await result.json();
	}
}
