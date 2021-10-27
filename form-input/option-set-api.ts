import I_EntityMapApi from "./entity-map-api.interface";
import type I_OptionSetApi from "./option-set-api.interface";
import handleFetch from "../handle-fetch";
import AbstractApi from "../abstract-api";
import type I_OptionSet from "./option-set.interface"

export default class OptionSetApi extends AbstractApi implements I_OptionSetApi {
	static factory(url: string): I_OptionSetApi {return new this(url)}
	get(id: number | string | null): Promise<Array<I_OptionSet>> { return fetch(this.url, {method: "POST", body: JSON.stringify({id}), headers: this.headers}).then(handleFetch);}
}
