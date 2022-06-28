<script lang="ts">
	import type TreeList from "../tree-list";
	import FaIcon from "../../fa-icon";
	import type {Writable} from "svelte/store";

	export let item;
	export let subitems;
	export let openedlist: Writable<Array<number>>;
	export let list: TreeList

	let card = list.cardifyItem(item);

	let hover = false

	function dragleave(event) { under = behind = false;}

	function dragover(event) {
		let rect = event.target.getBoundingClientRect();
		dragleave(event);
		if (
			event.dataTransfer.types.includes("tree-card")
			&& !event.dataTransfer.types.includes("id:" + card.id)
		) {
			if (event.pageX < rect.left + rect.width / 2 || subitems.length) {
				behind = true;
			} else {
				under = true;
			}
		}
		event.preventDefault();
	}

	function drop(event) {
		event.preventDefault();
		if (under) {
			list.moveUnder(event.dataTransfer.getData("tree-card"), card.id)
		} else if (behind) {
			list.moveBehind(event.dataTransfer.getData("tree-card"), card.id)
		}
		dragleave(event);
	}

	function dragstart(event) {
		event.dataTransfer.setData('tree-card', card.id);
		event.dataTransfer.setData('id:' + card.id, '');
		event.dataTransfer.effectAllowed = "move";

	}

	function openclose(event) {
		event.stopPropagation();
		if (hasChildren) {
			openedlist.update((list) => {
				if (!isOpened) {
					list.push(item.id);
				} else {
					list = list.filter((e) => e !== item.id);
				}
				return [...new Set(list)];
			})
		}
	}

	let self;
	let items;

	let under = false;
	let behind = false;
	let isOpened: boolean;
	let isActive: boolean;
	let hasIcon: boolean;

	$: hasIcon = typeof card.icon !== "undefined";
	$: isActive = typeof card.active === "undefined" ? true : card.active;
	$: isOpened = $openedlist.includes(item.id);
	$: hasChildren = subitems.length as boolean;

</script>

<div
		on:drop={drop}
		on:dragstart={dragstart}
		on:dragover={dragover}
		on:dragleave={dragleave}
		on:dragenter={(event)=>{event.preventDefault();}}
		draggable="true"
		class="is-unselectable p-0 m-0 mb-1 is-clickable is-size-7 has-text-white item"
		on:mouseover={()=>hover=true} on:mouseout={()=>hover=false} class:has-background-info-dark={hover} class:inactive={!isActive}
		on:click={card.click}

>
	<span class="treefunc pl-1" on:click={openclose}>
		{#if !hasChildren}
			{@html FaIcon.s("circle-dot").Tag() }
		{:else if isOpened}
			{@html FaIcon.s("circle-chevron-down").Tag() }
		{:else}
			{@html FaIcon.s("circle-chevron-right").Tag() }
		{/if}
	</span>
	{#if hasIcon}
		<span class="icon list-icon" style={ card.icon.props.color ? "color:"+card.icon.props.color: ""}>{@html card.icon.tag}</span>
	{/if}
	{card.title}
</div>
<div class="p0 ml-4 subitems" class:dropzone={under}>
	{#if isOpened}
		{#each subitems as subitem (Math.random())}
			<svelte:self item={subitem.object} subitems={subitem.items} list={list} openedlist={openedlist}/>
		{/each}
	{/if}
</div>
<div class="behind" class:dropzone={behind}></div>

<style lang="scss">
	.treefunc {
		font-size: 10px;
		opacity: .5;
	}
	.item {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.dropzone {
		border-bottom: 3px solid red;
	}
	.inactive .icon {
		opacity: .3;
	}
</style>
