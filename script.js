// lista de produtos do mercadinho
const produtos = [
  { 
    id: 1,
    nome: "Banana Prata 1kg", 
    preco: 7.69, 
    imagem: "https://images.tcdn.com.br/img/img_prod/753894/muda_de_banana_prata_altura_de_0_40_cm_a_0_80_cm_391_2_4a090211a2ba9380b331ba1ce945ba08.jpg", 
    categoria: "Hortifruti",
    descricao: "Banana prata fresca, pacote com 5 unidades",
    estoque: 20
  },
  { 
    id: 2,
    nome: "Arroz Integral 1kg", 
    preco: 12.90, 
    imagem: "https://ibassets.com.br/ib.item.image.large/l-b7c49fe1b3b348649f3e07ad024fefb5.jpeg", 
    categoria: "Grãos",
    descricao: "Arroz integral tipo 1, pacote 5kg",
    estoque: 15
  },
  { 
    id: 3,
    nome: "Sabão em Pó 1kg", 
    preco: 13.13, 
    imagem: "https://cdn.awsli.com.br/600x450/2732/2732782/produto/263363238/sabao-em-po-aomo-lavagem-perfeita-800g-t5shzn32zv.jpg", 
    categoria: "Limpeza",
    descricao: "Sabão em pó para roupas, 1kg",
    estoque: 30
  },
  { 
    id: 4,
    nome: "Leite Integral 380g", 
    preco: 15.99, 
    imagem: "https://m.media-amazon.com/images/I/61eRaa65D6L.jpg", 
    categoria: "Laticínios",
    descricao: "Leite integral pasteurizado, caixa 1L",
    estoque: 25
  },
  { 
    id: 5,
    nome: "Maçã Fuji 300g", 
    preco: 4.50, 
    imagem: "https://obahortifruti.vtexassets.com/arquivos/ids/4250277/Maca-Fuji.jpg?v=638144112304430000", 
    categoria: "Hortifruti",
    descricao: "Maçã Fuji importada, pacote com 6 unidades",
    estoque: 18
  },
  { 
    id: 6,
    nome: "Feijão Carioca 1kg", 
    preco: 8.50, 
    imagem: "https://ibassets.com.br/ib.item.image.large/l-b15349c79e694c919b8d0e86514a5c24.jpeg", 
    categoria: "Grãos",
    descricao: "Feijão carioca tipo 1, pacote 1kg",
    estoque: 22
  },
  { 
    id: 7,
    nome: "Água Sanitária 2L", 
    preco: 10.90, 
    imagem: "https://mercantilatacado.vtexassets.com/arquivos/ids/171637-800-auto?v=638349582486370000&width=800&height=auto&aspect=true", 
    categoria: "Limpeza",
    descricao: "Água sanitária concentrada, frasco 1L",
    estoque: 40
  },
  { 
    id: 8,
    nome: "Queijo Mussarela 150g", 
    preco: 8.99, 
    imagem: "https://mercantilnovaera.vtexassets.com/arquivos/ids/216729/Queijo-Mussarela-ITALAC-Fatiado-Pacote-150g.jpg?v=638515724565100000", 
    categoria: "Laticínios",
    descricao: "Queijo mussarela fatiado, pacote 300g",
    estoque: 12
  },
  { 
    id: 9,
    nome: "Coca Cola 2L", 
    preco: 11.25, 
    imagem: "https://zaffari.vtexassets.com/arquivos/ids/251444/1095276-00.jpg?v=638560654395300000", 
    categoria: "Bebidas",
    descricao: "Refrigerante de cola, garrafa 2L",
    estoque: 30
  },
  { 
    id: 10,
    nome: "Suco de Laranja 1L", 
    preco: 11.90, 
    imagem: "https://www.imigrantesbebidas.com.br/bebida/images/products/full/3226-nectar-de-laranja-del-valle-1l.jpg", 
    categoria: "Bebidas",
    descricao: "Suco de laranja integral, caixa 1L",
    estoque: 15
  }
];

// Elementos DOM
const productList = document.getElementById('product-list');
const cartBtn = document.getElementById('cart-btn');
const cartEl = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartCount = document.getElementById('cart-count');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const emptyCart = document.getElementById('empty-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('search-input');
const filtroCategoria = document.getElementById('filtro-categoria');
const sortBy = document.getElementById('sort-by');

// Elementos do checkout modal
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const confirmPurchaseBtn = document.getElementById('confirm-purchase');
const confirmationScreen = document.getElementById('confirmation-screen');
const paymentOptions = document.querySelectorAll('.payment-option');
const paymentDetails = document.getElementById('payment-details');

// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  exibirProdutos();
  atualizarCarrinho();
  
  // Verificar se há itens no carrinho ao carregar
  if (cart.length > 0) {
    document.body.classList.add('cart-open');
    cartEl.style.display = 'flex';
  }
  
  // Inicializa com PIX como método padrão
  updatePaymentDetails('pix');
});

// Função para exibir produtos
function exibirProdutos(categoria = "Todos", searchTerm = "", sortOption = "padrao") {
  productList.innerHTML = "";
  
  // Filtro
  let filteredProducts = produtos.filter(produto => {
    const matchesCategory = categoria === "Todos" || produto.categoria === categoria;
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         produto.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Ordenação
  switch(sortOption) {
    case "preco-asc":
      filteredProducts.sort((a, b) => a.preco - b.preco);
      break;
    case "preco-desc":
      filteredProducts.sort((a, b) => b.preco - a.preco);
      break;
    case "nome-asc":
      filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case "nome-desc":
      filteredProducts.sort((a, b) => b.nome.localeCompare(a.nome));
      break;
    default:
      // Ordem padrão (pode ser a ordem original ou outra lógica)
      break;
  }
  
  // Exibir produtos filtrados e ordenados
  if (filteredProducts.length === 0) {
    productList.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <p>Nenhum produto encontrado</p>
      </div>
    `;
  } else {
    filteredProducts.forEach(produto => {
      const div = document.createElement("div");
      div.classList.add("product");
      
      // Verificar se o produto já está no carrinho
      const inCart = cart.find(item => item.id === produto.id);
      const cartItem = inCart ? cart.find(item => item.id === produto.id) : null;
      
      div.innerHTML = `
        ${produto.estoque < 5 ? `<span class="product-badge">Últimas unidades</span>` : ''}
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-img">
        <h3>${produto.nome}</h3>
        <p class="product-category">${produto.categoria}</p>
        <p class="product-price">R$ ${aplicarPromocao(produto).toFixed(2)} ${produto.categoria === 'Hortifruti' ? '<span class="discount-badge">-10%</span>' : ''}</p>
        <button ${produto.estoque <= 0 ? 'disabled' : ''} class="${inCart ? 'in-cart' : ''}">
          ${inCart ? '<i class="fas fa-check"></i> Adicionado' : 
            produto.estoque <= 0 ? 'Esgotado' : '<i class="fas fa-plus"></i> Adicionar'}
          ${inCart ? `(${cartItem.quantity})` : ''}
        </button>
      `;
      
      const button = div.querySelector("button");
      if (produto.estoque > 0) {
        button.addEventListener("click", () => adicionarProduto(produto));
      }
      
      productList.appendChild(div);
    });
  }
}

// Função para adicionar produto ao carrinho
function adicionarProduto(produto) {
  const existingItem = cart.find(item => item.id === produto.id);
  
  if (existingItem) {
    // Verificar estoque
    if (existingItem.quantity >= produto.estoque) {
      showToast('Quantidade máxima em estoque atingida');
      return;
    }
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...produto,
      quantity: 1
    });
  }
  
  showToast('Produto adicionado ao carrinho');
  salvarCarrinhoNoLocalStorage();
  atualizarCarrinho();
  exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
}

// Função para remover item do carrinho
function removerItem(index) {
  cart.splice(index, 1);
  salvarCarrinhoNoLocalStorage();
  atualizarCarrinho();
  exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
  
  if (cart.length === 0) {
    emptyCart.style.display = 'flex';
  }
}

// Função para atualizar quantidade
function atualizarQuantidade(index, newQuantity) {
  if (newQuantity < 1) {
    removerItem(index);
    return;
  }
  
  const productId = cart[index].id;
  const productInStock = produtos.find(p => p.id === productId);
  
  if (newQuantity > productInStock.estoque) {
    showToast('Quantidade máxima em estoque atingida');
    return;
  }
  
  cart[index].quantity = newQuantity;
  salvarCarrinhoNoLocalStorage();
  atualizarCarrinho();
  exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
}

// Função para atualizar o carrinho na UI
function atualizarCarrinho() {
  cartItems.innerHTML = "";
  let subtotal = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.preco * item.quantity;
    subtotal += itemTotal;
    
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-price">R$ ${itemTotal.toFixed(2)}</div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-quantity">
          <button onclick="atualizarQuantidade(${index}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="atualizarQuantidade(${index}, ${item.quantity + 1})">+</button>
        </div>
        <button class="remove-item" onclick="removerItem(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(li);
  });
  
  cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
  cartTotal.textContent = `R$ ${subtotal.toFixed(2)}`;
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Mostrar/ocultar carrinho vazio
  if (cart.length > 0) {
    emptyCart.style.display = 'none';
    checkoutBtn.classList.remove('disabled');
    checkoutBtn.disabled = false;
  } else {
    emptyCart.style.display = 'flex';
    checkoutBtn.classList.add('disabled');
    checkoutBtn.disabled = true;
  }
}

// Função para salvar carrinho no localStorage
function salvarCarrinhoNoLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para mostrar notificação toast
function showToast(message) {
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  toast.style.zIndex = '9999';
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    toast.style.zIndex = '';
  }, 3000);
}

// Função para calcular frete aleatório baseado no CEP
function calcularFrete(cep) {
  // Remove caracteres não numéricos
  cep = cep.replace(/\D/g, '');
  
  // Gera um valor aleatório baseado nos dígitos do CEP
  const seed = parseInt(cep.slice(-3)) || 0;
  const randomFactor = (seed % 50) / 100; // Valor entre 0 e 0.5
  
  // Frete base + variação aleatória
  const freteBase = 10;
  const frete = freteBase + (randomFactor * 20); // Entre 10 e 20
  
  return parseFloat(frete.toFixed(2));
}

// Função para formatar CEP
function formatarCEP(cep) {
  cep = cep.replace(/\D/g, '');
  if (cep.length > 0) {
    cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
  }
  return cep;
}

// Validação e identificação de bandeira
function identificarBandeira(numero) {
  numero = numero.replace(/\D/g, '');
  
  const bandeiras = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
    amex: /^3[47][0-9]{13}$/,
    hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/
  };

  for (const [bandeira, regex] of Object.entries(bandeiras)) {
    if (regex.test(numero)) {
      return bandeira;
    }
  }
  return 'desconhecida';
}

function formatarNumeroCartao(input) {
  let value = input.value.replace(/\D/g, '');
  let formatted = '';
  
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += value[i];
  }
  
  input.value = formatted.substring(0, 19);
  
  const cardBrand = input.nextElementSibling;
  cardBrand.innerHTML = '';
}

// Validação de data (MM/AA)
function validarDataCartao(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  
  input.value = value.substring(0, 5);
  
  // Validação básica
  const [mes, ano] = value.split('/');
  if (mes && (mes < 1 || mes > 12)) {
    input.classList.add('invalid-input');
  } else {
    input.classList.remove('invalid-input');
  }
}

// Validação de CVV
function validarCVV(input) {
  input.value = input.value.replace(/\D/g, '').substring(0, 3);
  if (input.value.length < 3) {
    input.classList.add('invalid-input');
  } else {
    input.classList.remove('invalid-input');
  }
}

// Formatação e validação de WhatsApp
function formatarWhatsApp(input) {
  // Guarda a posição do cursor para não pular
  const cursorPosition = input.selectionStart;
  const originalLength = input.value.length;

  // Remove tudo exceto dígitos
  const onlyNumbers = input.value.replace(/\D/g, '');

  // Aplica a máscara (XX) XXXX-XXXX
  let formattedValue = '';
  if (onlyNumbers.length > 0) {
    formattedValue = `(${onlyNumbers.substring(0, 2)}`;
  }
  if (onlyNumbers.length > 2) {
    formattedValue += `) ${onlyNumbers.substring(2, 6)}`;
  }
  if (onlyNumbers.length > 6) {
    formattedValue += `-${onlyNumbers.substring(6, 11)}`;
  }

  // Atualiza o campo
  input.value = formattedValue;

  // Validação: precisa ter 11 dígitos (DDD + 9 números)
  const isValid = onlyNumbers.length === 11;
  input.classList.toggle('invalid-input', !isValid);

  // Mantém o cursor na posição correta após formatação
  const newLength = input.value.length;
  const lengthDiff = newLength - originalLength;
  input.setSelectionRange(cursorPosition + lengthDiff, cursorPosition + lengthDiff);

  return isValid; // Retorna true/false para validação
}

// Função para atualizar detalhes do pagamento
function updatePaymentDetails(method) {
  let detailsHTML = '';
  const cartTotalElement = document.getElementById('cart-total');
  let subtotal = 0;
  
  // Verifica se o elemento existe e tem valor
  if (cartTotalElement && cartTotalElement.textContent) {
    try {
      subtotal = parseFloat(cartTotalElement.textContent.replace('R$ ', '').replace(',', '.'));
    } catch (e) {
      console.error("Erro ao converter valor do carrinho:", e);
      subtotal = 0;
    }
  }
  
  switch(method) {
    case 'pix':
      detailsHTML = `
        <div class="pix-details">
          <div class="form-group">
            <label>WhatsApp para contato</label>
            <div class="whatsapp-input-container">
              <input type="text" id="whatsapp" placeholder="(XX) XXXX-XXXX" maxlength="15">
              <i class="fab fa-whatsapp whatsapp-icon"></i>
            </div>
          </div>
          <p><i class="fas fa-qrcode"></i> Escaneie o QR Code abaixo:</p>
          <div class="pix-qrcode">
            <div class="qrcode-placeholder">
              <i class="fas fa-qrcode"></i>
              <p>QR Code de exemplo</p>
            </div>
          </div>
          <p>Ou copie o código PIX:</p>
          <div class="pix-code">
            <code>00020126360014BR.GOV.BCB.PIX0114+5567999999999520400005303986540410.005802BR5925MERCADINHO WI LTDA6008BRASILIA62070503***6304A2A3</code>
            <button class="copy-btn"><i class="far fa-copy"></i> Copiar</button>
          </div>
        </div>
      `;
  break;
    case 'credit':
      detailsHTML = `
        <div class="credit-details">
          <div class="form-group">
            <label>Número do Cartão</label>
            <div class="card-input-container">
              <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19">
              <div id="card-brand"></div>
            </div>
          </div>
          <div class="form-group">
            <label>Nome no Cartão</label>
            <input type="text" id="card-name" placeholder="Nome como está no cartão">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Validade</label>
              <input type="text" id="card-expiry" placeholder="MM/AA" maxlength="5">
            </div>
            <div class="form-group">
              <label>CVV</label>
              <input type="text" id="card-cvv" placeholder="123" maxlength="3">
            </div>
          </div>
          <div class="form-group">
            <label>Parcelamento</label>
            <select id="card-installments">
              ${subtotal > 0 ? `
                <option>1x R$ ${subtotal.toFixed(2).replace('.', ',')} sem juros</option>
                <option>2x R$ ${(subtotal / 2).toFixed(2).replace('.', ',')} sem juros</option>
                <option>3x R$ ${(subtotal / 3).toFixed(2).replace('.', ',')} sem juros</option>
              ` : `
                <option>Nenhum item no carrinho</option>
              `}
            </select>
          </div>
          <div class="form-group">
            <label>WhatsApp para contato</label>
            <div class="whatsapp-input-container">
              <input type="text" id="whatsapp" placeholder="(XX) XXXX-XXXX" maxlength="15">
              <i class="fab fa-whatsapp whatsapp-icon"></i>
            </div>
          </div>
        </div>
      `;
      break;
    case 'debit':
      detailsHTML = `
        <div class="debit-details">
          <div class="form-group">
            <label>WhatsApp para contato</label>
            <div class="whatsapp-input-container">
              <input type="text" id="whatsapp" placeholder="(99) 99999-9999" maxlength="15">
              <i class="fab fa-whatsapp whatsapp-icon"></i>
            </div>
          </div>
          <div class="form-group">
            <label>Número do Cartão</label>
            <div class="card-input-container">
              <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19">
              <div id="card-brand"></div>
            </div>
          </div>
          <div class="form-group">
            <label>Nome no Cartão</label>
            <input type="text" id="card-name" placeholder="Nome como está no cartão">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Validade</label>
              <input type="text" id="card-expiry" placeholder="MM/AA" maxlength="5">
            </div>
            <div class="form-group">
              <label>CVV</label>
              <input type="text" id="card-cvv" placeholder="123" maxlength="4">
            </div>
          </div>
          <div class="form-group">
            <label>Senha do Cartão</label>
            <input type="password" id="card-password" placeholder="Digite sua senha">
          </div>
        </div>
      `;
      break;
    case 'boleto':
      case 'boleto':
  detailsHTML = `
    <div class="boleto-details">
      <div class="form-group">
        <label>WhatsApp para contato</label>
        <div class="whatsapp-input-container">
          <input type="text" id="whatsapp" placeholder="(XX) XXXX-XXXX" maxlength="15">
          <i class="fab fa-whatsapp whatsapp-icon"></i>
        </div>
      </div>
      <p><i class="fas fa-barcode"></i> O boleto será gerado após a confirmação da compra.</p>
      <p>Prazo de vencimento: 3 dias úteis</p>
      <div class="boleto-warning">
        <i class="fas fa-exclamation-circle"></i>
        <p>Seu pedido só será processado após o pagamento do boleto.</p>
      </div>
    </div>
  `;
  break;
  }
  
  paymentDetails.innerHTML = detailsHTML;
  
  // Adicionar eventos aos novos elementos
  if (method === 'credit' || method === 'debit') {
    document.getElementById('card-number').addEventListener('input', function(e) {
      formatarNumeroCartao(e.target);
    });
    
    document.getElementById('card-expiry').addEventListener('input', function(e) {
      validarDataCartao(e.target);
    });
    
    document.getElementById('card-cvv').addEventListener('input', function(e) {
      validarCVV(e.target);
    });
  }
  
  document.getElementById('whatsapp')?.addEventListener('input', function(e) {
  // Salva a posição do cursor
  const cursorPosition = e.target.selectionStart;
  const oldLength = e.target.value.length;
  
  // Aplica a formatação
  formatarWhatsApp(e.target);
  
  // Restaura a posição do cursor, ajustando para mudanças na formatação
  const newLength = e.target.value.length;
  const lengthDiff = newLength - oldLength;
  e.target.setSelectionRange(cursorPosition + lengthDiff, cursorPosition + lengthDiff);
});
  
  // Adiciona evento de copiar código PIX
  const copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const pixCode = document.querySelector('.pix-code code').textContent;
      navigator.clipboard.writeText(pixCode);
      showToast('Código PIX copiado!');
    });
  }
}

// Event Listeners
cartBtn.addEventListener('click', () => {
  document.body.classList.add('cart-open');
  cartEl.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
  document.body.classList.remove('cart-open');
});

cartOverlay.addEventListener('click', () => {
  document.body.classList.remove('cart-open');
});

// Checkout modal
checkoutBtn.addEventListener('click', (e) => {
  if (cart.length === 0) {
    e.preventDefault();
    showToast('Adicione itens ao carrinho antes de finalizar');
    return;
  }
  
  // Atualiza os valores no modal
  document.getElementById('checkout-subtotal').textContent = document.getElementById('cart-subtotal').textContent;
  document.getElementById('checkout-total').textContent = document.getElementById('cart-total').textContent;
  
  // Exibe o modal
  checkoutModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

// Fechar modal de checkout
closeCheckoutBtn.addEventListener('click', () => {
  checkoutModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Selecionar método de pagamento
paymentOptions.forEach(option => {
  option.addEventListener('click', () => {
    paymentOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    const method = option.dataset.method;
    updatePaymentDetails(method);
  });
});

// Evento para calcular frete
document.getElementById('calcular-frete-btn').addEventListener('click', () => {
  const cepInput = document.getElementById('cep-input');
  let cep = cepInput.value;
  
  if (!cep || cep.replace(/\D/g, '').length < 8) {
    showToast('Digite um CEP válido com 8 dígitos');
    return;
  }
  
  // Formata o CEP
  cep = formatarCEP(cep);
  cepInput.value = cep;
  
  // Calcula frete aleatório
  const valorFrete = calcularFrete(cep);
  document.getElementById('frete-valor').textContent = `R$ ${valorFrete.toFixed(2)}`;
  
  // Mostra o valor do frete
  document.querySelector('.frete-value').style.display = 'flex';
  
  // Atualiza o total
  const subtotal = parseFloat(document.getElementById('checkout-subtotal').textContent.replace('R$ ', '').replace(',', '.'));
  const total = subtotal + valorFrete;
  document.getElementById('checkout-total').textContent = `R$ ${total.toFixed(2)}`;
  
  showToast(`Frete para ${cep}: R$ ${valorFrete.toFixed(2)}`);
});

// Máscara para o CEP
document.getElementById('cep-input').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 5) {
    value = value.substring(0, 5) + '-' + value.substring(5, 8);
  }
  e.target.value = value;
});

// Confirmar compra
confirmPurchaseBtn.addEventListener('click', () => {
  confirmPurchaseBtn.addEventListener('click', () => {
  // Valida o WhatsApp
  const whatsappInput = document.getElementById('whatsapp');
  const isWhatsAppValid = formatarWhatsApp(whatsappInput);

  if (!isWhatsAppValid) {
    showToast('WhatsApp inválido. Digite (DDD) + 9 dígitos.');
    return;
  }
  // ... resto da validação
});
  // Validar campos obrigatórios baseado no método de pagamento
  const activeMethod = document.querySelector('.payment-option.active').dataset.method;
  let isValid = true;
  
  if (activeMethod === 'credit' || activeMethod === 'debit') {
    const cardNumber = document.getElementById('card-number').value.replace(/\D/g, '');
    const cardDate = document.getElementById('card-expiry').value;
    const cardCVV = document.getElementById('card-cvv').value;
    const whatsapp = document.getElementById('whatsapp').value.replace(/\D/g, '');
    
    if (cardNumber.length < 16) {
      showToast('Número de cartão inválido');
      isValid = false;
    }
    
    if (cardDate.length < 5 || cardDate.indexOf('/') === -1) {
      showToast('Data de validade inválida');
      isValid = false;
    }
    
    if (cardCVV.length < 3) {
      showToast('CVV inválido');
      isValid = false;
    }
    
    if (whatsapp.length < 11) {
      showToast('WhatsApp inválido');
      isValid = false;
    }
  } else if (activeMethod === 'pix' || activeMethod === 'boleto') {
    const whatsapp = document.getElementById('whatsapp')?.value.replace(/\D/g, '');
    if (whatsapp && whatsapp.length < 11) {
      showToast('WhatsApp inválido');
      isValid = false;
    }
  }
  
  if (!isValid) return;
  
  // Esconde o modal de checkout
  checkoutModal.style.display = 'none';
  
  // Mostra a tela de confirmação
  confirmationScreen.style.display = 'flex';
  
  // Gera um número de pedido aleatório
  document.getElementById('order-number').textContent = Math.floor(10000 + Math.random() * 90000);
  
  // Depois de 3 segundos, redireciona para a página inicial
  setTimeout(() => {
    confirmationScreen.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpa o carrinho
    cart = [];
    salvarCarrinhoNoLocalStorage();
    atualizarCarrinho();
    exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
    
    // Redireciona para a página inicial
    window.location.href = 'index.html';
  }, 3000);
});

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  if (e.target === cartOverlay) {
    document.body.classList.remove('cart-open');
  }
});

// Filtro e busca
filtroCategoria.addEventListener('change', () => {
  exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
});

searchInput.addEventListener('input', () => {
  exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
});

sortBy.addEventListener('change', () => {
  exibirProdutos(filtroCategoria.value, searchInput.value, sortBy.value);
});

// Funções globais para serem chamadas do HTML
window.removerItem = removerItem;
window.atualizarQuantidade = atualizarQuantidade;

// aplicar promoção de 10% para hortifruti
function aplicarPromocao(produto) {
  if (produto.categoria === 'Hortifruti') {
    return produto.preco * 0.9; // 10% de desconto
  }
  return produto.preco;
}