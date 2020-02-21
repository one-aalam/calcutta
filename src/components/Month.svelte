<script>
    import { eachDayOfInterval, getDaysInMonth, getMonth, getYear, startOfMonth, endOfMonth, getDate, getDay, isToday,isBefore, addMonths, subMonths, addDays, subDays, format } from 'date-fns';

    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    const _date = new Date(); // non-mutable version of the date, kept for checks like isPrevious, isToday

    let date = new Date(); // mutable version of the date
    $: prevMonthDate = subMonths(date, 1);
    $: nextMonthDate = addMonths(date, 1);
    $: prevMonthEndDate = endOfMonth(prevMonthDate);
    $: startOfCurrMonth = startOfMonth(date);
    $: endOfCurrMonth = endOfMonth(date);
    $: nextMonthStartDate = startOfMonth(nextMonthDate);


    $: month = getMonth(date);
    $: prevMonth = getMonth(prevMonthDate);
    $: nextMonth = getMonth(nextMonthDate);

    $: year = getYear(date);
    $: prevYear = getYear(prevMonthDate);
    $: nextYear = getYear(nextMonthDate);

    $: daysInCurrMonth = getDaysInMonth(date);

    $: eachDayOfCurrMonth = eachDayOfInterval({
        start: new Date(year, month, 1),
        end: new Date(year, month, daysInCurrMonth)
    });
    $: daysToPadLeftInCurrMonth = getDay(startOfCurrMonth);
    $: daysToPadRightInCurrMonth = 6 - getDay(endOfCurrMonth);

    $: daysInPrevMonth = getDaysInMonth(prevMonthDate);
    $: paddableDaysOfPrevMonth = daysToPadLeftInCurrMonth > 0 ? eachDayOfInterval({
        start:  subDays(prevMonthEndDate, daysToPadLeftInCurrMonth - 1),
        end: prevMonthEndDate
    }): [];
    $: paddableDaysOfNextMonth = daysToPadRightInCurrMonth > 0 && daysToPadRightInCurrMonth <= 6 ?  eachDayOfInterval({
        start:  nextMonthStartDate,
        end: addDays(nextMonthStartDate, daysToPadRightInCurrMonth - 1)
    }): [];

    function prev() {
        date = subMonths(date, 1)
    }

    function next() {
        date = addMonths(date, 1)
    }

</script>

<main>
    <button on:click={prev}>Prev</button>{format(date, 'MMMM')} {year} <button on:click={next}>next</button>
    <ul class="cal">
        {#each days as dayOfWeek}
            <li class="cal__date">{dayOfWeek}</li>
        {/each}
    </ul>
    <ul class="cal">
            {#each paddableDaysOfPrevMonth as day}
                <li class="cal__date cal__date--prev-month" data-value={day}>{getDate(day)}</li>
            {/each}
        {#each eachDayOfCurrMonth as day}
            <li
                class="cal__date {isToday(day) ? 'cal__date--today' : ''}
                    {isBefore(day, _date) ? 'cal__date-prev' : ''}"
                    data-value={day}>
                        {getDate(day)}
            </li>
        {/each}
                    {#each paddableDaysOfNextMonth as day}
                <li class="cal__date cal__date--prev-month" data-value={day}>{getDate(day)}</li>
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
    .cal__date--prev-month {
        color: lightgrey;
        font-style: italic;
        font-weight: 300;
    }
    .cal__date--today {
        font-weight: 700;
        color: black;
    }
</style>