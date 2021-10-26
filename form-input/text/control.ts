import AbstractInput, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

@component(Component)
@layout("column")
export default class TextControl extends AbstractInput {

	public code:boolean = false;
	public markdown: boolean = false;

	setStyle(type: "markdown"|"code"):this{
		if(type === "code" || type === "markdown") this.code = true;
		if(type === "markdown") this.markdown = true;
		return this;
	}
}
