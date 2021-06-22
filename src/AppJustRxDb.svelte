<script>
	export let name;

	import { of, NEVER, from, range, combineLatest, Subject, merge } from "rxjs";
	import { map, filter, tap, pluck, switchMap, shareReplay } from "rxjs/operators";

	import { createRxDatabase, addRxPlugin } from 'rxdb';
	import * as idb from 'pouchdb-adapter-idb';

	const browser = true;

	const db$ = (browser ? of(null) : NEVER).pipe(
    tap(() => addRxPlugin(idb)),
    switchMap(() => {
        return from(createRxDatabase({
            name: 'mydb',
            adapter: 'idb',
            ignoreDuplicate: true
        }))
    }),
    shareReplay(1)
)

db$.subscribe(console.log)

	range(1, 200)
		.pipe(
			filter(x => x % 2 === 1),
			map(x => x + x)
		)
		.subscribe(x => console.log(x));

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
