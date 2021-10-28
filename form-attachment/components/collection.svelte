<svelte:options accessors/>
<script lang="ts">
	import cbytes from "cbytes";
	import File from "./file.svelte";
	import options from "../options";

	export let collection;
	export let files;
	export let name: string = '';
	export let label: string = '';
	export let props: Array<string>;

	const COLLID = 'x--collection--';

	let input;
	let over: null | string | true = null;

	export let saveFileDetails: (filename: string, data: any) => Promise<any>;
	export let removeFile: (collection: string, filename: string) => Promise<any>;
	export let upload: (collection: string, files: FileList) => Promise<any>
	export let moveFile: (filename: string, source: string, target: string, position: number, copy: boolean) => Promise<any>

	$: full = collection.maxCount && collection.maxCount === collection.files.length;

	function dragover(index: null | string | true, event) {
		if (!event.dataTransfer.types.includes(COLLID + name) && full) return;
		over = index;
	}

	function dragstart(filename: string, from: number, event) {
		event.dataTransfer.setData(COLLID + name, 1);
		event.dataTransfer.setData('filename', filename);
		event.dataTransfer.setData('collection', name);
		event.dataTransfer.setData('from', from);
	}

	function drop(to: number, event) {
		over = null;


		let data = {
			source: event.dataTransfer.getData('collection'),
			target: name,
			file: event.dataTransfer.getData('filename'),
			from: parseInt(event.dataTransfer.getData('from')),
			to: to,
			copy: event.shiftKey
		}

		if (data.source !== data.target && full) return;


		if (data.source === data.target) {
			if (data.from === data.to || data.from - 1 === data.to) return;
			data.copy = false;
		}

		moveFile(data.file, data.source, data.target, data.to, data.copy);
	}
</script>

<div class="card p3 mb-2">
	<header class="card-header">
		<p class="card-header-title has-text-weight-normal">
			<b>{label}</b><span class="pl-1 is-size-7">
			{collection.maxSize ? " ( max file size: " + cbytes(collection.maxSize, {separator: '', decimals: 0}) + ')' : ''}
			</span>
		</p>
		<input bind:this={input} multiple type="file" style="display: none" on:change={()=>upload(name, input.files)}>
	</header>
	<div class="card-content p-3">
		<div class="content is-flex is-flex-wrap-wrap">
			<div
					draggable="false"
					class="upload is-clickable"
					class:over={over === true}
					on:dragover|preventDefault={(event)=>dragover(true, event)}
					on:drop={(event)=>drop(-1, event)}
					on:dragleave={()=>over = null}
					on:click={()=>!full && input.click()}
			>
				<div class="card is-inline-block m-1 is-unselectable has-background-info" class:has-background-danger={full} draggable="false">
					<div class="card-image">
						<div class="py-5 has-text-centered">
							{#if (full)}
								<i class=" is-size-1 has-text-white {options.collection.full.icon}"></i>
							{:else }
								<i class=" is-size-1 has-text-white {options.collection.upload.icon}"></i>
							{/if}
						</div>
					</div>
					<header class="card-header has-background-info is-flex-direction-column" class:has-background-danger={full}>
						<div class="card-header-title px-2 pt-1 has-text-weight-bold has-text-white has-text-centered pb-0">{full ? 'full' : 'upload'}</div>
						<div class="card-header-title subtitle px-2 pt-0 pb-1 has-text-weight-normal has-text-white has-text-centered">{collection.files.length}{collection.maxCount ? " / " + collection.maxCount : ''}</div>
					</header>
				</div>
			</div>
			{#each collection.files as file , index}
				<div
						draggable={options.features.moveFile}
						class="draggable"
						class:over={over === file}
						on:dragstart={(event)=>dragstart(file, index, event)}
						on:dragover|preventDefault={(event)=>dragover(file, event)}
						on:drop={(event)=>drop(index, event)}
						on:dragleave={()=>over = null}
				>
					<File props={props} file={files[file]} saveFileDetails={saveFileDetails} removeFile={(filename)=>removeFile(name, filename)}/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.over {
		position: relative;
	}
	.over:after {
		position: absolute;
		right: -8.5px;
		top: -2px;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;

		border-top: 8px solid #f00;
		content: "";
	}


	.upload {
		display: inline-block;

		.card-image {
			width: 120px;
			height: 90px;
		}
		.card-header-title {
			display: block;
			font-size: 11px;
			width: 120px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			&.subtitle {
				font-size: 10px;
			}
		}
	}

</style>
