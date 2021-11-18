<script lang="ts">
	import FaIcon from "../../fa-icon";
	import type {Writable} from "svelte/store";
	import type Form from "../form";
	import type EntityPage from "../form-page";

	import Header from "./form-page-header.svelte"
	import Section from "./form-section.svelte"

	export let page: EntityPage;

	let form: Form = page.form;
	let title: Writable<string> = form.$title;
	let icon: Writable<FaIcon> = form.$icon;
	let id: Writable<number | null> = form.$id;
	let loading: Writable<boolean> = page.$loading;
	let item = form.$item;
	let errors = form.$errors;
	//let modal = form.$modal;

</script>

<Header loading={loading} form={form}/>

{#if !$loading}
<div class="columns m-0 p-0 is-multiline">
	{#each form.sections as section}
		<Section section={section} item={item} onChange={()=>form.changed=true} errors={errors} page={page}/>
	{/each}
</div>
	{/if}

<!--{#if $modal !== null}-->
<!--	<svelte:component {...$modal.props} this={$modal.component} form={form}/>-->
<!--{/if}-->
