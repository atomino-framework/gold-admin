import type Entity from "../entity-type";

export default interface I_FormApi {
	get(id: number): Promise<{ item: Entity, options: any }>;
	blank(): Promise<{ item: Entity, options: any }>;
	create(item: Object): Promise<false | null | number>;
	update(id: number, item: Object): Promise<false | null | number>;
	delete(id: number): Promise<boolean>;
}
