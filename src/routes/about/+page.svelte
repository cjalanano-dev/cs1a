<script>
	import Card from '$lib/components/Card.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { User, Facebook } from 'lucide-svelte';

	const executive = [
		{
			role: 'President',
			name: 'Carlos James Alanano',
			fb: '#'
		}
	];

	const leadership = [
		{
			role: 'Vice President',
			name: 'Aisheeya Cariaga',
			fb: '#'
		}
	];

	const administrative = [
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
		}
	];

	const representatives = [
		{
			role: 'Representative',
			name: 'Cahrl Jamora',
			fb: '#'
		}
	];

	const sections = [executive, leadership, administrative, representatives];
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

	<div class="space-y-8">
		{#each sections as section}
			<div class="flex flex-wrap justify-center gap-6">
				{#each section as officer}
					<div class="w-full max-w-xs md:w-[calc(33.333%-1.5rem)]">
						<Card className="flex h-full flex-col items-center text-center">
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
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
