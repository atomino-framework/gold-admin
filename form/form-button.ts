import type FaIcon from "../fa-icon";

export default class FormButton {
	constructor(public icon: FaIcon, public action: Function, public onlyIfExists:boolean = false) {}
}
