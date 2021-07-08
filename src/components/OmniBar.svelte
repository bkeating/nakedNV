<script>
  import { onMount } from 'svelte';
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
  import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
  import IoMdCloseCircle from 'svelte-icons/io/IoMdCloseCircle.svelte';

  import { omniMode, omniText, selectedNote, db } from '../store';

  let omniInput;

  onMount(() => {
    // This is prefered over an html tags 'autofocus' attribute
    // due to a Google Chrome security limitation.
    omniInput.focus();
  });

  const handleTitleEnter = (e) => {
    if ($omniText === '') return;
    e.keyCode === 13 && addNote();
  };

  const addNote = async () => {
    const db$ = await db();
    await db$.notes.insert({
      name: $omniText,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

  };
</script>

<div class="omnibar">
  <h1>nakedNV</h1>
  <div class="input-wrapper">
    <div class="icon left">
      {#if $omniMode === 'search'}
         <FaSearch />
      {:else}
        <FaPencilAlt />
      {/if}
    </div>
    {#if $omniText !== ''}
      <div
        class="icon right"
        on:click={() => {
          omniText.set('');
          selectedNote.set('');
        }}
      >
        <IoMdCloseCircle />
      </div>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:value={$omniText} on:keydown={handleTitleEnter} placeholder="Search or Create" bind:this={omniInput} />
  </div>
</div>

<style>
  h1 {
    font-size: 13px;
    text-align: center;
    font-weight: normal;
    font-family: sans-serif;
    margin: 1px 0 0 0;
    color: #636363;
  }
  .omnibar {
    padding: 3px 3px 0 3px;
    height: 50px;
    background: linear-gradient(0deg, rgba(206, 206, 207, 1) 0%, rgba(228, 227, 229, 1) 100%);
  }
  .input-wrapper {
    position: relative;
    padding: 5px;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #474747;
    border-radius: 5px;
    padding: 2px 4px 2px 20px;
  }
  .icon {
    position: absolute;
    width: 12px;
    height: 12px;
  }
  .left {
    color: #3b3b3b;
    top: 7px;
    left: 10px;
  }
  .right {
    color: #adadad;
    top: 7px;
    right: 8px;
    cursor: pointer;
  }
  .right:hover {
    color: #9b9b9b;
  }
</style>
