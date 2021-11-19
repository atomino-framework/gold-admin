import FaIcon from "../fa-icon";

export enum FormApiResponseType {
	BASIC = 1,
	COMPLEX
}

let options = {
	loading: {icon: FaIcon.s("spinner-third").spin()},
	button: {
		attachments: {icon: FaIcon.s("folder-upload")},
		delete: {icon: FaIcon.s("trash-alt")},
		reload: {icon: FaIcon.s("sync-alt")},
		save: {icon: FaIcon.s("save")}
	},
	api:{
		host: "",
		urlPostfix: {
			get: "/get",
			blank: "/blank",
			create: "/create",
			update: "/update",
			delete: "/delete",
		},
		headers:{},
		responseType: FormApiResponseType.BASIC,
		responseTypeHeader: "X-Gold-Form-Response-Type",
	}
};

export default options;
