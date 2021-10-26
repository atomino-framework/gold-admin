import type I_AuthApi from "./auth-api.interface";
import user from "./user";
import type I_User from "./user.interface";
import handleFetch from "../handle-fetch";
import OAuthStore from "./oauth-store"

export default class OAuthApi implements I_AuthApi {

	constructor(private apibase: string = "", private onLogin: Function | null = null) {}

	get(): Promise<any> {
		OAuthStore.restore();
		return fetch(this.apibase + '/me', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + OAuthStore.access_token,
			}
		})
			.then(handleFetch)
			.then(res => {
				let prevUser;
				user.update((user: I_User | null) => {
					prevUser = user;
					return res;
				});
				if (prevUser === null && res !== null && this.onLogin !== null) this.onLogin();
			}).catch(() => {
				user.set(null);
			});
	}

	login(login: string, password: string): Promise<any> {
		return fetch(this.apibase + '/oauth', {
			method: "POST",
			body: JSON.stringify({username: login, password, grant_type: "password"}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic dGVzdF9jbGllbnQ6dGVzdA==',
			}
		})
			.then(handleFetch)
			.then(res => {
				OAuthStore.factory(res);
				this.get();
			}).catch(() => {});
	}

	logout(): Promise<any> {
		OAuthStore.drop();
		this.get();
		return Promise.resolve(true);
	}
}
