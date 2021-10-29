import AbstractApi from "../abstract-api";
import handleFetch from "../handle-fetch";
import type I_AttachmentApi from "./attachment-api.interface";
import options from "./options";
import type {Collection, File} from "./types";

export default class AttachmentApi extends AbstractApi implements I_AttachmentApi {

	declare public urlPostfix: { get: string, remove: string, upload: string, save: string, move: string, }

	constructor(url: string) { super(url, options.api.headers, options.api.host, options.api.urlPostfix);}

	async get(id: number): Promise<{ collections: { [key: string]: Collection }, files: { [key: string]: File } }> {
		return fetch(this.url + this.urlPostfix.get + '/' + id, {method: "POST", headers: this.headers}).then(handleFetch)
	}

	async removeFile(id: number, collection: string, filename: string): Promise<boolean> {
		return fetch(this.url + this.urlPostfix.remove + '/' + id, {method: "POST", headers: this.headers, body: JSON.stringify({filename, collection})}).then(handleFetch)
	}

	async saveFileDetails(id: number, filename: string, data: { filename: string, title: string, focus: string, safezone: string, properties: { [key: string]: string } }): Promise<boolean> {
		return fetch(this.url + this.urlPostfix.save + '/' + id, {method: "POST", headers: this.headers, body: JSON.stringify({filename, data})}).then(handleFetch)
	}

	async upload(id: number, collection: string, fileList: FileList): Promise<Array<boolean>> {
		let jobs: Array<Promise<any>> = [];
		let headers = this.headers;
		delete headers["Content-Type"];
		Array.from(fileList).forEach((file) => {
			let data = new FormData()
			data.append('file', file)
			data.append('collection', collection)
			jobs.push(fetch(this.url + this.urlPostfix.upload + '/' + id, {method: "POST", headers, body: data}).then(handleFetch));
		})
		return Promise.all(jobs);
	}

	async moveFile(id: number, filename: string, source: string, target: string, position: number, copy: boolean): Promise<boolean> {
		return fetch(this.url + this.urlPostfix.move + '/' + id, {method: "POST", headers: this.headers, body: JSON.stringify({filename, source, target, position, copy})}).then(handleFetch)
	}
}
