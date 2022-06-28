import List from "../list/list";
import type TreeListApi from "./tree-list-api";
import C_TreeCard from "./components/tree-card.svelte";
import type {SvelteComponent} from "svelte";
import C_TreeList from "./components/tree-list.svelte";

export default abstract class TreeList extends List {

	static api: TreeListApi;
	static cardComponent = C_TreeCard;
	static listComponent: typeof SvelteComponent = C_TreeList;

	get api(): TreeListApi {return (this.constructor as typeof TreeList).api;}

	async moveUnder(id: number, targetId: number) {
		await this.api.moveUnder(id, targetId);
		await this.reload();
	}
	async moveBehind(id: number, targetId: number) {
		await this.api.moveBehind(id, targetId);
		await this.reload();
	}

}


