export default class Favicon {

	static createWithSvg(svg:string){
		return 'data:image/svg+xml,' + svg;
	}

	static createWithEmoji(emoji: string): string {
		return Favicon.createWithSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">' + emoji + '</text></svg>');
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
