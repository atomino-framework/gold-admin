<script lang="ts">
	import type {Writable} from "svelte/store";
	import options from "../options";
	import {Input} from "svelma"
	import Clipboard from "../../clipboard";
	import type Control from "./control";
	import Page from "../../form/form-page";
	import type I_OptionSet from "../option-set.interface";


	export let page: Page;
	export let control: Control;
	export let item: Writable<Object>;
	export let onChange: Function;

	let field = control.field

	let optionList: Array<I_OptionSet> = [];
	let value: null | number | string | Array<number | string> = control.multi ? [] : null;
	let valueList: Array<I_OptionSet> = [];

	item.subscribe(item => {
		let newValue = item[field];
		if (value !== newValue) {
			value = newValue;
			if (control.multi && value === null) value = [];
			load();
		}
	});

	function update(newValue: number | string | null | Array<number | string>) {
		if (value !== newValue) item.update(item => {
			item[field] = newValue;
			return item;
		})
	}

	async function load() {
		if (typeof value === "number" || typeof value === "string") value = [value];
		if (value instanceof Array && value.length) {
			valueList = await control.api?.get(value, page.form.id);
		} else {
			valueList = [];
		}
	}

	async function onInput(event) {
		if (event instanceof InputEvent) {
			let search = event.target.value.trim();
			if (search.length >= control.minChar) {
				optionList = await control.api!.search(search, page.form.id)
			} else {
				optionList = [];
			}
		}
	}

	function add(id: number) {
		if (control.multi) {
			if (typeof control.multi === "boolean" || (value as Array<number | string>).length < control.multi) {
				update([...new Set([...value, id])])
			}
		} else {
			update(id);
		}
		onChange();
	}

	function remove(id: any) {
		if (control.multi) {
			let index = (value as Array<number | string>).findIndex(item => item === id);
			let mod = [...value];
			(mod as Array<number | string>).splice(index, 1);
			update(mod);
		} else {
			update(null);
		}
		onChange();
	}

	function openForm(id: string | number) {
		//@ts-ignore
		let formPage = new Page(new (control.form)(id));
		page.pageManager!.add(formPage);
	}

</script>

<Input type="text" size="is-small" icon={options.combobox.search.icon.icon} iconPack={options.combobox.search.icon.pack} on:input={onInput} placeholder="search"/>
{#if optionList.length}
	<div class="options is-size-7 p-0 has-background-black">
		{#each optionList as item (item.value)}
			<span class="field has-addons pt-1 m-0">
				<div class="control">
					<button on:click={()=>add(item.value)} class="button is-primary is-small">{@html options.combobox.add.icon.Tag('fa-fw')}</button>
				</div>
				<div class="control is-expanded py-0 has-background-link-dark is-unselectable" on:dblclick={()=>Clipboard.copy(item.value)}>
					<span class="input px-4 is-size-7 has-text-primary">{item.label}</span>
				</div>
				<div class="control py-0 has-background-link-dark is-unselectable" on:dblclick={()=>Clipboard.copy(item.value)}>
					<span class="input px-2 is-size-7 has-text-primary-dark">{item.value}</span>
				</div>
			</span>
		{/each}
	</div>
{/if}

<div class="values is-size-7">
	{#each valueList as item (item.value)}
		<span class="field has-addons pr-1 pt-1 m-0 is-pulled-left">
			<div class="control">
				<button on:click={()=>remove(item.value)} class="button is-danger is-small">{@html options.combobox.remove.icon.Tag('fa-fw')}</button>
			</div>
			<div class="control py-0 has-background-link-dark" on:dblclick={()=>Clipboard.copy(item.value)}>
				<span class="input px-4 is-size-7 has-text-white is-unselectable">{item.label}</span>
			</div>
			<div class="control py-0 has-background-link-dark" on:dblclick={()=>Clipboard.copy(item.value)}>
				<span class="input px-2 is-size-7 is-unselectable">{item.value}</span>
			</div>
			{#if control.form}
				<div class="control py-0">
					<button on:click={()=>openForm(item.value)} class="button is-link is-small">{@html options.combobox.link.icon.Tag('fa-fw')}</button>
				</div>
			{/if}
		</span>
	{/each}
</div>

<style lang="scss">
	.options {
		max-height: 90px;
		overflow: auto;
	}
</style>
