/* eslint-disable no-invalid-this */
import {
  resetCalcFontSize,
} from './calc.js';

const getWindowIcon = (that) => {
  const windowId = $(that).parent().parent().attr('id');
  return `#${windowId}Icon`;
};

const getWindow = (that) => that.parent().parent();

export const close = (that) => {
  const targetWindow = getWindow($(that));

  targetWindow.css({
    transform: 'scale(0.9)',
    opacity: '0',
  });
  $(getWindowIcon(that)).css('box-shadow', 'none');
  setTimeout(() => targetWindow.hide(), 250);
};

export const minimize = (that) => {
  const targetWindow = getWindow($(that));
  const y = window.innerHeight -
    targetWindow.position().top -
    targetWindow.height() + 50;
  const x = $(getWindowIcon(that)).position().left -
    targetWindow.position().left -
    targetWindow.width() / 2;

  targetWindow.css({
    'transform': `translate(${x}px, ${y}px) scale(0.5)`,
    'opacity': '0',
  });
  setTimeout(() => targetWindow.hide(), 250);
};

export const maximize = (that) => {
  const targetWindow = getWindow($(that));

  targetWindow.css({'left': '0px', 'top': '0px',
    'width': `${window.innerWidth}px`,
    'height': `${window.innerHeight - 40}px`});
};

export const clickIcon = (that) => {
  const iconIdArr = that.attr('id').split('');
  const windowId = `#${iconIdArr.splice(0, iconIdArr.length - 4).join('')}`;

  if ($(windowId).css('display') == 'none') {
    $(windowId).show();
    that.css('box-shadow', 'inset 0px -2px 0px 0px rgba(179,247,255,1)');
    setTimeout(() => $(windowId).css({
      transform: 'scale(1)',
      opacity: '1',
    }), 50);
  } else {
    $(windowId).find('#minimize').click();
  }
};

let rightResize = false;
let leftResize = false;
let bottomResize = false;
let topResize = false;
let windowMove = false;
let sideLocation = [];
let startHeight = 0;
let startWidth = 0;
let leftOffset = 0;
let topOffset = 0;

$(document).mouseup(function() {
  rightResize = leftResize = bottomResize = topResize = windowMove = false;
  sideLocation = [];
});

export const resizeInit = (that, dir, secondDir = false) => {
  const targetWindow = that.parent();
  const sideLocationI = (secondDir) ? 1 : 0;

  if (dir == 'right' || dir == 'left') {
    startWidth = parseInt(targetWindow.css('width'));
  }
  if (dir == 'top' || dir == 'bottom') {
    startHeight = parseInt(targetWindow.css('height'));
  }
  if (dir == 'right') rightResize = targetWindow;
  if (dir == 'bottom') bottomResize = targetWindow;
  if (dir == 'left') leftResize = targetWindow;
  if (dir == 'top') topResize = targetWindow;

  sideLocation[sideLocationI] = parseInt(targetWindow.css(
      dir.replace('right', 'left').replace('bottom', 'top')));
  if (dir == 'right' || dir == 'bottom') {
    sideLocation[sideLocationI] += parseInt(targetWindow.css(
        dir.replace('right', 'width').replace('bottom', 'height')));
  }
};

$('.windowHeader').mousedown(function(e) {
  windowMove = $(this).parent();
  leftOffset = parseInt(windowMove.css('left')) - e.clientX;
  topOffset = parseInt(windowMove.css('top')) - e.clientY;
});

document.addEventListener('mousemove', function(e) {
  const sideDir2LocationI = (sideLocation.length === 2) ? 1 : 0;

  if (windowMove != false) {
    const left = e.clientX + leftOffset;
    const top = e.clientY + topOffset;
    const bounds = {top: 0, left: 0,
      bottom: window.innerHeight - parseInt(windowMove.css('height')) - 40,
      right: window.innerWidth - parseInt(windowMove.css('width')),
    };

    windowMove.css({
      left: `${left}px`,
      top: `${top}px`,
    });

    if (parseInt(windowMove.css('top')) < bounds.top) {
      windowMove.css('top', bounds.top);
    }
    if (parseInt(windowMove.css('left')) < bounds.left) {
      windowMove.css('left', bounds.left);
    }
    if (parseInt(windowMove.css('top')) > bounds.bottom) {
      windowMove.css('top', bounds.bottom);
    }
    if (parseInt(windowMove.css('left')) > bounds.right) {
      windowMove.css('left', bounds.right);
    }
  }

  if (rightResize != false) {
    const width = e.clientX - sideLocation[sideDir2LocationI] + startWidth;

    rightResize.css('width', `${width}px`);
    if (rightResize.attr('id') == 'calc') resetCalcFontSize();
  }

  if (bottomResize != false) {
    const height = e.clientY - sideLocation[0] + startHeight;

    bottomResize.css('height', `${height}px`);
  }

  if (topResize != false) {
    const top = e.clientY + 3;
    const height = startHeight + sideLocation[0] - e.clientY - 3;
    const bounds = sideLocation[0] + startHeight -
        parseInt(topResize.css('min-height'));

    topResize.css({
      'top': `${top}px`,
      'height': `${height}px`,
    });
    if (parseInt(topResize.css('top')) > bounds) {
      topResize.css('top', `${bounds}px`);
    }
  }

  if (leftResize != false) {
    const left = e.clientX + 3;
    const width = startWidth + sideLocation[sideDir2LocationI] - e.clientX - 3;
    const bounds = sideLocation[sideDir2LocationI] + startWidth -
      parseInt(leftResize.css('min-width'));

    leftResize.css({
      'left': `${left}px`,
      'width': `${width}px`,
    });

    if (parseInt(leftResize.css('left')) > bounds) {
      leftResize.css('left', bounds + 'px');
    }
    if (leftResize.attr('id') == 'calc') resetCalcFontSize();
  }
});
