<script>
	import './layout.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchAllData } from '$lib/stores';
	import { LayoutDashboard, Banknote, BookOpen, Calendar, Users, Menu, X, Sun, Moon } from 'lucide-svelte';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);
	let isDark = $state(true);

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

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	onMount(() => {
		fetchAllData();
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (savedTheme === 'light') {
			isDark = false;
			document.documentElement.classList.remove('dark');
		} else if (savedTheme === 'dark') {
			isDark = true;
			document.documentElement.classList.add('dark');
		} else {
			isDark = prefersDark;
			if (prefersDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
</script>

<div
	class="flex min-h-screen flex-col bg-background font-sans text-text-main selection:bg-accent/15 selection:text-white transition-colors duration-200"
>
	<!-- Top Navigation Header -->
	<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
			<a href="/" class="font-mono text-lg font-bold tracking-tight text-text-main hover:opacity-80 transition-opacity">
				CS1A<span class="text-text-muted">/</span>
			</a>

			<div class="flex items-center gap-4">
				<!-- Desktop Nav Links -->
				<nav class="hidden items-center gap-6 md:flex">
					{#each navItems as item}
						{@const isActive = $page.url.pathname === item.href}
						<a
							href={item.href}
							class={`
								font-mono text-xs tracking-wider transition-colors duration-200 uppercase
								${isActive ? 'text-text-main font-bold' : 'text-text-muted hover:text-text-main'}
							`}
						>
							{item.label}
						</a>
					{/each}
				</nav>

				<!-- Theme Toggle Button -->
				<button
					onclick={toggleTheme}
					class="rounded-md p-1.5 text-text-muted hover:bg-zinc-800/10 hover:text-text-main transition-colors duration-200"
					aria-label="Toggle Theme"
				>
					{#if isDark}
						<Sun size={16} />
					{:else}
						<Moon size={16} />
					{/if}
				</button>

				<!-- Mobile Header Actions -->
				<button
					onclick={toggleMobileMenu}
					class="rounded-md p-1.5 text-text-muted hover:bg-zinc-800/20 hover:text-text-main transition-all md:hidden"
					aria-label="Toggle Menu"
				>
					{#if isMobileMenuOpen}
						<X size={18} />
					{:else}
						<Menu size={18} />
					{/if}
				</button>
			</div>
		</div>
	</header>

	<!-- Mobile Menu Panel -->
	{#if isMobileMenuOpen}
		<div class="fixed inset-0 top-[57px] z-40 bg-background/95 backdrop-blur-md md:hidden">
			<nav class="flex flex-col gap-4 p-6">
				{#each navItems as item}
					{@const isActive = $page.url.pathname === item.href}
					<a
						href={item.href}
						onclick={closeMobileMenu}
						class={`
							font-mono text-sm tracking-wider uppercase py-2 border-b border-border/40
							${isActive ? 'text-text-main font-bold' : 'text-text-muted'}
						`}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}

	<!-- Main Content Area -->
	<main class="flex-1 w-full max-w-5xl mx-auto px-6 py-10 md:py-16">
		{@render children()}
	</main>
</div>
