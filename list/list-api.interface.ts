import type I_ListOptions from "./list-options.interface";
import type I_ListResult from "./list-result.interface";

export default interface I_ListApi {
	getOptions(): Promise<I_ListOptions>;
	get(pagesize: number, page: number, view: string | null, sorting: string | null, quicksearch: string, filter:any): Promise<I_ListResult>;
}
