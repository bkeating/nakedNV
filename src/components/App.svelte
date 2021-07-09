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
  :global(html) {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f6f6f6;
  }
</style>
