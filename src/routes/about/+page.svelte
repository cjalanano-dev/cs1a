<script>
	import Card from '$lib/components/Card.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { User, Facebook, ChevronDown } from 'lucide-svelte';

	const semesters = {
		'1st': {
			label: '1st Semester',
			officers: [
				[
					{
						role: 'President',
						name: 'Danica Kim Bucad',
						fb: '#'
					}
				],
				[
					{
						role: 'Vice President',
						name: 'Carlos James Alanano',
						fb: '#'
					}
				],
				[
					{
						role: 'Secretary',
						name: 'Mon Euwen Endrenal',
						fb: '#'
					},
					{
						role: 'Treasurer',
						name: 'Aisheeya Cariaga',
						fb: '#'
					},
					{
						role: 'Auditor',
						name: 'Jron Pavico',
						fb: '#'
					}
				],
				[
					{
						role: 'Representative',
						name: 'Dillos Ralph Alcantara',
						fb: '#'
					}
				]
			]
		},
		'2nd': {
			label: '2nd Semester',
			officers: [
				[
					{
						role: 'President',
						name: 'Carlos James Alanano',
						fb: '#'
					}
				],
				[
					{
						role: 'Vice President',
						name: 'Aisheeya Cariaga',
						fb: '#'
					}
				],
				[
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
						name: 'Edmund Joseph Saab',
						fb: '#'
					}
				],
				[
					{
						role: 'Representative',
						name: 'Cahrl Jieroh Jamora',
						fb: '#'
					}
				]
			]
		}
	};

	let selectedSemester = '2nd';
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

		<div class="flex flex-col items-center gap-4">
			<div class="relative">
				<select
					bind:value={selectedSemester}
					class="appearance-none rounded-lg border border-zinc-700 bg-zinc-800 py-2 pr-10 pl-4 text-sm font-medium text-white shadow-sm focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
				>
					{#each Object.entries(semesters) as [key, data]}
						<option value={key}>{data.label}</option>
					{/each}
				</select>
				<ChevronDown
					class="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
				/>
			</div>

			<div>
				<h2 class="mb-1 font-mono text-2xl font-bold text-white">Class Officers</h2>
				<p class="text-xs tracking-widest text-zinc-500 uppercase">A.Y. 2025-2026</p>
			</div>
		</div>
	</header>

	<div class="space-y-8">
		{#each semesters[selectedSemester].officers as group}
			<div class="flex flex-wrap justify-center gap-6">
				{#each group as officer}
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

	<footer class="mt-16 border-t border-zinc-800 pt-8 text-center">
		<p class="text-sm text-zinc-500">
			Built by <span class="text-zinc-300">Carlos James Alanano</span> and maintained by
			<span class="text-zinc-300">CS1A Officers</span>.
		</p>
	</footer>
</div>
