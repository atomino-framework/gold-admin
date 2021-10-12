import type I_AuthApi from "./auth-api.interface";
import user from "./user";
import type I_User from "./user.interface";
import handleFetch from "../handle-fetch";


export default class AuthApi implements I_AuthApi {

	constructor(private apibase: string, private onLogin: Function | null = null) {}

	get(): Promise<any> {
		return fetch(this.apibase + '/get', {method: "POST"}).then(handleFetch).then(res => {
			user.update((user: I_User | null) => {
				if (user === null && res !== null && this.onLogin !== null) this.onLogin();
				return res;
			});
		});
	}

	login(login: string, password: string): Promise<any> {
		return fetch(this.apibase + '/login', {method: "POST", body: JSON.stringify({login, password})}).then(handleFetch).then(res => this.get());
	}

	logout(): Promise<any> {
		return fetch(this.apibase + '/logout', {method: "POST"}).then(handleFetch).then(res => this.get());
	}

}
