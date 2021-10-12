<script lang="ts">
	import type List from "../list";
	import Header from "./header.svelte"

	export let list: List
	let items = list.$items;
</script>

<Header list={list}/>

<div class="content p-1">
	{#each $items as item (Math.random())}
		<svelte:component this={list.card} item={item} list={list}/>
	{/each}
</div>
