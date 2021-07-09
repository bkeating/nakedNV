import { readable } from 'svelte/store';

export default readable({ x: 0, y: 0 }, (set) => {
  document.body.addEventListener("mousemove", move);

  function move(event) {
    set({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return () => {
    document.body.removeEventListener("mousemove", move);
  }
})
