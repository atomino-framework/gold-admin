import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

@component(Component)
@layout("column")
export default class TextControl extends AbstractInput {

	public code:boolean = false;
	public markdown: boolean = false;

	Code():this{
		this.code = true;
		return this;
	}

	Markdown():this{
		this.code = true;
		this.markdown = true;
		return this;
	}
}
