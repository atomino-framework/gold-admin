import type Entity from "../entity-type";

export default interface I_ListResult{
	count:number;
	page:number;
	items:Array<Entity>;
}
