import FaIcon from "../fa-icon";

let options = {
	new: {icon: FaIcon.s("plus")},
	quicksearch: {icon: FaIcon.s("search")},
	filter: {icon: FaIcon.s("filter")},
	info: {icon: FaIcon.s("info-circle")},
	sort: {icon: FaIcon.s("sort")},
	pager: {
		right: {icon: FaIcon.s("chevron-right")},
		left: {icon: FaIcon.s("chevron-left")},
	},
	api: {
		host: "",
		urlPostfix: {
			get: "/get",
			getOptions: "/options"
		},
		headers:{}
	}
};

export default options;
