import type I_User from "./user.interface";

export default interface I_AuthApi {
	login(login: string, password: string): Promise<any>;
	logout(): Promise<any>;
	get(): Promise<I_User|null>;
}
