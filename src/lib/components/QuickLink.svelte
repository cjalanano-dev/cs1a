<script>
	import { ExternalLink } from 'lucide-svelte';

	let { href, label, icon: Icon, className = '' } = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-accent/50 hover:bg-zinc-800/80 {className}"
>
	<div class="flex items-center gap-3">
		{#if Icon}
			<Icon class="h-5 w-5 text-zinc-400 transition-colors group-hover:text-accent" />
		{/if}
		<span class="font-mono font-semibold text-zinc-300 transition-colors group-hover:text-white"
			>{label}</span
		>
	</div>
	<ExternalLink class="h-4 w-4 text-zinc-600 transition-colors group-hover:text-accent" />
</a>
