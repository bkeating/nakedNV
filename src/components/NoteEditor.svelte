<script>
  import { selectedNote, bodyText } from "../store";
  import debounce from '../utils/debounce';

  let innerHeight;

  const handleDebounceSave = debounce(() => updateNote(), 230);

  const updateNote = async () => {
    await $selectedNote.update({
      $set: {
        body: $bodyText,
        updatedAt: new Date().getTime()
      }
    });
  };
</script>

<svelte:window bind:innerHeight={innerHeight} />

{#if $selectedNote}
  <textarea
    id="body-textarea"
    bind:value={$bodyText}
    on:keydown={handleDebounceSave}
    style={`height: ${innerHeight}px - 55px - 200px;`}
  />
{:else}
  <h2>No Note Selected</h2>
{/if}

<style>
  h2 {
    font-size: 18px;
    font-weight: normal;
    margin-top: 10%;
    color: #808080;
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
    outline: none;
	}
</style>
