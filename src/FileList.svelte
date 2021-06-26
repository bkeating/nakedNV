<script>
  import { format } from 'date-fns';

  import { selectedNote } from './store';

  export let noteList;
  export let handleSelectNote;

  let isMouseDown = false;

  const deleteNote = async (note) => await note.remove();
  const formatDate = (str) => format(new Date(str), "MMM d, yyyy 'at' h:mm a");
  const handleSelectNoteMouseOver = (guid) => isMouseDown && handleSelectNote(guid);
</script>

<ul
  on:mousedown={() => isMouseDown = true}
  on:mouseup={() => isMouseDown = false}
>
  {#each noteList as note}
  <li
    on:click={() => handleSelectNote(note.guid)}
    on:mouseover={() => handleSelectNoteMouseOver(note.guid)}
    style={$selectedNote === note.guid && 'background: #0363e1; color: white;'}
  >
    <span class="elipsis" on:dblclick={() => alert('double clicked')}>{note.name} {#if note.body !== ''}<span style="color: #757575">—</span>{/if} <span class="mute" style={$selectedNote === note.guid && 'color: #fff;'}>{note.body}</span></span>
    <span class="meta" style={$selectedNote === note.guid && 'background: #0363e1; color: white;'}>
      {formatDate(note.updatedAt)}
      <!-- <button on:click={() => deleteNote(note)}>[del]</button> -->
    </span>
  </li>
  {/each}
</ul>

<style>
	ul {
		margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: #f7f7f7;
		overflow-y: auto;
		overflow-x: hidden;
		list-style-type: none;
    border-top: 1px solid #8b8b8b;
    border-bottom: none;
    user-select: none;
	}
	li {
		padding: 1px 8px;
		display: flex;
    font-size: 12px;
		justify-content: space-between;
    font-family: Helvetica, sans-serif;
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
