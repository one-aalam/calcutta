<script>
    import { createEventDispatcher } from 'svelte';
    import { getDate, isToday, isPast, isWeekend, isFuture } from 'date-fns';

    const dispatch = createEventDispatcher();
    export let day;
    export let today = '';

    export let hint = false;

    function onClick() {
        if (!isPast(day, today)) {
            dispatch('click');
        }
    }

    $: date = getDate(day);
</script>
<button on:click={onClick}
            class="cal__date {isToday(day) ? 'cal__date--today font-bold bg-indigo-100 text-indigo-600' : ''}
            {isWeekend(day) && !isPast(day, today) && !hint ? 'cal__date-weekend text-indigo-600' : ''}
            {isPast(day, today) ? 'cal__date-prev text-gray-500 cursor-not-allowed disabled' : ''}
            {isToday(day, today) || isFuture(day, today) ? 'hover:bg-gray-200' : ''}
            {hint ? 'italic text-gray-300' : ''}
            w-16 h-16 p-4 rounded-full justify-center content-center self-center">
    {date}
</button>