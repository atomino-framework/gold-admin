import FaIcon from "../fa-icon";

let options = {
	loading: {icon: FaIcon.s("spinner-third").spin()},
	button: {
		attachments: {icon: FaIcon.s("folder-upload")},
		delete: {icon: FaIcon.s("trash-alt")},
		reload: {icon: FaIcon.s("sync-alt")},
		save: {icon: FaIcon.s("save")}
	}
};

export default options;
