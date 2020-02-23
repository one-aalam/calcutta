<script>
    import { onDestroy } from 'svelte';
    import Icon from 'fa-svelte';
    import { faArrowCircleRight, faArrowCircleLeft, faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons';
    import Modal from './Modal.svelte';
    import CreateEvent from './CreateEvent.svelte';
    import Day from './Day.svelte';
    import { createCalStore } from '../store';

    const calStore = createCalStore([]);
    let showModal = false;
    import { eachDayOfInterval, getDaysInMonth, getMonth, getYear, startOfMonth, endOfMonth, getDate, getDay, isToday,isBefore, addMonths, subMonths, addDays, subDays, getTime, format } from 'date-fns';
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

    function onAdded(e) {
        showModal = !showModal
        calStore.add(e.detail);
    }
    let events;
    const unsub = calStore.subscribe(val => events = val);
    onDestroy(unsub);

</script>

<div class="main grid max-w-6xl grid-cols-1 lg:grid-cols-3">
<main class="bg-white p-8 max-w-4xl col-span-1 lg:col-span-2 shadow-xl rounded-sm">
    <!-- Month: Header -->
    <div class="header flex flex-row p-8">
        <div class="col flex-1 justify-center self-center text-left">
            <button class="text-3xl text-indigo-300 hover:text-indigo-400" on:click={prev}>
                <Icon icon={faArrowCircleLeft} class="o"></Icon>
            </button>
        </div>
        <div class="col flex-1 text-3xl">
            {monthName}&nbsp;<span class="normal text-gray-600">{year}</span>
        </div>
        <div class="col flex-1 justify-center self-center text-right">
            <button class="text-3xl text-indigo-300 hover:text-indigo-400" on:click={next}>
                <Icon icon={faArrowCircleRight} class="o"></Icon>
            </button>
        </div>
    </div>

    <!-- Month: Day Headings-->
    <div class="grid grid-cols-7">
        {#each weekdays as dayOfWeek}
            <div class="cal__date w-16 h-12 flex justify-center content-center font-bold">{dayOfWeek}</div>
        {/each}
    </div>
    <!-- Month: Day -->
    <div class="grid grid-cols-7">
            {#each paddableDaysOfPrevMonth as day}
                <Day {day} hint={true} />
            {/each}
            {#each eachDayOfCurrMonth as day}
                <Day {day} today={_date} on:click={(evt) => showDialog(day, evt)} />
            {/each}
            {#each paddableDaysOfNextMonth as day}
                <Day {day} hint={true} />
            {/each}
    </div>

    <!-- Month: Create Event Modal -->
    <Modal show={showModal} title={'Add an Event'}>
         <CreateEvent {forDate} on:added={onAdded} on:dismiss={() => showModal = !showModal} />
    </Modal>
</main>
<aside class="max-w-xs col-span-3 lg:col-span-1 flex flex-row lg:flex-col overflow-x-scroll pt-2 lg:pl-2">
    <p class="text-2xl font-semibold"> <Icon icon={faCalendarDay} />  Events</p>
    {#if events}
        {#each events as event}
            <div class="w-32 h-20 bg-gray-400 rounded-sm border-gray-300 p-4 lg:w-full mr-2 lg:mr-0 lg:mb-2">
                <h4 class="font-medium"><Icon icon={faClock} />{event.title}</h4>
                <h6>{event.detail.start && format(event.detail.start, 'EEEE, do MMM')}</h6>
            </div>
        {/each}
    {:else}
        <div class="flex justify-center content-center">
            No events added yet! Please add the first event for...
        </div>
    {/if}

</aside>
</div>