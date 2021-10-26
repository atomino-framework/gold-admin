import type I_EntityMap from "./entity-map.interface";

export default interface I_EntityMapApi{
	search(search: string): Promise<Array<I_EntityMap>>;
	get(value:Array<number>|number):Promise<Array<I_EntityMap>>;
}
