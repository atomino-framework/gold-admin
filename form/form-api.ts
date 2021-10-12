import type I_FormApi from "./form-api.interface";
import handleFetch from "../handle-fetch";

export default class FormApi implements I_FormApi {

	constructor(private apiBase: string) {}

	get(id: number): Promise<any> {
		return fetch(this.apiBase + "/get/" + id, {method: "POST"}).then(handleFetch);
	}
	blank(): Promise<any> {
		return fetch(this.apiBase + "/blank", {method: "POST"}).then(handleFetch);
	}
	create(item: any): Promise<false | null | number> {
		return fetch(this.apiBase + "/create", {method: "POST", body: JSON.stringify({item})}).then(handleFetch);
	}
	update(item: any): Promise<false | null | number> {
		return fetch(this.apiBase + "/update/" + item.id, {method: "POST", body: JSON.stringify({item})}).then(handleFetch);
	}
	delete(id: number): Promise<boolean> {
		return fetch(this.apiBase + "/delete/" + id, {method: "POST"}).then(handleFetch);
	}

}
