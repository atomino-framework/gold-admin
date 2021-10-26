<script lang="ts">
	import type Control from "./control";
	import {Input} from "svelma"
	import type Page from "../../form/form-page";

	export let page: Page;
	export let control: Control;
	export let item;
	export let onChange: Function;
</script>

<Input type="text" size="is-small" bind:value={$item[control.field]} on:change={onChange}/>
