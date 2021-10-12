<script lang="ts">
	import type I_AuthApi from "../auth-api.interface";
	import options from "../options";

	let login:string = '';
	let password:string = '';
	export let authApi:I_AuthApi;

	function auth(){
		authApi.login(login, password);
	}

</script>

<section class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-5-tablet is-4-desktop is-3-widescreen">
					<form action="" class="box" on:submit|preventDefault={()=>auth()}>
						<div class="is-size-7 has-text-weight-bold has-text-centered mb-4">{options.title}</div>
						<div class="field">
							<div class="control has-icons-left is-size-7 ">
								<input type="text" placeholder={options.input.login.placeholder} class="input is-size-7 " required bind:value={login}>
								<span class="icon is-small is-left">{@html options.input.login.icon.tag}</span>
							</div>
						</div>
						<div class="field">
							<div class="control has-icons-left is-size-7 ">
								<input type="password" placeholder={options.input.password.placeholder} class="input is-size-7 "  required bind:value={password}>
								<span class="icon is-small is-left">{@html options.input.password.icon.tag}</span>
							</div>
						</div>
						<div class="field">
							<button class="is-size-7 button is-fullwidth is-success">{options.button.login.text}</button>
						</div>
						<div class="is-size-7 has-text-centered">
							<b>GoldAdmin v1.1</b><br>
							Copyright © 2021 Gergely Laborci
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
