<script>
	import { clsx } from 'clsx';
	import { twMerge } from 'tailwind-merge';

	let { label, variant = 'default', className = '' } = $props();

	const variants = {
		default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
		high: 'bg-red-950/50 text-red-400 border-red-900 animate-pulse',
		medium: 'bg-amber-950/50 text-amber-400 border-amber-900',
		low: 'bg-emerald-950/50 text-emerald-400 border-emerald-900',
		success: 'bg-green-950/50 text-green-400 border-green-900'
	};

	// Map urgency string to variant if needed
	const getVariant = (l) => {
		if (!l) return 'default';
		const lower = l.toLowerCase();
		if (lower.includes('high') || lower.includes('urgent')) return 'high';
		if (lower.includes('medium')) return 'medium';
		if (lower.includes('low')) return 'low';
		if (lower.includes('session')) return 'success';
		return 'default';
	};

	let computedVariant = $derived(
		variants[variant] || variants[getVariant(label)] || variants['default']
	);
</script>

<span
	class={twMerge(
		'rounded border px-2 py-1 font-mono text-xs font-bold tracking-wide uppercase',
		computedVariant,
		className
	)}
>
	{label}
</span>
