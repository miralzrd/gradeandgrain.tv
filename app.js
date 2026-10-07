'use strict';
const looks = {
 match: {image:'editorial/cinema-look.webp',source:'editorial/cinema-neutral.webp',label:'Creative grade',caption:'01 — Blue hour / cinematic concept preview.'},
 kodak: {image:'editorial/cinema-look.webp',source:'editorial/cinema-neutral.webp',label:'Warm film',caption:'02 — Warm film / illustrative colour treatment.'},
 fuji: {image:'editorial/daylight-look.webp',source:'editorial/daylight-neutral.webp',label:'Soft film',caption:'03 — Soft daylight / illustrative colour treatment.'},
 halation: {image:'editorial/cinema-look.webp',source:'editorial/cinema-neutral.webp',label:'Bloom study',caption:'04 — Warm bloom / illustrative finishing study.'},
 window: {image:'editorial/daylight-look.webp',source:'editorial/daylight-neutral.webp',label:'Daylight / Creative grade'},
 windowglow: {image:'editorial/daylight-look.webp',source:'editorial/daylight-neutral.webp',label:'Daylight / Bloom study'}
};
function bindComparison(id){const box=document.getElementById(id),range=box.querySelector('input');const update=()=>{box.style.setProperty('--split',range.value+'%');range.setAttribute('aria-valuetext',range.value+'% original image')};range.addEventListener('input',update);update()}
bindComparison('hero-comparison');bindComparison('dialog-comparison');
document.querySelectorAll('[data-look]').forEach(button=>button.addEventListener('click',()=>{
 const look=looks[button.dataset.look];document.getElementById('hero-result').dataset.treatment=button.dataset.look;document.getElementById('hero-result').src='assets/'+look.image;document.getElementById('hero-result').alt=look.label+' — illustrative concept preview';document.getElementById('hero-source').src='assets/'+look.source;document.getElementById('hero-source').alt=button.dataset.look==='fuji'?'Original window portrait':'Original night portrait';document.getElementById('hero-label').textContent=look.label;document.getElementById('hero-caption').textContent=look.caption;
 document.querySelectorAll('[data-look]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter});
}));
const dialog=document.getElementById('look-dialog');let lastOpener;
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{
 const look=looks[button.dataset.open];document.getElementById('dialog-result').dataset.treatment=button.dataset.open;lastOpener=button;document.getElementById('dialog-result').src='assets/'+look.image;document.getElementById('dialog-result').alt=look.label+' — illustrative concept preview';document.getElementById('dialog-source').src='assets/'+look.source;document.getElementById('dialog-title').textContent=look.label;document.getElementById('dialog-label').textContent=look.label;dialog.showModal();document.body.style.overflow='hidden';
}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastOpener?.focus()});
const tools={
 match:{kicker:'YOUR REFERENCE. YOUR FOOTAGE.',title:'A starting point. With a point of view.',description:'Read the contrast, colour balance and mood of a reference frame. Bring that direction into your footage, then make it your own.',image:'editorial/cinema-look.webp',label:'THE LOOK REFERENCE',alt:'AI-generated cinema portrait colour reference',link:'#showcase',cta:'Explore the workflow ↗'},
 chroma:{kicker:'AI PROPOSES. YOU DECIDE.',title:'Make the grade your own.',description:'Exposure, highlight rolloff, shadow knee and creative veto controls. Shape the image with Chroma Pulp, directly inside your Resolve timeline.',image:'chroma-pulp-resolve.webp',label:'CHROMA PULP / INSIDE RESOLVE',alt:'Actual Chroma Pulp controls inside DaVinci Resolve',link:'#texture',cta:'See it inside Resolve ↗'},
 signature:{kicker:'CAPTURE THE CHARACTER.',title:'One look. Your entire pipeline.',description:'Analyse the contrast and saturation signature of a reference, preview the result and export a .cube LUT. Adjust the global blend to keep the final say.',image:'editorial/daylight-look.webp',label:'REFERENCE FRAME / LOOK SIGNATURE INPUT',alt:'AI-generated Mediterranean daylight colour reference',link:'#beta',cta:'Join the beta ↗'},
 grain:{kicker:'THE FINAL LAYER.',title:'Give the image a little life.',description:'Explore Kodak, Fuji and custom film textures. Shape grain amount and size, then finish with halation and bloom for the character your image needs.',image:'soft-block-g.png',label:'EMULSION-INSPIRED / G PALETTE STUDIES',alt:'Grade and Grain G logo emulsion preview',link:'#stocks',cta:'Explore film stocks ↗'}
};
function selectTool(key){const tool=tools[key];document.querySelector('.tool-visual').dataset.tool=key;document.getElementById('tool-kicker').textContent=tool.kicker;document.getElementById('tool-title').textContent=tool.title;document.getElementById('tool-description').textContent=tool.description;document.getElementById('tool-image').src='assets/'+tool.image;document.getElementById('tool-image').alt=tool.alt;document.getElementById('tool-image-label').textContent=tool.label;document.getElementById('tool-link').href=tool.link;document.getElementById('tool-link').textContent=tool.cta;document.querySelectorAll('[data-tool]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tool===key)))}
document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>selectTool(button.dataset.tool)));
document.querySelector('[data-jump-grain]').addEventListener('click',()=>selectTool('grain'));
