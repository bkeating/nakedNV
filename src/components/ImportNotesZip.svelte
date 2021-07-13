<script>
  import JSZip from 'jszip';
  import { db } from '../store';

  let db$;
	let files;

  const handleImport = async (f) => {
    db$ = await db();

    JSZip.loadAsync(f.target.files[0])
      .then((zip) => {
        zip.forEach(async (relativePath, file) => {
          if (relativePath.startsWith('__MACOSX')) { return };

          const date = file.date.getTime();

          file.async('string')
            .then(async (body) => {
              await db$.notes.insert({
                name: file.name.split('/').pop().replace(/\.[^/.]+$/, ''),
                body,
                createdAt: date,
                updatedAt: date
              });
          }, (e) => {
            console.log('file.async error @@@@@@@@@@', e);
          });
        });
      }, (e) => {
        console.log('loadAsync error, ', e)
      });
  }
</script>

<input type="file" bind:files on:change={handleImport} />

<!-- {#if files && files[0]}
  <p>
    {files[0].name}
  </p>
{/if} -->

<style>
  input {
    position: absolute;
    right: 100px;
    top: 5px;
    display: inline-block;
    zoom: 80%;
  }
</style>
