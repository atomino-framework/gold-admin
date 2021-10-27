export default interface I_OptionSet {
	label: string,
	value: string | number
}

type valueLabelPair = { [key: string]: string };

export function objectToOptionSet(data: valueLabelPair): Array<I_OptionSet> {
	let result: Array<I_OptionSet> = [];
	for (let value in data) {
		let label: string = data[value];
		if (typeof label === "string") result.push({value, label});
	}
	return result;
}

export function handleOptionSetResult(result:Array<I_OptionSet>|valueLabelPair):Array<I_OptionSet>{
	if(result instanceof Object) return objectToOptionSet(result as valueLabelPair);
	else return result;
}
