import OAuthStore from "../auth/oauth-store";
import handleFetch from "../handle-fetch";
import type I_ListApi from "./list-api.interface";
import AbstractApi from "../abstract-api"

export default class ListApi extends AbstractApi implements I_ListApi {

	getOptions(): Promise<any> { return fetch(this.apiBase + '/list/options', {method: "POST", headers: this.headers});}
	get(pagesize: number, page: number, view: string | null, sorting: string | null, quicksearch: string, filter: any): Promise<any> {
		return fetch(this.apiBase + '/list/get', {
				method: "POST",
				body: JSON.stringify({pagesize, page, sorting, view, quicksearch, filter}),
				headers: this.headers
			}
		).then(handleFetch);
	}
}
