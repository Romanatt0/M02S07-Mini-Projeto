const formulario = document.getElementById('form');
const emailInput = document.getElementById('email');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    let email = emailInput.value;
    localStorage.setItem('email', JSON.stringify(email));
});