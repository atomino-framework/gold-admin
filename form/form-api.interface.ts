export default interface I_FormApi {
	get(id: number): Promise<any>;
	blank(): Promise<any>;
	create(item: Object): Promise<false | null | number>;
	update(id:number, item: Object): Promise<false | null | number>;
	delete(id: number): Promise<boolean>;
}
