import options from "./options";
import OAuthStore from "./auth/oauth-store";

type headerFunc = () => string | false;

export default abstract class AbstractApi {

	protected host: string | null | undefined = options.api.host;

	declare protected urlPostfix: Object;
	protected _headers: { [key: string]: headerFunc | string } = options.api.headers;
	protected _url: string;
	constructor(url: string, headers: Object = {}, host: string, urlPostfix: Object | null = null) {
		this._headers = Object.assign(this._headers, headers);
		this._url = url;
		if (host !== "") this.host = host;
		if (urlPostfix !== null) this.urlPostfix = urlPostfix;
	}

	get url(): string {
		if (this._url.substr(0, 1) !== "/") return this._url;
		return (this.host !== '/' ? this.host : '') + this._url;
	}

	get headers() {
		let headers: { [key: string]: string } = {};
		for (let header in this._headers) {
			let value: string | false = typeof this._headers[header] === "function" ? (this._headers[header] as headerFunc)() : this._headers[header] as string;
			if (value !== false) headers[header] = value;
		}
		return headers;
	}

}
