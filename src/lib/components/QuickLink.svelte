<script>
	import { ExternalLink } from 'lucide-svelte';

	let { href, label, icon: Icon, className = '' } = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group flex items-center justify-between border border-border bg-surface/20 p-4 transition-colors duration-200 hover:border-zinc-800 hover:bg-zinc-950/20 {className}"
>
	<div class="flex items-center gap-3">
		{#if Icon}
			<Icon class="h-4 w-4 text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300" />
		{/if}
		<span class="font-mono text-xs text-zinc-400 transition-colors duration-200 group-hover:text-zinc-200"
			>{label}</span
		>
	</div>
	<ExternalLink class="h-3 w-3 text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400" />
</a>
