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
	const columns = [
		{ key: 'date', label: 'Date' },
		{ key: 'transaction_name', label: 'Description' },
		{
			key: 'category',
			label: 'Type',
			format: (val) =>
				`<span class="${val === 'Collection' ? 'text-green-400' : 'text-red-400'} font-bold uppercase text-xs">${val}</span>`,
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
					? `<a href="${val}" target="_blank" class="text-accent hover:underline text-xs">View Receipt</a>`
					: '<span class="text-zinc-600 text-xs">N/A</span>',
			html: true
		}
	];
</script>

<div class="space-y-8">
	<header>
		<h1 class="mb-2 font-mono text-3xl font-bold text-white">Class Finances</h1>
		<p class="text-zinc-400">Transparency board for all class funds and expenses.</p>
	</header>

	<!-- Summary Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<Card className="relative overflow-hidden">
			<div class="mb-4 flex items-start justify-between">
				<div class="rounded-lg bg-green-900/30 p-2">
					<ArrowDownLeft class="h-6 w-6 text-green-400" />
				</div>
				<span class="font-mono text-xs text-zinc-500 uppercase">Total In</span>
			</div>
			<div class="font-mono text-3xl font-bold text-white">{formatCurrency(totalCollected)}</div>
			<div class="mt-1 text-sm text-zinc-500">This Semester</div>
		</Card>

		<Card className="relative overflow-hidden">
			<div class="mb-4 flex items-start justify-between">
				<div class="rounded-lg bg-red-900/30 p-2">
					<ArrowUpRight class="h-6 w-6 text-red-400" />
				</div>
				<span class="font-mono text-xs text-zinc-500 uppercase">Total Out</span>
			</div>
			<div class="font-mono text-3xl font-bold text-white">{formatCurrency(totalExpenses)}</div>
			<div class="mt-1 text-sm text-zinc-500">This Semester</div>
		</Card>

		<Card className="relative overflow-hidden border-accent/20">
			<div class="mb-4 flex items-start justify-between">
				<div class="rounded-lg bg-accent/10 p-2">
					<Wallet class="h-6 w-6 text-accent" />
				</div>
				<span class="font-mono text-xs text-zinc-500 uppercase">Current Balance</span>
			</div>
			<div class="font-mono text-4xl font-bold text-accent">{formatCurrency(currentBalance)}</div>
			<div class="mt-1 text-sm text-zinc-500">Cash on Hand</div>
		</Card>
	</div>

	<!-- Ledger Table -->
	<section>
		<h2 class="mb-4 font-mono text-xl font-bold text-white">Transaction Ledger</h2>
		<DataTable data={$financeLedger} {columns} />
	</section>
</div>
