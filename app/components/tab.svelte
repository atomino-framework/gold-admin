<script lang="ts">
	import type {Writable} from "svelte/store";
	import FaIcon from "../../fa-icon";
	import type AbstractPage from "../abstract-page";
	import options from "../options";
	import {beforeUpdate, afterUpdate} from "svelte";


	export let page: AbstractPage;
	export let onPin: Function;
	export let pinned: boolean = false;

	export let isActive: boolean;
	export let closeable: boolean;
	export let onSelect: Function;
	export let onClose: Function;
	let loading: Writable<boolean> = page.$loading;
	let icon: Writable<FaIcon> = page.$icon;
	let title: Writable<string> = page.$title;
	let isChanged: Writable<boolean> = page.$isChanged;

	$: {
		if (isActive && rendered) { rootNode.scrollIntoView({behavior: "smooth"}) }
	}

	beforeUpdate(async () => rendered = false)
	afterUpdate(async () => rendered = true)
	let rendered = false;
	let rootNode;

</script>

<li bind:this={rootNode} class:is-active={isActive} on:click={onSelect}>
	<a class="is-size-7 px-1 py-0" class:pinned = {pinned}>

		<span class="icon m-0 has-text-grey">
			<span class="icon tab-icon" on:dblclick|preventDefault={()=>onPin(page)} class:has-text-primary-dark={!pinned} class:pin={pinned}>
				{#if ($loading)}
					{@html options.tab.loading.icon.tag}
				{:else }
					{@html $icon.tag}
				{/if}
			</span>
		</span>
		<span class="tab-label">{$title}</span>
		{#if closeable}
			<span class="icon m-0 close" class:has-text-danger={!pinned} class:pin={pinned} on:click|stopPropagation={onClose} class:changed={$isChanged}>
				<span class="changed">{@html options.tab.changed.icon.tag}</span>
				{#if pinned}
					<span class="close">{@html options.tab.pinned.icon.tag}</span>
				{:else }
					<span class="close">{@html options.tab.close.icon.tag}</span>
				{/if}
			</span>
		{/if}
	</a>
</li>

<style lang="scss">

	.tab-icon {
		opacity: .5;
	}
	.pin {
		color: orange;
	}
	.tab-label {
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.is-active .icon {
		color: white !important;
	}
	span.close:not(.changed) {
		.changed {display: none}
	}
	span.close.changed {
		.close {display: none}
		&:hover {
			.close {display: inline-block;}
			.changed {display: none;}
		}
	}
</style>
