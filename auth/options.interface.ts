import type FaIcon from "../fa-icon";

export default interface I_Options {
	title: string,
	input: {
		login: { icon: FaIcon, placeholder: string }
		password: { icon: FaIcon, placeholder: string }
	},
	button: { login: { text: string } }
}
