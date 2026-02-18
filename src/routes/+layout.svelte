<script>
	import './layout.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchAllData } from '$lib/stores';
	import { LayoutDashboard, Banknote, BookOpen, Calendar, Users, Menu, X } from 'lucide-svelte';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);

	const navItems = [
		{ href: '/', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/finances', label: 'Finances', icon: Banknote },
		{ href: '/academics', label: 'Academics', icon: BookOpen },
		{ href: '/calendar', label: 'Calendar', icon: Calendar },
		{ href: '/about', label: 'About', icon: Users }
	];

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	onMount(() => {
		fetchAllData();
	});
</script>

<div
	class="flex min-h-screen bg-background font-sans text-text-main selection:bg-accent selection:text-black"
>
	<!-- Mobile Header -->
	<div
		class="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-border bg-surface/80 p-4 backdrop-blur-md lg:hidden"
	>
		<span class="font-mono text-xl font-bold tracking-tighter text-accent"
			>CS1A<span class="text-white">Dashboard</span></span
		>
		<button
			onclick={toggleMobileMenu}
			class="text-zinc-400 hover:text-white"
			aria-label="Toggle Menu"
		>
			{#if isMobileMenuOpen}
				<X />
			{:else}
				<Menu />
			{/if}
		</button>
	</div>

	<!-- Sidebar Navigation -->
	<aside
		class={`
			fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-surface pt-16 transition-transform duration-300 ease-in-out lg:sticky lg:pt-0
			${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
		`}
	>
		<div class="hidden border-b border-border p-6 lg:block">
			<h1 class="font-mono text-2xl font-bold tracking-tighter text-accent">
				CS1A<span class="text-white">_Dashboard</span>
			</h1>
			<p class="mt-1 text-xs tracking-widest text-zinc-500 uppercase">Class Portal v0.6</p>
		</div>

		<nav class="flex-1 space-y-1 overflow-y-auto px-3 py-6">
			{#each navItems as item}
				{@const isActive = $page.url.pathname === item.href}
				<a
					href={item.href}
					onclick={closeMobileMenu}
					class={`
						group flex items-center gap-3 rounded-lg px-3 py-3 transition-all
						${
							isActive
								? 'border border-accent/20 bg-accent/10 font-medium text-accent'
								: 'border border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white'
						}
					`}
				>
					<item.icon
						class={`h-5 w-5 ${isActive ? 'text-accent' : 'text-zinc-500 group-hover:text-white'}`}
					/>
					<span class="font-mono text-sm">{item.label}</span>
					{#if isActive}
						<div
							class="ml-auto h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(34,197,94,0.8)]"
						></div>
					{/if}
				</a>
			{/each}
		</nav>
	</aside>

	<!-- Main Content Area -->
	<main class="relative flex w-full min-w-0 flex-1 flex-col overflow-hidden pt-16 lg:pt-0">
		<!-- Background Grid Decoration -->
		<div
			class="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
			style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 40px 40px;"
		></div>

		<div class="relative z-10 mx-auto w-full max-w-7xl flex-1 p-4 lg:p-8">
			{@render children()}
		</div>
	</main>

	<!-- Mobile Menu Overlay -->
	{#if isMobileMenuOpen}
		<div
			class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
			onclick={closeMobileMenu}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
		></div>
	{/if}
</div>
