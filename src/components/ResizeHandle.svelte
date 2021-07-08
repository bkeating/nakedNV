<script>
  import { noteListHeight } from '../store';

  let dragging = false;

  const startResize = (e) => {
    dragging = true;
  }

  const stopResize = (e) => {
    dragging = false;
  }

  const handleResize = (e) => {
    if (!dragging) return;
    const initial = $noteListHeight;
    console.log('initial @@@@@@@@@@', initial);
    if (e.pageY )
    console.log('e @@@@@@@@@@', e.pageY - 62);
    noteListHeight.set(e.pageY - 60)
    // const delta = event.pageY - start;
    // width = initial.width + delta;
    return;
  }
</script>

<svelte:window on:mouseup={stopResize} />

<div class="resize-bar" on:mousedown={startResize} on:mousemove={handleResize} />

<style>
  .resize-bar {
    background: linear-gradient(0deg, #e0e0e0 0%, #f8f8f8 100%);
    border: 1px solid #c6c6c6;
    height: 7px;
    width: 100%;
    cursor: row-resize;
  }
</style>
