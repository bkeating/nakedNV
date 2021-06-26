<script>
  import MdSearch from 'svelte-icons/md/MdSearch.svelte';
  import IoMdCloseCircle from 'svelte-icons/io/IoMdCloseCircle.svelte';
  import { omniText, selectedNote } from "./store";

  export let handleSubmit;
</script>

<div class="omnibar">
  <h1>nakedNV</h1>
  <div class="input-wrapper">
    <div class="icon left">
      <MdSearch />
    </div>
    {#if $omniText !== ''}
       <div class="icon right" on:click={() => { omniText.set(''); selectedNote.set('') }}>
         <IoMdCloseCircle />
       </div>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      bind:value={$omniText}
      on:keydown={handleSubmit}
      placeholder="Search or Create"
      autofocus
    />
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
    background: linear-gradient(0deg, rgba(206,206,207,1) 0%, rgba(228,227,229,1) 100%);
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
    width: 17px;
    height: 17px;
  }
  .left {
    color: #3b3b3b;
    top: 7px;
    left: 8px;
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
