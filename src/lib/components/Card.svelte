<script>
	let { title, children, className = '' } = $props();
</script>

<div class="glass-panel group relative overflow-hidden rounded-lg p-6 {className}">
	<!-- Subtle Glow Effect -->
	<div
		class="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50 transition-opacity group-hover:opacity-100"
	></div>

	{#if title}
		<h3 class="mb-4 font-mono text-xl font-bold tracking-wider text-accent uppercase">{title}</h3>
	{/if}

	<div class="relative z-10">
		{@render children()}
	</div>
</div>
