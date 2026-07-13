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

<div class="w-full overflow-x-auto rounded-xl border border-border bg-surface/20 shadow-sm">
	<table class="w-full text-left text-xs">
		<thead class="bg-surface/50 border-b border-border font-mono text-[10px] text-zinc-400 tracking-wider uppercase">
			<tr>
				{#each columns as col}
					<th class="px-6 py-4.5 font-semibold whitespace-nowrap">{col.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-border/60">
			{#if data.length === 0}
				<tr>
					<td colspan={columns.length} class="px-6 py-10 text-center text-zinc-500 italic">
						No data available
					</td>
				</tr>
			{:else}
				{#each data as row}
					<tr class="transition-colors duration-250 hover:bg-zinc-800/15">
						{#each columns as col}
							<td class="px-6 py-4 whitespace-nowrap text-zinc-300 font-mono">
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
