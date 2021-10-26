export default class OAuthStore {

	static instance: OAuthStore | null = null;

	static get access_token(): string | null { return this.instance === null ? null : this.instance.access_token;}
	static get expires_in(): number | null { return this.instance === null ? null : this.instance.expires_in;}
	static get token_type(): string | null { return this.instance === null ? null : this.instance.token_type;}
	static get scope(): string | null { return this.instance === null ? null : this.instance.scope;}
	static get refresh_token(): string | null { return this.instance === null ? null : this.instance.refresh_token;}

	static get exists(): boolean { return this.instance !== null}

	static drop() {
		this.instance = null;
		localStorage.removeItem('OAuthStore');
	}

	static restore(){
		if(this.instance === null){
			let data = localStorage.getItem('OAuthStore');
			if(data !== null){
				data = JSON.parse(data);
				this.factory(data);
			}
		}
	}

	static factory(data:any) {
		this.instance = new OAuthStore(data.access_token, data.expires_in, data.token_type, data.scope, data.refresh_token);
		localStorage.setItem('OAuthStore', JSON.stringify(data));
	}

	constructor(public access_token: string, public expires_in: number, public token_type: string, public scope: string | null = null, public refresh_token: string | null = null) {}
}
