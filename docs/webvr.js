(function() {
  'use strict';

  function vrAnimate() {
    var cords = display.getPose();
    SendMessage('WebVRCamera', 'TiltX', cords.orientation[0]);
    SendMessage('WebVRCamera', 'TiltY', cords.orientation[1]);
    SendMessage('WebVRCamera', 'TiltZ', cords.orientation[2]);
    SendMessage('WebVRCamera', 'TiltW', cords.orientation[3]);

    requestAnimationFrame(vrAnimate);
  }

  function initVR(displays) {
    if (displays.length > 0) {
      display = displays[0];
      WebVRConfig.DIRTY_SUBMIT_FRAME_BINDINGS = true;
      vrAnimate();
    }
  }

  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function handleClick(event) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  }

  function handleUnity(msg) {
    if (msg.detail === "Ready") {
      canvas = document.getElementById('canvas');
      loader = document.getElementById('loader');

      window.addEventListener('resize', handleResize, true); 

      canvas.addEventListener('click', handleClick, true);

      SendMessage('WebVRCamera', 'Begin');

      loader.style.display = 'none';

      navigator.getVRDisplays().then(initVR); 
    }
  }

  var display = null,
      canvas = null,
      loader = null;

  document.addEventListener('Unity', handleUnity);
})();
