import FormApi from "./form-api";
import Confirm from "./components/confirm.svelte";
import type I_FormApi from "./form-api.interface";
import options, {FormApiResponseType} from "./options";
import FaIcon from "../fa-icon";
import {Modal} from "../app/modal-manager";
import type AbstractPage from "../app/abstract-page";
import toast from "../toast";
import type {Writable} from "svelte/store";
import {get, writable} from "svelte/store";
import type List from "../list/list";
import FormButton from "./form-button";
import FormSection from "./form-section";
import type Entity from "../entity-type";
export default abstract class Form {

	static buttons: Array<{ icon: FaIcon, action: (form: Form) => void, onlyIfExists: boolean }> = [];
	static icon: FaIcon;
	static api: I_FormApi;
	static list: Array<typeof List> = [];

	public list: Array<typeof List> = [];
	public api: I_FormApi | null = null;
	public buttons: Array<FormButton> = [];

	constructor(id: number | string | null = null) {
		if (typeof id === "string") id = parseInt(id);
		this.id = id;
		this.list = (this.constructor as typeof Form).list;
		this.api = (this.constructor as typeof Form).api;
		this.icon = (this.constructor as typeof Form).icon;
		for (let button of (this.constructor as typeof Form).buttons) {
			this.addButton(new FormButton(button.icon, () => button.action(this), button.onlyIfExists))
		}
	}

	abstract build(item:any, options:any): void;

	public sections: Array<FormSection> = [];
	public page: AbstractPage | null = null;

	public $icon: Writable<FaIcon> = writable(FaIcon.l("star"));
	public $id: Writable<number | null> = writable(null);
	public $title: Writable<string> = writable('...');
	public $isChanged: Writable<boolean> = writable(false);

	public $item: Writable<any> = writable({});

	public set title(title: string) {this.$title.set(title) }
	public set icon(icon: FaIcon) {this.$icon.set(icon) }
	public set id(id: number | null) {this.$id.set(id) }
	public get id(): number | null {return get(this.$id) }
	public set changed(state: boolean) {
		this.$isChanged.set(state);
		this.setTitle(get(this.$item), this.id);
	}
	public $errors: Writable<Array<any>> = writable([]);
	public set errors(errors: Array<any> | null) {
		if (errors === null) errors = [];
		this.$errors.set(errors);
	}

	get pageId(): string { return 'entity-' + this.constructor.name + (get(this.$id) === null ? '' : '-' + get(this.$id));}
	set loading(loading: boolean) {this.page && (this.page.loading = false);}

	public addButton(button: FormButton) {this.buttons.push(button);}

	public addSection(title: string | null = null, icon: FaIcon | null = null, sizes: Array<string> = ["is-full"]) {
		let section = new FormSection(title, icon, sizes);
		this.sections.push(section);
		return section;
	}

	public setTitle(item: Entity, id:number|string|null) { this.title = (this.constructor as typeof Form).setTitle(item, id); }

	public static setTitle(item: Entity, id:number|string|null):string{return  id === null ? "new" : id.toString();}
	
	public async attached(page: AbstractPage) {
		this.page = page;
		await this.loadItem();
	}

	public async loadItem(): Promise<any> {
		this.page!.loading = true;
		try {
			let data = await (this.id === null ? this.api!.blank() : this.api!.get(this.id));

			let opt:any;
			let item:any;

			if(options.api.responseType === FormApiResponseType.COMPLEX){
				item = data[options.api.complexResponseKeys.item];
				opt = data[options.api.complexResponseKeys.options];
			}else{
				opt = null;
				item = data;
			}
			
			this.build(item, opt);

			this.$item.set(item);
			this.setTitle(item, this.id);
			this.page!.loading = false;
			this.changed = false;
			this.errors = null;
		} catch (e) {
			this.page?.pageManager?.remove(this.page);
		}
	}

	public async saveItem(): Promise<any> {
		this.page!.loading = true;
		let item = get(this.$item);
		try {
			let id = await (this.id === null ? this.api!.create(item) : this.api!.update(this.id, item));
			if (typeof id === "number") this.id = id;
			toast.success("Item saved");
			this.reloadList();
			return this.loadItem();
		} catch (e: any) {
			if (e.code === 422) this.errors = e.messages;
		} finally {
			this.page!.loading = false;
		}
	}

	public async deleteItem(): Promise<boolean> {

		let modal = new Modal(Confirm, {
			title: "Are you sure?",
			content: "Do you really want to delete this item?",
			form: this,
			buttons: [
				{
					label: "Cancel",
					style: "is-primary",
					action: () => {modal.close()}
				},
				{
					label: "Delete",
					style: "is-danger",
					action: async () => {
						modal.close();
						this.page!.loading = true;
						if (typeof this.id !== 'number') throw "ERROR";
						try {
							await this.api!.delete(this.id);
							this.reloadList();
							this.page?.pageManager?.remove(this.page);
						} catch (exception) {
						} finally {
							this.page!.loading = false;
						}
					}
				}
			]
		});
		modal.open();
		return true;
	}

	protected reloadList() {
		for (let list of this.list) {
			(this.page!.pageManager!.listManager!.getList(list.id) as List)?.reload();
		}
	}

}

export function form(
	icon: FaIcon,
	api: I_FormApi | string,
	setTitle:((item:Entity, id:number|string|null)=>string)|null = null
) {
	return function (constructor: typeof Form) {
		if(setTitle !== null){
			Object.defineProperty(constructor, 'setTitle', {value: setTitle, writable: true});
		}
		Object.defineProperty(constructor, 'icon', {value: icon, writable: true});
		Object.defineProperty(constructor, 'list', {value: [], writable: true});
		Object.defineProperty(constructor, 'api', {value: typeof api === "string" ? new FormApi(api) : api, writable: true});
	}
}

export function button(
	icon: FaIcon | { icon: FaIcon, action: (form: Form) => void, onlyIfExists: boolean },
	action: ((form: Form) => void) | null = null,
	onlyIfExists: boolean = false
) {
	return function (constructor: typeof Form) {
		if (!constructor.hasOwnProperty('buttons')) Object.defineProperty(constructor, 'buttons', {value: [], writable: true});
		if (icon instanceof FaIcon && action !== null) constructor.buttons.push({icon, action, onlyIfExists});
		if (!(icon instanceof FaIcon)) constructor.buttons.push(icon);
	}
}


export let buttons: Record<"save" | "reload" | "delete", { icon: FaIcon, action: (form: Form) => void, onlyIfExists: boolean }> = {
	save: {
		icon: options.button.save.icon,
		action: (form: Form) => form.saveItem(),
		onlyIfExists: false
	},
	reload: {
		icon: options.button.reload.icon,
		action: (form: Form) => form.loadItem(),
		onlyIfExists: true
	},
	delete: {
		icon: options.button.delete.icon,
		action: (form: Form) => form.deleteItem(),
		onlyIfExists: true
	}
}
