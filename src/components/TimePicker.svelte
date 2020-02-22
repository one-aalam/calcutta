
<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { getTime, format, addMinutes, addHours, startOfDay } from 'date-fns';
    import Icon from 'fa-svelte';
    import { faClock, faHourglass } from '@fortawesome/free-solid-svg-icons';
    export let forDate;
    const start = startOfDay(forDate);
    const times = [...Array(24).keys()].map(i => addMinutes(start, 30 * i));
    const durations = [...Array(24).keys()].map(i => 30 * (i + 1));

    let selected;
    const dispatch = createEventDispatcher();

    let dayPeriod = 0;
    const toggleDayPeriod = () => {
        dayPeriod = dayPeriod ? 0 : 12;
    }

    let _time = 0;
    const selectTime = (selTime) => {
        _time = selTime;
        change();
    }

    let _duration = 0;
    const selectDuration = (selDuration) => {
        _duration = selDuration;
        change();
    }

    const change = () => {
        if (_time) {
            const payload = {
                start: addHours(_time, dayPeriod),
                end: addMinutes(addHours(_time, dayPeriod), _duration)
            }
            dispatch('change', payload);
        }
    }

    onDestroy(() => {
        forDate = new Date();
    })

    function formatDuration(mins) {
        const hrs = mins / 60 ;
        const mns = mins % 60 ;
        return `${ hrs < 10 ? '0' : ''}${Math.floor(mins/60)}:${mins%60}${ mns === 0 ? '0' : ''}`
    }
    $: {
        console.log(_time, _duration, dayPeriod)
    }
</script>

<div class="w-full">
    <div class="flex flex-col">
        <div class="w-full">
            <div class="flex -mx-2">
                <div class="w-1/2 px-2">
                    <h3 class="py-2 uppercase font-bold text-gray-600 tracking-wide">
                        <Icon icon={faClock} /> Time
                    </h3>
                </div>
                <div class="w-1/2 px-2">
                    <div class="flex flex-row justify-end align-right self-right">
                        <button on:click={toggleDayPeriod} class="px-3 py-1 {!dayPeriod && 'font-bold text-gray-600'}">AM</button> | <button on:click={toggleDayPeriod} class="px-3 {dayPeriod && 'font-bold text-gray-600'}">PM</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-gray-200 border-gray-200 focus:white mb-2 p-2 overflow-x-auto scrolling-auto ss-x">
            <div class="flex flex-row">
                {#each times as time}
                    <button on:click={() => selectTime(time)} class="{_time && _time === time && 'font-bold text-gray-600'} px-3 ss-align-center">{format(time, 'KK:mm')}</button>
                {/each}
            </div>
        </div>
        <h3 class="py-2 uppercase font-bold text-gray-600 tracking-wide">
            <Icon icon={faHourglass} /> Duration
        </h3>
        <div class="w-full bg-gray-200 border-gray-200 focus:white mb-2 p-2 overflow-x-auto scrolling-auto ss-x">
            <div class="flex flex-row">
                {#each durations as duration}
                    <button on:click={() => selectDuration(duration)} class="{_duration && _duration === duration && 'font-bold text-gray-600'} px-3 ss-align-center">{formatDuration(duration)}</button>
                {/each}
            </div>
        </div>
        <div class="w-full mt-2">
            <div class="flex -mx-2">
                <div class="w-1/3 px-2">
                    <button class="w-full h-10 bg-gray-200 border-gray-500 disabled">Now</button>
                </div>
                <div class="w-1/3 px-2">
                    <button class="w-full h-10 bg-gray-200 border-gray-500 disabled">In 30 min</button>
                </div>
                <div class="w-1/3 px-2">
                    <button class="w-full h-10 bg-gray-200 border-gray-500 disabled">In 1 hour</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .ss-x {
        scroll-snap-type: x mandatory;
        scroll-padding: 0 50%;
    }
    .ss-align-center {
        scroll-snap-align: center;
    }
</style>