<script>
	import { financeLedger } from '$lib/stores';
	import { formatCurrency } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-svelte';

	// Derived statistics
	let totalCollected = $derived(
		$financeLedger
			.filter((t) => t.category === 'Collection')
			.reduce((sum, t) => sum + Number(t.amount), 0)
	);

	let totalExpenses = $derived(
		$financeLedger
			.filter((t) => t.category === 'Expense')
			.reduce((sum, t) => sum + Number(t.amount), 0)
	);

	let currentBalance = $derived(totalCollected - totalExpenses);

	// Table Configuration
	// Table Configuration
	const columns = [
		{ key: 'date', label: 'Date' },
		{ key: 'transaction_name', label: 'Description' },
		{
			key: 'category',
			label: 'Type',
			format: (val) =>
				`<span class="${val === 'Collection' ? 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5' : 'text-red-400 border-red-500/10 bg-red-500/5'} border rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase">${val}</span>`,
			html: true
		},
		{
			key: 'amount',
			label: 'Amount',
			format: (val) => formatCurrency(val)
		},
		{
			key: 'receipt_url',
			label: 'Proof',
			format: (val) =>
				val && val !== '#'
					? `<a href="${val}" target="_blank" class="text-accent hover:underline text-[10px] font-bold tracking-wider uppercase">View Receipt</a>`
					: '<span class="text-zinc-600 text-[10px] font-bold tracking-wider uppercase">N/A</span>',
			html: true
		}
	];
</script>

<div class="space-y-10">
	<header class="border-b border-border/60 pb-4">
		<h1 class="font-mono text-xl font-bold text-text-main tracking-wider uppercase">Class Finances</h1>
		<p class="text-xs text-text-muted font-mono mt-1.5 uppercase tracking-wider">Transparency board for all class funds and expenses</p>
	</header>

	<!-- Summary Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<Card className="relative overflow-hidden border border-border/80 p-6 flex flex-col justify-between">
			<div class="mb-6 flex items-start justify-between">
				<div class="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-2.5">
					<ArrowDownLeft class="h-5 w-5 text-emerald-400" />
				</div>
				<span class="font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider">Total In</span>
			</div>
			<div>
				<div class="font-mono text-2xl font-bold text-text-main tracking-tight">{formatCurrency(totalCollected)}</div>
				<div class="mt-1 text-[10px] font-mono text-text-muted uppercase tracking-wider">Current Semester</div>
			</div>
		</Card>

		<Card className="relative overflow-hidden border border-border/80 p-6 flex flex-col justify-between">
			<div class="mb-6 flex items-start justify-between">
				<div class="rounded-xl border border-red-500/15 bg-red-500/5 p-2.5">
					<ArrowUpRight class="h-5 w-5 text-red-400" />
				</div>
				<span class="font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider">Total Out</span>
			</div>
			<div>
				<div class="font-mono text-2xl font-bold text-text-main tracking-tight">{formatCurrency(totalExpenses)}</div>
				<div class="mt-1 text-[10px] font-mono text-text-muted uppercase tracking-wider">Current Semester</div>
			</div>
		</Card>

		<Card className="relative overflow-hidden border border-accent/20 p-6 flex flex-col justify-between">
			<div class="mb-6 flex items-start justify-between">
				<div class="rounded-xl border border-accent/20 bg-accent/5 p-2.5 animate-pulse">
					<Wallet class="h-5 w-5 text-accent" />
				</div>
				<span class="font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider">Current Balance</span>
			</div>
			<div>
				<div class="font-mono text-3xl font-extrabold text-accent tracking-tight">{formatCurrency(currentBalance)}</div>
				<div class="mt-1 text-[10px] font-mono text-text-muted uppercase tracking-wider">Cash on Hand</div>
			</div>
		</Card>
	</div>

	<!-- Ledger Table -->
	<section class="space-y-4">
		<h2 class="font-mono text-xs font-bold text-text-muted uppercase tracking-widest">Transaction Ledger</h2>
		<DataTable data={$financeLedger} {columns} />
	</section>
</div>
