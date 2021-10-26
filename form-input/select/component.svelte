<script lang="ts">
	import type Control from "./control";
	import type I_OptionSet from "../option-set.interface"
	import type Page from "../../form/form-page";
	import options from "../options";

	export let page: Page;

	export let control: Control;
	export let item;
	export let onChange: Function;

	let optionSet = control.options;
	let loading = null;

	if (control.api !== null) {
		loading = control.api.get(page.form.id).then((res: Array<I_OptionSet>) => optionSet = res);
	}
</script>

{#await loading}
	{@html options.select.downloading.icon.tag}
{:then res}
	<div class="select is-size-7 is-fullwidth">
		<select bind:value={$item[control.field]} on:change={onChange} class="has-background-black-bis has-text-white-bis border-0">
			{#each optionSet as option}
				<option value={option.value}> {option.label}</option>
			{/each}
		</select>
	</div>
{/await}
