export default interface I_AuthApi {
	login(login: string, password: string): Promise<any>;
	logout(): Promise<any>;
	get(): Promise<any>;
}
