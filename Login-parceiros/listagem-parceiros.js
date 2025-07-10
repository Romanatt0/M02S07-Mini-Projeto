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
    card.style.whiteSpace = 'pre-line'
    card.innerHTML = '<strong>Nome: </strong>' + parceiro.nomeParceiro + '\n';
    card.innerHTML += '<strong>Bairro: </strong>' + parceiro.bairro + '\n';
    card.innerHTML += '<strong>Data de Registro: </strong>' + parceiro.dataCriacao;
}