import type Entity from "gold-admin/entity-type";

export default interface I_FormApi {
	get(id: number): Promise<Entity>;
	blank(): Promise<Entity>;
	create(item: Object): Promise<false | null | number>;
	update(id:number, item: Object): Promise<false | null | number>;
	delete(id: number): Promise<boolean>;
}
