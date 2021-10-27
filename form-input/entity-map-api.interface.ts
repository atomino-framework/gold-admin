import type I_OptionSet from "./option-set.interface";

export default interface I_EntityMapApi {
	get(value: Array<number | string> | number | string, id: number | string | null): Promise<Array<I_OptionSet>>;
	search(search: string, id: number | string | null): Promise<Array<I_OptionSet>>;
}
