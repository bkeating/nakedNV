<script>
  import { noteListHeight } from '../store';
  import mousePosition from '../utils/mousePosition';

  let dragging = false;

  const startResize = (e) => {
    dragging = true;
  }

  const stopResize = (e) => {
    dragging = false;
  }

  const handleResize = (e) => {
    console.log('e @@@@@@@@@@', e);
    if (!dragging) return;
    noteListHeight.set(e.pageY - 60)
    return;
  }
</script>

<svelte:window on:mouseup={stopResize} />

<div class="resize-bar" on:mousedown={startResize} on:mousemove={handleResize} />

{$mousePosition.x},{$mousePosition.y}klkj

<style>
  .resize-bar {
    background: linear-gradient(0deg, #e0e0e0 0%, #f8f8f8 100%);
    border: 1px solid #c6c6c6;
    height: 7px;
    width: 100%;
    cursor: row-resize;
    user-select: none;
  }
</style>
