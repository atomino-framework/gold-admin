import AbstractApi from "../abstract-api";
import OAuthStore from "../auth/oauth-store";
import type I_FormApi from "./form-api.interface";
import handleFetch from "../handle-fetch";

export default class FormApi extends AbstractApi implements I_FormApi {

	public urlPostfix = {
		get: "/get",
		blank: "/blank",
		create: "/create",
		update: "/update",
		delete: "/delete",
	}

	async get(id: number): Promise<Object> {
		return fetch(this.url + this.urlPostfix.get + "/" + id, {method: "POST", headers: this.headers}).then(handleFetch);
	}
	async blank(): Promise<Object> {
		return fetch(this.url + this.urlPostfix.blank, {method: "POST", headers: this.headers}).then(handleFetch);
	}
	async create(item: any): Promise<false | null | number> {
		return fetch(this.url + this.urlPostfix.create, {method: "POST", body: JSON.stringify({item}), headers: this.headers}).then(handleFetch);
	}
	async update(id:number, item: any): Promise<false | null | number> {
		return fetch(this.url + this.urlPostfix.update + "/" + id, {method: "POST", body: JSON.stringify({item}), headers: this.headers}).then(handleFetch);
	}
	async delete(id: number): Promise<boolean> {
		return fetch(this.url + this.urlPostfix.delete + "/" + id, {method: "POST", headers: this.headers}).then(handleFetch);
	}

}
