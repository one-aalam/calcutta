
<script>
    import { onMount } from 'svelte';
    export let show = false;
    let dialog = null;
    onMount(() => {
        dialog.focus();
    })

    function closeDialog() {
        show = false;
    }

    function onKeydown(event) {
        if (event.keyCode === 27) {
            this.closeDialog();
        }
    }
</script>



<dialog bind:this={dialog} id="dialog" class="cal__date {show ? 'dialog--open' : ''}" aria-modal="true" aria-hidden={!show}>
    <button on:click={closeDialog}>X</button>
    <div class="content">
        <slot>  <!-- content goes here --> </slot>
    </div>
</dialog>
<svelte:body on:keydown={onKeydown}/>
<style>
  dialog {
    width: 300px;
    height: 200px;
    backdrop-filter: blur(0.8);
  }
  .dialog--open {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      position: fixed;
  }
  dialog.dialog--open:backdrop {
      backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, .5);
  }
</style>