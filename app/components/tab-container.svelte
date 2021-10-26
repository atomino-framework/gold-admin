<script lang="ts">
	import type {Writable} from "svelte/store";
	import type AbstractPage from "../abstract-page";
	import Tab from "./tab.svelte";

	export let pages: Array<AbstractPage>;
	export let active: Writable<AbstractPage>;
	export let onSelect: Function;
	export let onClose: Function;
</script>

{#if $pages.length}
	<div class="tabs mb-0 p-1 is-toggle has-text-white-bis">
		<ul>
			{#each $pages as page (page.id)}
				<Tab page={page} isActive={page.id === $active?.id} onSelect={()=>onSelect(page)} onClose={()=>onClose(page)} closeable={page.closeable} />
			{/each}
		</ul>
	</div>
{/if}
