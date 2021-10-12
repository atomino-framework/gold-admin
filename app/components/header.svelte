<script lang="ts">
	import type I_AuthApi from "../../auth/auth-api.interface";
	import MenuItem from "../menu-item";
	import options from "../options";
	import user from "../../auth/user"

	export let menu: Array<MenuItem>;
	export let authApi: I_AuthApi;
	function logout() { authApi.logout();}
</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<img src={options.logo.imageUrl} width="112" height="28">
		</a>
	</div>

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
			<div class="navbar-item">
				<div class="pr-2">
					{$user.name}
				</div>
				<div class="buttons">
					<a class="button is-light is-small is-inverted is-rounded has-text-danger" on:click={()=>logout()}> {@html options.logout.icon.Icon} </a>
				</div>
			</div>
		</div>
	</div>
</nav>
