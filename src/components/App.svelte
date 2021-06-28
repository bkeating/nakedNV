<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { createRxDatabase, addRxPlugin } from 'rxdb';
  import * as idb from 'pouchdb-adapter-idb';

	import OmniBar from './OmniBar.svelte';
  import FileList from './FileList.svelte';
  import ResizeHandle from './ResizeHandle.svelte';
  import NoteEditor from './NoteEditor.svelte';

	import noteSchema from '../schema';

	import { omniText, noteList, selectedNote, bodyText } from "../store";
  import debounce from '../utils/debounce';

  addRxPlugin(idb);

  // let docIsFocused;
  // const checkIfFocused = () => docIsFocused = document.hasFocus();
  // setInterval(checkIfFocused, 300);

  let db;

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
      body: $bodyText,
      // createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

	const handleDebounceSave = debounce((ev) => {
		handleSave();
  }, 250);

  const handleTitleEnter = (e) => {
    if ($omniText === '') return;
    e.keyCode === 13 && handleSave()
  };

  const handleSelectNote = (guid) => {
    selectedNote.set(guid);
    db.notes.findOne({
      selector: {
        guid: $selectedNote
      }
    }).exec().then(doc => {
      bodyText.set(doc.body);
      omniText.set(doc.name);
    });
  };

</script>

<OmniBar handleSubmit={handleTitleEnter} />
<FileList noteList={$noteList} handleSelectNote={handleSelectNote} />
<ResizeHandle />
<NoteEditor handleSave={handleDebounceSave} />

<style>
  :global(body) {
		margin: 0;
		padding: 0;
    background: #f6f6f6;
  }
</style>
