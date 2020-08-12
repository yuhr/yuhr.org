'use strict';

import './index.css';
import './index.html';
import './favicon.svg';

let scroll,
    width_client,
    ind,
    toc_as,
    mid,
    min_top,
    max_bottom,
    nav_rect,
    nav_right,
    nav,
    toc,
    half_screen,
    first_item,
    last_item,
    half_first_item,
    half_last_item;
let is_init_onscroll = false;


function onresize() {
  width_client = document.documentElement.clientWidth;
  if (width_client < 864) return;

  let content_rect = document.getElementById('content').getBoundingClientRect();
  min_top = content_rect.top + scroll;
  max_bottom = content_rect.bottom + scroll;
  nav_right = document.documentElement.clientWidth - content_rect.left;
  half_screen = document.documentElement.clientHeight/2;
  half_first_item = first_item.clientHeight/2 - ind.clientHeight/2;
  half_last_item = last_item.clientHeight/2 - ind.clientHeight/2;

  Array.prototype.forEach.call(document.getElementsByTagName('article'), (article, i) => {
    let a = nav.querySelectorAll('nav > ul >li > a')[i];
    let top = article.getBoundingClientRect().top + window.pageYOffset;
    let height = article.getElementsByTagName('section')[0]
      .getBoundingClientRect().top + window.pageYOffset - top;
    if(0 != i) {
      let hr_height = document.getElementsByTagName('hr')[0].clientHeight;
      top -= hr_height;
      height += hr_height;
    }
    a.dataset.top = top;
    a.dataset.height = height;
  });
  Array.prototype.forEach.call(document.getElementsByTagName('section'), (section, i) => {
    let a = nav.querySelectorAll('nav > ul > li > ul > li > a')[i];
    a.dataset.top = section.getBoundingClientRect().top + window.pageYOffset;
    a.dataset.height = section.clientHeight;
  });
}

// make nav fixed while viewing
function onscroll() {
  if (width_client < 864) return;

  scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  mid = scroll + half_screen;

  if(!is_init_onscroll) {
    ind = document.getElementById('indicator');
    ind.style.visibility = 'visible';
    toc_as = document.querySelectorAll('nav a');
    nav = document.getElementsByTagName('nav')[0];
    toc = document.getElementById('toc');
    consol = document.getElementById('console');
    field = document.getElementById('field');
    field.setSelectionRange(field.value.length, field.value.length);
    backfield = document.getElementById('backfield');
    backfield_span = document.querySelector('#backfield > span');
    caret = document.getElementById('caret');
    formatted = document.getElementById('formatted'); {
      field_phantom = document.createElement('div');
      field_phantom.style.position = 'absolute';
      field_phantom.style.top = "0";
      field_phantom.style.left = "0";
      field_phantom.style.letterSpacing = "0";
      field_phantom.style.visibility = "hidden";
      field_phantom.style.whiteSpace = "pre";
      backfield.appendChild(field_phantom);

      caret_phantom = document.createElement('span');
      caret_phantom.innerHTML = '&nbsp;';
    }

    first_item = toc_as[0];
    last_item = toc_as[toc_as.length-1].parentNode;
    onresize();
    is_init_onscroll = true;
  }

  nav_rect = nav.getBoundingClientRect();

  for(let i=0; i<toc_as.length; ++i) {
    let cur = toc_as[i];
    let top = parseInt(cur.dataset.top);
    let height = parseInt(cur.dataset.height);
    if(mid < top+height) {
      ind.style.top =
        Math.min(Math.max(
          first_item.getBoundingClientRect().top + half_first_item - nav_rect.top,
          cur.getBoundingClientRect().top + cur.clientHeight * (mid-top)/height - nav_rect.top),
          last_item.getBoundingClientRect().top + half_last_item - nav_rect.top)
      + 'px';
      break;
    }
  }
}

window.addEventListener('load', onscroll, true);
window.addEventListener('scroll', onscroll, true);
window.addEventListener('resize', onresize, true);
window.addEventListener('resize', onscroll, true);

// ========== CONSOLE ============================================================================

let consol,
    field,
    backfield,
    backfield_span,
    field_phantom,
    caret,
    caret_phantom,
    formatted;

function onkeydown(e) { if(e.keyCode == 9) e.preventDefault(); }
window.addEventListener('keydown', onkeydown, true);

function onkeyup(e) {
  if(e.keyCode == 9) {
    e.preventDefault();
    if(consol.dataset.visible == "false") {
      field.addEventListener('focus', field_onfocus, true);
      field.addEventListener('blur', field_onblur, true);
      field_oninput(e);
      consol.style.visibility = "visible";
      consol.style.animation = "fade 0.15s ease 0s 1 normal forwards";
      consol.addEventListener('animationend', () => {
        consol.style.opacity = "1";
        consol.style.animation = null;
        consol.removeEventListener('animationend', arguments.callee);
        consol.dataset.visible = "true";
        field.focus();
        field.addEventListener('input', field_oninput, true);
        field.addEventListener('keydown', field_onkeydown, true);
        field.addEventListener('click', field_onclick, true);
      });
    }
    else {
      consol.style.animation = "fade 0.15s ease 0s 1 reverse forwards";
      consol.addEventListener('animationend', () => {
        consol.style.visibility = "hidden";
        consol.style.opacity = "0";
        consol.style.animation = null;
        consol.removeEventListener('animationend', arguments.callee);
        consol.dataset.visible = "false";
        field.blur();
        field.removeEventListener('input', field_oninput, true);
        field.removeEventListener('focus', field_onfocus, true);
        field.removeEventListener('blur', field_onblur, true);
        field.removeEventListener('keydown', field_onkeydown, true);
        field.removeEventListener('click', field_onclick, true);
      });
    }
  }
};
window.addEventListener('keypress', onkeyup, true);

function field_oninput(e) {
  field.value = field.value
    .replace(/[\"\<\>\=\-\!\?\.\,\[\]\(\)\:\;\/\\\@\'\$\%\&\^\~\#\_\|\{\}]/g, '')
    .replace(/[bBdDfFgGjJkKlLzZ]/g, '');
  backfield_span.textContent = field.value;
  backfield_span.appendChild(caret);
  field_onkeydown(e);

  let words = field.value
    .replace(/ +/g, ' ')
    .replace(/(^ | $)/g, '')
    .split(' ');

  let result = '';
  words.forEach((word) => {
    result += '<span class="qr">' + word + '</span>';
  });
  formatted.innerHTML = result;
}
function field_onfocus(e) {
  caret.classList.add('blinking');
  caret.style.opacity = "1";
}
function field_onblur(e) {
  caret.classList.remove('blinking');
  caret.style.opacity = "0";
}
function field_onkeydown(e) {
  let q = 0;
  switch (e.keyCode) {
    case 37: q = -1; break;
    case 39: q = 1; break;
    case 36: q = -field.selectionStart; break;
    case 35: q = field.value.length - field.selectionStart; break;
  }
  field_phantom.textContent = field.value.slice(0, Math.max(0, field.selectionStart + q));
  field_phantom.appendChild(caret_phantom);
  caret.style.left = caret_phantom.getBoundingClientRect().left + "px";
  caret.classList.remove('blinking');
  caret.clientWidth = caret.clientWidth;
  caret.classList.add('blinking');
}
function field_onclick(e) { field_onkeydown(e); }