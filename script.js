
    document.getElementById("form-parceiro").addEventListener("submit", function (e) {
        e.preventDefault();

        const residuosMarcados = Array.from(document.querySelectorAll("input[name='residuos']:checked")).map(el => el.value);

        const parceiro = {
            nome: document.getElementById("nome").value,
            tipo: document.getElementById("tipoParceiro").value,
            responsavel: document.getElementById("responsavelParceiro").value,
            telefone: document.getElementById("telefoneResponsavel").value,
            email: document.getElementById("email").value,
            endereco: {
                rua: document.getElementById("rua").value,
                numero: document.getElementById("numero").value,
                bairro: document.getElementById("bairro").value,
            },
            residuos: residuosMarcados
        };

        fetch("https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parceiro)
        })
        .then(res => res.json())
        .then(data => {
            alert("Parceiro cadastrado com sucesso!");
            console.log(data);
        })
        .catch(err => {
            alert("Erro ao cadastrar parceiro.");
            console.error(err);
        });
    });
