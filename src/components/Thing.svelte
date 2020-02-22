
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
<form class="w-4/5 p-4 bg-indigo-100">
    Tag a thing with {forDate}

    <textarea class="w-full" rows={3} cols={180} bind:value={text} />
    <button class="bg-indigo-500 p-2 text-white" on:click|preventDefault={tagThisThing}>Tag this thing!</button>

</form>