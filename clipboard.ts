import toast from "./toast";

export default class Clipboard {
	static copy(text: any):Promise<any>{
		return navigator.clipboard.writeText(text.toString()).then(toast.success('Copied to clipboard'));
	}
}
