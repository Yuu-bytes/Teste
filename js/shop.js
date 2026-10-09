(()=>{'use strict';
const overlay=document.createElement('div');
overlay.className='shop-overlay';overlay.id='merchantShop';
overlay.innerHTML='<section class="shop-box" role="dialog" aria-modal="true" aria-label="Loja do mercador"><div class="shop-head"><span>✦ MERCADOR DE LÚMEN</span><span>✧ <b id="shopCoins">12</b></span></div><p class="quest">“Bem-vinda, viajante. Leve o que precisar para sua jornada.”</p><div class="shop-items" id="shopItems"></div><div class="shop-footer">Equipamentos adquiridos ficam na sua bolsa. Abra o Menu → Equipamentos para equipá-los. Poções entram nos consumíveis.</div><button class="shop-close" id="shopClose">Fechar loja</button></section>';
document.body.appendChild(overlay);
const inventory={weapon:false,armor:false,potions:0,equippedWeapon:false,equippedArmor:false};
const goods=[
{id:'potion',name:'Poção de vitalidade',price:5,desc:'Recupera 45 pontos de vida · consumível'},
{id:'staff',name:'Cajado de âmbar',price:15,desc:'Arma mágica · aumenta o poder de ataque'},
{id:'robe',name:'Manto lunar',price:18,desc:'Armadura · aumenta a vitalidade máxima'}
];
const coinsEl=document.querySelector('#coins');
function message(t){const d=document.querySelector('#dialog');if(d)d.textContent=t;const toast=document.querySelector('#rpgToast');if(toast)toast.textContent=t}
function refreshViews(){if(window.lumenMenu&&window.lumenMenu.refresh)window.lumenMenu.refresh();const p=document.querySelector('#potion');if(p)p.textContent='♥ Poção ('+(window.lumenGame?.getState?.().potions??inventory.potions)+')';}
function render(){document.querySelector('#shopCoins').textContent=coinsEl.textContent;const list=document.querySelector('#shopItems');list.innerHTML='';goods.forEach(g=>{const owned=g.id==='potion'?'No estoque: '+(window.lumenGame?.getState?.().potions??inventory.potions):g.id==='staff'?(inventory.weapon?'Na bolsa':'Ainda não adquirido'):inventory.armor?'Na bolsa':'Ainda não adquirido';const row=document.createElement('div');row.className='shop-item';row.innerHTML='<div><b>'+g.name+' · '+g.price+' cristais</b><small>'+g.desc+'<br>'+owned+'</small></div><button data-buy="'+g.id+'">'+(g.id==='potion'?'Comprar':'Adquirir')+'</button>';row.querySelector('button').addEventListener('click',()=>buy(g));list.appendChild(row)})}
function buy(g){let coins=parseInt(coinsEl.textContent,10)||0;if(g.id!=='potion'&&inventory[g.id==='staff'?'weapon':'armor']){message('Você já tem este equipamento na bolsa.');return}if(coins<g.price){message('Cristais insuficientes. Derrote monstros para conseguir mais.');return}coinsEl.textContent=String(coins-g.price);if(g.id==='potion'){if(window.lumenGame?.addPotions)window.lumenGame.addPotions(1);else inventory.potions++}else if(g.id==='staff')inventory.weapon=true;else inventory.armor=true;render();refreshViews();message('Adicionado à bolsa: '+g.name+'.')}
function open(){render();overlay.classList.add('open');message('O mercador abriu sua banca.');}
function close(){overlay.classList.remove('open')}
document.querySelector('#shopClose').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close()});
window.lumenShop={inventory,open,close,refresh:render};
})();