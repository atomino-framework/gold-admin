import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type ListManager from "./list-manager";
import type AbstractPage from "./abstract-page";

export default class PageManager {

	public listManager: ListManager | null = null;
	protected pages: Array<AbstractPage> = [];
	protected active: AbstractPage | null = null;

	public $pages: Writable<Array<AbstractPage>> = writable(this.pages);
	public $active: Writable<AbstractPage | null> = writable(this.active);

	private getIndex(page: AbstractPage) { return this.pages.findIndex(item => item.id === page.id);}
	public update() {
		this.$pages.set(this.pages);
		this.$active.set(this.active);
	}

	public remove(page: AbstractPage) {
		let index = this.getIndex(page);
		if (index !== -1) {
			if (this.active?.id === page.id) {
				if (index === 0) {
					if (this.pages.length > 2) {
						this.active = this.pages[1];
					} else {
						this.active = null;
					}
				} else {
					this.active = this.pages[index - 1];
				}
			}
			this.pages.splice(index, 1);
			this.update();
			page.detached();
		}
	}

	public add(page: AbstractPage) {
		let index = this.getIndex(page);
		if (index === -1) {
			this.pages.push(page);
			this.active = page;
			this.update();
			page.attached(this);
		} else if (this.pages[index].id !== this.active?.id) {
			this.active = this.pages[index];
			this.update();
		}
	}
}
