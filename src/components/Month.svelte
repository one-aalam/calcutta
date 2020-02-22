<script>
    import { onDestroy } from 'svelte';
    import Icon from 'fa-svelte';
    import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
    import Modal from './Modal.svelte';
    import CreateEvent from './CreateEvent.svelte';
    import Day from './Day.svelte';
    import { createCalStore } from '../store';

    const calStore = createCalStore([]);
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

    function onAdded(e) {
        showModal = !showModal
        calStore.add(e.detail);
    }

    const unsub = calStore.subscribe(val => console.log(val));
    onDestroy(unsub);

</script>

<main>
    <div class="header flex flex-row p-8">
        <!-- <button class="w-16 h-16 text-white outline-none border-none focus:outline-none shadow-xl rounded-full transition duration-500 ease-in-out" on:click={backward5}>
            <Icon icon={faBackward} class="o"></Icon>
        </button> -->
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

    <div class="cal">
        {#each weekdays as dayOfWeek}
            <div class="cal__date w-12 h-12 font-bold">{dayOfWeek}</div>
        {/each}
    </div>
    <div class="cal">
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
    <Modal show={showModal} title={'Add an Event'}>
         <CreateEvent {forDate} on:added={onAdded} on:dismiss={() => showModal = !showModal} />
    </Modal>
</main>
<style>
    .cal {
        display: grid;
        grid-template-columns: repeat(
            7,
            1fr
        );
    }
</style>