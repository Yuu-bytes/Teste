# Crônicas de Lúmen — RPG Pixel Art

## Estrutura

- `index.html` — estrutura da página e elementos do jogo.
- `css/style.css` — estilos, layout responsivo e interface de combate.
- `js/game.js` — mapa, personagem, NPC, inimigos, movimento, colisões e progresso.
- `js/shop.js` — loja e movimento por clique no mapa.
- `js/battle.js` — combate por turnos.
- `js/mobile.js` — controles por toque.
- `js/classes.js` — painel de classe e grimório.
- `js/menu.js` — menu de personagem, magias e equipamentos.
- `sprites/hero.svg` — sprite da personagem.
- `sprites/elf.svg` — sprite do NPC.
- `sprites/slime.svg` — sprite do monstro.

Os sprites SVG são carregados pelo jogo e os desenhos procedurais continuam como fallback caso um arquivo de imagem não carregue. Para publicar no GitHub Pages, mantenha os caminhos relativos e a estrutura das pastas.


## Progressão da Floresta

A floresta possui cinco encontros progressivos. Apenas o Slime de nível 1 fica disponível no início; derrotar cada monstro libera o próximo:

1. Slime — nível 1
2. Goblin — nível 2
3. Kolbot — nível 3
4. Orc — nível 4
5. Goblin Soldado — nível 5

Cada inimigo possui valores próprios de ataque, defesa, HP e MP, além de um sprite SVG individual em `sprites/`. Ao vencer, Yuu sobe de nível e recebe +4 de ataque, +2 de defesa, +12 de HP máximo e +4 de MP máximo.
