import toast from "./toast";

export default function copy(text:any){
	navigator.clipboard.writeText(text.toString()).then(toast.success('Copied to clipboard'));
}
