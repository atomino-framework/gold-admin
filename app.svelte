<script lang="ts">
	import {get} from "svelte/store";

	import AppFrame from "./app/components/app-frame.svelte";
	import ListManager from "./app/list-manager";
	import MenuItem from "./app/menu-item";
	import PageManager from "./app/page-manager";
	import type I_AuthApi from "./auth/auth-api.interface";
	import Login from "./auth/components/login.svelte";
	import user from "./auth/user";
	import type I_User from "./auth/user.interface";
	import Favicon from "./favicon"
	import options from "./options";

	export let pageManager: PageManager;
	export let listManager: ListManager;
	export let authApi: I_AuthApi;
	export let menu:  ((user: I_User | null) => Array<MenuItem>) | Array<MenuItem> = [];
	export let userMenu: ((user: I_User | null) => Array<MenuItem>) | Array<MenuItem> = [];

	pageManager.listManager = listManager;
	listManager.pageManager = pageManager;

	window.document.title = options.app.title;
	if (options.app.favicon !== "") {
		Favicon.replace(options.app.favicon);
	}
	window.document.body.style.backgroundColor = options.app.background.color;
	window.document.body.style.backgroundImage = 'url("' + options.app.background.imageUrl + '")';

	let auth = authApi.get();
</script>

{#await auth}
{:then r}
	{#if $user === null}
		<Login authApi={authApi}/>
	{:else}
		<AppFrame pageManager={pageManager} listManager={listManager} menu={typeof menu === 'function' ? menu(get(user)) : menu} userMenu={typeof userMenu === 'function' ? userMenu(get(user)) : userMenu} authApi={authApi}/>
	{/if}
{/await}

<style lang="scss" global>
	@import "@fortawesome/fontawesome-free/scss/variables";
	$fa-font-path: "/~fonts/fontawesome-free";
	@import "@fortawesome/fontawesome-free/scss/brands";
	@import "@fortawesome/fontawesome-free/scss/solid";
	@import "@fortawesome/fontawesome-free/scss/fontawesome";

	@import "@creativebulma/bulma-divider/dist/bulma-divider.css";
	@import "bulma/bulma";
	//@import "bulma-prefers-dark/bulma-prefers-dark.sass";

	@import "bulma-prefers-dark/sass/utilities/_all";
	//+prefers-scheme(dark)
	@import "bulma-prefers-dark/sass/base/_all";
	@import "bulma-prefers-dark/sass/elements/_all";
	@import "bulma-prefers-dark/sass/components/_all";
	@import "bulma-prefers-dark/sass/layout/_all";


	@import "font-awesome-animation/css/font-awesome-animation.css";

	* { font-smoothing: antialiased;}

	body {
		background-image: none;
		background-size: cover;
		background-attachment: fixed;
	}
	html {
		height: 100%
	}
	html, body {
		min-height: 100%;
	}
	.border-0 {border: 0 !important;}
	.sticky-grid { height: calc(100vh - 72px);
		> .box {
			background-color: #0006; display: grid; height: 100%;
			grid-template-rows: auto 1fr;
			> .header {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
				z-index: 2;
			}
			> .content {
				overflow: auto;
				z-index: 1;
				backdrop-filter: blur(3px);
			}
			> .footer {
				border-top-right-radius: 0;
				border-top-left-radius: 0;
				z-index: 2;
			}
		}
	}
	article.notification {
		padding: 8px 30px 8px 8px;
		font-size: 12px;
		font-weight: bold;
	}
</style>
