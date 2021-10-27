import options from "./options";
import AbstractApi from "../abstract-api"
import handleFetch from "../handle-fetch";
import type I_ListApi from "./list-api.interface";
import type I_ListOptions from "./list-options.interface";
import type I_ListResult from "./list-result.interface";

export default class ListApi extends AbstractApi implements I_ListApi {

	declare public urlPostfix: { get: string, getOptions: string }

	constructor(url: string, headers: Object | (() => Object) = {}) {
		super(url, headers, options.api.host, options.api.urlPostfix);
	}

	async getOptions(): Promise<I_ListOptions> { return fetch(this.url + this.urlPostfix.getOptions, {method: "POST", headers: this.headers}).then(handleFetch);}
	async get(pagesize: number, page: number, view: string | null, sorting: string | null, quicksearch: string, filter: any): Promise<I_ListResult> {
		return fetch(this.url + this.urlPostfix.get, {
				method: "POST",
				body: JSON.stringify({pagesize, page, sorting, view, quicksearch, filter}),
				headers: this.headers
			}
		).then(handleFetch);
	}
}
