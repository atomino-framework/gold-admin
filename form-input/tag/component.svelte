<script lang="ts">
	import type {Writable} from "svelte/store";
	import type Control from "./control";
	import type Page from "../../form/form-page";
	import type I_OptionSet from "gold-admin/form-input/option-set.interface";
	import {writable, get} from "svelte/store";
	import {tick} from "svelte";

	export let page: Page;
	export let control: Control;
	export let item: Writable<Object>;
	export let onChange: Function;
	let field = control.field;

	let allowInsert = control.allowInsert;
	let limit = control.limit;
	let searching = false;

	let collection = control.collection;

	let keyword: string = "";

	let searchResult: Writable<Array<I_OptionSet>> = writable([]);

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

	function onKeyDown(event) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
		}
	}

	async function onKeyUp(event) {
		if (event.key === "Enter") {
			if (selectedIndex === -1) insertByKeyword(keyword);
			else insert(selectedItem?.value)
		} else if (event.key === "ArrowDown") {
			selectedIndex++;
		} else if (event.key === "ArrowUp") {
			selectedIndex--;
		} else if (event.key === "Escape") {
			selectedIndex = -1;
			await tick();
			keyword = "";
			search();
		} else {
			search();
		}
	}

	let selectedIndex: number = -1;
	let selectedItem: I_OptionSet | null;

	$: selectedItem = pickSelectedResult(selectedIndex);

	function pickSelectedResult(index) {
		let results = get(searchResult);
		if (results.length === 0) {
			selectedIndex = -1;
			return null;
		}
		if (index < 0) selectedIndex = 0;
		if (index > results.length - 1) selectedIndex = results.length - 1;
		return results[selectedIndex];
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

	function insert(value) {
		if (value === null) return;
		item.update((item) => {
			if(item[field].length < limit && item[field].indexOf(value) === -1) item[field].push(value);
			return item;
		})
	}

	function insertByKeyword(keyword) {
		keyword = keyword.trim();
		let tag = findInCollectionByLabel(keyword);
		if (typeof tag === "undefined" && allowInsert && keyword.length) {
			tag = {value: keyword, label: keyword};
			collection.push(tag);
			search();
		}
		if (typeof tag !== "undefined") insert(tag.value);
	}

	function remove(value) {
		item.update((item) => {
			let index = item[field].indexOf(value);
			if (index !== -1) item[field].splice(index, 1)
			return item;
		})
	}

</script>
<div class="box p-1 item-container is-size-7">
	<div class="tag-container">
		{#each $item[field] as tag (tag)}
			<div class="tags has-addons m-0 mr-1 mb-1">
				<span class="tag mb-0">{findInCollection(tag).label}</span>
				<a class="tag is-dark is-delete mb-0" on:click={()=>remove(findInCollection(tag).value)}></a>
			</div>
		{/each}
	</div>

	<div class="field">

		<div class="control has-icons-left is-size-7" class:is-loading={searching}>
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

		{#if $searchResult.length > 0}
			<div class="dropdown is-active">
				<div class="dropdown-menu" id="dropdown-menu" role="menu">
					<div class="dropdown-content p-0 is-size-7">
						{#each $searchResult as tag (tag.value)}
							<a
									on:click={()=>insert(tag.value)}
									class="dropdown-item"
									class:is-active={selectedItem !== null && selectedItem.value === tag.value}
									class:has-text-primary-dark={$item[field].indexOf(tag.value) !== -1}
							>{tag.label}</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>


</div>


<style lang="scss">
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