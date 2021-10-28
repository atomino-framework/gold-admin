import app from "./app/options";
import auth from "./auth/options";
import list from "./list/options";
import form from "./form/options";
import input from "./form-input/options";
import attachment from "./form-attachment/options";

let options = {
	api: {
		host: "/",
		headers: {
			"Content-Type": "application/json",
		}
	},
	app,
	auth,
	list,
	attachment,
	form,
	input
}

export default options;
