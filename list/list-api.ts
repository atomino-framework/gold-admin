import handleFetch from "../handle-fetch";
import type I_ListApi from "./list-api.interface";

export default class ListApi implements I_ListApi {

	constructor(private apiBase: string) {}

	getOptions(): Promise<any> { return fetch(this.apiBase + '/list/options', {method: "POST"});}
	get(pagesize: number, page: number, view: string | null, sorting: string | null, quicksearch:string, filter:any): Promise<any> {
		return fetch(this.apiBase + '/list/get', {method: "POST", body: JSON.stringify({pagesize, page, sorting, view, quicksearch, filter})}).then(handleFetch);
	}
}
