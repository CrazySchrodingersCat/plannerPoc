<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<span>Planner App Test.V_0</span>
		<span class="menu-spacer" />
		<div>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Planner</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">Practitioners</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Login</a>
			</li>
		</ul>
	</div>
	</nav>
</header>

<style>
	.menu-spacer {
		flex: 1 1 auto;
	}
	/* mat-toolbar-row, */
	a {
		color: #3b5736;
		padding: 14px 18px 5px;
	}
	header {
		display: flex;
		justify-content: space-between;
		background: #f5f5f5;;
	}

	nav {
		display: flex;
		justify-content: center;

	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		color: #3b5736;
		padding: 14px 18px 5px;
	}

	/* li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	} */

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		/* color: var(--color-text); */
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	/* a:hover {
		color: var(--color-theme-1);
	} */
</style>
