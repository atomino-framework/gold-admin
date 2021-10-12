export default interface I_ListApi {
	getOptions(): Promise<any>;
	get(pagesize: number, page: number, view: string | null, sorting: string | null, quicksearch: string, filter:any): Promise<any>;
}
