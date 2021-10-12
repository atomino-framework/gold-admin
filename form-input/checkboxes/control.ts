import AbstractControl, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

interface IOption {
	label: string,
	value: any
}

@component(Component)
@layout("row")
export default class CheckboxesControl extends AbstractControl {

	public options: Array<IOption> = [];

	Options(options: Array<IOption>): this {
		this.options = options;
		return this;
	}
}
