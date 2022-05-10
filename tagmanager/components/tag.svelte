<script lang="ts">
	export let tag:string;
	export let rename:(tag:string, to:string)=>void;
	export let remove:(tag:string)=>void;
	let original = tag;
	let showInput = false;
	$: canBeRenamed = original !== tag && tag.trim() !== "";
</script>

<div class="field is-small has-addons my-1">
	<div class="control">
		<a class="button is-small has-text-info has-background-black" on:click={()=>showInput=true}>
			<i class="fas fa-pen"></i>
		</a>
	</div>
	<div class="control">
		<a class="button is-small has-text-danger has-background-black" on:click={()=>remove(original)}>
			<i class="fas fa-trash"></i>
		</a>
	</div>
	<div class="control">
		<a class="button is-small has-background-black is-static">
			{original}
		</a>
	</div>
	<input class:is-hidden={!showInput} class="is-small input" type="text" bind:value={tag}>
	<div class="control" class:is-hidden={(!showInput || !canBeRenamed)}>
		<a class="button is-small has-text-primary has-background-black" on:click={()=>rename(original, tag)}>
			<i class="fas fa-check"></i>
		</a>
	</div>
	<div class="control" class:is-hidden={!showInput}>
		<a class="button is-small has-text-warning has-background-black" on:click={()=>showInput = false}>
			<i class="fas fa-times"></i>
		</a>
	</div>
</div>