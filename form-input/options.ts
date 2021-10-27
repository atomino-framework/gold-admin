import FaIcon from "../fa-icon";

let options = {
	select: {
		downloading: {icon: FaIcon.s('spinner').anim.spin()}
	},
	checkboxes: {
		downloading: {icon: FaIcon.s('spinner').anim.spin()}
	},
	radio: {
		downloading: {icon: FaIcon.s('spinner').anim.spin()}
	},
	number: {
		down: {icon: FaIcon.s("chevron-down")},
		up: {icon: FaIcon.s("chevron-up")},
	},
	combobox: {
		add: {icon: FaIcon.s("plus")},
		search: {icon: FaIcon.s("search")},
		remove: {icon: FaIcon.s("times")},
		link: {icon: FaIcon.s("arrow-right")},
	},
	api: {
		optionSet: {
			host: "",
			headers:{}
		},
		entityMap: {
			host: "",
			urlPostfix: {
				get: "/get",
				search: "/search"
			},
			headers:{}
		}
	}
};

export default options;
