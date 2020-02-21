<script>
    import Dialog from './Dialog.svelte';
    import Thing from './Thing.svelte';
    let showModal = false;
    import { eachDayOfInterval, getDaysInMonth, getMonth, getYear, startOfMonth, endOfMonth, getDate, getDay, isToday,isBefore, addMonths, subMonths, addDays, subDays, getTime } from 'date-fns';
    import locale from 'date-fns/esm/locale/en-US';
    const weekdays = [...Array(7).keys()].map(i => locale.localize.day(i, { width: 'abbreviated' }))

    const _date = new Date(); // non-mutable version of the date, kept for checks like isPrevious, isToday

    let date = new Date(); // mutable version of the date
    $: prevMonthDate = subMonths(date, 1);
    $: nextMonthDate = addMonths(date, 1);
    $: prevMonthEndDate = endOfMonth(prevMonthDate);
    $: startOfCurrMonth = startOfMonth(date);
    $: endOfCurrMonth = endOfMonth(date);
    $: nextMonthStartDate = startOfMonth(nextMonthDate);


    $: month = getMonth(date);
    $: monthName = locale.localize.month(month);
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
    let forDate;
    function showDialog(date) {
        forDate = date;
        showModal = !showModal
    }

</script>

<main>
    <button on:click={prev}>Prev</button>{monthName} {year} <button on:click={next}>next</button>
    <ul class="cal">
        {#each weekdays as dayOfWeek}
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
                    data-value={day}
                on:click={() => showDialog(day)}
            >
                        {getDate(day)}
            </li>
        {/each}
                    {#each paddableDaysOfNextMonth as day}
                <li class="cal__date cal__date--prev-month" data-value={day}>{getDate(day)}</li>
            {/each}
    </ul>

    <Dialog show={showModal}>
        <div>
            <Thing {forDate} />
        </div>
    </Dialog>
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