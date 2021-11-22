import options from "./options";
import AbstractApi from "../abstract-api";
import type I_AuthApi from "./auth-api.interface";
import user from "./user";
import type I_User from "./user.interface";
import handleFetch from "../handle-fetch";
import OAuthStore from "./oauth-store"

export default class OAuthApi extends AbstractApi implements I_AuthApi {

	declare public urlPostfix: { get: string, login: string };

	protected appKey: string;

	constructor(url: string, private onLogin: Function | null = null) {
		super(url, options.api.oauth.headers, options.api.oauth.host, options.api.oauth.urlPostfix);
		this.appKey = options.api.oauth.appKey;
	}

	async get(): Promise<I_User|null> {
		OAuthStore.restore();
		return fetch(this.url + this.urlPostfix.get, {
			method: "GET",
			headers: this.headers
		})
			.then(handleFetch)
			.then((res) => {
				let prevUser;
				user.update((user: I_User | null) => {
					prevUser = user;
					return res;
				});
				if (prevUser === null && res !== null && this.onLogin !== null) this.onLogin(res);
				return res;
			}).catch(() => user.set(null));
	}

	async login(login: string, password: string): Promise<any> {
		let headers = Object.assign({}, this.headers, {'Authorization': 'Basic ' + this.appKey});
		return fetch(this.url + this.urlPostfix.login, {
			method: "POST",
			body: JSON.stringify({username: login, password, grant_type: "password"}),
			headers
		})
			.then(handleFetch)
			.then(res => {
				OAuthStore.factory(res);
				this.get();
			}).catch(() => {});
	}

	async logout(): Promise<any> {
		OAuthStore.drop();
		this.get();
		return Promise.resolve(true);
	}
}
