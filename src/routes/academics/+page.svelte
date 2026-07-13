<script>
	import { academics } from '$lib/stores';
	import SubjectCard from './SubjectCard.svelte';
</script>

<div class="space-y-10">
	<header class="border-b border-border/60 pb-4">
		<h1 class="font-mono text-xl font-bold text-text-main tracking-wider uppercase">Academic Subjects</h1>
		<p class="text-xs text-text-muted font-mono mt-1.5 uppercase tracking-wider">Resources, syllabi, and reviewers</p>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each $academics as subject}
			<SubjectCard {subject} />
		{/each}
	</div>
</div>
