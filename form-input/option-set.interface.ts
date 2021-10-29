export default interface I_OptionSet {
	label: string,
	value: string | number
}

export type valueLabelPair = { [key: string]: string };

export function convertToOptionSet(data: valueLabelPair|Array<string>|Array<I_OptionSet>): Array<I_OptionSet> {
	if(data instanceof Array){
		data.forEach((item,index)=>{
			if(typeof item === "string"){
				(data as Array<I_OptionSet>)[index] = {value: item, label:item}
			}
		})
		return data as Array<I_OptionSet>;
	};
	let result: Array<I_OptionSet> = [];
	data = data as valueLabelPair;
	for (let value in data) {
		let label: string = data[value];
		if (typeof label === "string") result.push({value, label});
	}
	return result;
}
