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

<div class="mx-auto max-w-3xl space-y-8">
	<header class="text-center">
		<h1 class="mb-2 font-mono text-3xl font-bold text-white">Academic Calendar</h1>
		<p class="text-zinc-400">Upcoming deadlines, quizzes, and events.</p>
	</header>

	<div class="relative pl-8 md:pl-0">
		<!-- Timeline Vertical Line -->
		<div class="absolute top-0 bottom-0 left-8 w-px -translate-x-1/2 bg-zinc-800 md:left-1/2"></div>

		{#each events as event, i}
			{@const isPast = isExpired(event.date)}
			{@const dateObj = formatDate(event.date)}
			{@const isLeft = i % 2 === 0}

			<div
				class={`relative mb-12 flex flex-col items-center md:flex-row ${isPast ? 'opacity-40 grayscale' : ''}`}
			>
				<!-- Timeline Dot -->
				<div
					class={`
					absolute left-0 z-10 h-4 w-4 -translate-x-[calc(50%-1px)] rounded-full border-4 border-background md:left-1/2 md:-translate-x-1/2
					${isPast ? 'bg-zinc-600' : 'bg-accent shadow-[0_0_10px_rgba(34,197,94,0.5)]'}
				`}
				></div>

				<!-- Date Block (Mobile: Next to content, Desktop: Opposite side) -->
				<div
					class={`hidden w-1/2 flex-col justify-center px-8 md:flex ${isLeft ? 'items-end text-right' : 'order-last items-start text-left'}`}
				>
					<div class="font-mono text-3xl font-bold text-zinc-500">{dateObj.day}</div>
					<div class="font-mono text-sm font-bold text-accent">{dateObj.month}</div>
					<div class="mt-1 text-xs text-zinc-600">{timeUntil(event.date)}</div>
				</div>

				<!-- Content Card -->
				<div class={`w-full pl-8 md:w-1/2 md:px-8 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
					<Card
						className={`p-5 hover:border-accent/30 transition-colors ${isPast ? '' : 'border-zinc-700'}`}
					>
						<div class="mb-2 flex items-center gap-2 font-mono text-xs text-zinc-500 md:hidden">
							<span>{dateObj.month} {dateObj.day}</span> • <span>{timeUntil(event.date)}</span>
						</div>

						<div class="mb-2 flex items-start justify-between gap-3">
							<div class="flex items-center gap-2">
								{#if event.type === 'quiz'}
									<GraduationCap class="h-5 w-5 text-accent" />
								{:else}
									<AlertCircle class="h-5 w-5 text-amber-400" />
								{/if}
								<h3 class="text-lg leading-tight font-bold text-white">{event.title}</h3>
							</div>
							{#if !isPast}
								<Badge label={event.urgency} />
							{/if}
						</div>

						<p class="text-sm text-zinc-400">{event.details}</p>
					</Card>
				</div>
			</div>
		{/each}

		{#if events.length === 0}
			<div class="py-20 text-center">
				<div
					class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900"
				>
					<CheckCircle2 class="h-8 w-8 text-zinc-600" />
				</div>
				<p class="text-zinc-500">No upcoming events found.</p>
			</div>
		{/if}
	</div>
</div>
