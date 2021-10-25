import type I_OptionSetApi from "./option-set-api.interface";
import handleFetch from "../handle-fetch";

export default class OptionSetApi implements I_OptionSetApi {

	constructor(protected url: string, protected headers: HeadersInit = {}) {}

	get(id: number|null): Promise<any> {
		return (new Promise((resolve) => setTimeout(() => resolve([{label: 'hehh', value: "ho"}, {label: 'hahh', value: "heo"}]), 1000)));
		return fetch(this.url, {method: "POST", body: JSON.stringify({id}), headers: this.headers}).then(handleFetch);
	}
}
