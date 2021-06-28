import { writable } from 'svelte/store';

export const omniText = writable('');
export const noteList = writable([]);
export const selectedNote = writable('');
export const bodyText = writable('');
