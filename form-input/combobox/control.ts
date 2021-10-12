import type Form from "../../form/form";
import AbstractControl, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

export interface IApi {
	search(search: string): Promise<Array<IResult>>;
	get(value:Array<number>|number):Promise<Array<IResult>>;
}

export interface IResult {
	value: string;
	id: number;
}

export class SelectorApi implements IApi {

	static factory(urlBase:string):IApi{
		return new this(urlBase+'/select/get', urlBase+'/select/search')
	}

	constructor(protected getUrl: string, protected searchUrl: string) {
	}

	async get(value:Array<number>|number):Promise<Array<IResult>>{
		if(typeof value === "number") value = [value];
		let result = await fetch(this.getUrl, {method:"POST", body:JSON.stringify({value})})
		return await result.json();
	}

	async search(search: string): Promise<Array<IResult>> {
		let result = await fetch(this.searchUrl, {method:"POST", body:JSON.stringify({search})})
		return await result.json();
	}
}

@component(Component)
@layout("row")
export default class ComboboxControl extends AbstractControl {

	public api: IApi | null = null;
	public multi: boolean|number = false;
	public form: typeof Form | null = null;
	public minChar:number = 3;

	MinChar(minChar:number):this{
		this.minChar = minChar;
		return this;
	}

	Api(api: IApi|string): this {
		if(typeof api === "string") api = SelectorApi.factory(api);
		this.api = api;
		return this;
	}

	Form(form: typeof Form): this {
		this.form = form;
		return this;
	}

	Multi(amount:true|number = true): this {
		this.multi = amount;
		return this;
	}
}
