
<script>
    import { onMount } from 'svelte';
    import Icon from 'fa-svelte';
    import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
    export let title = '';
    export let show = false;
    let modal = null;
    onMount(() => {
        modal.focus();
    })

    function closeDialog() {
        show = false;
    }

    function onKeydown(event) {
        if (event.keyCode === 27) {
            show = !show;
        }
    }
    $: {
        console.log(show);
    }
</script>

<!--Modal-->
<div bind:this={modal} aria-modal="true" aria-hidden={!show} class="modal {show ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-75 ease-in fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div on:click={closeDialog} class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
            <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">{title}</p>
            <div on:click={closeDialog} class="modal-close cursor-pointer z-50">
                <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
            </div>
        </div>

        <!--Body-->
        <slot></slot>
        <!--Footer-->
        <!-- <div class="flex justify-end pt-2">
            <button on:click={closeDialog} class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">dismiss</button>
            <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Action</button>
        </div> -->
        </div>
    </div>
</div>
<svelte:body on:keydown={onKeydown} />
<style>
    .modal {
      transition: opacity 0.25s ease;
    }
</style>
