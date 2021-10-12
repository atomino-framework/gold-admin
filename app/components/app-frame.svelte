<script lang="ts">
	import type I_AuthApi from "../../auth/auth-api.interface";
	import modalManager from "../modal-manager";
	import MenuItem from "../menu-item";
	import type ListManager from "../list-manager";
	import type PageManager from "../page-manager";
	import Header from "./header.svelte";
	import ListContainer from "./list-container.svelte";
	import TabContainer from "./tab-container.svelte";
	import PageContainer from "./page-container.svelte"

	export let pageManager:PageManager;
	export let listManager:ListManager;
	export let menu: Array<MenuItem>;
	export let authApi:I_AuthApi;

	let modals = modalManager.modals;
</script>

<Header menu={menu} authApi={authApi}/>

<div class="columns m-1">
	<ListContainer listManager={listManager}/>

	<div class="column p-0 m-1 sticky-grid">
		<div class="box p-0">
			<div class="header box p-0 mb-0 is-clipped">
				<TabContainer pages={pageManager.$pages} active={pageManager.$active} onSelect={(page)=>pageManager.add(page)} onClose={(page)=>pageManager.remove(page)}/>
			</div>
			<div class="content p-1">
				<PageContainer pages={pageManager.$pages} active={pageManager.$active}/>
			</div>
		</div>
	</div>
</div>

{#each $modals as modal (modal.id)}
	<svelte:component this={modal.component} {...modal.props}/>
{/each}
