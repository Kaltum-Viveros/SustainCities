function volverInformativa() {
    window.location.href = 'index.html';
}

$(document).ready(function () {
    console.log("login-registro.js cargado");

    wrapperLogin();

    function wrapperLogin() {
        let template_bar = `
            <form id="loginForm">
                <h1>Inicio Sesión</h1>
                <div class="input-box">
                    <input type="email" 
                    id="correo" 
                    placeholder="Correo electrónico" 
                    required
                    title="Por favor, ingresa un correo electrónico válido.">
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box">
                    <input type="password" 
                    id="contraseña" 
                    placeholder="Contraseña" 
                    required
                    minlength="8" 
                    title="La contraseña debe tener al menos 8 caracteres.">
                    <i class='bx bxs-lock-alt'></i>
                </div>
                
                <button type="submit" id="iniciarSesion" class="btn" >Iniciar Sesión</button>

                <div class="link-lr">
                    <p>¿No tienes una cuenta?</p>
                    <a class="link" id="irRegistro">Registrarse</a>
                </div>
            </form>
        `;

        const contenedor = document.getElementById("contenedor");
        if (contenedor) {
            contenedor.innerHTML = template_bar;
        } else {
            console.log("No se encontró el contenedor");
        }

        $('#loginForm').on('submit', function (event) {
            event.preventDefault();
            loginUser();
        });
    }

    function wrapperRegistro() {
        let template_bar = `
            <form id="registerForm">
                <h1>Registro</h1>
                <div class="input-box">
                    <input type="text" 
                    id="nombre" 
                    placeholder="Ingresa tu nombre" 
                    required
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]{2,50}" 
                    title="El nombre debe contener solo letras y espacios, entre 2 y 50 caracteres.">
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box">
                    <select id="estado" required title="Selecciona tu estado">
                        <option value="">Selecciona tu estado</option>
                    </select>
                    <i class='bx bxs-map'></i>
                </div>

                <div class="input-box">
                    <select id="ciudad" required title="Selecciona tu ciudad" disabled>
                        <option value="">Selecciona tu ciudad</option>
                    </select>
                    <i class='bx bxs-city'></i>
                </div>

                <div class="input-box">
                    <input type="tel" 
                    id="telefono" 
                    placeholder="Ingresa tu télefono" 
                    required
                    pattern="\\d{10}" 
                    title="El teléfono debe contener exactamente 10 dígitos.">
                    <i class='bx bxs-phone'></i>
                </div>

                <div class="input-box">
                    <input type="email" 
                    id="correo" 
                    placeholder="Ingresa tu correo electrónico" 
                    required
                    title="Por favor, ingresa un correo electrónico válido."
                    >
                    <i class='bx bxs-envelope'></i>
                </div>

                <div class="input-box">
                    <input type="password" 
                    id="contraseña" 
                    placeholder="Crea una contraseña" 
                    required
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}" 
                    title="La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.">
                    <i class='bx bxs-lock-alt'></i>
                </div>

                <button type="submit" class="btn" id="btnRegistrarse">Registrarse</button>

                <div class="link-lr">
                    <p>¿Ya tienes una cuenta?</p>
                    <a class="link" id="volverLogin">Ir a Inicio de Sesión</a>
                </div>
            </form>
        `;

        const contenedor = document.getElementById("contenedor");
        if (contenedor) {
            contenedor.innerHTML = template_bar;
            cargarEstados();
        } else {
            console.log("No se encontró el contenedor");
        }

        $('#registerForm').on('submit', function (event) {
            event.preventDefault();
            registerUser();
        });
    }

    $(document).on('click', '#irRegistro', function () {
        wrapperRegistro();
    });

    $(document).on('click', '#volverLogin', function () {
        wrapperLogin();
    });

    function cargarEstados() {
        fetch('http://localhost/SustainCities/backend/getEstados.php')
            .then(response => response.json())
            .then(estados => {
                const estadoSelect = document.getElementById('estado');
                if (estadoSelect) {
                    estados.forEach(estado => {
                        const option = document.createElement('option');
                        option.value = estado.id_estado;
                        option.textContent = estado.nombre_estado;
                        estadoSelect.appendChild(option);
                    });
    
                    // Escuchar cambios en el select de estados
                    estadoSelect.addEventListener('change', function () {
                        const idEstado = this.value;
                        const ciudadSelect = document.getElementById('ciudad');
                        if (idEstado) {
                            cargarCiudades(idEstado); // Llamar a cargarCiudades con el ID del estado seleccionado
                            ciudadSelect.disabled = false; // Habilitar el select de ciudades
                        } else {
                            ciudadSelect.innerHTML = '<option value="">Selecciona tu ciudad</option>';
                            ciudadSelect.disabled = true; // Deshabilitar si no hay estado seleccionado
                        }
                    });
                } else {
                    console.log("No se encontró el select de estados");
                }
            })
            .catch(error => console.error('Error al cargar los estados:', error));
    }
    
    function cargarCiudades(idEstado) {
        fetch(`http://localhost/SustainCities/backend/getCiudades.php?id_estado=${idEstado}`)
            .then(response => response.json())
            .then(ciudades => {
                const ciudadSelect = document.getElementById('ciudad');
                if (ciudadSelect) {
                    ciudadSelect.innerHTML = '<option value="">Selecciona tu ciudad</option>'; // Limpiar opciones anteriores
                    ciudades.forEach(ciudad => {
                        const option = document.createElement('option');
                        id_ciudad = ciudad.id_ciudad;
                        option.value = ciudad.id_ciudad;
                        option.textContent = ciudad.nombre;
                        ciudadSelect.appendChild(option);
                    });
                } else {
                    console.log("No se encontró el select de ciudades");
                }
            })
            .catch(error => console.error('Error al cargar las ciudades:', error));
    }

    function registerUser() {
        const data = {
            nombre: document.getElementById('nombre').value,
            id_ciudad: document.getElementById('ciudad').value,
            telefono: document.getElementById('telefono').value,
            correo: document.getElementById('correo').value,
            password: document.getElementById('contraseña').value
        };
    
        fetch('http://localhost/SustainCities/backend/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Enviamos todo dentro del campo 'data'
            })
            .then(response => response.json())
            .then(data => {
                wrapperLogin();
            })
            .catch(error => console.error('Error:', error));
        }

        // Función para logear un usuario
function loginUser() {
    const data = {
        correo: document.getElementById('correo').value,
        password: document.getElementById('contraseña').value
    };

    fetch('http://localhost/SustainCities/backend/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data ) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login exitoso') {
            window.location.href = 'foroprueba.php';
        }
    })
    .catch(error => console.error('Error:', error));
}

});
