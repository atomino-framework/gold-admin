import {Modal} from "../app/modal-manager";
import TagManagerModal from "./components/tag-manager-modal.svelte";
export default class TagManager{
	static open(api:string, title:string, ){
		new Modal(TagManagerModal, {api, title}).open()
	}
}