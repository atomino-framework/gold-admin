export default class Favicon {

	static createByEmoji(emoji: string): string {
		return "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>" + emoji + "</text></svg>";
	}

	static replace(url: string) {
		let link = window.document.querySelector("link[rel~='icon']");
		if (!link) {
			link = window.document.createElement('link');
			link.setAttribute("rel", "icon");
			window.document.getElementsByTagName('head')[0].appendChild(link);
		}
		link.setAttribute("href", url);
	}

}
