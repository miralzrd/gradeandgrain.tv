'use strict';
(() => {
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.getElementById('motion-player'),toggle=document.getElementById('motion-toggle');
 const selectors=[...document.querySelectorAll('[data-preview]')];
 const films=new Map(selectors.map(b=>[b.dataset.preview,b.dataset.title]));
 const modal=document.getElementById('film-dialog'),full=document.getElementById('full-film');
 let selected=selectors[0].dataset.preview,paused=reduced.matches,inView=false,opener;
 const previewURL=id=>'https://player.vimeo.com/video/'+id+'?background=1&autoplay=1&loop=1&muted=1&dnt=1';
 function refreshHero(){
  const run=inView&&!paused&&!document.hidden&&!modal.open;
  hero.hidden=!run;
  if(run){const url=previewURL(selected);if(hero.getAttribute('src')!==url)hero.src=url}
  else hero.removeAttribute('src');
  toggle.textContent=paused?'Play preview':'Pause preview';toggle.setAttribute('aria-pressed',String(paused));
 }
 toggle.addEventListener('click',()=>{paused=!paused;refreshHero()});
 selectors.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.preview;document.querySelector('.motion-screen').style.backgroundImage='url("'+b.dataset.poster+'")';hero.title='Muted portfolio preview: '+b.dataset.title;document.getElementById('motion-watch').dataset.film=selected;selectors.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));refreshHero()}));
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;refreshHero()},{threshold:.15}).observe(hero);else{inView=true;refreshHero()}
 document.addEventListener('visibilitychange',refreshHero);
 reduced.addEventListener('change',()=>{paused=reduced.matches;refreshHero()});
 document.querySelectorAll('[data-film]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.film;if(!films.has(id))return;opener=button;document.getElementById('film-dialog-title').textContent=films.get(id);full.title=films.get(id);document.getElementById('vimeo-fallback').href='https://vimeo.com/'+id;modal.showModal();document.body.style.overflow='hidden';refreshHero();full.src='https://player.vimeo.com/video/'+id+'?autoplay=1&dnt=1';
 }));
 document.getElementById('film-close').addEventListener('click',()=>modal.close());
 modal.addEventListener('close',()=>{full.removeAttribute('src');document.body.style.overflow='';refreshHero();opener?.focus()});
 modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});
 document.querySelectorAll('.film-card').forEach(card=>{
  const frame=card.querySelector('iframe');
  const start=()=>{if(!reduced.matches&&!modal.open){frame.hidden=false;frame.src=previewURL(frame.dataset.filmPreview)}};
  const stop=()=>{frame.removeAttribute('src');frame.hidden=true};
  card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')start()});card.addEventListener('pointerleave',stop);card.addEventListener('focusin',start);card.addEventListener('focusout',stop);card.querySelector('button').addEventListener('click',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 });
 refreshHero();
})();
