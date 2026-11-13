# VELO — loja conceitual de bicicletas

Site de portfólio em português, feito com HTML, CSS e JavaScript. Não exige instalação de dependências.

## Executar

Na pasta do projeto, execute `python -m http.server 4173 --directory dist` e abra http://localhost:4173.

## Funcionalidades

17 categorias de bicicletas; departamentos de equipamentos e vestuário; busca; filtros por preço, material e tamanho; ordenação; detalhes de produto; comparação de duas ou três bicicletas; sacola persistida no navegador; conclusão demonstrativa sem pagamento; menu e layout responsivos.

## Conteúdo demonstrativo

Marca, modelos, preços e especificações são fictícios. As fotografias são editoriais de ciclismo e não representam os modelos ou acessórios descritos. O projeto não processa compras nem envia pedidos.

Referência funcional: https://www.specialized.com/br/pt/shop/bicicletas
Referência visual fornecida: Bike Website, de Anna Kovalchuk — https://www.behance.net/gallery/126412987/Bike-Website
Fotografias: Unsplash, arquivos identificados pelos IDs em dist/assets. Fontes: DM Sans e Manrope via Google Fonts, com fallback de sistema.

## Verificação

Sintaxe JavaScript validada com node --check. Prévia HTTP retornou 200. Fluxos de busca, material, comparação, seleção de tamanho, quantidade e conclusão da sacola testados no navegador. Menu móvel testado em 390 px sem transbordamento horizontal.
