<script>
  import JSZip from 'jszip';
  import { saveAs } from 'file-saver';
  import IoMdDownload from 'svelte-icons/io/IoMdDownload.svelte'

  import { db } from '../store';

  let db$;

  const handleDownloadZip = async () => {
    let zip = new JSZip();
    db$ = await db();
    const notes = await db$.notes.find().exec();
    notes.map((n) => zip.file(`${n.name}.txt`, `${n.body}`));
    zip.generateAsync({type:"blob"})
    .then((data) => saveAs(data, "nakedNV-notes.zip"));
  }
</script>

<button on:click={handleDownloadZip}>
  <div class="icon">
    <IoMdDownload />
  </div> Export Notes (.zip)
</button>

<style>
  button {
    position: absolute;
    top: 5px;
    right: 10px;
    background: transparent;
    padding: 0;
    margin: 0;
    color: #535353;
    border: none;
    font-size: 12px;
    cursor: pointer;
  }
  button:hover {
    color: #1d1d1d;
  }
  .icon {
    position: relative;
    top: 2px;
    display: inline-block;
    width: 12px;
    height: 12px;
  }
</style>
