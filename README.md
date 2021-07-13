# nakedNV

A barebones web-based imitation of [nvALT](https://brettterpstra.com/projects/nvalt/).

[![Dependencies](https://david-dm.org/bkeating/nakedNV.svg)](https://github.com/bkeating/nakedNV)

nakedNV is a 100% genuine knockoff of the nvALT note-taking application; one of many note apps inspired by [Notational Velocity](https://notational.net/). nakedNV written in [Svelte](https://svelte.dev/) and uses [RxDB](https://rxdb.info/) for it's offline-first/offline-only backend.

The entire app fits inside a single html file which means it can live and run almost anywhere. Not sure if it's a term yet, but I call it 'infraless'. Not serverless. Even more bare bones than that. We're talking mind-like-sloth sorta attitude. Infrastucture doesn't matter. Take notes wherever.

This project came about as a mental hack to overcome some hurdles/blockers in a much more ambitious project of mine; [nvAux](https://github.com/matterofabstract/nvAux/). It's an attempt at beelining to the essence of what makes a great note taking app and in my opinion, there is no better app to observe and envy more than nvALT. (Be sure to check out their new app, [nvUltra](https://nvultra.com/)).

The goal of nakedNV is to match most of nvALT's functionality. Not all of it. Just the stuff I use personally, and to do it using a tech stack im head-over-heels for; namely Svelte. I've fallen hard for reactive programming in general and am trying to embrace that as much as possible here.

It's probably fair to say that if nvAux was Google Chrome, nakedNV would be it's Chromium.

## Demo

Want to poke at it first, like a user would? You can demo the 'latest' build [here](https://bpk-endless.s3.us-east-1.amazonaws.com/nakedNV.html). Don't keep any precious notes within this instance (read: don't consider it production-stable).

## Features

Features carried over from nvALT:

* Modeless Operation
* Link notes together
* Mouseless interaction
* No need to 'save'
* Markdown formatting

Features unique to nakedNV:

* Used RxDB for local note storage, can also sync to remote endpoint
* Download your notes collection as a zip file
* Drag and drop zips of notes to import them

## Development

Get things running as you would with most other projects:

```sh
npm i && npm run dev
```

## Production

TBD... This project is not aimming to become a production service or product, but might be helpful, so let's not rule it out just yet. Stay tuned?
