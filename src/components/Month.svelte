<script>
    import { eachDayOfInterval, getDaysInMonth, getMonth, getYear, startOfMonth, endOfMonth, getDate, isToday,isBefore, getDay, addMonths, subMonths } from 'date-fns';
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
    let date = new Date();
    $: prevMonthDate = subMonths(date, 1);
    $: nextMonthDate = addMonths(date, 1);

    $: month = getMonth(date);
    $: prevMonth = getMonth(prevMonthDate);
    $: nextMonth = getMonth(nextMonthDate);

    $: year = getYear(date);
    $: prevYear = getYear(prevMonthDate);
    $: nextYear = getYear(nextMonthDate);

    $: daysInCurrMonth = getDaysInMonth(date);
    $: startOfCurrMonth = startOfMonth(date);
    $: endOfCurrMonth = endOfMonth(date);
    $: eachDayOfCurrMonth = eachDayOfInterval({
        start: new Date(year, month, 1),
        end: new Date(year, month, daysInCurrMonth)
    });
    // $: daysToPadLeftInCurrMonth = getDay(startOfCurrMonth);

    // $: daysInPrevMonth = getDaysInMonth(prevMonth);
    // $: paddableDaysOfPrevMonth = eachDayOfInterval({
    //     start: new Date(prevYear, prevMonth, daysInPrevMonth - daysToPadLeftInCurrMonth + 1),
    //     end: new Date(prevYear, prevMonth, daysInPrevMonth)
    // });

    function prev() {
        date = subMonths(date, 1)
    }

    function next() {
        date = addMonths(date, 1)
    }

</script>

<main>
    <button on:click={prev}>Prev</button>{months[month]} {year} <button on:click={next}>next</button>
    <ul class="cal">
        {#each days as dayOfWeek}
            <li class="cal__date">{dayOfWeek}</li>
        {/each}
    </ul>
    <ul class="cal">
        <!-- {#each paddableDaysOfPrevMonth as day}
            <li class="cal__date" data-value={day}>{getDate(day)}</li>
        {/each} -->
        {#each eachDayOfCurrMonth as day}
            <li class="cal__date {isToday(day) ? 'cal__date--today' : ''} {isBefore(day, date) ? 'cal__date-prev' : ''}" data-value={day}>{getDate(day)}</li>
        {/each}
    </ul>
</main>
<style>
    ul.cal {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(
            7,
            1fr
        );
    }
    .cal__date-prev {
        color: darkgrey;
    }
    .cal__date--today {
        font-weight: 700;
        color: black;
    }
</style>