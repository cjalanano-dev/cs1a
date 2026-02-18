<script>
	import Card from '$lib/components/Card.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
	import { User, Facebook, Send, Mail } from 'lucide-svelte';

	const officers = [
		{
			role: 'President',
			name: 'Carlos James Alanano',
			fb: '#',
			email: '#'
		},
		{
			role: 'Vice President',
			name: 'Aisheeya Cariaga',
			fb: '#',
			email: '#'
		},
		{
			role: 'Secretary',
			name: 'Camille Banaag',
			fb: '#',
			email: '#'
		},
		{
			role: 'Treasurer',
			name: 'Unnoh Medina',
			fb: '#',
			email: '#'
		},
		{
			role: 'Auditor',
			name: 'Edmund Saab',
			fb: '#',
			email: '#'
		},
		{
			role: 'Representative',
			name: 'Cahrl Jamora',
			fb: '#',
			email: '#'
		}
	];
</script>

<div class="mx-auto max-w-4xl space-y-8">
	<header class="text-center">
		<h1 class="mb-2 font-mono text-3xl font-bold text-white">Class Officers</h1>
		<p class="text-zinc-400">Meet the people serving BSCS1A.</p>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each officers as officer}
			<Card className="flex flex-col items-center text-center">
				<div
					class="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800"
				>
					<User class="h-10 w-10 text-zinc-500" />
				</div>

				<h2 class="text-lg font-bold text-white">{officer.name}</h2>
				<span class="mb-6 font-mono text-xs tracking-wider text-accent uppercase"
					>{officer.role}</span
				>

				<div class="mt-auto grid w-full grid-cols-2 gap-3">
					<QuickLink
						href={officer.fb}
						label="FB"
						icon={Facebook}
						className="justify-center px-2 py-2 text-xs"
					/>
					<QuickLink
						href={officer.email}
						label="Email"
						icon={Mail}
						className="justify-center px-2 py-2 text-xs"
					/>
				</div>
			</Card>
		{/each}
	</div>

	<div class="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/30 p-8 text-center">
		<h3 class="mb-2 font-mono text-xl font-bold text-white">Got Concerns?</h3>
		<p class="mb-6 text-zinc-400">Reach out to us directly or drop a message in the group chat.</p>
		<div class="flex justify-center">
			<QuickLink href="#" label="Open Class Group Chat" icon={Send} className="w-auto px-8" />
		</div>
	</div>
</div>
