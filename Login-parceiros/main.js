const formulario = document.getElementById('form');
const inputs = document.getElementsByTagName('input');
const inputEmail = document.getElementById('email');
const btnEntrar = document.getElementById('entrar');

Array.from(inputs).forEach(input => {
    input.addEventListener('input', (e) => {
        e.preventDefault();
        const todosPreenchidos = Array.from(inputs).every(input => input.value.trim() !== '');
        btnEntrar.disabled = !todosPreenchidos;
    });
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let email = inputEmail.value;
    localStorage.setItem('email', JSON.stringify(email));

    window.location.href = "./listagem-parceiros.html";
});