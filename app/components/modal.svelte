<script>
	export let full = false;
	export let liquid = false;
	let modalTag;
	$: { if (modalTag) document.body.appendChild(modalTag)}
</script>


<div class="modal is-active" class:full class:liquid bind:this={modalTag}>
	<div class="modal-background"></div>
	<div class="modal-content">
		<slot/>
	</div>
</div>

<style lang="scss">
	div.modal-background {
		background-color: #0009 !important;
		backdrop-filter: blur(4px);
	}

	.liquid {
		div.modal-content {
			max-width: calc(100vw - 60px);
			max-height: calc(100vh - 60px);
			width: auto;
			:global(.modal-card) {
				width: auto !important;
				height: 100%;
			}
		}
	}
	.full {
		div.modal-content {
			min-width: calc(100vw - 60px);
			max-width: calc(100vw - 60px);
			height: calc(100vh - 60px);
			width: auto;
			:global(.modal-card) {
				width: auto !important;
				height: 100%;
			}
		}
	}
</style>
