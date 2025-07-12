const container = document.getElementById('detalhes-container');

// Pega o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${id}`)
  .then(res => res.json())
  .then(parceiro => {
    // Avatar
    let avatarSrc = '';
    switch (parceiro.tipoParceiro.toLowerCase()) {
      case 'eco': avatarSrc = '../imagens/ecoponto.jpg'; break;
      case 'coo': avatarSrc = '../imagens/cooperativa.png'; break;
      case 'pev': avatarSrc = '../imagens/PEV-Man.png'; break;
    }

     const residuos = [
      { nome: "Papel", valor: parceiro.papel },
      { nome: "Plástico", valor: parceiro.plastico },
      { nome: "Vidro", valor: parceiro.vidro },
      { nome: "Metal", valor: parceiro.metal },
      { nome: "Óleo de Cozinha", valor: parceiro.oleoCozinha },
      { nome: "Pilhas e Baterias", valor: parceiro.pilhaBateria },
      { nome: "Eletrônicos", valor: parceiro.eletronico },
      { nome: "Roupa", valor: parceiro.roupa },
      { nome: "Outros", valor: parceiro.outros }
    ];

    const residuosAceitosHtml = residuos
      .filter(r => r.valor === true)
      .map(r => `<p>${r.nome}</p>`)
      .join('');

    container.innerHTML = `
      <div class="card-detalhes">
        <img src="${avatarSrc}" alt="Avatar" class="avatar">

        <h2>${parceiro.nomeParceiro}</h2>
        <p><strong>Responsável:</strong> ${parceiro.responsavelParceiro}</p>
        <p><strong>Telefone:</strong> ${parceiro.telResponsavel}</p>
        <p><strong>Email:</strong> ${parceiro.emailResponsavel}</p>
        <p><strong>Data de cadastro:</strong> ${parceiro.dataCriacao}</p>
        <p><strong>Tipo parceiro:</strong> ${parceiro.tipoParceiro}</p>

        <h3>Endereço</h3>
        <p>${parceiro.rua}, Nº ${parceiro.numero}</p>
        <p>${parceiro.bairro}</p>

        <h3>Resíduos aceitos</h3>
        ${residuosAceitosHtml}
        <ul>
          ${(parceiro.tiposResiduos || []).map(res => `<li>${res}</li>`).join('')}
        </ul>
      </div>
    `;
  }
)
  .catch(err => {
    container.innerHTML = "<p>Erro ao carregar os dados do parceiro.</p>";
    console.error(err);
  });

   console.log(parceiro.nomeParceiro);
