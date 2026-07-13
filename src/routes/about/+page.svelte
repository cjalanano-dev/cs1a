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

<div class="mx-auto max-w-4xl space-y-12">
	<header class="text-center space-y-6">
		<h1 class="font-mono text-4xl font-extrabold tracking-tight text-text-main md:text-5xl">
			BSCS <span class="text-accent">1A</span>
		</h1>

		<div class="mx-auto max-w-2xl space-y-3">
			<p class="leading-relaxed text-text-muted text-sm md:text-base font-light">
				Welcome to the official portal for the <span class="font-semibold text-text-main"
					>Bachelor of Science in Computer Science - 1A</span
				> from LSPU - SPCC. We are a community of aspiring developers, innovators, and problem-solvers.
			</p>
			<p class="text-xs text-text-muted font-mono tracking-wide">"Turning coffee into code, and problems into solutions."</p>
		</div>

		<div class="flex flex-col items-center gap-6 pt-4">
			<div class="relative">
				<select
					bind:value={selectedSemester}
					class="appearance-none rounded-xl border border-border bg-surface/50 px-5 pr-10 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-text-main shadow-sm focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all duration-300 cursor-pointer"
				>
					{#each Object.entries(semesters) as [key, data]}
						<option class="bg-surface text-text-main" value={key}>{data.label}</option>
					{/each}
				</select>
				<ChevronDown
					class="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-muted"
				/>
			</div>

			<div class="border-t border-border/50 pt-6 w-full max-w-md">
				<h2 class="font-mono text-base font-bold tracking-wider text-text-main uppercase">Class Officers</h2>
				<p class="text-[10px] tracking-widest text-text-muted uppercase font-semibold mt-1">Academic Year 2025-2026</p>
			</div>
		</div>
	</header>

	<div class="space-y-10">
		{#each semesters[selectedSemester].officers as group}
			<div class="flex flex-wrap justify-center gap-6">
				{#each group as officer}
					<div class="w-full max-w-xs md:w-[calc(33.333%-1.5rem)]">
						<Card className="flex h-full flex-col items-center text-center p-6 border border-border/80">
							<div
								class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border/80 bg-surface shadow-inner transition-transform duration-300 group-hover:scale-105"
							>
								<User class="h-6 w-6 text-text-muted" />
							</div>

							<h3 class="text-sm font-bold text-text-main tracking-tight">{officer.name}</h3>
							<span class="mb-5 mt-1.5 font-mono text-[10px] tracking-widest text-accent uppercase font-bold"
								>{officer.role}</span
							>

							<div class="mt-auto w-full">
								<QuickLink
									href={officer.fb}
									icon={Facebook}
									className="justify-center py-2 text-[10px]"
									label="Connect"
								/>
							</div>
						</Card>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
