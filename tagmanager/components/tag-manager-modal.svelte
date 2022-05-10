<script lang="ts">
	import Tag from "./tag.svelte"
	import ModalWindow from "../../app/components/modal.svelte";
	import Confirm from "../../app/components/confirm.svelte";
	import {Modal} from "../../app/modal-manager";

	export let api: string;
	export let title: string;
	export let modal: Modal;

	let tags = [];
	async function getData() {
		tags = await fetch(api).then(res => res.json());
	}

	async function rename(tag: string, to: string) {
		new Modal(Confirm, {
			title: "Rename",
			content: "Do you really want to rename [" + tag + "] to [" + to + "]?",
			buttons: [
				{
					label: "Cancel",
					style: "is-primary",
					action: (modal) => {modal.close()}
				},
				{
					label: "Rename",
					style: "is-danger",
					action: async (modal) => {
						await fetch(api, {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({tag, to})
						}).then(res => res.json());
						modal.close();
						getData();
					}
				}
			]
		}).open();
	}
	async function remove(tag: string) {
		new Modal(Confirm, {
			title: "Remove",
			content: "Do you really want to delete [" + tag + "]?",
			buttons: [
				{
					label: "Cancel",
					style: "is-primary",
					action: (modal) => {modal.close()}
				},
				{
					label: "Delete",
					style: "is-danger",
					action: async (modal) => {
						await fetch(api, {
							method: 'DELETE',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({tag})
						}).then(res => res.json());
						modal.close();
						getData();
					}
				}
			]
		}).open();
	}

	getData();
</script>

<ModalWindow full={false}>
	<div class="modal-card">
		<header class="modal-card-head p-3 px-4">
			<p class="modal-card-title is-size-6 has-text-weight-bold">{title}</p>
			<button class="delete" aria-label="close" on:click={()=>modal.close()}></button>
		</header>
		<section class="modal-card-body has-background-black-bis m-0 p-2">
			{#each tags as tag,index (tag)}
				<Tag {tag} {remove} {rename}/>
			{/each}
		</section>
	</div>
</ModalWindow>
