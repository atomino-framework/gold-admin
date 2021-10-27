import app from "./app/options";
import auth from "./auth/options";
import list from "./list/options";
import form from "./form/options";
import input from "./form-input/options";

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
	form,
	input
}

export default options;
