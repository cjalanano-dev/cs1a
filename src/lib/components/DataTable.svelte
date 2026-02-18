<script>
	/**
	 * @typedef {Object} Column
	 * @property {string} key - The key in the data object
	 * @property {string} label - The header label
	 * @property {Function} [format] - Optional formatter function
	 * @property {boolean} [html] - If true, render as HTML
	 */

	/** @type {{ data: any[], columns: Column[] }} */
	let { data, columns } = $props();
</script>

<div class="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/30">
	<table class="w-full text-left text-sm">
		<thead class="bg-zinc-900/80 font-mono text-xs text-zinc-400 uppercase">
			<tr>
				{#each columns as col}
					<th class="px-6 py-4 font-medium whitespace-nowrap">{col.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-zinc-800">
			{#if data.length === 0}
				<tr>
					<td colspan={columns.length} class="px-6 py-8 text-center text-zinc-500 italic">
						No data available
					</td>
				</tr>
			{:else}
				{#each data as row}
					<tr class="transition-colors hover:bg-zinc-800/30">
						{#each columns as col}
							<td class="px-6 py-4 whitespace-nowrap text-zinc-300">
								{#if col.format}
									{@html col.html ? col.format(row[col.key]) : col.format(row[col.key])}
								{:else}
									{row[col.key]}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
