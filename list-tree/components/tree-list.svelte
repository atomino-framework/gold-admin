<script lang="ts">
	import Header from "../../list/components/header.svelte"
	import type TreeList from "../tree-list";
	import {writable} from "svelte/store";

	export let list: TreeList
	let items = list.$items;
	let openedlist = writable([]);
</script>

<Header list={list}/>

<div class="content p-1 mb-0">
	{#each $items as item (item.id + "-" + Math.random())}
		<svelte:component this={list.card} item={item.object} subitems={item.items} list={list} openedlist={openedlist}/>
	{/each}
</div>

