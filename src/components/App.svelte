<script>
  import OmniBar from './OmniBar.svelte';
  import NoteList from './NoteList.svelte';
  import ResizeHandle from './ResizeHandle.svelte';
  import NoteEditor from './NoteEditor.svelte';
</script>

<OmniBar />
<NoteList  />
<ResizeHandle />
<NoteEditor />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #f6f6f6;
  }
</style>
