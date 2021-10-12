import FaIcon from "./../fa-icon";

export default interface I_Options {
	logout: { icon: FaIcon }
	title: string
	background: { color: string, imageUrl: string }
	logo: { imageUrl: string }
	tab: { close: { icon: FaIcon }, changed: { icon: FaIcon }, loading: { icon: FaIcon } },
}
