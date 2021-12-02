import {
  close,
  minimize,
  maximize,
  resizeInit,
  clickIcon,
} from './modules/windowFunctions.js';

$('#close').click(function() {
  close(this);
});

$('#minimize').click(function() {
  minimize(this);
});

$('#maximize').click(function() {
  maximize(this);
});

$('.icon').click(function() {
  clickIcon($(this));
});

$('.top').mousedown(function() {
  resizeInit($(this), 'top');
});

$('.right').mousedown(function() {
  resizeInit($(this), 'right');
});

$('.bottom').mousedown(function() {
  resizeInit($(this), 'bottom');
});

$('.left').mousedown(function() {
  resizeInit($(this), 'left');
});

$('.brResize').mousedown(function() {
  resizeInit($(this), 'bottom');
  resizeInit($(this), 'right', true);
});

$('.blResize').mousedown(function() {
  resizeInit($(this), 'bottom');
  resizeInit($(this), 'left', true);
});

$('.tlResize').mousedown(function() {
  resizeInit($(this), 'top');
  resizeInit($(this), 'left', true);
});

$('.trResize').mousedown(function() {
  resizeInit($(this), 'top');
  resizeInit($(this), 'right', true);
});
