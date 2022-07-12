<script lang="ts">
	import type {Writable} from "svelte/store";
	import type AbstractPage from "../abstract-page";
	import Tab from "./tab.svelte";
	import {writable} from "svelte/store";

	export let pages: Array<AbstractPage>;
	export let active: Writable<AbstractPage>;
	export let onSelect: Function;
	export let onClose: Function;

	let pinned = writable([]);

	function onPin(page: AbstractPage) {
		pinned.update(v => {
			v.push(page.id)
			return v;
		});
	}
	function unPin(page: AbstractPage) {
		pinned.update(v => {
			v = v.filter((id) => id !== page.id)
			return v;
		});
	}

</script>

{#if $pages.length}

		{#if $pinned.length}
			<div class="tabs m-1 is-toggle has-text-white-bis">
				<ul>
					{#each $pages as page (page.id)}
						{#if ($pinned.indexOf(page.id) !== -1)}
							<Tab page={page} pinned={true} isActive={page.id === $active?.id} onSelect={()=>onSelect(page)} onPin={()=>{}} onClose={()=>unPin(page)} closeable={page.closeable}/>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}

		{#if $pages.length && $pinned.length !== $pages.length}
			<div class="tabs m-1 is-toggle has-text-white-bis">
				<ul>
					{#each $pages as page (page.id)}
						{#if ($pinned.indexOf(page.id) === -1)}
							<Tab page={page} isActive={page.id === $active?.id} onSelect={()=>onSelect(page)} onPin={onPin} onClose={()=>onClose(page)} closeable={page.closeable}/>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}

{/if}

<style lang="scss">
	.tabs {

		&::-webkit-scrollbar {
			display: none;
		}

		/* Hide scrollbar for IE, Edge and Firefox */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		scrollbar-: none; /* Firefox */

	}
</style>