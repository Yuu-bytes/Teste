(()=>{'use strict';
const pad=document.querySelector('.move-pad');if(!pad)return;
const down=(key,button,e)=>{e.preventDefault();button.classList.add('pressed');window.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true}))};
const up=(key,button,e)=>{e.preventDefault();button.classList.remove('pressed');window.dispatchEvent(new KeyboardEvent('keyup',{key,bubbles:true}))};
pad.querySelectorAll('[data-key]').forEach(button=>{const key=button.dataset.key;button.addEventListener('pointerdown',e=>{button.setPointerCapture?.(e.pointerId);down(key,button,e)});['pointerup','pointercancel','lostpointercapture'].forEach(type=>button.addEventListener(type,e=>up(key,button,e)));button.addEventListener('contextmenu',e=>e.preventDefault())});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pad.querySelectorAll('[data-key]').forEach(button=>window.dispatchEvent(new KeyboardEvent('keyup',{key:button.dataset.key,bubbles:true})))});
})();