<script>
	import Card from '$lib/components/Card.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { timeUntil } from '$lib/utils';
	import {
		BookOpen,
		FolderOpen,
		User,
		CalendarClock,
		MoreVertical,
		ChevronDown,
		ChevronUp
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let { subject } = $props();
	let isOpen = $state(false);

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<Card className="h-full flex flex-col relative group overflow-visible">
	<!-- Subject Header -->
	<div class="mb-4 flex items-start justify-between">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-white">{subject.subject_code}</h2>
			<div class="mt-1 flex items-center gap-2 text-sm text-zinc-400">
				<User class="h-4 w-4" />
				<span>{subject.professor}</span>
			</div>
		</div>

		<button
			onclick={toggleDropdown}
			class="rounded-lg bg-zinc-800/50 p-2 transition-colors hover:bg-zinc-700 hover:text-white"
			aria-label="Toggle Resources"
		>
			{#if isOpen}
				<ChevronUp class="h-6 w-6 text-accent transition-colors" />
			{:else}
				<ChevronDown class="h-6 w-6 text-zinc-500 transition-colors group-hover:text-white" />
			{/if}
		</button>
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

	<!-- Collapsible Content -->
	<div class="relative mt-auto">
		{#if isOpen}
			<div
				transition:slide={{ duration: 200 }}
				class="space-y-2 overflow-hidden border-t border-zinc-800/50 pt-4"
			>
				<h3 class="mb-2 font-mono text-xs font-bold text-zinc-500 uppercase">Resources</h3>
				<QuickLink
					href={subject.drive_link_reviewers}
					label="Google Drive"
					icon={FolderOpen}
					className="justify-center bg-zinc-800/50 hover:bg-zinc-700/80 text-xs border-zinc-700"
				/>
				<QuickLink
					href={subject.syllabus_link || '#'}
					label="Syllabus"
					icon={BookOpen}
					className="justify-center bg-zinc-800/50 hover:bg-zinc-700/80 text-xs border-zinc-700"
				/>
			</div>
		{/if}
	</div>
</Card>
