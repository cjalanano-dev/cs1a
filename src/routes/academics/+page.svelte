<script>
	import { academics } from '$lib/stores';
	import { timeUntil } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { BookOpen, FolderOpen, User, CalendarClock } from 'lucide-svelte';
</script>

<div class="space-y-8">
	<header>
		<h1 class="mb-2 font-mono text-3xl font-bold text-white">Academic Hub</h1>
		<p class="text-zinc-400">Subject resources, syllabi, and reviewers.</p>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each $academics as subject}
			<Card className="h-full flex flex-col relative group overflow-hidden">
				<!-- Subject Header -->
				<div class="mb-4 flex items-start justify-between">
					<div>
						<h2 class="text-2xl font-bold tracking-tight text-white">{subject.subject_code}</h2>
						<div class="mt-1 flex items-center gap-2 text-sm text-zinc-400">
							<User class="h-4 w-4" />
							<span>{subject.professor}</span>
						</div>
					</div>
					<div class="rounded-lg bg-zinc-800/50 p-2 transition-colors group-hover:bg-accent/10">
						<BookOpen class="h-6 w-6 text-zinc-500 transition-colors group-hover:text-accent" />
					</div>
				</div>

				<!-- Next Quiz Countdown -->
				{#if subject.next_quiz_date}
					<div
						class="mb-6 flex items-center gap-3 rounded-lg border border-zinc-700/50 bg-zinc-900/50 p-3"
					>
						<CalendarClock class="h-5 w-5 text-accent" />
						<div>
							<div class="font-mono text-xs text-zinc-500 uppercase">Next Quiz</div>
							<div class="text-sm font-bold text-white">
								{subject.next_quiz_date}
								<span class="text-accent">({timeUntil(subject.next_quiz_date)})</span>
							</div>
						</div>
					</div>
				{/if}

				<!-- Resources Buttons -->
				<div class="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
					<QuickLink
						href={subject.drive_link_reviewers}
						label="Subject Resources"
						icon={FolderOpen}
						className="justify-center bg-zinc-800 hover:bg-zinc-700 text-xs"
					/>
					<QuickLink
						href={subject.syllabus_link || '#'}
						label="View Syllabus"
						icon={BookOpen}
						className="justify-center bg-zinc-800 hover:bg-zinc-700 text-xs"
					/>
				</div>
			</Card>
		{/each}
	</div>
</div>
