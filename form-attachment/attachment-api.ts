import AbstractApi from "../abstract-api";
import handleFetch from "../handle-fetch";
import type I_AttachmentApi from "./attachment-api.interface";

export default class AttachmentApi extends AbstractApi implements I_AttachmentApi {

	get(id: number): Promise<Array<any>> {
		return fetch(this.apiBase + '/attachment/get/' + id, {method: "POST", headers: this.headers}).then(handleFetch)
	}

	removeFile(id: number, collection: string, filename: string): Promise<any> {
		return fetch(this.apiBase + '/attachment/remove-file/' + id, {method: "POST", headers: this.headers, body: JSON.stringify({filename, collection})}).then(handleFetch)
	}

	saveFileDetails(id: number, filename: string, data: any): Promise<any> {
		return fetch(this.apiBase + '/attachment/save-file-details/' + id, {method: "POST", headers: this.headers, body: JSON.stringify({filename, data})}).then(handleFetch)
	}

	upload(id: number, collection: string, files: FileList): Promise<any> {
		let jobs: Array<Promise<any>> = [];
		// @ts-ignore
		[...files].forEach((file) => {
			let data = new FormData()
			data.append('file', file)
			data.append('collection', collection)
			jobs.push(fetch(this.apiBase + '/attachment/upload/' + id, {method: "POST", headers: this.headers, body: data}).then(handleFetch));
		})
		return Promise.all(jobs);
	}
	moveFile(id: number, filename: string, source: string, target: string, position: number, copy: boolean): Promise<any> {
		return fetch(this.apiBase + '/attachment/move-file/' + id, {method: "POST", headers: this.headers, body: JSON.stringify({filename, source, target, position, copy})}).then(handleFetch)
	}
}
