<script>

    import VideoPlay from './VideoPlay.svelte';
    export let src = "gone.mp4";
    export const title = '';
    let videoElm,
        progressElm,
        playPauseCurrCls,
        currTime = '00:00';
    let playPausIconCls = {
        play: 'play',
        pause: 'pause'
    }

    let _showCtrl = false;
    let isPlaying = false;

    playPausIconCls = playPausIconCls.play;

    function onPlay() {
        toggleVideoStatus();
    }

    function onStop() {
        toggleVideoStatus();
    }

    function toggleVideoStatus() {
        if (videoElm.paused) {
            videoElm.play();
            isPlaying = true;
        } else {
            videoElm.pause();
            isPlaying = false;
        }
    }

    function onTimeUpdate() {
        progressElm.value = (videoElm.currentTime / videoElm.duration) * 100;

        // Get minutes
        let mins = Math.floor(videoElm.currentTime / 60);
        if (mins < 10) {
            mins = '0' + String(mins);
        }

        // Get seconds
        let secs = Math.floor(videoElm.currentTime % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }

        currTime  = `${mins}:${secs}`;
    }

    function setVideoProgress() {
        videoElm.currentTime = (+progressElm.value * videoElm.duration) / 100;
    }

    // Stop video
    function stopVideo() {
        videoElm.currentTime = 0;
        videoElm.pause();
    }

    function showCtrl() {
        _showCtrl = true;
    }
</script>


<div class="video-player">
    <video bind:this={videoElm} {src} id="video" class="screen" poster="img/poster.png" on:hover={showCtrl} on:timeupdate={onTimeUpdate}></video>
    <!-- <div class="player-ctrl" on:click={toggleVideoStatus}>
        <VideoPlay/>
    </div> -->
</div>

<div class="controls">
    {#if isPlaying}
        <button class="btn" id="play" on:click={toggleVideoStatus}>
            <i class="fa fa-pause fa-2x"></i>
        </button>
    {:else}
        <button class="btn" id="play" on:click={toggleVideoStatus}>
            <i class="fa fa-play fa-2x"></i>
        </button>
    {/if}
    <button class="btn" id="stop" on:click={stopVideo}>
        <i class="fa fa-stop fa-2x"></i>
    </button>
    <input
    type="range"
    bind:this={progressElm}
    on:change={setVideoProgress}
    class="progress"
    min="0"
    max="100"
    step="0.1"
    value="0"
    />
    <span class="timestamp" id="timestamp">{@html currTime }</span>
</div>

<style>

.screen {
  cursor: pointer;
  width: 60%;
  background-color: #000 !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.video-player {
    position: relative;
}
/* .player-ctrl {
    position: absolute;
    top: 0;
    left: 0;
} */

.controls {
  background: #333;
  color: #fff;
  width: 60%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.controls .btn {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.controls .fa-play {
  color: #28a745;
}

.controls .fa-stop {
  color: #dc3545;
}

.controls .fa-pause {
  color: #fff;
}

.controls .timestamp {
  color: #fff;
  font-weight: bold;
  margin-left: 10px;
}

.btn:focus {
  outline: 0;
}

@media (max-width: 800px) {
  .screen,
  .controls {
    width: 90%;
  }
}


input[type='range'] {
	-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
	width: 100%; /* Specific width is required for Firefox. */
	background: transparent; /* Otherwise white in Chrome */
}

input[type='range']::-webkit-slider-thumb {
	-webkit-appearance: none;
}

input[type='range']:focus {
	outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type='range']::-ms-track {
	width: 100%;
	cursor: pointer;

	/* Hides the slider so custom styles can be added */
	background: transparent;
	border-color: transparent;
	color: transparent;
}

/* Special styling for WebKit/Blink */
input[type='range']::-webkit-slider-thumb {
	-webkit-appearance: none;
	border: 1px solid #000000;
	height: 36px;
	width: 16px;
	border-radius: 3px;
	background: #ffffff;
	cursor: pointer;
	margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
}

/* All the same stuff for Firefox */
input[type='range']::-moz-range-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #000000;
	height: 36px;
	width: 16px;
	border-radius: 3px;
	background: #ffffff;
	cursor: pointer;
}

/* All the same stuff for IE */
input[type='range']::-ms-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #000000;
	height: 36px;
	width: 16px;
	border-radius: 3px;
	background: #ffffff;
	cursor: pointer;
}

input[type='range']::-webkit-slider-runnable-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	background: #3071a9;
	border-radius: 1.3px;
	border: 0.2px solid #010101;
}

input[type='range']:focus::-webkit-slider-runnable-track {
	background: #367ebd;
}

input[type='range']::-moz-range-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	background: #3071a9;
	border-radius: 1.3px;
	border: 0.2px solid #010101;
}

input[type='range']::-ms-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	border-width: 16px 0;
	color: transparent;
}
input[type='range']::-ms-fill-lower {
	background: #2a6495;
	border: 0.2px solid #010101;
	border-radius: 2.6px;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type='range']:focus::-ms-fill-lower {
	background: #3071a9;
}
input[type='range']::-ms-fill-upper {
	background: #3071a9;
	border: 0.2px solid #010101;
	border-radius: 2.6px;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type='range']:focus::-ms-fill-upper {
	background: #367ebd;
}
</style>