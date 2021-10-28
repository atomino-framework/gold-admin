<script lang="ts">
	import type List from "..//list";
	import options from "../options";

	export let list: List;
	let count = list.$count;
	let page = list.$page;
</script>

<div class="footer box p-1 m-0 has-background-black has-text-white-bis  is-size-7">
	<!-- region: PAGING -->
	<div class="field is-fullwidth is-grouped">
		<div class="control ">
			<button disabled class="button is-small">
				<b>{$count}</b>&nbsp;items on&nbsp; <b>{Math.ceil($count / list.options.pagesize)}</b>&nbsp;pages
			</button>
		</div>
		<div class="control">
			<a class="button is-info is-small" on:click={()=>{if($page>1){$page--;list.reload()}}}>
				{@html options.pager.left.icon.tag}
			</a>
		</div>
		<div class="control is-expanded">
			<input class="has-text-centered input is-size-7" placeholder="page" bind:value={$page} on:keyup={()=>list.reload()}/>
		</div>
		<div class="control">
			<a class="button is-info is-small" on:click={()=>{$page++;list.reload()}}>
				{@html options.pager.right.icon.tag}
			</a>
		</div>
	</div>
	<!-- endregion -->
</div>
