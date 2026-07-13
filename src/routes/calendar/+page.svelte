<script>
	import { announcements, academics } from '$lib/stores';
	import { isExpired, timeUntil } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { CalendarClock, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-svelte';

	// Merge and sort events
	let events = $derived(
		[
			...$announcements
				.filter((a) => a.expiry_date)
				.map((a) => ({
					type: 'announcement',
					date: a.expiry_date,
					title: a.title,
					details: a.message,
					urgency: a.urgency_level,
					id: a.id
				})),
			...$academics
				.filter((s) => s.next_quiz_date)
				.map((s) => ({
					type: 'quiz',
					date: s.next_quiz_date,
					title: `${s.subject_code} Quiz`,
					details: `Prof. ${s.professor}`,
					urgency: 'High',
					id: s.subject_code
				}))
		].sort((a, b) => new Date(a.date) - new Date(b.date))
	);

	const formatDate = (dateStr) => {
		const d = new Date(dateStr);
		return {
			day: d.getDate(),
			month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
			full: d.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		};
	};
</script>

<div class="mx-auto max-w-3xl space-y-10">
	<header class="border-b border-border/60 pb-4 text-center md:text-left">
		<h1 class="font-mono text-xl font-bold text-text-main tracking-wider uppercase">Academic Calendar</h1>
		<p class="text-xs text-text-muted font-mono mt-1.5 uppercase tracking-wider">Upcoming deadlines, quizzes, and class events</p>
	</header>

	<div class="relative pl-8 md:pl-0">
		<!-- Timeline Vertical Line -->
		<div class="absolute top-0 bottom-0 left-8 w-[1px] -translate-x-1/2 bg-border md:left-1/2"></div>

		{#each events as event, i}
			{@const isPast = isExpired(event.date)}
			{@const dateObj = formatDate(event.date)}
			{@const isLeft = i % 2 === 0}

			<div
				class={`relative mb-10 flex flex-col items-center md:flex-row ${isPast ? 'opacity-35 grayscale' : ''}`}
			>
				<!-- Timeline Dot -->
				<div
					class={`
					absolute left-0 z-10 h-3.5 w-3.5 -translate-x-[calc(50%-1px)] rounded-full border-2 border-background md:left-1/2 md:-translate-x-1/2
					${isPast ? 'bg-zinc-700' : 'bg-accent shadow-[0_0_8px_rgba(59,130,246,0.6)]'}
				`}
				></div>

				<!-- Date Block (Mobile: Next to content, Desktop: Opposite side) -->
				<div
					class={`hidden w-1/2 flex-col justify-center px-8 md:flex ${isLeft ? 'items-end text-right' : 'order-last items-start text-left'}`}
				>
					<div class="font-mono text-2xl font-bold text-text-muted">{dateObj.day}</div>
					<div class="font-mono text-[10px] font-bold text-accent uppercase tracking-wider">{dateObj.month}</div>
					<div class="mt-1 text-[10px] font-mono text-text-muted">{timeUntil(event.date)}</div>
				</div>

				<!-- Content Card -->
				<div class={`w-full pl-8 md:w-1/2 md:px-8 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
					<Card
						className={`p-5 border border-border/80 ${isPast ? 'border-border/40' : 'hover:border-accent/30'}`}
					>
						<div class="mb-2.5 flex items-center gap-2 font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider md:hidden">
							<span>{dateObj.month} {dateObj.day}</span> • <span>{timeUntil(event.date)}</span>
						</div>

						<div class="mb-2.5 flex items-start justify-between gap-3">
							<div class="flex items-center gap-2.5">
								{#if event.type === 'quiz'}
									<GraduationCap class="h-4.5 w-4.5 text-accent" />
								{:else}
									<AlertCircle class="h-4.5 w-4.5 text-amber-500" />
								{/if}
								<h3 class="text-sm font-bold text-text-main tracking-tight leading-snug">{event.title}</h3>
							</div>
							{#if !isPast}
								<Badge label={event.urgency} />
							{/if}
						</div>

						<p class="text-xs text-text-muted leading-relaxed font-light">{event.details}</p>
					</Card>
				</div>
			</div>
		{/each}

		{#if events.length === 0}
			<div class="py-20 text-center">
				<div
					class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900/60 border border-border"
				>
					<CheckCircle2 class="h-6 w-6 text-zinc-500" />
				</div>
				<p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">No upcoming events found</p>
			</div>
		{/if}
	</div>
</div>
