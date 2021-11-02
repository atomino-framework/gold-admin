<script lang="ts">
	import type I_AuthApi from "../../auth/auth-api.interface";
	import user from "../../auth/user"
	import FaIcon from "../../fa-icon";
	import MenuItem from "../menu-item";
	import options from "../options";

	export let menu: Array<MenuItem>;
	export let userMenu: Array<MenuItem>;
	export let authApi: I_AuthApi;
	function logout() { authApi.logout();}
</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
	{#if options.favicon}
		<div class="navbar-brand">
			<span class="navbar-item" href="/">
				<span class="image mr-2">
					<img src={options.favicon} width="28" height="28" alt={options.title}>
				</span>
				<span class="is-size-7 has-text-weight-bold has-text-white	">
					{options.title}
				</span>
			</span>
		</div>
	{/if}

	<div id="navbarBasicExample" class="navbar-menu is-size-7">
		<div class="navbar-start">



			{#each menu as menuItem}
				{#if menuItem.role === null || $user.roles.filter(value => menuItem.role.includes(value)).length}
					{#if typeof menuItem.action === "function"}
						<a class="navbar-item" on:click={menuItem.action}>
							{#if menuItem.icon}
								{@html menuItem.icon.Icon}
							{/if}
							<span>{menuItem.label}</span>
						</a>
					{:else }
						<div class="navbar-item has-dropdown is-hoverable">
							<a class="navbar-link">
								{#if menuItem.icon}
									{@html menuItem.icon.Icon}
								{/if}
								<span>{menuItem.label}</span>
							</a>
							<div class="navbar-dropdown">
								{#each menuItem.action as menuItem}
									{#if menuItem.role === null || $user.roles.filter(value => menuItem.role.includes(value)).length}
										<a class="navbar-item is-size-7" on:click={menuItem.action}>
											{#if menuItem.icon}
												{@html menuItem.icon.Icon}
											{/if}
											<span>{menuItem.label}</span>
										</a>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				{/if}
			{/each}
		</div>

		<div class="navbar-end">
			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link">
					{#if $user.avatar}
						<figure class="image is-24x24 mr-2">
							<img class="is-rounded" alt={$user.name} src={$user.avatar}>
						</figure>
					{:else }
						{@html options.user.icon.Icon}
					{/if}
					<span>{$user.name}</span>
				</a>
				<div class="navbar-dropdown">
					{#each userMenu as menuItem}
						{#if menuItem.role === null || $user.roles.filter(value => menuItem.role.includes(value)).length}
							<a class="navbar-item is-size-7" on:click={menuItem.action}>
								{#if menuItem.icon}
									{@html menuItem.icon.Icon}
								{/if}
								<span>{menuItem.label}</span>
							</a>
						{/if}
					{/each}
					<a class="navbar-item is-size-7" on:click={logout}>
						{@html options.logout.icon.Icon}
						<span>Log out</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>
