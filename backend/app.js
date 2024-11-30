// Función para registrar un nuevo usuario
function registerUser() {
    const data = {
        nombre: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        password: document.getElementById('contraseña').value
    };

    fetch('http://localhost/proyecto/backend/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Enviamos todo dentro del campo 'data'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Usuario registrado exitosamente') {
            // Redirigir al login o mostrar mensaje de éxito
        }
    })
    .catch(error => console.error('Error:', error));
}

// Función para logear un usuario
function loginUser() {
    const data = {
    correo: document.getElementById('correo').value,
    password: document.getElementById('contraseña').value
    };

    fetch('http://localhost/proyecto/backend/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data }) 
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Login exitoso') {
            // Redirigir a la página principal o mostrar datos del usuario
            console.log(data.user); // Aquí puedes acceder a los datos del usuario
        }
    })
    .catch(error => console.error('Error:', error));
}
