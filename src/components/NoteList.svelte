<script>
  import { onMount } from 'svelte';
  import { format } from 'date-fns';

  import { selectedNote, bodyText, db, omniText, omniMode, noteListHeight } from '../store';

  let db$;
  let isMouseDown = false;
  let noteList = [];

  onMount(() => {
    const getNoteList = async () => {
      db$ = await db();
      db$.notes
        .find({
          selector: {
            $or: [
              { name: { $regex: `.*${$omniText}.*` } },
              { body: { $regex: `.*${$omniText}.*` } }
            ]
          }
        })
        .sort({ updatedAt: 'desc' })
        .$.subscribe((notes) => (noteList = notes));
    };
    getNoteList();
  });

  $: omniText.subscribe(v => {
    db$ && !$selectedNote && db$.notes
      .find({
        selector: {
          $or: [
            { name: { $regex: `.*${v}.*` } },
            { body: { $regex: `.*${v}.*` } }
          ]
        }
      })
    .sort({ updatedAt: 'desc' })
    .$.subscribe((notes) => (noteList = notes))
  });

  // const deleteNote = async (note) => await note.remove();
  const formatDate = (str) => format(new Date(str).getTime(), "MMM d, yyyy 'at' h:mm a");
  const handleSelectNoteMouseOver = (id) => isMouseDown && handleSelectNote(id);

  const handleSelectNote = (note) => {
    selectedNote.set(note);
    db$.notes
      .findOne({
        selector: {
          name: $selectedNote.name,
        },
      })
      .exec()
      .then((n) => {
        omniMode.set('edit');
        omniText.set(n.name);
        bodyText.set(n.body);
      });
  };
</script>

<ul
  id="noteList"
  on:mousedown={() => (isMouseDown = true)}
  on:mouseup={() => (isMouseDown = false)}
  style="height: {$noteListHeight}px"
>
  {#await noteList}
    Loading Notes...
  {:then results}
    {#each results as note}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <li
        on:click={() => handleSelectNote(note)}
        on:mouseover={() => handleSelectNoteMouseOver(note)}
        style={$selectedNote === note && 'background: #0363e1; color: white;'}
      >
        <span class="elipsis" on:dblclick={() => document.getElementById('body-editor').focus()}>
          {note.name}
          {#if note.body !== ''}<span style="color: #757575">—</span>{/if}
          <span class="mute" style={$selectedNote === note && 'color: #fff;'}>
            {note.body ?? ''}
          </span>
        </span>

        <span class="meta" style={$selectedNote === note && 'background: #0363e1; color: white;'}>
          {formatDate(note.updatedAt)}
          <!-- <button on:click={() => deleteNote(note)}>[del]</button> -->
        </span>
      </li>
    {/each}
  {/await}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    background: #f7f7f7;
    overflow-y: auto;
    overflow-x: hidden;
    list-style-type: none;
    border-bottom: none;
  }
  li {
    padding: 2px 8px;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    font-family: Helvetica, sans-serif;
    user-select: none;
  }
  li:nth-child(odd) {
    background: #f5f5f5;
  }
  li:nth-child(even) {
    background: #f0f0f0;
  }
  .meta {
    min-width: 140px;
    color: #444444;
    white-space: nowrap;
  }
  .elipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
  }
  .mute {
    color: #8d8d8d;
  }
</style>
