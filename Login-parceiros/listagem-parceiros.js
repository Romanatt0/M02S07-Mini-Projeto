const cards = document.getElementById('cards')
const form = document.getElementsByTagName('form')[0];
const input = document.getElementsByTagName('input')[0];



fetch("https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros", {
method: "GET",
headers: {"Content-Type": "application/json"
            },
})
.then(res => res.json())
.then(parceiros => {
    console.log(parceiros);
    parceiros.forEach(parceiro => {
        criarCard(parceiro);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        cards.innerHTML = '';

        let valorInput = input.value.toLowerCase().trim();
        parceiros.forEach(parceiro => {
            if (parceiro.nomeParceiro.toLowerCase().includes(valorInput) || parceiro.bairro.toLowerCase().includes(valorInput)) {
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
    cards.appendChild(card);

    //cooperativa
    if (parceiro.tipoParceiro.toLowerCase() === 'eco') {
        const imgEcoPonto = document.createElement('img');
        imgEcoPonto.src = './imagens/ecoponto.jpg';
        imgEcoPonto.style.height = '100px';
        imgEcoPonto.style.width = '70px';
        imgEcoPonto.style.display = 'block';
        imgEcoPonto.style.margin = 'auto';
        card.appendChild(imgEcoPonto);
    } else if (parceiro.tipoParceiro.toLowerCase() === 'coo') {
        const imgCooperativa = document.createElement('img');
        imgCooperativa.src = './imagens/cooperativa.png';
        imgCooperativa.style.height = '80px';
        imgCooperativa.style.display = 'block';
        imgCooperativa.style.margin = 'auto';
        card.appendChild(imgCooperativa);
    } else if (parceiro.tipoParceiro.toLowerCase() === 'pev'){
        const imgPev = document.createElement('img');
        imgPev.src = './imagens/PEV-Man.png';
        imgPev.style.height = '80px';
        imgPev.style.display = 'block';
        imgPev.style.margin = 'auto';
        card.appendChild(imgPev);
    }

    card.style.whiteSpace = 'pre-line'
    card.innerHTML += '\n\n' + '<strong>Nome: </strong>' + parceiro.nomeParceiro + '\n';
    card.innerHTML += '\n' + '<strong>Bairro: </strong>' + parceiro.bairro + '\n';
    card.innerHTML += '\n' + '<strong>Data de Registro: </strong>' + parceiro.dataCriacao;
}