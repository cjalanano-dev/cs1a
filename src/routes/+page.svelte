<script>
	import { onMount, onDestroy } from 'svelte';
	import { announcements } from '$lib/stores';
	import { getClassStatus, isExpired } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { Megaphone, ExternalLink, Mail, Code } from 'lucide-svelte';

	let time = $state(new Date());
	let interval;

	onMount(() => {
		interval = setInterval(() => {
			time = new Date();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	// Derived state
	let status = $derived(getClassStatus(time));
	let urgentAnnouncements = $derived(
		$announcements.filter((a) => a.urgency_level === 'High' && !isExpired(a.expiry_date))
	);
	let activeAnnouncements = $derived($announcements.filter((a) => !isExpired(a.expiry_date)));

	const formatTime = (d) =>
		d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	const formatDate = (d) =>
		d.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<!-- Urgent Ticker -->
{#if urgentAnnouncements.length > 0}
	<div class="relative mb-4 overflow-hidden border-y border-red-900/50 bg-red-950/30">
		<div class="flex animate-[ticker_14s_linear_infinite] gap-16 px-4 whitespace-nowrap">
			{#each urgentAnnouncements as announcement}
				<span class="inline-flex items-center gap-2 font-mono font-bold text-red-400 uppercase">
					<Megaphone class="h-4 w-4" />
					ALERT: {announcement.title} — {announcement.message}
				</span>
			{/each}
			<!-- Duplicate for seamless loop -->
			{#each urgentAnnouncements as announcement}
				<span
					class="inline-flex items-center gap-2 font-mono font-bold text-red-400 uppercase"
					aria-hidden="true"
				>
					<Megaphone class="h-4 w-4" />
					ALERT: {announcement.title} — {announcement.message}
				</span>
			{/each}
		</div>
	</div>
{/if}

<div class="space-y-8">
	<!-- Hero Section -->
	<section class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<Card className="flex flex-col justify-center items-start min-h-[160px]">
			<div class="mb-1 font-mono text-sm text-zinc-500">CURRENT STATUS</div>
			<div class="mb-4 flex items-center gap-3">
				<div class="h-3 w-3 animate-pulse rounded-full bg-accent"></div>
				<h2 class="text-2xl font-bold tracking-tight text-white">{status}</h2>
			</div>
			<div class="mt-auto">
				<div class="font-mono text-4xl font-bold tracking-tighter text-accent md:text-5xl">
					{formatTime(time)}
				</div>
				<div class="mt-1 font-mono text-sm text-zinc-400">{formatDate(time)}</div>
			</div>
		</Card>

		<Card title="Quick Actions">
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-1">
				<QuickLink href="https://classroom.google.com" label="GClass" icon={ExternalLink} />
				<QuickLink href="https://codechum.com" label="CodeChum" icon={Code} />
			</div>
		</Card>
	</section>

	<!-- Announcements Grid -->
	<section>
		<h2 class="mb-4 flex items-center gap-2 font-mono text-xl font-bold text-white">
			<Megaphone class="h-5 w-5 text-accent" />
			Announcements
		</h2>

		{#if activeAnnouncements.length === 0}
			<div class="rounded-lg border border-zinc-800 bg-zinc-900/30 p-8 text-center text-zinc-500">
				No active announcements.
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each activeAnnouncements as item}
					<Card className="h-full flex flex-col">
						<div class="mb-3 flex items-start justify-between">
							<Badge label={item.urgency_level} />
							{#if item.expiry_date}
								<span class="font-mono text-xs text-zinc-500">Exp: {item.expiry_date}</span>
							{/if}
						</div>
						<h3 class="mb-2 text-lg font-bold text-white">{item.title}</h3>
						<p class="flex-1 text-sm text-zinc-400">{item.message}</p>
					</Card>
				{/each}
			</div>
		{/if}
	</section>
</div>
