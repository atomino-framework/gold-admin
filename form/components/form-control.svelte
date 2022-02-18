<script lang="ts">
	import type EntityPage from "../form-page";
	import type {Writable} from "svelte/store";
	import AbstractControl from "../../form-input/abstract-control";
	import {Notification} from "svelma";

	export let item;
	export let page: EntityPage;
	export let control: AbstractControl;
	export let onChange: Function;
	export let errors: Writable<Array<any>>;
</script>

<div class="field">
	<div class="field-input layout-{control.layout}">
		<label class="label is-small has-text-primary-dark">{control.label}</label>
		<div>
			<svelte:component item={item} this={control.component} control={control} onChange={onChange} page={page}/>
		</div>
	</div>
	{#each $errors as error}
		{#if error.field === control.field}
			<Notification type="is-danger">
				{error.message}
			</Notification>
		{/if}
	{/each}
</div>

<style lang="scss">
	:global(.layout-column){
		flex-direction: column;
	}
	:global(.layout-row){
		flex-direction: row;
		align-items: center;
		>label{
			margin:0;
		}
		>div{
			flex-grow:1
		}
	}
	.field-input {
		display: flex;
		label {
			width: 140px;
			flex-shrink: 0;
		}
	}
	.field:not(:last-child) {
		padding-bottom: 6px;
		margin-bottom: 6px;
		border-bottom: 1px dotted #fff2;
		:global(.notification) {
			margin-bottom: 3px;
		}
	}
</style>
