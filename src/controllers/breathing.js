import Granim from 'granim';
import { granimInstance } from '../lib/background.js';
import {
  timeHasPassedNotification,
  clearTimers,
  timers,
  startTimerFirstVisitOnly,
} from '../lib/breathingtimer.js';
import {
   breathe,
   headMovement,
  //  changeToFractalView,
  } from '../animations';
import {
   showMenu,
   hideMenuTimer,
   showModal,
   hideModal,
   toggleAudio,
   fadeoutMusic,
} from '../lib/breathingmenu.js';

const breatheCtrl = () => {
  // const belly = document.getElementById('belly');
  // const hands = document.getElementById('hands');
  const feelingBetterBtn = document.getElementById('feel-good-button');
  const body = document.getElementsByTagName('body')[0];
  const audio = document.getElementById('audio');
  const audioControl = document.getElementById('audio-controls');
  const instructions = document.getElementById('info');
  const exitModalButton = document.getElementById('exit-modal-button');
  const settings = document.getElementById('settings');

  // hands.addEventListener('click', changeToFractalView);
  // belly.addEventListener('click', changeToFractalView);

  const breathingPageVisited = localStorage.getItem('hasVisited');

  feelingBetterBtn.addEventListener('click', () => {
    granimInstance.changeState('dark-state');
  });
  feelingBetterBtn.addEventListener('click', clearTimers);
  settings.addEventListener('click', clearTimers);
  feelingBetterBtn.addEventListener('click', () => {
    fadeoutMusic(260);
  });
  settings.addEventListener('click', () => {
    fadeoutMusic(280);
  });
  audioControl.addEventListener('click', toggleAudio);
  body.addEventListener('click', showMenu);
  instructions.addEventListener('click', showModal);
  exitModalButton.addEventListener('click', hideModal);
  exitModalButton.addEventListener('click', () => {
    startTimerFirstVisitOnly(breathingPageVisited);
  });

  breathe();
  headMovement();
  if (!breathingPageVisited) {
    showModal();
  } else {
    setTimeout(() => {
      hideMenuTimer();
    }, 2000);
    timeHasPassedNotification(8000, '#first-msg', 0);
    timeHasPassedNotification(120000, '#after-two-min', 1);
    timeHasPassedNotification(300000, '#after-five-min', 2);
  }
};

export default breatheCtrl;