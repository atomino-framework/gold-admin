<script lang="ts">
	import type List from "../list";

	export let item;
	export let list: List;

	let card = list.cardifyItem(item);

</script>

<div class="card p-0 m-0 mb-1 is-clickable" class:inactive={!card.active} on:click={card.click}>

	{#if (card.image)}
		<div class="card-image p-0">
			<figure class="image is-3by1 mx-0">
				<img src={card.image} alt="" loading="lazy">
			</figure>
		</div>
	{/if}

	<div class="card-content p-0">
		<div class="media px-3 pt-3 pb-2 mb-0">
			{#if (card.avatar)}
				<div class="media-left">
					<figure class="image is-48x48 m-0">
						<img src={card.avatar} alt="" loading="lazy">
					</figure>
				</div>
			{/if}

			<div class="media-content">
				<div class="is-size-7 has-text-weight-bold has-text-white">{card.title}</div>
				<div class="card-subtitle">id: {card.id}</div>
				{#if (card.subtitle)}
					<div class="card-subtitle">{card.subtitle}</div>
				{/if}
			</div>
		</div>

		{#if (card.properties)}
			<div class="content p-0  pb-2 mb-0">
				<table class="table is-fullwidth is-size-7">
					{#each card.properties as property (property.label)}
						<tr>
							<td>{property.label}</td>
							<td>{property.value}</td>
						</tr>
					{/each}
				</table>
			</div>
		{/if}

		{#if card.buttons && card.buttons.length}
			<footer class="card-footer is-size-7">
				{#each card.buttons as button}
					<a href="#" class="card-footer-item p-2" on:click|stopPropagation={button.action}>
						{#if typeof button.label === "string"}
							{button.label}
						{:else }
							<i class={button.label}></i>
						{/if}
					</a>
				{/each}
			</footer>
		{/if}
	</div>
</div>

<style lang="scss">
	.card:not(.inactive){
		opacity:.8;
	}
	.card.inactive {
		opacity: .6;
	}
	.card-subtitle {
		font-size: 11px;
	}

	table.table td {
		border: 0;
		border-top: 1px dotted #333;
		padding: 0.125rem 0.75rem;
		font-size: 11px;
		&:last-child {
			font-weight: bold;
		}
	}
</style>
