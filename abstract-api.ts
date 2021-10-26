import OAuthStore from "./auth/oauth-store";

export default abstract class AbstractApi {

	constructor(protected apiBase: string, protected _headers: Object | (() => Object) = {}) {
	}

	get headers() {
		let headers = typeof this._headers === "function" ? this._headers() : this._headers;
		if (OAuthStore.exists && OAuthStore.token_type === "Bearer") {
			headers['Authorization'] = 'Bearer ' + OAuthStore.access_token
		}
		headers['Content-Type'] = 'application/json';
		return headers;
	}

}
