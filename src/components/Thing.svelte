
<script>
    import { getTime } from 'date-fns';
    export let forDate;
    let text;

    function tagThisThing() {
        alert(JSON.stringify({text, time: getTime(forDate)}))
    }
</script>
<form>
    Tag a thing with {forDate}

    <textarea rows={3} cols={180} bind:value={text} />
    <button on:click={tagThisThing}>Tag this thing!</button>

</form>