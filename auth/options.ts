import FaIcon from "./../fa-icon";

let options = {
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
	},
	api: {
		auth: {
			host: "",
			urlPostfix: {
				get: "/get",
				login: "/login",
				logout: "/logout"
			}
		},
		oauth: {
			appKey: "",
			host: "",
			urlPostfix: {
				get: "/get",
				login: "/login"
			}
		}
	}
};

export default options;
