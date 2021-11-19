import type Entity from "../entity-type";
import options, {FormApiResponseType} from "./options";
import AbstractApi from "../abstract-api";
import type I_FormApi from "./form-api.interface";
import handleFetch from "../handle-fetch";

export default class FormApi extends AbstractApi implements I_FormApi {

	declare public urlPostfix: {
		get: string,
		blank: string,
		create: string,
		update: string,
		delete: string,
	}

	constructor(url: string) {
		super(url, options.api.headers, options.api.host, options.api.urlPostfix);
	}

	async get(id: number): Promise<{item: Entity, options: any }> {
		let formApiResponseType: FormApiResponseType = options.api.responseType;
		return fetch(this.url + this.urlPostfix.get + "/" + id, {method: "POST", headers: this.headers})
			.then(res => {
				if (res.headers.has(options.api.responseTypeHeader))
					formApiResponseType = res.headers.get(options.api.responseTypeHeader) === "complex" ? FormApiResponseType.COMPLEX : FormApiResponseType.BASIC;
				return res;
			})
			.then(handleFetch)
			.then(res => {
				let item = formApiResponseType === FormApiResponseType.COMPLEX ? res.item : res;
				let opt = formApiResponseType === FormApiResponseType.COMPLEX ? res.options : null;
				return {item, options: opt};
			});
	}
	async blank(): Promise<{ item: Entity, options: any }> {
		let formApiResponseType: FormApiResponseType = options.api.responseType;
		return fetch(this.url + this.urlPostfix.blank, {method: "POST", headers: this.headers})
			.then(res => {
				if (res.headers.has(options.api.responseTypeHeader))
					formApiResponseType = res.headers.get(options.api.responseTypeHeader) === "complex" ? FormApiResponseType.COMPLEX : FormApiResponseType.BASIC;
				return res;
			}).then(handleFetch)
			.then(res => {
				let item = formApiResponseType === FormApiResponseType.COMPLEX ? res.item : res;
				let opt = formApiResponseType === FormApiResponseType.COMPLEX ? res.options : null;
				return {item, options: opt};
			});
	}
	async create(item: any): Promise<false | null | number> {
		return fetch(this.url + this.urlPostfix.create, {method: "POST", body: JSON.stringify({item}), headers: this.headers}).then(handleFetch);
	}
	async update(id: number, item: any): Promise<false | null | number> {
		return fetch(this.url + this.urlPostfix.update + "/" + id, {method: "POST", body: JSON.stringify({item}), headers: this.headers}).then(handleFetch);
	}
	async delete(id: number): Promise<boolean> {
		return fetch(this.url + this.urlPostfix.delete + "/" + id, {method: "POST", headers: this.headers}).then(handleFetch);
	}

}
