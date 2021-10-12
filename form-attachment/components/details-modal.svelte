<script lang="ts">
	import cbytes from "cbytes";
	import {Modal} from "../../app/modal-manager";
	import ModalComponent from "../../app/components/modal.svelte"
	import ImageModal from "./image-modal.svelte"
	import Clipboard from "../../clipboard";
	import {onMount} from "svelte";
	import options from "../options";

	export let modal: Modal;
	export let file;
	export let saveFileDetails: (data: any) => Promise<any>;
	export let removeFile: () => Promise<any>;
	export let props: Array<string>;

	let properties = [];
	let filename;
	let title;
	let img;

	onMount(() => {
		for (let prop of props) if (typeof file.properties[prop] === 'undefined') file.properties[prop] = '';

		properties = [...Object.entries(file.properties)];
		console.log(properties)

		filename = file.name;
		title = file.title;
		img = {focus: file.focus, safezone: file.safezone}
	});


	function addProperty() {
		properties = [...properties, ['', '']];
	}

	function removeProperty(index) {
		properties.splice(index, 1);
		properties = [...properties];
	}

	function showImageModal() {
		(new Modal(ImageModal, {file, img})).open()
	}

	function remapProperties() {
		let remapped = Object.fromEntries(properties.map(item => [item[0].trim(), item[1].trim()]));
		for(let key in remapped) if(key === '' && remapped.hasOwnProperty(key)) delete remapped[key];
		return remapped;
	}

</script>

<ModalComponent>
	<div class="modal-card">
		<header class="modal-card-head p-3 px-4">
			<p class="modal-card-title is-size-6 has-text-weight-bold">File details</p>
			<button class="delete" aria-label="close" on:click={modal.close}></button>
		</header>
		<section class="modal-card-body has-background-black-bis m-0 p-0">
			<table class="table is-fullwidth is-striped is-size-7" style="border-width:0!important;">
				<tr>
					<td class="px-2 py-1">file name</td>
					<td class="p-0" colspan="2"><input class="has-text-info input is-size-7 is-radiusless is-borderless px-2 py-1" bind:value={filename} placeholder="filename"></td>
				</tr>
				<tr>
					<td class="px-2 py-1">title</td>
					<td class="p-0" colspan="2"><input class="has-text-info input is-size-7 is-radiusless is-borderless px-2 py-1" bind:value={title} placeholder="title"></td>
				</tr>
				<tr>
					<td class="px-2 py-1">url</td>
					<td class="px-2 py-1 is-unselectable is-clickable" colspan="2" on:dblclick={()=>Clipboard.copy(file.url)}>{file.url}</td>
				</tr>
				<tr>
					<td class="px-2 py-1">file size</td>
					<td class="px-2 py-1" colspan="2">{cbytes(file.size, {separator: '', decimals: 1})} ({file.size.toLocaleString()})</td>
				</tr>
				<tr>
					<td class="px-2 py-1">mime type</td>
					<td class="px-2 py-1" colspan="2">{file.mimetype}</td>
				</tr>
				{#if (file.isImage)}
					<tr>
						<td class="px-2 py-1">dimensions</td>
						<td class="px-2 py-1" colspan="2">{file.width} x {file.height}</td>
					</tr>
				{/if}
				<tr>
					<td class="px-2 py-1 has-text-weight-bold" colspan="3">Properties
						<i class="is is-clickable {options.details.add.icon} py-1 has-text-primary is-pulled-right" on:click={()=>addProperty()}></i>
					</td>
				</tr>
				{#each properties as [key, value], index}
					<tr class="property">
						<td class="p-0"><input class="has-text-info input is-size-7 is-radiusless is-borderless px-2 py-1" bind:value={key} placeholder="key"></td>
						<td class="p-0"><input class="has-text-info input is-size-7 is-radiusless is-borderless px-2 py-1" bind:value={value} placeholder="value"></td>
						<td class="is-narrow px-2 py-1 has-text-right"><i class="is is-clickable {options.details.remove.icon} py-1 has-text-danger" on:click={()=>removeProperty(index)}></i></td>
					</tr>
				{/each}
			</table>

		</section>

		<footer class="modal-card-foot is-justify-content-center p-2">
			{#if file.isImage}
				<button class="button is-info is-size-7" on:click={()=>showImageModal()}>{@html options.details.image.icon.Tag()}&nbsp;Image focus</button>
			{/if}
			<button class="button is-primary is-size-7" on:click={()=>saveFileDetails({filename, title, focus: img.focus, safezone: img.safezone, properties: remapProperties()}).then(()=>modal.close())}>{@html options.details.save.icon.Tag()}&nbsp;Save</button>
			<button class="button is-danger is-size-7" on:click={()=>removeFile().then(()=>modal.close())}>{@html options.details.delete.icon.Tag()}&nbsp;Delete</button>
		</footer>
	</div>
</ModalComponent>

<style lang="scss">
	.is-borderless {border: 0;}
	.table {
		color: #808080;
		input {box-shadow: none;}
		tr:first-child td {border-top: 0;}
		tr:last-child td {border-bottom: 0;}
		td:first-child {border-left: 0; }
		tr.property {
			td:nth-child(2) {border-right: 0}
			td:nth-child(3) {border-left: 0}
		}
		td:last-child {border-right: 0; color: #ffffff;}
		button {height: auto;}
	}
</style>
