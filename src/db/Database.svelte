<script context="module">
    import { onMount } from 'svelte';
    import { createRxDatabase, addRxPlugin, isRxDatabase } from 'rxdb';
    import * as idb from 'pouchdb-adapter-idb';

    import noteSchema from './db/schema';

    addRxPlugin(idb);
</script>
