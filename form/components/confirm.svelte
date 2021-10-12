<script lang="ts">
	import type Form from "../form";
	import Modal from "../../app/components/modal.svelte"
	import {SvelteComponent} from "svelte";

	export let title: string = "Please confirm!";
	export let buttons: Array<{ style: string, label: string, action: Function }> = [];
	export let content: string | typeof SvelteComponent = "question";
	export let props = {};
	export let full = false;
	export let close = false;
	export let modal:Modal;

	export let form: Form;
</script>


<Modal full={full}>
	<div class="modal-card">
		<header class="modal-card-head p-3 px-4">
			<p class="modal-card-title is-size-6 has-text-weight-bold">{title}</p>
			{#if close}
				<button class="delete" aria-label="close" on:click={()=>form.closeModal()}></button>
			{/if}
		</header>
		<section class="modal-card-body has-background-black-bis">
			{#if typeof content === "string"}
				{content}
			{:else }
				<svelte:component this={content} {...props} form={form}/>
			{/if}
		</section>
		<footer class="modal-card-foot is-justify-content-center p-2">
			{#each buttons as button}
				<button class="button is-small {button.style}" on:click={()=>button.action()}>{button.label}</button>
			{/each}
		</footer>
	</div>
</Modal>
