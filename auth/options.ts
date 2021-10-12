import type I_Options from "./options.interface";
import FaIcon from "./../fa-icon";

let options: I_Options = {
	title: "Admin",
	input: {
		login: {
			icon: FaIcon.s('user'),
			placeholder: "login",
		},
		password: {
			icon: FaIcon.s('lock'),
			placeholder: "password",
		},
	},
	button: {
		login: {
			text: "Login"
		}
	}
};

export default options;
