<script lang="ts">
	import {get} from "svelte/store";
	import type Control from "./control";
	import type Page from "../../form/form-page";

	export let page: Page;
	export let control: Control;
	export let item;
	export let onChange: Function;

	let value = get(item)[control.field];
	if (!(value instanceof Array)) value = [];

	$: {
		item.update(item => {
			item[control.field] = value;
			return item;
		});
	}
</script>

<div class="control is-size-7">
	{#each control.options as option (option.value)}
		<label class="radio m-0 mr-2">
			<input type="checkbox" class="mr-1" on:click={onChange} value={option.value} bind:group={value}>
			{option.label}
		</label>
	{/each}
</div>

<style lang="scss">
	label {
		display: inline-flex;
		align-items: center;
	}
</style>
