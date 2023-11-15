// ==UserScript==
// @name         调试工具
// @namespace    http://tampermonkey.net/
// @version      2
// @description  在移动设备上使用Eruda或vConsole进行调试
// @author       tutu
// @match        *://*/*
// @require      https://cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';
  let isEruda = true;
  let vConsole;

  function addToggleButton() {
    const btn = document.createElement('button');
    btn.innerText = '切换调试工具';
    btn.style.position = 'fixed';
    btn.style.right = '10px';
    btn.style.bottom = '10px';
    btn.style.zIndex = '9999';
    btn.addEventListener('click', toggleDebugger);
    document.body。appendChild(btn);
  }

  function toggleDebugger() {
    isEruda = !isEruda;
    if (isEruda) {
      eruda.show();
      vConsole.hide();
    } else {
      eruda.hide();
      vConsole.show();
    }
  }

  function initEruda() {
    eruda.init();
  }

  function initVConsole() {
    vConsole = new window.VConsole();
  }

  function init() {
    GM_registerMenuCommand('使用 Eruda 进行调试', function () {
      isEruda = true;
      eruda.show();
      vConsole.hide();
    });
    GM_registerMenuCommand('使用 vConsole 进行调试', function () {
      isEruda = false;
      eruda.hide();
      vConsole.show();
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (typeof eruda !== 'undefined') {
        initEruda();
        addToggleButton();
      } else {
        const script = document.createElement('script');
        script.src = '//cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js';
        script.onload = function () {
          initEruda();
          addToggleButton();
        };
        document.body。appendChild(script);
      }
      if (typeof window.VConsole === 'function') {
        initVConsole();
      } else {
        const script = document.createElement('script');
        script.src = '//cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js';
        script.onload = initVConsole;
        document.body。appendChild(script);
      }
      eruda.init();
    }
  }

  init();
})();
