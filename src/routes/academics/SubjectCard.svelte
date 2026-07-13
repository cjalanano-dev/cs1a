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

<Card className="h-full flex flex-col relative group overflow-visible border border-border/80 p-5">
	<!-- Subject Header -->
	<div class="mb-5 flex items-start justify-between">
		<div>
			<h2 class="text-xl font-bold tracking-tight text-text-main">{subject.subject_code}</h2>
			<div class="mt-1.5 flex items-center gap-2 text-xs text-text-muted">
				<User class="h-3.5 w-3.5 text-text-muted" />
				<span>{subject.professor}</span>
			</div>
		</div>

		<button
			onclick={toggleDropdown}
			class="rounded-xl border border-border bg-surface/40 p-2.5 transition-all duration-300 hover:border-accent/40 hover:bg-surface/80"
			aria-label="Toggle Resources"
		>
			{#if isOpen}
				<ChevronUp class="h-4 w-4 text-accent transition-colors" />
			{:else}
				<ChevronDown class="h-4 w-4 text-text-muted transition-colors group-hover:text-text-main" />
			{/if}
		</button>
	</div>

	<!-- Next Quiz Countdown -->
	{#if subject.next_quiz_date}
		<div
			class="mb-4 flex items-center gap-3 rounded-xl border border-border bg-surface/30 p-3.5"
		>
			<CalendarClock class="h-4.5 w-4.5 text-accent" />
			<div>
				<div class="font-mono text-[9px] font-bold text-text-muted uppercase tracking-wider">Next Quiz</div>
				<div class="text-xs font-semibold text-text-main mt-0.5">
					{subject.next_quiz_date}
					<span class="text-accent font-bold">({timeUntil(subject.next_quiz_date)})</span>
				</div>
			</div>
		</div>
	{/if}

	<!-- Collapsible Content -->
	<div class="relative mt-auto">
		{#if isOpen}
			<div
				transition:slide={{ duration: 200 }}
				class="space-y-2 overflow-hidden border-t border-border/50 pt-4"
			>
				<h3 class="mb-2 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Resources</h3>
				<QuickLink
					href={subject.drive_link_reviewers}
					label="Google Drive Link"
					icon={FolderOpen}
					className="justify-center bg-surface/40 hover:bg-surface/80 text-[10px] py-2 border-border"
				/>
				<QuickLink
					href={subject.syllabus_link || '#'}
					label="Syllabus Document"
					icon={BookOpen}
					className="justify-center bg-surface/40 hover:bg-surface/80 text-[10px] py-2 border-border"
				/>
			</div>
		{/if}
	</div>
</Card>
