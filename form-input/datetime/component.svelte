<script lang="ts">
	import {get} from "svelte/store";
	import type Control from "./control";
	import type Page from "../../form/form-page";
	export let page: Page;

	export let control: Control;
	export let item;
	export let onChange: Function;


	$: value = datetimeLocal(get(item)[control.field], true, false);

	function input(event) {
		let val = event.target.value;
		let value = datetimeLocal(val, true, true) ?? '';
		item.update(item => {
			item[control.field] = value;
			return item;
		})
	}

	function datetimeLocal(date, T = false, zone = false) {
		if (date === '' || date === null) return null;
		if (!(date instanceof Date)) date = new Date(date);
		if (isNaN(date)) return null;
		let offset;
		return date.getFullYear() + '-' +
			('0' + (date.getMonth() + 1)).slice(-2) + '-' +
			('0' + (date.getDate())).slice(-2) +
			(T ? 'T' : ' ') +
			('0' + (date.getHours())).slice(-2) + ':' +
			('0' + (date.getMinutes())).slice(-2) + ':' +
			('0' + (date.getSeconds())).slice(-2) +
			(!zone ? '' : !(offset = new Date().getTimezoneOffset()) ? 'Z' : ((offset > 0 ? '-' : '+') +
				('0' + Math.floor(Math.abs(offset) / 60)).slice(-2) + ':' +
				('0' + Math.floor(Math.abs(offset) % 60)).slice(-2)));
	}
</script>

<input class="input is-small" type="datetime-local" value={datetimeLocal($item[control.field], true, false)} on:input={input} on:change={onChange}>

<style lang="scss">
	input::-webkit-calendar-picker-indicator {
		cursor: pointer;
		padding: 0;
		width: 20px;
		height: 20px;
		-webkit-text-fill-color: blue;
		filter: invert(1);
	}
</style>
