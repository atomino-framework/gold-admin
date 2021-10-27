import type I_AuthApi from "./auth-api.interface";
import user from "./user";
import type I_User from "./user.interface";
import handleFetch from "../handle-fetch";
import AbstractApi from "../abstract-api";


export default class AuthApi extends AbstractApi implements I_AuthApi {

	constructor(url: string, private onLogin: Function | null = null) { super(url) }

	public urlPostfix = {
		get: "/get",
		login: "/login",
		logout: "/logout"
	}
	
	async get(): Promise<any> {
		return fetch(this.url + this.urlPostfix.get, {method: "POST"}).then(handleFetch).then(res => {
			user.update((user: I_User | null) => {
				if (user === null && res !== null && this.onLogin !== null) this.onLogin();
				return res;
			});
		});
	}

	async login(login: string, password: string): Promise<any> {
		return fetch(this.url  + this.urlPostfix.login, {method: "POST", body: JSON.stringify({login, password})}).then(handleFetch).then(res => this.get());
	}

	async logout(): Promise<any> {
		return fetch(this.url  + this.urlPostfix.logout, {method: "POST"}).then(handleFetch).then(res => this.get());
	}

}
