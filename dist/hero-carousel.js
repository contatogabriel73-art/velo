'use strict';
(()=>{
 const hero=document.querySelector('.hero-showroom');if(!hero)return;
 const stage=document.querySelector('#showroomStage'),holder=document.querySelector('#showroomSlides');
 hero.classList.add('is-initializing');
 const selection=[1,3,7,8].map(id=>find(id)).filter(Boolean);
 const captions=['TERRA, TRILHA E LIBERDADE','ENCONTRE O SEU RITMO','REDESCUBRA A SUA CIDADE','ENERGIA PARA IR MAIS LONGE'];
 const blurbs=['Feita para a terra solta, a raiz e a subida que você ainda não conhece.','Leve, rígida e rápida. Para quem mede o dia em quilômetros.','A cidade inteira vira atalho quando o caminho é seu.','Um empurrão a mais para chegar onde a trilha acaba.'];
 const title=document.querySelector('#showroomTitle'),pill=document.querySelector('#showroomPill'),blurb=document.querySelector('#showroomBlurb');
 let current=0,drag=0,pointer=null,startX=0,startY=0,lastX=0,lastTime=0,velocity=0,horizontal=false;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const island=hero.classList.contains('hero-island'),islandEl=document.querySelector('.showroom-island');
 holder.innerHTML=selection.map((p,i)=>`<div class="showroom-slide" data-hero-slide="${i}" aria-hidden="${i!==0}">${island?'<span class="bike-shadow"></span>':''}<img class="showroom-bike-image" src="${island?`assets/products/cutout/${p.photo}.webp`:img(p.photo)}" alt="${p.name} — ${p.category}" draggable="false" style="--bike-zoom:${p.id===7?1.2:1.7}" ${i===0?'fetchpriority="high"':'loading="eager"'}></div>`).join('');
 const slides=[...holder.querySelectorAll('[data-hero-slide]')];
 document.querySelector('#showroomDots').innerHTML=selection.map((p,i)=>`<button type="button" data-hero-dot="${i}" aria-label="Mostrar ${p.name}" aria-pressed="${i===0}" class="${i===0?'active':''}"><span></span></button>`).join('');
 // Modo ilha: apoia as rodas de cada bike no topo da ilha.
 // Mede na própria foto onde a bike começa/termina e onde as rodas tocam o chão.
 const fit=new Map();
 function measure(im){
  const c=document.createElement('canvas'),w=c.width=240,h=c.height=Math.round(240*im.naturalHeight/im.naturalWidth),x=c.getContext('2d',{willReadFrequently:true});
  x.drawImage(im,0,0,w,h);let d;try{d=x.getImageData(0,0,w,h).data}catch(e){return{x0:.05,x1:.95,yb:.75}}
  let x0=w,x1=0,yb=0;for(let y=0;y<h;y++)for(let i=0;i<w;i++){const k=(y*w+i)*4;if(d[k+3]>128&&Math.min(d[k],d[k+1],d[k+2])<200){if(i<x0)x0=i;if(i>x1)x1=i;if(y>yb)yb=y}}
  return x1>x0?{x0:x0/w,x1:(x1+1)/w,yb:(yb+1)/h}:{x0:.05,x1:.95,yb:.75};
 }
 function place(){
  if(!island||!islandEl)return;
  const iw=islandEl.offsetWidth,ih=islandEl.offsetHeight;if(!iw||!ih)return;
  const sw=stage.offsetWidth,sl=stage.offsetLeft-sw/2,st=stage.offsetTop;
  const cx=islandEl.offsetLeft-sl,base=islandEl.offsetTop+ih*.27-st,W=iw*1.02;
  slides.forEach(slide=>{
   const im=slide.querySelector('img'),sh=slide.querySelector('.bike-shadow');if(!im.naturalWidth)return;
   if(!fit.has(im))fit.set(im,measure(im));const f=fit.get(im);
   const w=W/(f.x1-f.x0),h=w*im.naturalHeight/im.naturalWidth;
   Object.assign(im.style,{width:w+'px',height:h+'px',left:(cx-w*(f.x0+f.x1)/2)+'px',top:(base-h*f.yb)+'px'});
   if(sh)Object.assign(sh.style,{width:W*.86+'px',height:W*.07+'px',left:(cx-W*.43)+'px',top:(base-W*.04)+'px'});
  });
 }
 slides.forEach(s=>{const im=s.querySelector('img');if(!im.complete)im.addEventListener('load',place,{once:true})});
 function relative(index){let r=(index-current+selection.length)%selection.length;if(r>selection.length/2)r-=selection.length;return r}
 function paint(){
  const width=Math.max(1,stage.getBoundingClientRect().width);
  slides.forEach((slide,i)=>{
   const rel=relative(i),distance=Math.abs(rel+drag/(width*.84));
   slide.style.setProperty('--slide-offset',String(rel));slide.style.setProperty('--slide-drag',drag+'px');
   slide.style.setProperty('--slide-scale',String(Math.max(.65,1-distance*.23)));
   slide.style.opacity=String(Math.max(0,1-distance*1.15));
   slide.style.zIndex=String(10-Math.round(distance*3));slide.setAttribute('aria-hidden',String(i!==current));
  });
 }
 function select(index){
  current=(index+selection.length)%selection.length;drag=0;hero.classList.remove('is-dragging');
  const p=selection[current];
  document.querySelector('#showroomNumber').textContent=`${String(current+1).padStart(2,'0')} / ${String(selection.length).padStart(2,'0')}`;
  document.querySelector('#showroomCategory').textContent=p.category.toLocaleUpperCase('pt-BR');
  document.querySelector('#showroomDiscipline').textContent=captions[current];
  if(pill){pill.textContent=p.category;pill.dataset.cat=p.category;pill.setAttribute('aria-label',`Ver bicicletas da modalidade ${p.category}`)}
  if(blurb)blurb.textContent=blurbs[current];
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
 // Brilho do título segue o cursor; ilha e pedras ganham um leve paralaxe.
 hero.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse'||reduced.matches)return;
  const h=hero.getBoundingClientRect();hero.style.setProperty('--px',String((e.clientX-h.left)/h.width-.5));hero.style.setProperty('--py',String((e.clientY-h.top)/h.height-.5));
  if(title){const t=title.getBoundingClientRect();title.style.setProperty('--mx',(e.clientX-t.left)+'px');title.style.setProperty('--my',(e.clientY-t.top)+'px')}
 });
 hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--px','0');hero.style.setProperty('--py','0')});
 window.addEventListener('resize',()=>{paint();place()});islandEl?.querySelector('img')?.addEventListener('load',place);place();select(0);requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.remove('is-initializing')));
})();
