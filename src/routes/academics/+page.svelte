<script>
	import { academics } from '$lib/stores';
	import SubjectCard from './SubjectCard.svelte';
</script>

<div class="space-y-8">
	<header>
		<h1 class="mb-2 font-mono text-3xl font-bold text-white">Subjects</h1>
		<p class="text-zinc-400">Subject resources, syllabus, and reviewers.</p>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each $academics as subject}
			<SubjectCard {subject} />
		{/each}
	</div>
</div>
