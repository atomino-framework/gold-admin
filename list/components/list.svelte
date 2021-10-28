<script lang="ts">
	import type List from "../list";
	import Header from "./header.svelte"
	import Footer from "./footer.svelte"

	export let list: List
	let items = list.$items;
</script>

<Header list={list}/>

<div class="content p-1 mb-0">
	{#each $items as item (Math.random())}
		<svelte:component this={list.card} item={item} list={list}/>
	{/each}
</div>

<Footer list={list}></Footer>
