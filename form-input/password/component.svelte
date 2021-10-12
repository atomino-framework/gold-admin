<script lang="ts">
	import {Input} from "svelma"
	import type Control from "./control";
	import type Page from "../../form/form-page";
	export let page: Page;
	export let control:Control;
	export let item;
	export let onChange: Function;
</script>

<Input type="password" autocomplete="new-password" size="is-small" bind:value={$item[control.field]} on:change={onChange} passwordReveal={true}/>
