import type I_AuthApi from "./auth-api.interface";
import user from "./user";
import type I_User from "./user.interface";
import handleFetch from "../handle-fetch";
import AbstractApi from "../abstract-api";
import options from "./options";


export default class AuthApi extends AbstractApi implements I_AuthApi {

	declare public urlPostfix: { get: string, login: string, logout: string };

	constructor(url: string, private onLogin: Function | null = null) {
		super(url, options.api.auth.headers, options.api.auth.host, options.api.auth.urlPostfix);
	}

	async get(): Promise<I_User|null> {
		return fetch(this.url + this.urlPostfix.get, {method: "POST"}).then(handleFetch).then(res => {
			user.update((user: I_User | null) => {
				if (user === null && res !== null && this.onLogin !== null) this.onLogin(user);
				return res;
			});
			return res;
		});
	}

	async login(login: string, password: string): Promise<any> {
		return fetch(this.url + this.urlPostfix.login, {method: "POST", headers: this.headers, body: JSON.stringify({login, password})}).then(handleFetch).then(res => this.get());
	}

	async logout(): Promise<any> {
		return fetch(this.url + this.urlPostfix.logout, {method: "POST", headers: this.headers}).then(handleFetch).then(res => this.get());
	}

}
