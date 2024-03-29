import { writable } from 'svelte/store';

import { createRxDatabase } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import * as idb from 'pouchdb-adapter-idb';

import noteSchema from './schema';

/**
 * State that persists to localStorage =========================================
 */

const storedNoteListHeight = localStorage.getItem('noteListHeight') || 100;

/**
 * RxDB ========================================================================
 */

addPouchPlugin(idb);

let dbPromise;

const _create = async () => {
  const db = await createRxDatabase({
    name: 'nvaux',
    storage: getRxStoragePouch('idb'),
    ignoreDuplicate: true
  });
  await db.addCollections({ notes: { schema: noteSchema } });
  dbPromise = db;
  return db;
};

export const db = () => dbPromise ? dbPromise : _create();

/**
 * Svelte Writables ============================================================
 */

export const omniMode = writable('search');
export const omniText = writable('');
export const noteList = writable([]);
export const noteListHeight = writable(storedNoteListHeight);
export const selectedNote = writable({});
export const bodyText = writable('');

omniText.subscribe(v => {
  if (v === '') {
    omniMode.set('search');
    selectedNote.set('')
    // TODO: scroll to top of NoteList
  }
});

noteListHeight.subscribe(v => localStorage.setItem('noteListHeight', v.toString()));
