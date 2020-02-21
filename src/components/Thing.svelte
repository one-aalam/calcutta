
<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { getTime } from 'date-fns';
    export let forDate;
    let text;

    const dispatch = createEventDispatcher();

    function tagThisThing() {
        dispatch('added', {text, time: getTime(forDate)});
    }

    onDestroy(() => {
        text = '';
        forDate = '';
    })
</script>
<form>
    Tag a thing with {forDate}

    <textarea rows={3} cols={180} bind:value={text} />
    <button on:click|preventDefault={tagThisThing}>Tag this thing!</button>

</form>