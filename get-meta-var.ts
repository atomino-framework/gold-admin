export default function getMetaVar(name: string): string | null | undefined {
	return window.document.querySelector('meta[name=":' + name + '"]')?.getAttribute('content');
}
