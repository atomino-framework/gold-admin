<script lang="ts">
	import type I_AttachmentApi from "../attachment-api.interface";
	import Modal from "../../app/components/modal.svelte"
	import {writable} from "svelte/store";
	import Collection from "./collection.svelte"

	export let modal;
	export let api: I_AttachmentApi;
	export let visibleCollections: {};
	export let id: number;

	let files = writable({});
	let collections = writable({});
	let fetch;

	function load() {
		fetch = api.get(id).then(res => {
			$files = res.files;
			$collections = res.collections;
			console.log($collections)
		})
	}

	function saveFileDetails(filename: string, data: any) { return api.saveFileDetails(id, filename, data).finally(load); }
	function removeFile(collection: string, filename: string) { return api.removeFile(id, collection, filename).finally(load); }
	function upload(collection: string, files: FileList) {return api.upload(id, collection, files).finally(load);}
	function moveFile(filename: string, source: string, target: string, position: number, copy: boolean) {return api.moveFile(id, filename, source, target, position, copy).finally(load)}

	load();
</script>


<Modal full={true}>
	<div class="modal-card">
		<header class="modal-card-head p-3 px-4">
			<p class="modal-card-title is-size-6 has-text-weight-bold">Attachments</p>
			<button class="delete" aria-label="close" on:click={()=>modal.close()}></button>
		</header>
		<section class="modal-card-body has-background-black-bis m-0 p-2">
			{#await fetch}{:then r}
				{#each Object.entries(visibleCollections) as [name, coll]}
					<Collection label={coll.label} props={coll.props} name={name} files={$files} collection={$collections[name]} saveFileDetails={saveFileDetails} removeFile={removeFile} upload={upload} moveFile={moveFile}/>
				{/each}
			{/await}
		</section>
	</div>
</Modal>
