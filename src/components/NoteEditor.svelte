<script>
  import { selectedNote, bodyText, noteListHeight } from '../store';
  import { debounce } from '../utils/debounce';
  import { isEmptyObject } from '../utils/isEmptyObjecy';

  let innerHeight;

  $: noteEditorHeightOffset = 80 + $noteListHeight;

  const handleDebounceSave = debounce(() => !isEmptyObject($selectedNote) && updateNote(), 230);

  const updateNote = async () => {
    await $selectedNote.update({
      $set: {
        body: $bodyText,
        updatedAt: new Date().getTime(),
      },
    });
  };
</script>

<svelte:window bind:innerHeight />

<div class="flex" style="height: {innerHeight - noteEditorHeightOffset + 15}px">
  {#if $selectedNote}
    <textarea id="body-editor" bind:value={$bodyText} on:keydown={handleDebounceSave} />
  {:else}
    <div class="placeholder">
      <h2>No Note Selected</h2>
    </div>
  {/if}
</div>

<style>
  .flex {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  h2 {
    font-size: 18px;
    font-weight: normal;
    color: #808080;
    font-family: Arial, Helvetica, sans-serif;
  }
  textarea {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 6px;
    background: #f6f6f6;
    /* background-color: red; */
    resize: none;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  .placeholder {
    position: relative;
    top: -20%;
  }
</style>
