<script lang="ts">
	import AbstractPage from "../abstract-page";
	import type {Writable} from "svelte/store";

	export let pages: Array<AbstractPage>;
	export let active: AbstractPage;
	let loading: Writable<boolean>;
</script>

{#each $pages as page (page.id)}
	<div class:is-hidden={ page.id !== $active?.id}>
		<svelte:component this={page.component} page={page}/>
	</div>
{/each}
