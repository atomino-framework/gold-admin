import type Entity from "gold-admin/entity-type";

export default interface I_ListResult{
	count:number;
	page:number;
	items:Array<Entity>;
}
