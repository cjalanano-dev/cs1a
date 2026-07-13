<script>
	let { title, children, className = '' } = $props();
</script>

<div class="border border-border bg-surface/30 p-6 transition-colors duration-200 hover:border-zinc-800 {className}">
	{#if title}
		<h3 class="mb-5 font-mono text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{title}</h3>
	{/if}

	<div class="w-full">
		{@render children()}
	</div>
</div>
