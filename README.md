# Mercadinho Wiu - E-commerce

Projeto de loja virtual completa com carrinho de compras e múltiplos métodos de pagamento.

## Funcionalidades

- Catálogo de produtos organizado por categorias
- Carrinho de compras com persistência no localStorage
- Cálculo de frete baseado no CEP
- Múltiplos métodos de pagamento (PIX, cartão, boleto)
- Sistema de promoções por categoria
- Validação de formulários

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis
- JavaScript puro (ES6+)
- LocalStorage para persistência de dados
- API de formatação de moeda

## Como executar

1. Clone o repositório
2. Abra o arquivo `index.html` no navegador
3. Explore os produtos e teste o fluxo de compra

## Decisões técnicas

1. **Armazenamento**: Uso do localStorage para manter o carrinho entre sessões
2. **Promoções**: Desconto automático de 10% em produtos Hortifruti
3. **Validação**: Formatação automática de campos como WhatsApp e valores monetários
4. **UI**: Design responsivo com foco em mobile-first

## Melhorias futuras

- Integração com API de pagamentos real
- Sistema de login/cadastro
- Avaliação de produtos
- Histórico de pedidos