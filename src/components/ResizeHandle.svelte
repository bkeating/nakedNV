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
    if (!dragging) return;
    noteListHeight.set($mousePosition.y >= 55 && $mousePosition.y - 55)
    // TODO now check for page size and never allow the resize bar to go past the floor!
    return;
  }
</script>

<svelte:window on:mouseup={stopResize} on:mousemove={handleResize} />

<div class="resize-bar" on:mousedown={startResize} />

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
