<script lang="ts">
	import Modal from "../../app/components/modal.svelte";

	type File = {
		width: number,
		height: number
	}

	export let file: File;
	export let modal;

	export let img;
	let safe, focus;

	if (img.safezone === null) {
		safe = {x: 10, y: 10, width: file.width - 20, height: file.height - 20}
	} else {
		let str = img.safezone;
		let len = str.length / 4;
		safe = {
			x: parseInt(str.substr(0, len), 36),
			y: parseInt(str.substr(len, len), 36),
			width: parseInt(str.substr(len * 2, len), 36),
			height: parseInt(str.substr(len * 3, len), 36),
		}
	}

	if (img.focus === null) {
		focus = {x: Math.ceil(file.width / 2), y: Math.ceil(file.height / 2)}
	} else {
		let str = img.focus;
		let len = str.length / 2;
		focus = {
			x: parseInt(str.substr(0, len), 36),
			y: parseInt(str.substr(len, len), 36)
		}
	}

	function reset() {
		safe = {x: 10, y: 10, width: file.width * scale - 20, height: file.height * scale - 20}
		focus = {x: Math.ceil(file.width * scale / 2), y: Math.ceil(file.height * scale / 2)}
	}

	function mousemove(event) {
		if (event.buttons === 0) dragged = false;
		if (!dragged) return;
		let x = event.clientX - wrapperDiv.getBoundingClientRect().x;
		let y = event.clientY - wrapperDiv.getBoundingClientRect().y;
		switch (dragged) {
			case 'bottomright':
				safe.width = Math.floor(Math.max(10, x - safe.x));
				safe.height = Math.floor(Math.max(10, y - safe.y));
				break;
			case 'topleft':
				safe.x = Math.floor(Math.min(file.width * scale - 10, Math.max(0, x)));
				safe.y = Math.floor(Math.min(file.height * scale - 10, Math.max(0, y)));
				break;
			case 'focus':
				focus.x = Math.floor(Math.min(file.width * scale, Math.max(0, x)));
				focus.y = Math.floor(Math.min(file.height * scale, Math.max(0, y)));
				break;
		}
		focus.x = Math.max(Math.min(focus.x, safe.x + safe.width), safe.x);
		focus.y = Math.max(Math.min(focus.y, safe.y + safe.height), safe.y);
		if ((safe.x + safe.width) > file.width * scale) safe.width = file.width * scale - safe.x;
		if ((safe.y + safe.height) > file.height * scale) safe.height = file.height * scale - safe.y;
	}

	let scale = 1;

	let dragged = null;
	let focusDiv;
	let topleftDiv;
	let bottomrightDiv;
	let wrapperDiv;

	function save() {
		let data = {
			safezone: Math.floor(safe.x / scale).toString(36).padStart(3, '0') + Math.floor(safe.y / scale).toString(36).padStart(3, '0') + Math.floor(safe.width / scale).toString(36).padStart(3, '0') + Math.floor(safe.height / scale).toString(36).padStart(3, '0'),
			focus: Math.floor(focus.x / scale).toString(36).padStart(3, '0') + Math.floor(focus.y / scale).toString(36).padStart(3, '0')
		};
		img.safezone = data.safezone;
		img.focus = data.focus;
		modal.close();
	}

	function imgloaded() {
		scale = wrapperDiv.getBoundingClientRect().width / file.width;
		focus.x *= scale;
		focus.y *= scale;
		safe.x *= scale;
		safe.y *= scale;
		safe.width *= scale;
		safe.height *= scale;
	}

</script>

<Modal liquid>
	<div class="modal-card">
		<header class="modal-card-head p-3 px-4">
			<p class="modal-card-title is-size-6 has-text-weight-bold">Set safe zone & focus</p>
			<button class="delete" aria-label="close" on:click={modal.close}></button>
		</header>
		<main class="modal-card-body has-background-black-bis m-0">
			<div on:mousemove={mousemove} bind:this={wrapperDiv} class="wrapper">
				<img on:load={imgloaded} alt="" draggable="false" class="back" src={file.url}>
				<img alt="" style={"clip: rect(" + safe.y +"px, " + (safe.x + safe.width) +"px, "+(safe.y + safe.height)+"px, "+safe.x+"px)"} draggable="false" class="front" src={file.url}>
				<div class="frame" style={"top:"+safe.y+"px;" + "width:"+safe.width+"px;" + "height:"+safe.height+"px;" + "left:"+safe.x+"px;" }></div>
				<div on:mousedown={()=>dragged = 'topleft'} on:mouseup={()=>dragged=false} class="topleft" bind:this={topleftDiv} style={"top:"+(safe.y - 5)+"px;" + "left:"+(safe.x - 5)+"px;" }></div>
				<div on:mousedown={()=>dragged = 'bottomright'} on:mouseup={()=>dragged=false} class="bottomright" bind:this={bottomrightDiv} style={"top:"+(safe.y + safe.height - 5)+"px;" + "left:"+(safe.x + safe.width-5)+"px;" }></div>
				<div on:mousedown={()=>dragged = 'focus'} on:mouseup={()=>dragged=false} class="focus" bind:this={focusDiv} style={"top:"+(focus.y- 5)+"px;" + "left:"+(focus.x-5)+"px;" }></div>
			</div>
		</main>
		<footer class="modal-card-foot is-justify-content-center p-2">
			<button class="button is-danger is-small" on:click={()=>modal.close()}>Cancel</button>
			<button class="button is-primary is-small" on:click={()=>save()}>OK</button>
		</footer>
	</div>
</Modal>

<style lang="scss">
	@keyframes border-dance {
		0% { border-color: #000;}
		50% { border-color: #fff;}
		100% { border-color: #000;}
	}

	div.wrapper {
		position: relative;
		max-height: calc(100vh - 200px);
		max-width: calc(100vw - 200px);
	}

	img.back {
		background-color: rgba(0, 0, 0, .5);
		max-height: calc(100vh - 200px);
		max-width: calc(100vw - 200px);
		filter: brightness(30%);
		user-select: none;
		display: block;
	}

	img.front {
		display: block;
		user-select: none;
		position: absolute;
		top: 0; left: 0;
		max-height: calc(100vh - 200px);
		max-width: calc(100vw - 200px);
	}
	div.frame {
		position: absolute;
		border-width: 1px;
		border-style: dashed;
		animation: border-dance 1s infinite linear;
	}
	div.topleft, div.bottomright, div.focus {
		width: 10px;
		height: 10px;
		background-color: #ff5900;
		border-radius: 5px;
		position: absolute;
		border-width: 1px;
		border-style: solid;
		animation: border-dance 1s infinite linear;
		cursor: move;
	}
	div.bottomright {
		cursor: nwse-resize;
	}
	div.focus {
		background-color: #00b7ff;
	}


	main {
		background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
		background-size: 20px 20px;
		background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
		padding: 20px;
	}
</style>
