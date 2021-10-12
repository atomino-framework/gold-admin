<script lang="ts">
	import options from "../options";
	import {Input} from "svelma"
	import Clipboard from "../../clipboard";
	import type Control from "./control";
	import Page from "../../form/form-page";


	export let page: Page;
	export let control: Control;
	export let item;
	export let onChange: Function;

	let optionList: Array<{ id: number, value: string }> = [];
	let value: number | null | Array<number> = null;
	let valueList = [];

	item.subscribe(item => {
		let newValue = item[control.field];
		if (value !== newValue) {
			value = newValue;
			if (control.multi && !value === null) {
				value = [];
			}
			load();
		}
	});

	function update(newValue: number | null | Array<number>) {
		console.log(newValue)
		if (value !== newValue) item.update(item => {
			item[control.field] = newValue;
			return item;
		})
	}

	async function load() {
		if (value instanceof Array) {
			if (value.length) {
				control.api?.get(value).then(res => valueList = res);
			}else{
				valueList = [];
			}
		} else if (typeof value === "number") {
			control.api?.get([value]).then(res => valueList = res);
		} else {
			valueList = [];
		}
	}

	async function onInput(event) {
		if (event instanceof InputEvent) {
			let search = event.target.value.trim();
			if (search.length >= control.minChar) {
				optionList = await control.api!.search(search)
			} else {
				optionList = [];
			}
		}
	}

	function add(id: number) {
		if (control.multi) {
			if (typeof control.multi === "boolean" || value.length < control.multi) {
				update([...new Set([...value, id])])
			}
		} else {
			update(id);
		}
		onChange();
	}

	function remove(id: any) {
		if(control.multi){
			let index = (value as Array<number>).findIndex(item=>item===id);
			let mod = [...value];
			(mod as Array<number>).splice(index, 1);
			update(mod);
		}else{
			update(null);
		}
		onChange();
	}

</script>

<Input type="text" size="is-small" icon={options.combobox.search.icon.icon} iconPack={options.combobox.search.icon.pack} on:input={onInput} placeholder="search"/>
{#if optionList.length}
	<div class="options is-size-7 p-0 has-background-black">
		{#each optionList as item}
		<span class="field has-addons pt-1 m-0">
			<div class="control">
				<button on:click={()=>add(item.key)} class="button is-primary is-small">{@html options.combobox.add.icon.Tag('fa-fw')}</button>
			</div>
			<div class="control is-expanded py-0 has-background-link-dark is-unselectable" on:dblclick={()=>Clipboard.copy(item.value)}>
				<span class="input px-4 is-size-7 has-text-primary">{item.value}</span>
			</div>
			<div class="control py-0 has-background-link-dark is-unselectable" on:dblclick={()=>Clipboard.copy(item.key)}>
				<span class="input px-2 is-size-7 has-text-primary-dark">{item.key}</span>
			</div>
		</span>
		{/each}
	</div>
{/if}

<div class="values is-size-7">
	{#each valueList as item (item.key)}
		<span class="field has-addons pr-1 pt-1 m-0 is-pulled-left">
			<div class="control">
				<button on:click={()=>remove(item.key)} class="button is-danger is-small">{@html options.combobox.remove.icon.Tag('fa-fw')}</button>
			</div>
			<div class="control py-0 has-background-link-dark" on:dblclick={()=>Clipboard.copy(item.value)}>
				<span class="input px-4 is-size-7 has-text-white is-unselectable">{item.value}</span>
			</div>
			<div class="control py-0 has-background-link-dark" on:dblclick={()=>Clipboard.copy(item.key)}>
				<span class="input px-2 is-size-7 is-unselectable">{item.key}</span>
			</div>
			{#if control.form}
				<div class="control py-0">
					<button on:click={()=>page.pageManager.add(new Page(new (control.form)(item.key)))} class="button is-link is-small">{@html options.combobox.link.icon.Tag('fa-fw')}</button>
				</div>
			{/if}
		</span>
		<!--{#if Form}<i on:click={()=>open(item.id)} class="open fas fa-external-link-alt"></i>{/if}-->
	{/each}
</div>

<style lang="scss">
	.options {
		max-height: 90px;
		overflow: auto;
	}
</style>
