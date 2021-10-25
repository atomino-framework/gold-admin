<script lang="ts">
	import type Control, {IOption} from "./control";
	import type Page from "../../form/form-page";
	import options from "../options";

	export let page: Page;

	export let control: Control;
	export let item;
	export let onChange: Function;

	let name = control.field + Math.random();

	let optionSet = control.options;
	let loading = null;

	if (control.api !== null) {
		loading = control.api.get(page.form.id).then((res: Array<IOption>) => optionSet = res);
	}

</script>
{#await loading}
	{@html options.radio.downloading.icon.tag}
{:then res}
	<div class="control is-size-7">
		{#each optionSet as option}
			<label class="radio m-0 mr-2">
				<input type="radio" class="mr-1" on:change={onChange} name={name} value={option.value} bind:group={$item[control.field]}>
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
