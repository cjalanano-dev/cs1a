<script>
	import { clsx } from 'clsx';
	import { twMerge } from 'tailwind-merge';

	let { label, variant = 'default', className = '' } = $props();

	const variants = {
		default: 'bg-zinc-900/60 text-zinc-400 border-zinc-800',
		high: 'bg-red-500/5 text-red-400 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.04)]',
		medium: 'bg-amber-500/5 text-amber-400 border-amber-500/20',
		low: 'bg-blue-500/5 text-blue-400 border-blue-500/20',
		success: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
	};

	// Map urgency string to variant if needed
	const getVariant = (l) => {
		if (!l) return 'default';
		const lower = l.toLowerCase();
		if (lower.includes('high') || lower.includes('urgent')) return 'high';
		if (lower.includes('medium')) return 'medium';
		if (lower.includes('low')) return 'low';
		if (lower.includes('session') || lower.includes('collection')) return 'success';
		return 'default';
	};

	let computedVariant = $derived(
		variants[variant] || variants[getVariant(label)] || variants['default']
	);
</script>

<span
	class={twMerge(
		'inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200',
		computedVariant,
		className
	)}
>
	{label}
</span>
