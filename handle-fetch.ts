import toast from "./toast";

export default function handleFetch(res: Response) {
	switch (res.status) {
		case 200:
			return res.json();
		case 401:
			toast.danger('Unauthenticated');
			throw {code: 401}
		case 403:
			toast.danger('Has no permission');
			throw {code: 403}
		case 404:
			toast.danger('Item not found');
			throw {code: 404}
		case 429:
			toast.danger('Too Many Requests! Please wait!');
			throw {code: 429}
		case 422:
			return res.json().then((messages:Array<Message>) => {
				for (let message of messages){
					if(message.hasOwnProperty('field') && message.field) toast.danger('Validation error: ' + message.field + '<br>'+message.message );
					else toast.danger(message.message);
				}
				throw {code: 422, messages}
			});
		default:
			throw {code: res.status};
	}
}

interface Message{
	field:string;
	message:string;
}
