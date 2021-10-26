import AbstractApi from "../abstract-api";
import OAuthStore from "../auth/oauth-store";
import type I_FormApi from "./form-api.interface";
import handleFetch from "../handle-fetch";

export default class FormApi extends AbstractApi implements I_FormApi {
	get(id: number): Promise<any> {
		return fetch(this.apiBase + "/get/" + id, {method: "POST", headers: this.headers}).then(handleFetch);
	}
	blank(): Promise<any> {
		return fetch(this.apiBase + "/blank", {method: "POST", headers: this.headers}).then(handleFetch);
	}
	create(item: any): Promise<false | null | number> {
		return fetch(this.apiBase + "/create", {method: "POST", body: JSON.stringify({item}), headers: this.headers}).then(handleFetch);
	}
	update(id:number, item: any): Promise<false | null | number> {
		return fetch(this.apiBase + "/update/" + id, {method: "POST", body: JSON.stringify({item}), headers: this.headers}).then(handleFetch);
	}
	delete(id: number): Promise<boolean> {
		return fetch(this.apiBase + "/delete/" + id, {method: "POST", headers: this.headers}).then(handleFetch);
	}

}
