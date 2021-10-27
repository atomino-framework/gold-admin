import options from "./options";
import OAuthStore from "./auth/oauth-store";

export default abstract class AbstractApi {

	public host: string | null | undefined = options.api.host;
	declare protected urlPostfix: Object;
	protected _headers: Object | (() => Object) = {};
	protected _url: string;
	constructor(url: string, headers: Object | (() => Object), host:string, urlPostfix:Object|null = null) {
		this._headers = headers;
		this._url = url;
		if(host !== "") this.host = host;
		if(urlPostfix !== null) this.urlPostfix = urlPostfix;
	}
	
	get url(): string {
		if(this._url.substr(0,1) !== "/") return this._url;
		return (this.host !== '/' ? this.host : '') + this._url;
	}

	get headers() {
		let headers = typeof this._headers === "function" ? this._headers() : this._headers;
		if (OAuthStore.exists && OAuthStore.token_type === "Bearer") headers['Authorization'] = 'Bearer ' + OAuthStore.access_token;
		headers['Content-Type'] = 'application/json';
		return headers;
	}

}
