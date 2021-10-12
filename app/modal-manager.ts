import type {SvelteComponent} from "svelte";
import {writable} from "svelte/store";
import type {Writable} from "svelte/store";


export class Modal {
	public id:any;
	constructor(public component: typeof SvelteComponent, public props: any = {}) {
		this.props.modal = this;
		this.id = Math.random();
	}
	open() {
		modalManager.add(this);
	}
	close() {
		modalManager.remove(this);
	}
}

class ModalManager {

	public modals: Writable<Array<Modal>> = writable([]);

	public add(modal: Modal) {
		this.modals.update((modals:Array<Modal>) =>{
			modals.push(modal)
			return modals;
		})
	}

	public remove(modal: Modal) {
		this.modals.update((modals:Array<Modal>) =>{
			let index = modals.findIndex(item => item === modal);
			modals.splice(index, 1)
			return modals;
		})
	}

}

let modalManager = new ModalManager();

export default modalManager;