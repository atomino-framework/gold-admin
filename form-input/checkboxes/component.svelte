<script lang="ts">
	import {get} from "svelte/store";
	import type Control, {IOption} from "./control";
	import type Page from "../../form/form-page";
	import options from "../options";

	export let page: Page;
	export let control: Control;
	export let item;
	export let onChange: Function;

	let value = get(item)[control.field];
	if (!(value instanceof Array)) value = [];

	let optionSet = control.options;
	let loading = null;

	if (control.api !== null) {
		loading = control.api.get(page.form.id).then((res: Array<IOption>) => optionSet = res);
	}

	$: {
		item.update(item => {
			item[control.field] = value;
			return item;
		});
	}
</script>
{#await loading}
	{@html options.checkboxes.downloading.icon.tag}
{:then res}
	<div class="control is-size-7">
		{#each optionSet as option (option.value)}
			<label class="radio m-0 mr-2">
				<input type="checkbox" class="mr-1" on:click={onChange} value={option.value} bind:group={value}>
				{option.label}
			</label>
		{/each}
	</div>
{/await}

<style lang="scss">
	label {
		display: inline-flex;
		align-items: center;
	}
</style>
