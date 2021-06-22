<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import { createRxDatabase, addRxPlugin, isRxDatabase } from 'rxdb';
  import * as idb from 'pouchdb-adapter-idb';

  import noteSchema from './db/schema';

  addRxPlugin(idb);

  let title = 'TITLE';
  let note = 'the body';

  let db;
  let noteList = [];

	const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  onMount(async () => {
    db = await createRxDatabase({ name: 'nvaux', adapter: 'idb' });
    await db.addCollections({ notes: { schema: noteSchema } });

    db.notes
      .find({
        selector: {},
        sort: [{ name: 'asc' }],
      })
      .$.subscribe((notes) => {
        if (!notes) {
          return;
        }
        noteList = notes;
      });
    // db.$.subscribe((changeEvent) => console.log('DATA', `RxDB changeEvent: ${changeEvent} `, changeEvent));
  });

	const handleSave = debounce((ev) => {
		console.log('isRxDatabase @@@@@@@@@@', isRxDatabase(db));
		console.log('noteList @@@@@@@@@@', noteList);
		const now = new Date();
		db.notes.upsert({
			guid: uuidv4(),
			name: title,
			body: note,
			updatedAt: now.toISOString(),
		});
	}, 250);

  const deleteNote = async (note) => {
    await note.remove();
  };

	const handleTitleEnter = ({ keyCode }) => keyCode === 13 && handleSave();

</script>


<div>
  <div style="width: 340px; border: 1px solid #dddd; padding: 10px;">
    <label for="title">Title:</label>
    <input bind:value={title} placeholder="Note Title" on:keydown={handleTitleEnter} />

    <label for="note">Note:</label>
    <textarea name="note" bind:value={note} on:keydown=/>

    <button on:click={handleSave}>Save</button>
  </div>


  <ul>
    {#each noteList as note, i}
      <li>{i} - {note.name} <button on:click={() => deleteNote(note)}>[del]</button></li>
    {/each}
  </ul>
</div>

<style>
  label {
    display: block;
    width: 100%;
  }
  input,
  textarea {
    width: 100%;
  }
</style>
