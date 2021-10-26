import I_EntityMapApi from "./entity-map-api.interface";
import type I_OptionSetApi from "./option-set-api.interface";
import handleFetch from "../handle-fetch";
import AbstractApi from "../abstract-api";

export default class OptionSetApi extends AbstractApi implements I_OptionSetApi {
	static factory(url: string): I_OptionSetApi {return new this(url)}
	get(id: number | null): Promise<any> { return fetch(this.apiBase, {method: "POST", body: JSON.stringify({id}), headers: this.headers}).then(handleFetch);}
}
