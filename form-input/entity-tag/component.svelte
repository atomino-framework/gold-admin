<script lang="ts">
	import type {Writable} from "svelte/store";
	import {get, writable} from "svelte/store";
	import type Control from "./control";
	import Page from "../../form/form-page";
	import type I_OptionSet from "../../form-input/option-set.interface";
	import {tick} from "svelte";

	export let page: Page;
	export let control: Control;
	export let item: Writable<Object>;
	export let onChange: Function;
	let component;

	function getFieldValue(): any { return get(item)[control.field];}
	function setFieldValue(value: any) {
		item.update(item => {
			item[control.field] = value;
			return item;
		});
	}
	function getItemId() { return page.form.id; }

	let options = {
		form: control.form,
		viewOnly: control.viewOnly,
		fullWidth: control.fullWidth,
		api: control.api!,
		limit: (getFieldValue() instanceof Array) ? control.limit : 1
	}


	let searching = false;
	let keyword: string = "";
	let searchResult: Writable<Array<I_OptionSet>> = writable([]);
	let selectedIndex: number = -1;
	let values: Writable<Array<I_OptionSet>> = writable([]);
	loadValues();

	function isFieldValueContains(value): boolean {
		value = parseInt(value);
		let fieldValue = getFieldValue();
		return (fieldValue instanceof Array) ? fieldValue.indexOf(value) !== -1 : fieldValue === value;
	}

	function openForm(id) {
		// @ts-ignore
		page.pageManager!.add(new Page(new (options.form)(id)));
	}

	async function loadValues(): Promise<Array<I_OptionSet>> {
		let ids = getFieldValue();
		let result = (ids === null || ids.length === 0) ? [] : await options.api.get(ids, getItemId());
		values.set(result);
	}

	function scrollIntoView() {
		let el = component.querySelector('[data-tag-index="' + selectedIndex + '"]');
		typeof el["scrollIntoViewIfNeeded"] === "function" ? el["scrollIntoViewIfNeeded"](true) : el.scrollIntoView();
	}

	function onKeyDown(event) {if (event.key === "ArrowDown" || event.key === "ArrowUp") event.preventDefault(); }

	async function onKeyUp(event) {
		switch (event.key) {
			case "Enter":
				if (selectedIndex !== -1){
					let value = get(searchResult)[selectedIndex].value;
					isFieldValueContains(value) ? await remove(value) : await insert(value);
				}
				break;
			case "ArrowDown":
				let results = get(searchResult);
				if (selectedIndex < results.length - 1) {
					selectedIndex++;
					scrollIntoView();
				}
				break;
			case "ArrowUp":
				if (selectedIndex > 0) {
					selectedIndex--;
					scrollIntoView();
				}
				break;
			case "Escape":
				await resetSearch();
				break;
			default:
				await search();
		}
	}

	async function resetSearch() {
		selectedIndex = -1;
		keyword = "";
		await tick();
		await search();
	}

	async function search() {
		selectedIndex = -1;
		await tick();
		keyword = keyword.trimStart();

		if (keyword.length === 0) {
			searchResult.set([]);
		} else {
			searching = true;
			searchResult.set(await options.api.search(keyword, page.form.id));
			searching = false
		}
	}

	async function insert(value) {
		value = parseInt(value);
		if (typeof value !== "number") return;
		if (isFieldValueContains(value)) return;

		if (options.limit === 1) {
			setFieldValue(value);
		} else {
			let fieldValue = getFieldValue();
			if (fieldValue.length < options.limit) {
				fieldValue.push(value);
				setFieldValue(fieldValue);
			}
		}
		searchResult.update(res => res);
		await loadValues();
	}

	async function remove(value) {
		value = parseInt(value);
		if (typeof value !== "number") return;
		if (!isFieldValueContains(value)) return;

		if (options.limit === 1) {
			setFieldValue(null);
		} else {
			let fieldValue = getFieldValue();
			fieldValue.splice(fieldValue.indexOf(value), 1)
			setFieldValue(fieldValue);
		}
		searchResult.update(res => res);
		await loadValues();
	}

</script>


<div bind:this={component} class="box p-1 item-container is-size-7">
	<div class="tag-container" class:full-width={options.fullWidth}>
		{#each $values as valueItem (valueItem.value)}
			<div class="tags has-addons m-0">
				{#if options.form !== null}
					<span on:click={()=>openForm(valueItem.value)} class="tag mb-0 is-dark has-text-primary is-clickable"><i class="fas fa-link"></i></span>
				{/if}
				<span class="tag mb-0 is-flex-grow-1">{valueItem.label}</span>
				{#if !options.viewOnly}
					<a class="tag is-dark is-delete mb-0" on:click={()=>remove(valueItem.value)}></a>
				{/if}
			</div>
		{/each}
	</div>

	{#if !options.viewOnly}
		<div class="field has-addons mb-0 mt-1">
			<div class="search-control control has-icons-left is-size-7 flex-grow" class:is-loading={searching}>
				<input
						class="input is-size-7"
						type="text"
						placeholder="search"
						bind:value={keyword}
						on:keyup={onKeyUp}
						on:keydown={onKeyDown}
				>
				<span class="icon is-small is-left"><i class="fas fa-search"></i></span>
			</div>
			<div class="control">
				<a on:click={resetSearch} class="button is-info is-size-7"><i class="fas fa-times"></i></a>
			</div>
		</div>

		{#if $searchResult.length > 0}
			<div class="dropdown is-active">
				<div class="dropdown-menu" id="dropdown-menu" role="menu">
					<div class="dropdown-content p-0 is-size-7">
						{#each $searchResult as tag, index (tag.value)}
							<a
									data-tag-index={index}
									on:click={ ()=>isFieldValueContains(tag.value) ? remove(tag.value) : insert(tag.value) }
									class="dropdown-item is-block pr-2"
									class:is-active={ selectedIndex === index }
									class:has-text-primary-dark={ isFieldValueContains(tag.value) }
							>{tag.label}
								{#if isFieldValueContains(tag.value)}
										<span class="icon is-pulled-right is-size-7">
											<i class="fas fa-check"></i>
										</span>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>


<style lang="scss">
	.search-control {
		width: 100%;
	}
	.dropdown {
		display: block;
		.dropdown-content {
			max-height: 200px;
			overflow: auto;
		}
	}
	.tag-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		&.full-width {
			.tags {
				flex-grow: 1;
				width: 100%;
			}
		}
	}
</style>