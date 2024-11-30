function volverInformativa() {
    window.location.href = 'index.html';
}

$(document).ready(function() {

    console.log("login-registro.js cargado");

    wrapperLogin();

    function wrapperLogin(){
        let template_bar = '';
        template_bar += `
            <form id="loginForm" action="">
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
                    <i class='bx bxs-lock-alt' ></i>
                </div>
                
                <button type="submit" id="iniciarSesion" class="btn" >Iniciar Sesión</button>

                <div class="link-lr">
                    <p>¿No tienes una cuenta?</p>
                    <a class="link" id="volverRegistro">Registrarse</a>
                </div>
            </form>
        `;

        let contenedor = document.getElementById("contenedor");
        if(contenedor){
            contenedor.innerHTML = template_bar;
        } else {
            console.log("No se encontró el contenedor");
        }
    }

    function wrapperRegistro(){
        let template_bar = '';
        template_bar += `
            <form id="registerForm" action="">
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
                    <input type="text" 
                    id="direccion" 
                    placeholder="Ingresa tu dirección" 
                    required
                    minlength="5" 
                    maxlength="100" 
                    title="La dirección debe tener entre 5 y 100 caracteres.">
                    <i class='bx bxs-building-house'></i>
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
                    <i class='bx bxs-envelope' ></i>
                </div>

                <div class="input-box">
                    <input type="password" 
                    id="contraseña" 
                    placeholder="Crea una contraseña" 
                    required
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}" 
                    title="La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.">
                    <i class='bx bxs-lock-alt' ></i>
                </div>

                <button type="submit" class="btn" id="btnRegistrarse">Registrarse</button>

                <div class="link-lr">
                    <p>¿Ya tienes una cuenta?</p>
                    <a class="link" id="volverLogin">Ir a Inicio de Sesión</a>
                </div>
            </form>
        `;
        let contenedor = document.getElementById("contenedor");
        if(contenedor){
            contenedor.innerHTML = template_bar;
        } else {
            console.log("No se encontró el contenedor");
        }
    }

    $(document).on('submit', '#registerForm', function(event) {
        event.preventDefault();
        wrapperLogin();
    });

    $(document).on('click', '#volverLogin', function() {
        wrapperLogin();
    });

    $(document).on('click', '#volverRegistro', function(){
        wrapperRegistro();
    });
});