<script lang="ts">
	import type Page from "../../form/form-page";
	import marked from "marked"
	import Control from "./control"

	export let page: Page;

	export let control: Control;
	export let item;
	export let onChange: Function;

	let code = control.code;
	let markdown = control.markdown;

	/* Handle tab key */
	function keydown(event) {
		let input = event.target;
		if (event.keyCode === 9) {
			let v = input.value;
			let s = input.selectionStart
			let e = input.selectionEnd;
			input.value = v.substring(0, s) + "\t" + v.substring(e);
			input.selectionStart = input.selectionEnd = s + 1;
			event.preventDefault();
		}
	}
</script>

{#if markdown}
	<div class="columns m-0">
		<div class="column p-0 pr-1">
			<div class="is-size-7 growing" class:code data-replicated-value={$item[control.field]}>
				<textarea class="textarea is-size-7 has-fixed-size" class:code on:change={onChange} on:keydown={keydown} bind:value={$item[control.field]}></textarea>
			</div>
		</div>
		<div class="column p-0">
			<div class="card is-size-7 p-3">
				{@html marked(typeof $item[control.field] === 'string' ?  $item[control.field] : '')}
			</div>
		</div>
	</div>
{:else }
	<div class="is-size-7 growing" class:code data-replicated-value={$item[control.field]}>
		<textarea class="textarea is-size-7 has-fixed-size" class:code on:change={onChange} on:keydown={keydown} bind:value={$item[control.field]}></textarea>
	</div>
{/if}

<style lang="scss">
	div.growing {
		display: grid;
		white-space: pre-wrap;
		width: 100%;
		min-height: 140px;
		&::after {
			content: attr(data-replicated-value) " ";
			white-space: pre-wrap;
			border: 1px;
			padding: calc(0.75em - 1px);
			visibility: hidden;
		}
	}
	textarea.textarea.code,
	div.growing.code::after {
		font-family: "Courier New", monospace !important;
		tab-size: 3;
		font-weight: 600;
		font-size: 13px !important;
	}
	div.growing::after,
	textarea {
		grid-area: 1 / 1 / 2 / 2;
		line-height: 20px;
		font-weight: 400;
		min-height: 100% !important;
	}
</style>
