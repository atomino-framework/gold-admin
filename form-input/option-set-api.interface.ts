import type I_OptionSet from "./option-set.interface";

export default interface I_OptionSetApi {
	get(id: number|string|null): Promise<Array<I_OptionSet>>;
}
