'use strict';
const looks = {
 match: {image:'showcase/color-match.webp',source:'showcase/source.webp',label:'AI Look Match',caption:'01 — Reference-inspired colour, applied in Resolve.'},
 kodak: {image:'showcase/kodak-vision-gate.webp',source:'showcase/source.webp',label:'Kodak Vision + Gate',caption:'02 — Kodak Vision grain and a film gate. Actual plugin export.'},
 fuji: {image:'showcase/window/fuji-eterna.webp',source:'showcase/window/original.webp',label:'Fuji Eterna Grain',caption:'03 — Fuji Eterna texture on the window portrait.'},
 halation: {image:'showcase/gate-halation.webp',source:'showcase/source.webp',label:'Gate Halation',caption:'04 — Warm gate halation. The final finishing stage.'},
 window: {image:'showcase/window/color-match.webp',source:'showcase/window/original.webp',label:'Window Portrait / Colour Match'},
 windowglow: {image:'showcase/window/gate-halation.webp',source:'showcase/window/original.webp',label:'Window Portrait / Gate Halation'}
};
function bindComparison(id){const box=document.getElementById(id),range=box.querySelector('input');const update=()=>{box.style.setProperty('--split',range.value+'%');range.setAttribute('aria-valuetext',range.value+'% original image')};range.addEventListener('input',update);update()}
bindComparison('hero-comparison');bindComparison('dialog-comparison');
document.querySelectorAll('[data-look]').forEach(button=>button.addEventListener('click',()=>{
 const look=looks[button.dataset.look];document.getElementById('hero-result').src='assets/'+look.image;document.getElementById('hero-result').alt=look.label+' processed in Grade + Grain';document.getElementById('hero-source').src='assets/'+look.source;document.getElementById('hero-source').alt=button.dataset.look==='fuji'?'Original window portrait':'Original night portrait';document.getElementById('hero-label').textContent=look.label;document.getElementById('hero-caption').textContent=look.caption;
 document.querySelectorAll('[data-look]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter});
}));
const dialog=document.getElementById('look-dialog');let lastOpener;
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{
 const look=looks[button.dataset.open];lastOpener=button;document.getElementById('dialog-result').src='assets/'+look.image;document.getElementById('dialog-result').alt=look.label+' processed result';document.getElementById('dialog-source').src='assets/'+look.source;document.getElementById('dialog-title').textContent=look.label;document.getElementById('dialog-label').textContent=look.label;dialog.showModal();document.body.style.overflow='hidden';
}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastOpener?.focus()});
const tools={
 match:{kicker:'YOUR REFERENCE. YOUR FOOTAGE.',title:'A starting point. With a point of view.',description:'Read the contrast, colour balance and mood of a reference frame. Bring that direction into your footage, then make it your own.',image:'showcase/reference.webp',label:'THE LOOK REFERENCE',alt:'Colour reference used for the night portrait look',link:'#showcase',cta:'Explore the workflow ↗'},
 chroma:{kicker:'AI PROPOSES. YOU DECIDE.',title:'Make the grade your own.',description:'Exposure, highlight rolloff, shadow knee and creative veto controls. Shape the image with Chroma Pulp, directly inside your Resolve timeline.',image:'chroma-pulp-resolve.webp',label:'CHROMA PULP / INSIDE RESOLVE',alt:'Actual Chroma Pulp controls inside DaVinci Resolve',link:'#texture',cta:'See it inside Resolve ↗'},
 signature:{kicker:'CAPTURE THE CHARACTER.',title:'One look. Your entire pipeline.',description:'Analyse the contrast and saturation signature of a reference, preview the result and export a .cube LUT. Adjust the global blend to keep the final say.',image:'showcase/window/reference.webp',label:'REFERENCE FRAME / LOOK SIGNATURE INPUT',alt:'Window portrait colour reference illustrating input to Look Signature',link:'#beta',cta:'Join the beta ↗'},
 grain:{kicker:'THE FINAL LAYER.',title:'Give the image a little life.',description:'Explore Kodak, Fuji and custom film textures. Shape grain amount and size, then finish with halation and bloom for the character your image needs.',image:'showcase/window/fuji-eterna.webp',label:'FUJI ETERNA / ACTUAL PLUGIN EXPORT',alt:'Window portrait exported with Fuji Eterna grain',link:'#stocks',cta:'Explore film stocks ↗'}
};
function selectTool(key){const tool=tools[key];document.getElementById('tool-kicker').textContent=tool.kicker;document.getElementById('tool-title').textContent=tool.title;document.getElementById('tool-description').textContent=tool.description;document.getElementById('tool-image').src='assets/'+tool.image;document.getElementById('tool-image').alt=tool.alt;document.getElementById('tool-image-label').textContent=tool.label;document.getElementById('tool-link').href=tool.link;document.getElementById('tool-link').textContent=tool.cta;document.querySelectorAll('[data-tool]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tool===key)))}
document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>selectTool(button.dataset.tool)));
document.querySelector('[data-jump-grain]').addEventListener('click',()=>selectTool('grain'));
