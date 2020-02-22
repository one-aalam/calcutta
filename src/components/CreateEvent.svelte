
<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { getTime, format } from 'date-fns';
    import Icon from 'fa-svelte';
    import { faCalendarDay, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
    import TimePicker from './TimePicker.svelte';
    export let forDate;
    let title, desc, detail;

    const dispatch = createEventDispatcher();

    function addEvent() {
        dispatch('added', {title, desc, detail});
    }
    function dismiss() {
        dispatch('dismiss');
    }

    function onTimeChosen(e) {
        detail = e.detail;
    }

    onDestroy(() => {
        desc = '';
        forDate = new Date();
    })
</script>
<div class="w-full">
    <h3 class="bold text-xl mb-2 py-2 uppercase font-bold text-gray-600 tracking-wide">
      <Icon icon={faCalendarDay} />  {forDate && format(forDate, 'EEEE, do MMM')}
    </h3>
    <input class="w-full bg-gray-200 border-gray-200 focus:white mb-2 p-2" placeholder="What are you upto?" bind:value={title} />
    <textarea class="w-full bg-gray-200 border-gray-200 focus:white p-2" rows={3} cols={180} bind:value={desc} />
    {#if forDate}
        <TimePicker {forDate} on:change={onTimeChosen} />
    {/if}
        <!--Footer-->
    <div class="flex justify-end pt-2">
        <button on:click={dismiss} class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2 uppercase">dismiss</button>
        <button on:click={addEvent} class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400 uppercase">
           <Icon icon={faCalendarPlus} /> create event
        </button>
    </div>
</div>