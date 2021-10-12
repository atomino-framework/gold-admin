<script lang="ts">
	import type {Writable} from "svelte/store";
	import FaIcon from "../../fa-icon";
	import type AbstractPage from "../abstract-page";
	import options from "../options";


	export let page: AbstractPage;

	export let isActive: boolean;
	export let closeable: boolean;
	export let onSelect: Function;
	export let onClose: Function;
	let loading: Writable<boolean> = page.$loading;
	let icon: Writable<FaIcon> = page.$icon;
	let title: Writable<string> = page.$title;
	let isChanged: Writable<boolean> = page.$isChanged;
</script>

<li class:is-active={isActive} on:click={onSelect}>
	<a class="is-size-7 px-1 py-0">
		<span class="icon m-0 has-text-grey">
			<span class="icon">
				{#if ($loading)}
					{@html options.tab.loading.icon.tag}
				{:else }
					{@html $icon.tag}
				{/if}
			</span>
		</span>
		<span class="tab-label">{$title}</span>
		{#if closeable}
			<span class="icon m-0 has-text-danger close" on:click|stopPropagation={onClose} class:changed={$isChanged}>
				<span class="changed">{@html options.tab.changed.icon.tag}</span>
				<span class="close">{@html options.tab.close.icon.tag}</span>
			</span>
		{/if}
	</a>
</li>

<style lang="scss">
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
