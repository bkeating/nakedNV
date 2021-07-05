import { writable } from 'svelte/store';
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { of, NEVER, from } from 'rxjs';
import { tap, switchMap, shareReplay } from 'rxjs/operators';
import * as idb from 'pouchdb-adapter-idb';

import noteSchema from './schema';

export const omniText = writable('');
export const noteList = writable([]);
export const selectedNote = writable('');
export const bodyText = writable('');

let browser = true;

export const db = (browser ? of(null) : NEVER).pipe(
  tap(() => addRxPlugin(idb)),
  switchMap(() => from(createRxDatabase({
    name: 'nvaux',
    adapter: 'idb',
    ignoreDuplicate: true
  }))),
  tap((db) => db.addCollections({ notes: { schema: noteSchema } })),
  shareReplay(1)
);

const getNotes = () => {
  console.log('db in getNotes: ', db);
  db.subscribe(x => {

  });

  // db.notes
  //   .find().$.subscribe((notes) => {
  //     notes && noteList.set(notes);
  //   });
}

getNotes();


