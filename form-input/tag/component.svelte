<script lang="ts">
	import type {Writable} from "svelte/store";
	import type Control from "./control";
	import type Page from "../../form/form-page";
	import type I_OptionSet from "../../form-input/option-set.interface";
	import {writable, get} from "svelte/store";
	import {tick} from "svelte";

	export let page: Page;
	export let control: Control;
	export let item: Writable<Object>;
	export let onChange: Function;

	let component;


	let options = {
		allowInsert: control.allowInsert,
		limit: control.limit,
		collection: control.collection,
		viewOnly: control.viewOnly,
		type: control.type
	}
	let values: Writable<Array<I_OptionSet>> = writable(getFieldValue());

	function getFieldValue(): any {
		let value = get(item)[control.field];
		if (options.type === "string") {
			if (value === null || typeof value === "undefined" || value.length === 0) value = [];
			else value = [value];
		}
		return value;
	}
	function setFieldValue(value: any) {
		item.update(item => {
			if (options.type === "string") {
				item[control.field] = value.length ? value[0] : "";
			} else{
				item[control.field] = value;
			}
			return item;
		});
		values.set(getFieldValue())
	}
	function getItemId() { return page.form.id; }


	let collection = control.collection;
	let keyword: string = "";
	let searchResult: Writable<Array<I_OptionSet>> = writable([]);
	let selectedIndex: number = -1;

	function findInCollection(value) { return collection.find((item) => item.value === value);}
	function findInCollectionByLabel(label) { return collection.find((item) => item.label.toLowerCase() === label.toLowerCase());}
	function searchInCollection(keyword) {
		let found: Array<I_OptionSet> = [];
		collection.forEach((item: I_OptionSet) => {
			let tag = item.label.toLowerCase();
			let kw = keyword.toLowerCase();
			if (
				(kw.length < 3 && tag.startsWith(kw)) ||
				(kw.length >= 3 && tag.includes(kw))
			) found.push(item);
		});
		found.sort((a, b) => a.label.localeCompare(b.label));
		return found;
	}

	function isFieldValueContains(value): boolean { return getFieldValue().indexOf(value) !== -1;}

	function scrollIntoView() {
		let el = component.querySelector('[data-tag-index="' + selectedIndex + '"]');
		if (el === null) return;
		typeof el["scrollIntoViewIfNeeded"] === "function" ? el["scrollIntoViewIfNeeded"](true) : el.scrollIntoView();
	}

	function onKeyDown(event) {if (event.key === "ArrowDown" || event.key === "ArrowUp") event.preventDefault(); }

	async function onKeyUp(event) {
		switch (event.key) {
			case "Enter":
				if (selectedIndex === -1) await insertByKeyword(keyword);
				else {
					let value = get(searchResult)[selectedIndex].value;
					isFieldValueContains(value) ? remove(value) : insert(value);
				}
				break;
			case "ArrowDown":
				if (keyword.trim() === "") {
					searchResult.set(collection.sort((a, b) => a.label.localeCompare(b.label)))
				}
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
				selectedIndex = -1;
				await tick();
				keyword = "";
				await search();
				break;
			default:
				await search();
		}
	}

	async function search() {
		searchResult.set([]);
		selectedIndex = -1;
		await tick();
		keyword = keyword.trimStart();
		if (keyword.length > 0) {
			let found = searchInCollection(keyword);
			searchResult.set(found);
		} else {
			searchResult.set([]);
		}
	}

	async function resetSearch() {
		selectedIndex = -1;
		keyword = "";
		await tick();
		await search();
	}

	function insert(value) {
		if (value === null) return;
		if (isFieldValueContains(value)) return;
		let fieldValue = getFieldValue();
		if (options.limit === 1) {
			setFieldValue([value]);
			searchResult.update(res => res);
		}
		if (fieldValue.length < options.limit) {
			fieldValue.push(value);
			setFieldValue(fieldValue);
			searchResult.update(res => res);
		}
	}

	async function insertByKeyword(keyword) {
		keyword = keyword.trim();
		let tag = findInCollectionByLabel(keyword);
		if (typeof tag === "undefined" && options.allowInsert && keyword.length) {
			tag = {value: keyword, label: keyword};
			collection.push(tag);
			await search();
		}
		if (typeof tag !== "undefined") insert(tag.value);
	}

	function remove(value) {
		if (!isFieldValueContains(value)) return;
		let fieldValue = getFieldValue();
		fieldValue.splice(fieldValue.indexOf(value), 1)
		setFieldValue(fieldValue);
		searchResult.update(res => res);
	}

</script>
<div bind:this={component} class="box p-1 item-container is-size-7">
	<div class="tag-container">
		{#each $values as tag (tag)}
			{#if findInCollection(tag)}
				<div class="tags has-addons m-0 mr-1 mb-1">
					<span class="tag mb-0">{findInCollection(tag).label}</span>
					{#if !options.viewOnly}
						<a class="tag is-dark is-delete mb-0" on:click={()=>remove(findInCollection(tag).value)}></a>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
	{#if !options.viewOnly}

		<div class="field has-addons mb-0 mt-1">
			<div class="search-control control has-icons-left is-size-7 flex-grow">
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
									class:has-text-primary-dark={isFieldValueContains(tag.value)}
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
	}
</style>