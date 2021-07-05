<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import OmniBar from './OmniBar.svelte';
  import FileList from './FileList.svelte';
  import ResizeHandle from './ResizeHandle.svelte';
  import NoteEditor from './NoteEditor.svelte';

  import { omniText, noteList, selectedNote, bodyText, db } from '../store';

  import debounce from '../utils/debounce';

  // let docIsFocused;
  // const checkIfFocused = () => docIsFocused = document.hasFocus();
  // setInterval(checkIfFocused, 300);

  // $: getSelectedNoteContents = db.notes.findOne({ selector: { guid: selectedNote }});

  const handleSave = (ev) => {
    // console.log('isRxDatabase @@@@@@@@@@', isRxDatabase(db));
    // console.log('noteList @@@@@@@@@@', noteList);

    db.subscribe(x => (
      console.log('x @@@@@@@@@@ in handleSave', x)
      // x.collections.notes.upsert({
      //   guid: uuidv4(),
      //   name: $omniText,
      //   body: $bodyText,
      //   // createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      // })
    ))
  };

  const handleDebounceSave = debounce((ev) => {
    handleSave();
  }, 250);

  const handleTitleEnter = (e) => {
    if ($omniText === '') return;
    e.keyCode === 13 && handleSave();
  };

  const handleSelectNote = (guid) => {
    selectedNote.set(guid);
    db.collections.notes
      .findOne({
        selector: {
          guid: $selectedNote,
        },
      })
      .exec()
      .then((doc) => {
        bodyText.set(doc.body);
        omniText.set(doc.name);
      });
  };
</script>

<OmniBar handleSubmit={handleTitleEnter} />
<FileList noteList={$noteList} {handleSelectNote} />
<ResizeHandle />
<NoteEditor handleSave={handleDebounceSave} />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #f6f6f6;
  }
</style>
