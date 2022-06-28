import ListApi from "../list/list-api";
import handleFetch from "../handle-fetch";

export default class TreeListApi extends ListApi {
	moveUnder(id: number, targetId: number) {
		return fetch(this.url + "/move-under", {
				method: "POST",
				body: JSON.stringify({id, targetId}),
				headers: this.headers
			}
		).then(handleFetch);
	}
	async moveBehind(id: number, targetId: number) {
		return fetch(this.url + "/move-behind", {
				method: "POST",
				body: JSON.stringify({id, targetId}),
				headers: this.headers
			}
		).then(handleFetch);
	}
}