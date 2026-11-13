# VELO — loja conceitual de bicicletas

Site de portfólio em português, feito com HTML, CSS e JavaScript. Não exige instalação de dependências.

## Executar

Na pasta do projeto, execute `python -m http.server 4173 --directory dist` e abra http://localhost:4173.

## Funcionalidades

6 categorias principais de bicicletas; departamentos de equipamentos e vestuário; busca; filtros por preço, material e tamanho; ordenação; detalhes de produto; comparação de duas ou três bicicletas; sacola persistida no navegador; conclusão demonstrativa sem pagamento; menu e layout responsivos.

## Conteúdo demonstrativo

Marca VELO e preços são demonstrativos. O catálogo tem seis bicicletas, seis equipamentos e sete peças de vestuário com fotos dos produtos de referência da Specialized. Fontes das imagens em image-sources.json. O projeto não processa compras nem envia pedidos.

Referência funcional: https://www.specialized.com/br/pt/shop/bicicletas
Referência visual fornecida: Bike Website, de Anna Kovalchuk — https://www.behance.net/gallery/126412987/Bike-Website
Fotografias: Unsplash, arquivos identificados pelos IDs em dist/assets. Fontes: DM Sans e Manrope via Google Fonts, com fallback de sistema.

## Verificação

Sintaxe JavaScript validada com node --check. Prévia HTTP retornou 200. Fluxos de busca, material, comparação, seleção de tamanho, quantidade e conclusão da sacola testados no navegador. Menu móvel testado em 390 px sem transbordamento horizontal.

## Páginas de produto

Todos os 19 produtos têm rota própria em #produto/ID, galeria com miniaturas e ampliação, descrição, ficha de referência, seletor de cor e tamanho, guia de escolha e simulação de entrega por CEP ou retirada em lojas conceito. A sacola guarda tamanho, cor e modalidade de recebimento. Os ângulos adicionais vêm das galerias oficiais quando disponíveis; detalhes ampliados da foto original são identificados como ampliação. Cores, medidas, frete, prazos e lojas fazem parte da demonstração, sem estoque ou pedidos reais.
