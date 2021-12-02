export const calculate = (eq) =>
  new Function('return ' + eq.replace('X', '*').replace('÷', '/') + ';')();

export const resetCalcFontSize = () => {
  // Prevents the calcDisplay text from being highlighted during resize.
  window.getSelection().empty();

  // Sets the font-size to 20px
  // and increments by 1 until the correct size is found.
  $('#calcDisplay').css('font-size', '20px');
  while (parseInt($('#calcDisplay').css('font-size')) < 42) {
    const beforeWidth = $('#calcDisplay').width();
    const newFontSize = parseInt($('#calcDisplay').css('font-size')) + 1;

    $('#calcDisplay').css('font-size', `${newFontSize}px`);
    const afterWidth = $('#calcDisplay').width();

    // afterWidth is the width of the window after the font-size is incremented.
    // The text is too large if afterWidth is larger than beforeWidth,
    // i.e. the increment increased the size of the window.
    if (afterWidth > beforeWidth) {
      const newFontSize = parseInt($('#calcDisplay').css('font-size')) - 1;
      $('#calcDisplay').css('font-size', `${newFontSize}px`);
      break;
    }
  }
};

$('.calcButtonBlack').click(function() {
  if ($('#calcDisplay').html().length > 26) return;

  // Prevent "." from being inputted multiple times.
  if (
    $(this).html() == '.' &&
        document.getElementById('calcDisplay').innerHTML.includes('.')
  ) {
    return;
  }

  const beforeWidth = $('#calcDisplay').width();
  if (
    ($('#calcDisplay').html() == '0' ||
            !$.isNumeric($('#calcDisplay').html())) &&
        $(this).html() != '.'
  ) {
    document.getElementById('calcDisplay').innerHTML = $(this).html();
  } else {
    document.getElementById('calcDisplay').innerHTML += $(this).html();
  }
  let afterWidth = $('#calcDisplay').width();

  // Reduce font size to fit
  while (afterWidth > beforeWidth) {
    const newFontSize = parseInt($('#calcDisplay').css('font-size')) - 1;

    if (newFontSize >= 20) {
      $('#calcDisplay').css('font-size', newFontSize + 'px');
      afterWidth = $('#calcDisplay').width();
    } else {
      document.getElementById(
          'calcDisplay',
      ).innerHTML = document
          .getElementById('calcDisplay')
          .innerHTML.slice(0, -1);
      break;
    }
  }
});

$('.calcButtonGrey').click(function() {
  if ($(this).html() == 'C') {
    document.getElementById('calcDisplay').innerHTML = document
        .getElementById('calcDisplay')
        .innerHTML.slice(0, -1);
    if (document.getElementById('calcDisplay').innerHTML == '') {
      document.getElementById('calcDisplay').innerHTML = '0';
    }

    resetCalcFontSize();
  } else if ($(this).html() != '') {
    if ($('#calcUpperDisplay').html() == '') {
      document.getElementById('calcUpperDisplay').innerHTML =
                $('#calcDisplay').html() + ' ' + $(this).html();
    } else {
      const eq = $('#calcUpperDisplay').html() + $('#calcDisplay').html();
      document.getElementById('calcUpperDisplay').innerHTML =
                calculate(eq) + ' ' + $(this).html();
    }
    document.getElementById('calcDisplay').innerHTML = '0';
  }
});

$('.calcButtonCyan').click(function() {
  const eq = $('#calcUpperDisplay').html() + $('#calcDisplay').html();
  document.getElementById('calcDisplay').innerHTML = calculate(eq);
  document.getElementById('calcUpperDisplay').innerHTML = '';
});
