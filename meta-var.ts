export default class MetaVar {
	static prefix: string = ':';
	static has(name: string) {
		return window.document.querySelector('meta[name="' + this.prefix + name + '"]') !== null;
	}
	static get(name: string): string {
		return (window.document.querySelector('meta[name="' + this.prefix + name + '"]')?.getAttribute('content')) ?? '';
	}
	static all(name: string): Array<string> {
		let result: Array<string> = [];
		window.document.querySelectorAll('meta[name="' + this.prefix + name + '"]').forEach(element => {
			let value: string | null = element.getAttribute('content');
			if (typeof value === "string") result.push(value);
		})
		return result;
	}
}
