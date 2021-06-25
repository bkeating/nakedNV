<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { createRxDatabase, addRxPlugin, isRxDatabase } from 'rxdb';
  import * as idb from 'pouchdb-adapter-idb';

	import OmniBar from './OmniBar.svelte';
  import FileList from './FileList.svelte';
  import ResizeHandle from './ResizeHandle.svelte';

	import noteSchema from './db/schema';

	import { omniText, noteList, selectedNote } from "./store";

  addRxPlugin(idb);

  let note = '';

  let innerHeight;

  let db;

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  const getDb = () => {
    if ($omniText !== '') {
      console.log('$omniText @@@@@@@@@@', $omniText);
      db.notes
        .find().where('name').$.subscribe((notes) => {
          notes && noteList.set(notes);
      });
    } else {
      db.notes
        .find().$.subscribe((notes) => {
          notes && noteList.set(notes);
       });
    }
  }

  // $: getSelectedNoteContents = db.notes.findOne({ selector: { guid: selectedNote }});

  onMount(async () => {
    db = await createRxDatabase({ name: 'nvaux', adapter: 'idb' });
    await db.addCollections({ notes: { schema: noteSchema } });

    getDb();

    db.$.subscribe((changeEvent) => console.log('DATA', `RxDB changeEvent: ${changeEvent} `, changeEvent));
  });

  const handleSave = (ev) => {
    // console.log('isRxDatabase @@@@@@@@@@', isRxDatabase(db));
    // console.log('noteList @@@@@@@@@@', noteList);
    db.notes.upsert({
      guid: uuidv4(),
      name: $omniText,
      body: note,
      updatedAt: new Date().toISOString(),
    });
  };

	const handleDebounceSave = debounce((ev) => {
		handleSave();
  }, 250);

  const handleTitleEnter = ({ keyCode }) => keyCode === 13 && handleSave();

  const handleSelectNote = (guid) => {
    selectedNote.set(guid);
    db.notes.findOne({
      selector: {
        guid: $selectedNote
      }
    }).exec().then(doc => {
      note = doc.body;
      omniText.set(doc.name);
    });
  };

</script>

<svelte:window bind:innerHeight={innerHeight} />

<div>
	<OmniBar handleSubmit={handleTitleEnter} />

  <div style="height: 200px">
    <FileList noteList={$noteList} handleSelectNote={handleSelectNote} />
  </div>
  <ResizeHandle />
  <div>
    {#if $selectedNote}
      <textarea bind:value={note} on:keydown style={`height: ${innerHeight}px - 55px - 200px`}/>
    {:else}
      <h2>No Note Selected</h2>
    {/if}
  </div>

</div>

<style>
  :global(body) {
		margin: 0;
		padding: 0;
    background: #f6f6f6;
  }
  h2 {
    font-size: 22px;
    font-weight: normal;
    margin-top: 10%;
    color: #a3a3a3;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
	textarea {
    width: 100%;
    padding: 6px;
    resize: none;
		box-sizing: border-box;
		border: none;
    height: calc(100vh - 260px);
	}
</style>
