<script lang="ts">
	import {Switch} from "svelma"
	import type Page from "../../form/form-page";
	export let page: Page;
	import type Control from "./control";
	export let control:Control;
	export let item;
	export let onChange: Function;
</script>
<Switch type="is-info" size="is-small" on:click={onChange} bind:checked={$item[control.field]}/>
