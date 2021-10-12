export default interface I_ListOptions {
	quicksearch: boolean;
	views: Array<string> | false;
	sortings: Array<string> | false;
	pagesize: number;
}
