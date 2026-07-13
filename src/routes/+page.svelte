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
	<div class="relative mb-6 overflow-hidden rounded-xl border border-red-500/20 bg-red-500/5 py-3 shadow-[0_0_15px_rgba(239,68,68,0.02)]">
		<div class="flex animate-[ticker_20s_linear_infinite] gap-16 px-4 whitespace-nowrap">
			{#each urgentAnnouncements as announcement}
				<span class="inline-flex items-center gap-2 font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
					<Megaphone size={14} class="text-red-400" />
					ALERT: {announcement.title} — {announcement.message}
				</span>
			{/each}
			<!-- Duplicate for seamless loop -->
			{#each urgentAnnouncements as announcement}
				<span
					class="inline-flex items-center gap-2 font-mono text-xs font-bold text-red-400 uppercase tracking-wider"
					aria-hidden="true"
				>
					<Megaphone size={14} class="text-red-400" />
					ALERT: {announcement.title} — {announcement.message}
				</span>
			{/each}
		</div>
	</div>
{/if}

<div class="space-y-10">
	<!-- Hero Section -->
	<section class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<Card className="md:col-span-2 flex flex-col justify-between min-h-[200px] p-8">
			<div>
				<div class="mb-2 font-mono text-[10px] font-bold tracking-widest text-text-muted uppercase">Current Status</div>
				<div class="flex items-center gap-2.5">
					<span class="relative flex h-2.5 w-2.5">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
					</span>
					<h2 class="text-xl font-bold tracking-tight text-text-main">{status}</h2>
				</div>
			</div>
			<div class="mt-8">
				<div class="font-mono text-5xl font-extrabold tracking-tighter text-text-main md:text-6xl text-gradient">
					{formatTime(time)}
				</div>
				<div class="mt-2 font-mono text-xs text-text-muted tracking-wide">{formatDate(time)}</div>
			</div>
		</Card>

		<Card title="Quick Actions" className="flex flex-col justify-between min-h-[200px]">
			<div class="space-y-3 mt-1 flex-1 flex flex-col justify-center">
				<QuickLink href="https://classroom.google.com" label="Google Classroom" icon={ExternalLink} />
				<QuickLink href="https://codechum.com" label="CodeChum Portal" icon={Code} />
			</div>
		</Card>
	</section>

	<!-- Announcements Grid -->
	<section>
		<div class="mb-6 flex items-center justify-between border-b border-border/60 pb-3">
			<h2 class="flex items-center gap-2.5 font-mono text-sm font-bold tracking-wider text-text-main uppercase">
				<Megaphone class="h-4.5 w-4.5 text-accent" />
				Announcements
			</h2>
			<span class="font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider">{activeAnnouncements.length} Active</span>
		</div>

		{#if activeAnnouncements.length === 0}
			<div class="rounded-xl border border-border bg-surface/20 py-16 text-center">
				<p class="font-mono text-xs text-text-muted uppercase tracking-widest">No active announcements</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each activeAnnouncements as item}
					<Card className="h-full flex flex-col justify-between border border-border/80">
						<div>
							<div class="mb-4 flex items-center justify-between">
								<Badge label={item.urgency_level} />
								{#if item.expiry_date}
									<span class="font-mono text-[10px] text-text-muted font-medium">Exp: {item.expiry_date}</span>
								{/if}
							</div>
							<h3 class="mb-2 text-base font-bold text-text-main tracking-tight leading-snug">{item.title}</h3>
							<p class="text-xs text-text-muted leading-relaxed font-light">{item.message}</p>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</section>
</div>
