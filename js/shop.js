(()=>{'use strict';
const overlay=document.createElement('div');
overlay.className='shop-overlay';overlay.id='merchantShop';
overlay.innerHTML='<section class="shop-box" role="dialog" aria-modal="true" aria-label="Loja do mercador"><div class="shop-head"><span>✦ MERCADOR DE LÚMEN</span><span>🪙 <b id="shopCoins">12</b> gold</span></div><p class="quest">“Bem-vinda, viajante. Leve o que precisar para sua jornada.”</p><div class="shop-items" id="shopItems"></div><div class="shop-footer">Poções entram nos consumíveis. Equipamentos e acessórios ficam na bolsa e podem ser equipados no menu.</div><button class="shop-close" id="shopClose">Fechar loja</button></section>';
document.body.appendChild(overlay);
const inventory={weapon:false,armor:false,accessory:false,potions:0,manaPotions:0,equippedWeapon:false,equippedArmor:false,equippedAccessory:false};
const goods=[
{id:'potion',name:'Poção de vida',price:5,desc:'Recupera 45 pontos de vida · consumível'},
{id:'manaPotion',name:'Poção de mana',price:5,desc:'Recupera 12 pontos de mana · consumível'},
{id:'staff',name:'Arma',price:10,desc:'Arma mágica · aumenta o poder de ataque'},
{id:'robe',name:'Armadura',price:10,desc:'Armadura · aumenta a vitalidade máxima'},
{id:'accessory',name:'Acessório',price:15,desc:'Amuleto arcano · aumenta a mana máxima'}
];
const coinsEl=document.querySelector('#coins');
function message(t){const d=document.querySelector('#dialog');if(d)d.textContent=t;const toast=document.querySelector('#rpgToast');if(toast)toast.textContent=t}
function refreshViews(){if(window.lumenMenu&&window.lumenMenu.refresh)window.lumenMenu.refresh();const p=document.querySelector('#potion');if(p)p.textContent='♥ Poção ('+(window.lumenGame?.getState?.().potions??inventory.potions)+')';}
function owned(g){if(g.id==='potion')return 'Estoque: '+(window.lumenGame?.getState?.().potions??inventory.potions);if(g.id==='manaPotion')return 'Estoque: '+inventory.manaPotions;const key={staff:'weapon',robe:'armor',accessory:'accessory'}[g.id];return inventory[key]?'Na bolsa':'Ainda não adquirido'}
function render(){document.querySelector('#shopCoins').textContent=coinsEl.textContent;const list=document.querySelector('#shopItems');list.innerHTML='';goods.forEach(g=>{const row=document.createElement('div');row.className='shop-item';row.innerHTML='<div><b>'+g.name+' · '+g.price+' gold</b><small>'+g.desc+'<br>'+owned(g)+'</small></div><button data-buy="'+g.id+'">Comprar</button>';row.querySelector('button').addEventListener('click',()=>buy(g));list.appendChild(row)})}
function buy(g){let coins=parseInt(coinsEl.textContent,10)||0;const key={staff:'weapon',robe:'armor',accessory:'accessory'}[g.id];if(key&&inventory[key]){message('Você já tem esse equipamento na bolsa.');return}if(coins<g.price){message('Gold insuficiente. Derrote monstros para conseguir mais.');return}coinsEl.textContent=String(coins-g.price);if(g.id==='potion'){if(window.lumenGame?.addPotions)window.lumenGame.addPotions(1);else inventory.potions++}else if(g.id==='manaPotion'){if(window.lumenGame?.addManaPotions)window.lumenGame.addManaPotions(1);else inventory.manaPotions++}else{inventory[key]=true}render();refreshViews();message('Comprado: '+g.name+'.')}
function open(){render();overlay.classList.add('open');message('O mercador abriu sua banca.')}
function close(){overlay.classList.remove('open')}
document.querySelector('#shopClose').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close()});
window.lumenShop={inventory,open,close,refresh:render};
})();