export default interface I_FormApi {
	get(id: number): Promise<Object>;
	blank(): Promise<Object>;
	create(item: Object): Promise<false | null | number>;
	update(id:number, item: Object): Promise<false | null | number>;
	delete(id: number): Promise<boolean>;
}
