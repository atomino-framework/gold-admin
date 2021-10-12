import type {SvelteComponent} from "svelte";
import FaIcon from "../fa-icon";
import type PageManager from "./page-manager";
import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

export default abstract class AbstractPage {
	public closeable: boolean = true;
	public pageManager: PageManager | null = null;
	public $loading: Writable<boolean> = writable(false);

	set loading(loading: boolean) {this.$loading.set(loading);}
	get id(): string {return this.constructor.name;}
	get $icon(): Writable<FaIcon> {return writable(FaIcon.s('coins'));}
	get $title(): Writable<string> {return writable('Page');}
	get $isChanged(): Writable<boolean> {return writable(false);}

	public attached(pageManager: PageManager) { this.pageManager = pageManager; }
	public detached() { this.pageManager = null; }
	abstract get component(): typeof SvelteComponent;

}
