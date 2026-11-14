'use strict';
(()=>{
 const hero=document.querySelector('.hero-showroom');if(!hero)return;
 const stage=document.querySelector('#showroomStage'),holder=document.querySelector('#showroomSlides');
 hero.classList.add('is-initializing');
 const selection=[1,3,7,8].map(id=>find(id)).filter(Boolean);
 const captions=['TERRA, TRILHA E LIBERDADE','ENCONTRE O SEU RITMO','REDESCUBRA A SUA CIDADE','ENERGIA PARA IR MAIS LONGE'];
 let current=0,drag=0,pointer=null,startX=0,startY=0,lastX=0,lastTime=0,velocity=0,horizontal=false;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 holder.innerHTML=selection.map((p,i)=>`<div class="showroom-slide" data-hero-slide="${i}" aria-hidden="${i!==0}"><img class="showroom-bike-image" src="${img(p.photo)}" alt="${p.name} — ${p.category}" draggable="false" style="--bike-zoom:${p.id===7?1.2:1.7}" ${i===0?'fetchpriority="high"':'loading="eager"'}></div>`).join('');
 const slides=[...holder.querySelectorAll('[data-hero-slide]')];
 document.querySelector('#showroomDots').innerHTML=selection.map((p,i)=>`<button type="button" data-hero-dot="${i}" aria-label="Mostrar ${p.name}" aria-pressed="${i===0}" class="${i===0?'active':''}"><span></span></button>`).join('');
 function relative(index){let r=(index-current+selection.length)%selection.length;if(r>selection.length/2)r-=selection.length;return r}
 function paint(){
  const width=Math.max(1,stage.getBoundingClientRect().width);
  slides.forEach((slide,i)=>{
   const rel=relative(i),distance=Math.abs(rel+drag/(width*.84));
   slide.style.setProperty('--slide-offset',String(rel));slide.style.setProperty('--slide-drag',drag+'px');
   slide.style.setProperty('--slide-scale',String(Math.max(.65,1-distance*.23)));
   slide.style.opacity=String(distance<=1.25?Math.max(0,1-distance*.84):0);
   slide.style.zIndex=String(10-Math.round(distance*3));slide.setAttribute('aria-hidden',String(i!==current));
  });
 }
 function select(index){
  current=(index+selection.length)%selection.length;drag=0;hero.classList.remove('is-dragging');
  const p=selection[current];
  document.querySelector('#showroomNumber').textContent=`${String(current+1).padStart(2,'0')} / ${String(selection.length).padStart(2,'0')}`;
  document.querySelector('#showroomCategory').textContent=p.category.toLocaleUpperCase('pt-BR');
  document.querySelector('#showroomDiscipline').textContent=captions[current];
  document.querySelector('#showroomName').textContent=p.name;document.querySelector('#showroomPrice').textContent=money(p.price);
  const link=document.querySelector('#showroomProductLink');link.href=`#produto/${p.id}`;link.dataset.product=String(p.id);link.setAttribute('aria-label',`Conheça a bike ${p.name}`);
  document.querySelectorAll('[data-hero-dot]').forEach(b=>{const active=Number(b.dataset.heroDot)===current;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});paint();
 }
 document.querySelector('#showroomPrev').addEventListener('click',()=>select(current-1));
 document.querySelector('#showroomNext').addEventListener('click',()=>select(current+1));
 document.querySelectorAll('[data-hero-dot]').forEach(b=>b.addEventListener('click',()=>select(Number(b.dataset.heroDot))));
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();select(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();select(current-1)}if(e.key==='Home'){e.preventDefault();select(0)}if(e.key==='End'){e.preventDefault();select(selection.length-1)}});
 stage.addEventListener('dragstart',e=>e.preventDefault());
 stage.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
  if(e.pointerType==='mouse'){e.preventDefault();stage.focus({preventScroll:true});}
  pointer=e.pointerId;startX=lastX=e.clientX;startY=e.clientY;lastTime=e.timeStamp;velocity=0;horizontal=false;
  stage.setPointerCapture(e.pointerId);hero.classList.add('is-dragging');
 });
 stage.addEventListener('pointermove',e=>{
  const bounds=stage.getBoundingClientRect();
  if(pointer===null){
   if(e.pointerType==='mouse'&&!reduced.matches){stage.style.setProperty('--pointer-x',String((e.clientX-bounds.left)/bounds.width-.5));stage.style.setProperty('--pointer-y',String((e.clientY-bounds.top)/bounds.height-.5));}
   return;
  }
  if(e.pointerId!==pointer)return;
  const dx=e.clientX-startX,dy=e.clientY-startY;
  if(!horizontal&&Math.abs(dy)>Math.abs(dx)+12){finish(false);return}
  if(Math.abs(dx)>7)horizontal=true;
  if(horizontal){drag=Math.max(-bounds.width*.95,Math.min(bounds.width*.95,dx));const dt=e.timeStamp-lastTime;if(dt>0)velocity=(e.clientX-lastX)/dt;lastX=e.clientX;lastTime=e.timeStamp;paint();}
 });
 function finish(commit){
  if(pointer===null)return;const id=pointer;pointer=null;
  if(stage.hasPointerCapture(id))stage.releasePointerCapture(id);
  const threshold=Math.min(90,stage.getBoundingClientRect().width*.14);
  if(commit&&horizontal&&(Math.abs(drag)>threshold||(Math.abs(velocity)>.5&&Math.abs(drag)>25)))select(current+(drag<0?1:-1));else select(current);
  horizontal=false;velocity=0;
 }
 stage.addEventListener('pointerup',()=>finish(true));stage.addEventListener('pointercancel',()=>finish(false));stage.addEventListener('lostpointercapture',()=>finish(false));
 stage.addEventListener('pointerleave',()=>{if(pointer===null){stage.style.setProperty('--pointer-x','0');stage.style.setProperty('--pointer-y','0')}});
 window.addEventListener('resize',paint);select(0);requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.remove('is-initializing')));
})();
