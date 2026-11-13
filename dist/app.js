'use strict';
const $ = s => document.querySelector(s);
const categories = ['Montanha','Estrada','Gravel','Urbanas','Elétricas','Infantis'];
const img = key => `assets/products/${key}.jpg`;
// Fotos dos produtos de referência. Preços e compra são demonstrativos.
const bikes = [
 {id:1,name:'Rockhopper Sport',category:'Montanha',price:8490,material:'Alumínio',photo:'bike-mtb',wheel:'29″',suspension:'Dianteira'},
 {id:3,name:'Tarmac SL9 Comp',category:'Estrada',price:15990,material:'Carbono',photo:'bike-road',wheel:'700c',suspension:'Rígida'},
 {id:5,name:'Crux 5',category:'Gravel',price:13490,material:'Carbono',photo:'bike-gravel',wheel:'700c',suspension:'Rígida'},
 {id:7,name:'Sirrus X 2.0',category:'Urbanas',price:3290,material:'Alumínio',photo:'bike-city',wheel:'700c',suspension:'Rígida'},
 {id:8,name:'Turbo Levo 4 Alloy',category:'Elétricas',price:24990,material:'Alumínio',photo:'bike-electric',wheel:'29 / 27,5″',suspension:'Integral'},
 {id:12,name:'Jett 20',category:'Infantis',price:1290,material:'Alumínio',photo:'bike-kids',wheel:'20″',suspension:'Rígida'}
];
const products = bikes.map(p=>({...p,dept:'Bicicletas',sizes:p.category==='Infantis'?['Único']:['P','M','G'],tag:p.category==='Elétricas'?'ASSISTÊNCIA ELÉTRICA':'SELEÇÃO VELO',description:({Montanha:'Para trilhas, estradas de terra e a vontade de explorar.',Estrada:'Para encontrar seu ritmo e ir mais longe no asfalto.',Gravel:'Entre o asfalto e a terra, descubra novas possibilidades.',Urbanas:'Uma companhia para os deslocamentos e passeios de todos os dias.',Elétricas:'Mais possibilidades para explorar com assistência elétrica.',Infantis:'Para os primeiros caminhos e as grandes descobertas.'})[p.category]}));
[
 {id:22,name:'Capacete Align II',category:'Capacetes',price:349,material:'Policarbonato',photo:'helmet',sizes:['P','M','G'],description:'Capacete de ciclismo. Veja o formato, as entradas de ventilação e o acabamento na foto do produto.'},
 {id:23,name:'Luz traseira Stix Elite 2',category:'Iluminação',price:189,material:'Policarbonato',photo:'light',sizes:['Único'],description:'Iluminação traseira para completar o equipamento da sua bicicleta.'},
 {id:25,name:'Sapatilha Torch 1.0',category:'Sapatilhas',price:549,material:'Têxtil',photo:'shoes',sizes:['38','39','40','41','42','43'],description:'Sapatilha de ciclismo de estrada com acabamento esportivo, com foto do modelo apresentado.'},
 {id:33,name:'Bomba Sport SwitchHitter II',category:'Bombas de ar',price:299,material:'Aço',photo:'pump',sizes:['Único'],description:'Bomba de chão para acompanhar a rotina de manutenção da bicicleta.'},
 {id:34,name:'Suporte Rib Cage II',category:'Suportes de garrafa',price:79,material:'Compósito',photo:'cage',sizes:['Único'],description:'Suporte de caramanhola para montar no quadro da bicicleta.'},
 {id:35,name:'Selim Power Comp',category:'Selins',price:549,material:'Compósito',photo:'saddle',sizes:['Único'],description:'Selim de ciclismo, apresentado em fotografia de produto.'}
].forEach(p=>products.push({...p,dept:'Equipamentos',tag:'COMPLETE SEU PEDAL'}));
[
 {id:26,name:'Jersey Prime',category:'Camisas',price:289,photo:'jersey',description:'Camisa de ciclismo de manga curta. Foto da peça vestida para mostrar seu caimento.'},
 {id:27,name:'Bretelle Prime',category:'Bretelles',price:399,photo:'bib',description:'Bretelle com alças. Uma peça clássica do vestuário de ciclismo.'},
 {id:28,name:'Jaqueta Corta Vento Legacy',category:'Jaquetas',price:459,photo:'jacket',description:'Jaqueta de manga longa para compor o seu conjunto de pedal.'},
 {id:30,name:'Colete Prime Wind',category:'Coletes',price:329,photo:'vest',description:'Colete corta-vento, mostrado sobre uma camisa de ciclismo.'},
 {id:31,name:'Shorts Foundation',category:'Bermudas',price:249,photo:'shorts',description:'Bermuda de ciclismo sem alças, com foto da peça vestida.'},
 {id:29,name:'Luvas SL Pro',category:'Luvas',price:129,photo:'gloves',description:'Luvas de dedo curto. Foto do produto para visualizar o formato e o acabamento.'},
 {id:32,name:'Meias Soft Air Road',category:'Meias',price:79,photo:'socks',description:'Meias de ciclismo de cano alto, com fotografia da peça.'}
].forEach(p=>products.push({...p,material:'Têxtil',sizes:['P','M','G','GG'],dept:'Vestuário',tag:'VISTA O MOVIMENTO'}));

const colorConfig = {
 1:[['Grafite','#525b5c'],['Azul-petróleo','#27516b',null,'dark'],['Verde-floresta','#355347',null,'dark']],
 3:[['Vermelho / Branco','#ce2c37'],['Grafite metálico','#5d6166',103],['Azul Racing','#2564a0',null,'red']],
 5:[['Vermelho Racing','#a92b3a'],['Azul profundo','#294e82',null,'red'],['Verde-musgo','#4b6251',null,'red']],
 7:[['Amarelo Ion','#c3db2d'],['Azul-cobalto','#315b9d',null,'yellow'],['Coral','#d56b59',null,'yellow']],
 8:[['Obsidiana','#4c5054'],['Azul-noturno','#304c68',null,'dark'],['Verde-oliva','#536247',null,'dark']],
 12:[['Roxo','#8b385c'],['Azul','#377fae',null,'red'],['Verde','#4d9274',null,'red']],
 22:[['Preto refletivo','#252729'],['Branco acetinado','#e5e5e1',122],['Azul-marinho','#334d70',null,'dark']],
 23:[['Preto','#222'],['Azul-petróleo','#2e5d6c',null,'dark'],['Bordô','#723c49',null,'dark']],
 25:[['Preto','#222'],['Azul-marinho','#334c70',null,'dark'],['Verde-oliva','#586247',null,'dark']],
 33:[['Preto','#222'],['Azul-aço','#3e617b',null,'dark'],['Bordô','#743e4c',null,'dark']],
 34:[['Preto fosco','#222'],['Azul','#315e8a',null,'dark'],['Verde','#4b6c56',null,'dark']],
 35:[['Preto','#222'],['Azul-marinho','#344d6f',null,'dark'],['Bordô','#734052',null,'dark']],
 26:[['Azul-marinho','#242e4c'],['Bordô','#7d3c4c',null,'blue'],['Verde-sálvia','#688478',null,'blue']],
 27:[['Preto','#222'],['Azul-marinho','#344b6d',null,'dark'],['Bordô','#703e4e',null,'dark']],
 28:[['Preto','#222'],['Azul-petróleo','#345e70',null,'dark'],['Verde-oliva','#59664b',null,'dark']],
 30:[['Laranja','#eb7243'],['Azul-oceano','#3f7f9c',null,'orange'],['Verde-sálvia','#718c74',null,'orange']],
 31:[['Preto','#222'],['Azul-marinho','#344b6d',null,'dark'],['Bordô','#743e4e',null,'dark']],
 29:[['Preto','#222'],['Azul','#365d80',null,'dark'],['Verde-oliva','#5b674b',null,'dark']],
 32:[['Preto / Branco','#222'],['Azul / Branco','#34557d',null,'dark'],['Bordô / Branco','#7d3e50',null,'dark']]
};
for(const p of products){
 if(p.category==='Estrada'||p.category==='Gravel')p.sizes=['49','52','54','56','58'];
 if(p.id===22)p.sizes=['P/M','M/G','G/GG'];
 if(p.id===12)p.sizes=['20″'];
 if(p.id===32)p.sizes=['35–38','39–42','43–46'];
 if(p.id===35)p.sizes=['143 mm','155 mm'];
 p.colors=colorConfig[p.id].map(([name,hex,gallery,preview],index)=>({name,hex,gallery:gallery||p.id,preview:preview||null,filter:preview?`url(#color-preview-${p.id}-${index})`:"none"}));
}

const money = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
let dept='Bicicletas', category='', comparison=new Set(), toastTimer;
let cart=[];
try { const saved=JSON.parse(localStorage.getItem('velo-cart')||'[]'); if(Array.isArray(saved)) cart=saved.filter(x=>Number.isInteger(x.id)&&products.some(p=>p.id===x.id)&&typeof x.size==='string'&&products.find(p=>p.id===x.id).sizes.includes(x.size)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=99).map(x=>{const p=products.find(p=>p.id===x.id);const color=p.colors.find(c=>c.name===x.color)||p.colors[0];const delivery=x.delivery==='pickup'?'pickup':'home';const destination=delivery==='home'&&/^\d{5}-\d{3}$/.test(x.destination||'')?x.destination:delivery==='pickup'&&['VELO Centro — loja conceito','VELO Norte — loja conceito','VELO Sul — loja conceito'].includes(x.destination)?x.destination:'';return {...x,color:color.name,delivery,destination,photo:color.gallery!==p.id&&galleryData[color.gallery]?.[0]?galleryData[color.gallery][0].src:img(p.photo),filter:color.filter};}); } catch {}
const find = id => products.find(p=>p.id===Number(id));
function notify(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,3300)}
function saveCart(){try{localStorage.setItem('velo-cart',JSON.stringify(cart))}catch{}$('#cartCount').textContent=cart.reduce((sum,x)=>sum+x.qty,0)}
function closeMenu(){$('#mega').hidden=true;$('#bikeMenu').setAttribute('aria-expanded','false');$('#mobileMenu').setAttribute('aria-expanded','false')}
function setDepartment(value,cat=''){if(!$('#productPage').hidden)location.hash='catalogo';dept=value;category=cat;$('#query').value='';$('#price').value='60000';$('#material').value='';$('#sizeFilter').value='';closeMenu();renderCategories();renderProducts();document.querySelectorAll('.departments button').forEach(b=>b.classList.toggle('active',b.dataset.dept===dept))}
function renderCategories(){const list=dept==='Bicicletas'?categories:[...new Set(products.filter(p=>p.dept===dept).map(p=>p.category))];$('#categoryChips').innerHTML=['',...list].map(c=>`<button data-category="${c}" class="${c===category?'active':''}" aria-pressed="${c===category}">${c||'Ver tudo'}</button>`).join('')}
function renderProducts(){const search=$('#query').value.trim().toLocaleLowerCase('pt-BR');const price=Number($('#price').value);$('#priceLabel').textContent=money(price);let list=products.filter(p=>p.dept===dept&&(!category||p.category===category)&&p.price<=price&&(!$('#material').value||p.material===$('#material').value)&&(!$('#sizeFilter').value||p.sizes.includes($('#sizeFilter').value))&&`${p.name} ${p.category} ${p.material}`.toLocaleLowerCase('pt-BR').includes(search));const sort=$('#sort').value;if(sort==='asc')list.sort((a,b)=>a.price-b.price);if(sort==='desc')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));$('#resultCount').textContent=`${list.length} produto${list.length===1?'':'s'}`;$('#products').innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-image"><button data-product="${p.id}" aria-label="Ver detalhes de ${p.name}"><img src="${img(p.photo)}" alt="${p.name} — foto do produto" loading="lazy"></button>${p.tag?`<span class="tag">${p.tag}</span>`:''}</div><div class="product-info"><p class="product-category">${p.category} / ${p.material}</p><button class="product-name" data-product="${p.id}">${p.name}</button><p class="product-price">${money(p.price)} <small>preço ilustrativo</small></p><div class="product-end"><span class="catalog-colors" aria-label="${p.colors.length} cores disponíveis">${p.colors.map(c=>`<i style="background:${c.hex}" title="${c.name}"></i>`).join('')}<span>${p.colors.length} cores</span></span>${p.dept==='Bicicletas'?`<label class="compare-check"><input type="checkbox" data-compare="${p.id}" ${comparison.has(p.id)?'checked':''}>Comparar</label>`:'<span class="product-category">CONCEITO VELO</span>'}</div></div></article>`).join(''):'<div class="empty"><h3>Nenhum produto por aqui.</h3><p>Tente outra busca ou limpe os filtros para explorar mais caminhos.</p><button class="button dark" id="emptyReset">Limpar filtros ↗</button></div>'}
function renderCart(){$('#cartItems').innerHTML=cart.length?cart.map((item,i)=>{const p=find(item.id);return `<article class="cart-row"><img src="${item.photo||img(p.photo)}" style="filter:${item.filter||'none'}" alt="${p.name} — ${item.color||p.colors[0].name}"><div><h3>${p.name}</h3><p>Tamanho ${item.size} · ${money(p.price)}</p><p>${item.color||p.colors[0].name} · ${item.delivery==='pickup'?'Retirada na loja':'Receber em casa'}${item.destination?' · '+item.destination:''}</p><div class="quantity"><button data-qty="${i}" data-delta="-1" aria-label="Diminuir quantidade de ${p.name}">−</button><span>${item.qty}</span><button data-qty="${i}" data-delta="1" aria-label="Aumentar quantidade de ${p.name}">+</button><button class="remove" data-remove="${i}">Remover</button></div></div></article>`}).join(''):'<div class="empty"><h3>Seu próximo caminho começa aqui.</h3><p>A sacola está vazia. Explore o catálogo e escolha seus favoritos.</p><button class="button dark" data-continue>Explorar catálogo ↗</button></div>';$('#cartFooter').innerHTML=cart.length?`<div class="cart-total"><span>Subtotal</span><strong>${money(cart.reduce((s,x)=>s+find(x.id).price*x.qty,0))}</strong></div><button class="button dark" id="demoCheckout">Concluir experiência <span>↗</span></button><p class="demo-note">Não há cobrança, processamento de pagamento ou envio.</p>`:''}
function renderCompare(){const chosen=[...comparison].map(find);$('#compareBar').hidden=!chosen.length;$('#compareCount').textContent=`${chosen.length} de 3 selecionadas`;document.querySelectorAll('[data-compare]').forEach(el=>el.checked=comparison.has(Number(el.dataset.compare)))}
function openCompare(){if(comparison.size<2){notify('Selecione pelo menos duas bicicletas para comparar.');return}const ps=[...comparison].map(find);const rows=[['Modalidade','category'],['Preço ilustrativo','price'],['Material','material'],['Aro','wheel'],['Suspensão','suspension']];$('#compareContent').innerHTML=`<div class="compare-scroll"><table class="compare-table"><thead><tr><th>Seu próximo pedal</th>${ps.map(p=>`<td><img src="${img(p.photo,300)}" alt="Imagem ilustrativa de ${p.name}"><strong>${p.name}</strong></td>`).join('')}</tr></thead><tbody>${rows.map(([title,key])=>`<tr><th>${title}</th>${ps.map(p=>`<td>${key==='price'?money(p[key]):p[key]}</td>`).join('')}</tr>`).join('')}<tr><th>Explore</th>${ps.map(p=>`<td><button data-product="${p.id}">Ver produto ↗</button></td>`).join('')}</tr></tbody></table></div><p class="demo-note">Especificações conceituais. Fotografias ilustrativas.</p>`;$('#compareDialog').showModal()}
$('#menuCategories').innerHTML=categories.map(c=>`<a href="#catalogo" data-cat="${c}">${c} ↗</a>`).join('')+'<a href="#catalogo" data-dept="Equipamentos">Equipamentos ↗</a><a href="#catalogo" data-dept="Vestuário">Vestuário ↗</a>';
document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;if(t.dataset.dept){setDepartment(t.dataset.dept);return}if(t.dataset.cat){setDepartment('Bicicletas',t.dataset.cat);return}if(t.hasAttribute('data-category')){category=t.dataset.category;renderCategories();renderProducts();return}if(t.dataset.product){if($('#compareDialog').open)$('#compareDialog').close();openProduct(t.dataset.product);return}if(t.hasAttribute('data-close')){t.closest('dialog').close();return}if(t.dataset.add){addConfiguredProduct();return}if(t.hasAttribute('data-qty')){const i=Number(t.dataset.qty);cart[i].qty+=Number(t.dataset.delta);if(cart[i].qty<=0)cart.splice(i,1);else cart[i].qty=Math.min(cart[i].qty,99);saveCart();renderCart();return}if(t.hasAttribute('data-remove')){cart.splice(Number(t.dataset.remove),1);saveCart();renderCart();return}if(t.hasAttribute('data-continue')){$('#cartDialog').close();location.hash='catalogo';$('#catalogo').scrollIntoView();return}if(t.id==='demoCheckout'){cart=[];saveCart();renderCart();$('#cartItems').innerHTML='<div class="empty"><h3>Seu caminho está só começando. ↗</h3><p>Experiência concluída! Esta é uma loja de portfólio: nenhum pedido, cobrança ou envio foi realizado.</p><button class="button dark" data-continue>Continuar explorando ↗</button></div>';return}if(t.id==='emptyReset')resetFilters()});
document.addEventListener('change',e=>{if(e.target.dataset.compare){const id=Number(e.target.dataset.compare);if(e.target.checked){if(comparison.size>=3){e.target.checked=false;notify('Você pode comparar até três bicicletas de cada vez.');return}comparison.add(id)}else comparison.delete(id);renderCompare()}});
function resetFilters(){setDepartment(dept);$('#sort').value='featured';renderProducts()}
$('#clearFilters').onclick=resetFilters;
for(const id of ['query','price','material','sizeFilter','sort'])$('#'+id).addEventListener(id==='query'||id==='price'?'input':'change',renderProducts);
function toggleMenu(){const open=$('#mega').hidden;$('#mega').hidden=!open;$('#bikeMenu').setAttribute('aria-expanded',String(open));$('#mobileMenu').setAttribute('aria-expanded',String(open))}
$('#bikeMenu').onclick=toggleMenu;$('#mobileMenu').onclick=toggleMenu;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});document.addEventListener('click',e=>{if(!e.target.closest('header,.mega'))closeMenu()});
$('#filterToggle').onclick=()=>{const hidden=!$('#filters').hidden;$('#filters').hidden=hidden;$('.catalog-layout').classList.toggle('no-filters',hidden);$('#filterToggle').setAttribute('aria-expanded',String(!hidden))};
$('#searchButton').onclick=()=>{if(!$('#productPage').hidden)location.hash='catalogo';$('#filters').hidden=false;$('.catalog-layout').classList.remove('no-filters');$('#filterToggle').setAttribute('aria-expanded','true');$('#catalogo').scrollIntoView();setTimeout(()=>$('#query').focus({preventScroll:true}),350)};
$('#cartButton').onclick=()=>{renderCart();$('#cartDialog').showModal()};$('#compareOpen').onclick=openCompare;$('#compareClear').onclick=()=>{comparison.clear();renderCompare()};
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
saveCart();renderCategories();renderProducts();

// Movimento de apresentação da bicicleta na hero.
const heroMotionToggle=document.querySelector('#heroMotionToggle');
if(heroMotionToggle){
 heroMotionToggle.addEventListener('click',()=>{
  const paused=document.querySelector('.hero-cowboy').classList.toggle('hero-motion-paused');
  heroMotionToggle.setAttribute('aria-pressed',String(paused));
  heroMotionToggle.setAttribute('aria-label',paused?'Retomar movimento da bicicleta':'Pausar movimento da bicicleta');
  heroMotionToggle.querySelector('span').textContent=paused?'▶':'Ⅱ';
  document.querySelector('#heroMotionLabel').innerHTML=paused?'RETOMAR<br>MOVIMENTO':'PAUSAR<br>MOVIMENTO';
 });
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(([entry])=>entry.target.classList.toggle('hero-motion-offscreen',!entry.isIntersecting));
  observer.observe(document.querySelector('.hero-cowboy'));
 }
}
