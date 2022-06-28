import type {SvelteComponent} from "svelte";
import type ListManager from "./list-manager";

export default abstract class AbstractList {
	public listManager: ListManager | null = null;
	attached(listManager: ListManager): Promise<any> {
		this.listManager = listManager;
		return Promise.resolve();
	}
	abstract get component(): typeof SvelteComponent;
	abstract get id(): string;
	abstract reload():void;
}
