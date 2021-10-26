import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

@component(Component)
@layout("row")
export default class NumberControl extends AbstractInput {
	public min:number|null = 0;
	public max:number|null = null;
	public step:number = 1;

	setStep(step:number):this{
		this.step = step;
		return this;
	}

	setMin(min:number=0):this{
		this.min = min;
		return this;
	}
	setMax(max:number=0):this{
		this.max = max;
		return this;
	}
}
