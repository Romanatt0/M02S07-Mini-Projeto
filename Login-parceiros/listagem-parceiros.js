const cards = document.getElementById('cards');
const form = document.getElementsByTagName('form')[0];
const input = document.getElementsByTagName('input')[0];

fetch("https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then(res => res.json())
  .then(parceiros => {
    parceiros.forEach(parceiro => {
      criarCard(parceiro);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      cards.innerHTML = '';

      let valorInput = input.value.toLowerCase().trim();
      parceiros.forEach(parceiro => {
        if (
          parceiro.nomeParceiro.toLowerCase().includes(valorInput) ||
          parceiro.bairro.toLowerCase().includes(valorInput)
        ) {
          criarCard(parceiro);
        }
      });
    });

    input.addEventListener('input', () => {
      if (input.value === '') {
        cards.innerHTML = '';
        parceiros.forEach(parceiro => {
          criarCard(parceiro);
        });
      }
    });
  })
  .catch(err => {
    alert("Erro ao encontrar parceiros.");
    console.error(err);
  });

function criarCard(parceiro) {
  const card = document.createElement('li');

  let img;
  if (parceiro.tipoParceiro.toLowerCase() === 'eco') {
    img = document.createElement('img');
    img.src = './imagens/ecoponto.jpg';
    img.style.height = '100px';
    img.style.width = '70px';
  } else if (parceiro.tipoParceiro.toLowerCase() === 'coo') {
    img = document.createElement('img');
    img.src = './imagens/cooperativa.png';
    img.style.height = '80px';
  } else if (parceiro.tipoParceiro.toLowerCase() === 'pev') {
    img = document.createElement('img');
    img.src = './imagens/PEV-Man.png';
    img.style.height = '80px';
  }
  if (img) {
    card.appendChild(img);
  }

  const resumo = document.createElement('div');
  resumo.innerHTML = `<strong>Nome: </strong>${parceiro.nomeParceiro}\n<strong>Bairro: </strong>${parceiro.bairro}\n<strong>Data de Registro: </strong>${parceiro.dataCriacao}`;
  card.appendChild(resumo);

  const detalhes = document.createElement('div');
  detalhes.innerHTML = `
    <strong>Tipo Parceiro: </strong>${parceiro.tipoParceiro}<br>
    <strong>Telefone: </strong>${parceiro.telefone || 'N/A'}<br>
    <strong>Endereço Completo: </strong>${parceiro.endereco || 'N/A'}
  `;
  card.appendChild(detalhes);

  // Alterna classe expanded para mostrar/esconder detalhes com transição
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });

  cards.appendChild(card);
}
