function volverInformativa() {
    window.location.href = 'index.html';
}

$(document).ready(function() {

    console.log("login-registro.js cargado");

    wrapperLogin();

    function wrapperLogin(){
        let template_bar = '';
        template_bar += `
            <form id="loginForm">
                <h1>Inicio Sesión</h1>
                <div class="input-box">
                    <input type="text" id="correo" placeholder="Correo electrónico" required>
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box">
                    <input type="password" id="contraseña" placeholder="Contraseña" required>
                    <i class='bx bxs-lock-alt' ></i>
                </div>
                
                <button type="submit" class="btn">Iniciar Sesión</button>

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
        $('#loginForm').on('submit', function(event) {
            event.preventDefault(); 
            loginUser(); 
        });
    }

    function wrapperRegistro(){
        let template_bar = '';
        template_bar += `
            <form id="registerForm">
                <h1>Registro</h1>
                <div class="input-box">
                    <input type="text" id="nombre" placeholder="Ingresa tu nombre" required>
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box">
                    <input type="text" id="direccion" placeholder="Ingresa tu dirección" required>
                    <i class='bx bxs-building-house'></i>
                </div>

                <div class="input-box">
                    <input type="text" id="telefono" placeholder="Ingresa tu télefono" required>
                    <i class='bx bxs-phone'></i>
                </div>

                <div class="input-box">
                    <input type="text" id="correo" placeholder="Ingresa tu correo electrónico" required>
                    <i class='bx bxs-envelope' ></i>
                </div>

                <div class="input-box">
                    <input type="password" id="contraseña" placeholder="Crea una contraseña" required>
                    <i class='bx bxs-lock-alt' ></i>
                </div>

                <button  class="btn">Registrarse</button>

                <div class="link-lr">
                    <p>¿Ya tienes una cuenta?</p>
                    <a class="link" id="volverLogin">Ir a Inicio de Sesión</a>
                </div>
            </form>
        `;
        let contenedor = document.getElementById("contenedor");
        if(contenedor){
            contenedor.innerHTML = template_bar;
        }else{
            console.log("No se encontró el contenedor");
        }
        $('#registerForm').on('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe y recargue la página
            registerUser(); // Llamada a la función registerUser
        });
    }

    $(document).on('click', '#volverLogin', function(){
        wrapperLogin();
        
    });

    $(document).on('click', '#volverRegistro', function(){
        wrapperRegistro();
    });
});