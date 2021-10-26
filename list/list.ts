import type I_ListResult from "gold-admin/list/list-result.interface";
import type {SvelteComponent} from "svelte";
import {get, writable, Writable} from "svelte/store";
import AbstractList from "../app/abstract-list";
import type ListManager from "../app/list-manager";
import FaIcon from "../fa-icon";
import type Form from "../form/form";
import FormPage from "../form/form-page";
import handleFetch from "../handle-fetch";
import options from "../options";
import CCard from "./components/card.svelte";
import CList from "./components/list.svelte";
import type I_ListApi from "./list-api.interface";
import ListButton from "./list-button";
import type I_ListOptions from "./list-options.interface";

export default abstract class List extends AbstractList {

	cardifyItem(item: any) {return item;}

	constructor() {
		super();
		for (let button of (this.constructor as typeof List).buttons) {
			this.addButton(new ListButton(button.icon, () => button.action(this)))
		}
	}

	static get id(): string {return this.name;}
	static fetchOptions: boolean;
	static icon: FaIcon;
	static title: string;
	static api: I_ListApi;
	static form: typeof Form;
	static buttons: Array<{ icon: FaIcon, action: (list: List) => void }> = [];

	get id(): string {
		return (this.constructor as typeof List).id;
	}

	public options: I_ListOptions = {
		quicksearch: false,
		views: false,
		sortings: false,
		pagesize: 5
	}

	// @ts-ignore
	public $items: Writable<Array<any>> = writable([]);
	public $count: Writable<number> = writable(0);
	public $page: Writable<number> = writable(1);

	public view: string | null = null;
	public sorting: string | null = null;
	public quicksearch: string = "";
	public filter: any;
	public buttons: Array<ListButton> = [];

	get icon(): FaIcon { return (this.constructor as typeof List).icon;}
	get title(): string { return (this.constructor as typeof List).title;}
	get api(): I_ListApi {return (this.constructor as typeof List).api;}
	get form(): typeof Form {return (this.constructor as typeof List).form;}
	get fetchOptions(): boolean {return (this.constructor as typeof List).fetchOptions;}

	get component(): typeof SvelteComponent { return CList;}
	get card(): typeof SvelteComponent { return CCard;}

	public addButton(button: ListButton) {
		this.buttons.push(button);
	}

	public open(id: number) {
		// @ts-ignore
		this.listManager!.pageManager!.add(new FormPage(new this.form(id)));
	}

	async attached(listManager: ListManager): Promise<any> {
		await super.attached(listManager);
		if (this.fetchOptions) await this.setOptions();
		if (this.options.sortings !== false) this.sorting = '+' + Object.keys(this.options.sortings)[0];
		if (this.options.views !== false) this.view = Object.keys(this.options.views)[0];
		await this.reload();
	}

	async setOptions(): Promise<any> {
		const res = await this.api.getOptions();
		this.options = Object.assign(this.options, res);
	}

	async reload() {
		const data: I_ListResult = await this.api!.get(this.options.pagesize, get(this.$page), this.view, this.sorting, this.quicksearch, this.filter);
		this.$items.set(data.items);
		this.$count.set(data.count);
		this.$page.set(data.page);
	}

	addNew() {
		// @ts-ignore
		this.listManager!.pageManager!.add(new FormPage(new this.form()));
	}
}


export let buttons: Record<"new", { icon: FaIcon, action: (form: List) => void }> = {
	new: {
		icon: options.list.new.icon,
		action: (list: List) => list.addNew()
	}
}

export function button(icon: FaIcon | { icon: FaIcon, action: (list: List) => void }, action: ((list: List) => void) | null = null) {
	return function (constructor: typeof List) {
		if (!constructor.hasOwnProperty('buttons')) Object.defineProperty(constructor, 'buttons', {value: [], writable: true});
		if (icon instanceof FaIcon && action !== null) constructor.buttons.push({icon, action})
		else if (!(icon instanceof FaIcon)) constructor.buttons.push(icon);
	}
}

export function list(title: string, icon: FaIcon, api: I_ListApi, form: typeof Form, fetchOptions: boolean = false, listenToForms: Array<typeof Form> = []) {
	return function (constructor: typeof List) {
		Object.defineProperty(constructor, 'icon', {value: icon, writable: true});
		Object.defineProperty(constructor, 'title', {value: title, writable: true});
		Object.defineProperty(constructor, 'api', {value: api, writable: true});
		Object.defineProperty(constructor, 'form', {value: form, writable: true});
		Object.defineProperty(constructor, 'fetchOptions', {value: fetchOptions, writable: true});
		if (listenToForms.length === 0) listenToForms = [form];
		for (let listenToForm of listenToForms) listenToForm.list.push(constructor)
	}
}
