'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    img.style.left = `${startPos}px`;
    // when its > stopPos => clear the interval and resolve the promise
    const intervalID = setInterval(() => {
      img.style.left = `${imgLeft(img) + STEP_SIZE_PX}px`;
      if (imgLeft(img) > stopPos) {
        clearInterval(intervalID);
        resolve();
      }
    }, STEP_INTERVAL_MS);

    function imgLeft(img) {
      return parseInt(img.style.left.split("px")[0]);
    }
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const oldImg = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = oldImg;
      resolve();
    }, DANCE_TIME_MS);
  });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  // Use async/await syntax to loop the walk and dance functions
  while (true) {
    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img, centerPos, stopPos);
  }
}

window.addEventListener('load', catWalk);