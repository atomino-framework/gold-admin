import FaIcon from "../fa-icon";

let options = {
	attachment: {
		button: {icon: FaIcon.s("folder-open")},
		modal: {
			upload: {icon: FaIcon.s("folder-open")}
		}
	},
	collection: {
		upload: {icon: FaIcon.s("folder-plus")},
		full: {icon: FaIcon.s("times")},
	},
	details: {
		add: {icon: FaIcon.s("plus")},
		remove: {icon: FaIcon.s("times")},
		image: {icon: FaIcon.s("image")},
		save: {icon: FaIcon.s("save")},
		delete: {icon: FaIcon.s("trash")},
	},
	filetype: {
		family: "fas"
	},
	features: {
		rename: true,
		editTitle: true,
		moveFile: true,
		imageEditor: true,
		customProperties: true
	},
	api: {
		host: "",
		urlPostfix: {
			get: "/get",
			remove: "/remove-file",
			upload: "/upload",
			save: "/save-file-details",
			move: "/move-file",
		},
		headers:{}
	}
};

export default options;
