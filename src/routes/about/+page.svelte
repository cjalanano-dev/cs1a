<script>
	import Card from '$lib/components/Card.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { User, Facebook, Send, Mail } from 'lucide-svelte';

	const officers = [
		{
			role: 'President',
			name: 'Carlos James Alanano',
			fb: '#'
		},
		{
			role: 'Vice President',
			name: 'Aisheeya Cariaga',
			fb: '#'
		},
		{
			role: 'Secretary',
			name: 'Camille Banaag',
			fb: '#'
		},
		{
			role: 'Treasurer',
			name: 'Unnoh Medina',
			fb: '#'
		},
		{
			role: 'Auditor',
			name: 'Edmund Saab',
			fb: '#'
		},
		{
			role: 'Representative',
			name: 'Cahrl Jamora',
			fb: '#'
		}
	];
</script>

<div class="mx-auto max-w-4xl space-y-8">
	<header class="text-center">
		<h1 class="mb-4 font-mono text-4xl font-bold tracking-tight text-white">
			BSCS <span class="text-accent">1A</span>
		</h1>

		<div class="mx-auto mb-12 max-w-2xl space-y-4">
			<p class="leading-relaxed text-zinc-300">
				Welcome to the official portal for the <span class="font-bold text-white"
					>Bachelor of Science in Computer Science - 1A</span
				> from LSPU - SPCC. We are a community of aspiring developers, innovators, and problem-solvers.
			</p>
			<p class="text-sm text-zinc-400">"Turning coffee into code, and problems into solutions."</p>
		</div>

		<h2 class="mb-2 font-mono text-2xl font-bold text-white">Class Officers</h2>
		<p class="text-sm tracking-widest text-zinc-500 uppercase">A.Y. 2025-2026 Semester 2</p>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each officers as officer}
			<Card className="flex flex-col items-center text-center">
				<div
					class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800"
				>
					<User class="h-10 w-10 text-zinc-500" />
				</div>

				<h2 class="text-lg font-bold text-white">{officer.name}</h2>
				<span class="mb-6 font-mono text-xs tracking-wider text-accent uppercase"
					>{officer.role}</span
				>

				<div class="mt-auto grid w-full grid-cols-1 gap-3">
					<QuickLink
						href={officer.fb}
						icon={Facebook}
						className="justify-center px-2 py-2 text-xs"
					/>
				</div>
			</Card>
		{/each}
	</div>
</div>
