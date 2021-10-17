<script lang="ts">
	import FaIcon from "../../fa-icon";
	import {Button, Icon} from "svelma";
	import type {Writable} from "svelte/store";
	import type Form from "../form";
	import Clipboard from "../../clipboard";

	import options  from "../options";


	export let form: Form;
	export let loading: boolean;

	let title: Writable<string> = form.$title;
	let icon: Writable<FaIcon> = form.$icon;
	let id: Writable<number | null> = form.$id;
</script>

<header class="mb-1 p-0 py-3 has-text-white">
	<div class="p-2 area-buttons">
		{#if !$loading}
			{#each form.buttons as button}
				<Button on:click={()=>button.action()} size="is-small" type="is-black" class="ml-1" disabled={!(!button.onlyIfExists || $id) }>
					<Icon pack={button.icon.pack} icon={button.icon.icon}/>
				</Button>
			{/each}
		{:else }
			<Button size="is-small" type="is-black" rounded class="ml-1" disabled>
				{@html options.loading.icon.tag}
			</Button>
		{/if}
	</div>
	<div class="m-2 area-icon" on:dblclick={()=>$id ? Clipboard.copy($id) : null}><Icon pack={$icon.pack} icon={$icon.icon} size="is-medium"/></div>
	<div class="is-size-6 area-title has-text-weight-bold">{$title}</div>
	<div class="is-size-7 area-subtitle">id: {$id ? $id : '-'}</div>
</header>

<style lang="scss">
	header {
		.area-title {
			grid-area: title;
			display: flex;
			align-items: flex-end;
		}
		.area-subtitle {
			grid-area: subtitle
		}
		.area-buttons {
			grid-area: buttons;
			:global(button.button.is-black) {
				background-color: #0006 !important;
				&:hover {
					background-color: #0009 !important;
				}
			}
		}
		.area-icon {
			grid-area: icon;
		}
		line-height: 1.2;
		display: grid;
		grid-template-areas: "icon title buttons" "icon subtitle buttons";
		grid-template-columns: auto 1fr auto;
	}
</style>
