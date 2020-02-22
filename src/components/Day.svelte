<script>
    import { getDate, isToday, isPast, isWeekend } from 'date-fns';


    export let day;
    export let today = '';

    export let hint = false;

    $: date = getDate(day);
</script>
<div on:click class="cal__date {isToday(day) ? 'cal__date--today font-bold rounded-full bg-indigo-100 text-indigo-600' : ''}
            {isWeekend(day) && !isPast(day, today) && !hint ? 'cal__date-weekend text-indigo-600' : ''}
            {isPast(day, today) ? 'cal__date-prev text-gray-500' : ''}
            {hint ? 'italic text-gray-300' : ''}
            w-16 h-16 p-4 justify-center align-center">
    {date}
</div>