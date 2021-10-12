<script lang="ts">
	import type Control from "./control";
	import type Page from "../../form/form-page";
	export let page: Page;

	export let control: Control;
	export let item;
	export let onChange: Function;
</script>

<div class="select is-size-7 is-fullwidth">
	<select bind:value={$item[control.field]} on:change={onChange} class="has-background-black-bis has-text-white-bis border-0">
		{#each control.options as option}
			<option value={option.value}> {option.label}</option>
		{/each}
	</select>
</div>
