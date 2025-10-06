// --- LÓGICA PARA EL ESCENARIO 1 ---
function validarFecha() {
    const inputFecha = document.getElementById('fechaNacimiento').value;
    const errorFecha = document.getElementById('errorFecha');
    
    // Resetear estilo del error
    errorFecha.style.color = '#d93025';
    
    const partes = inputFecha.split('/');
    
    if (partes.length !== 3) {
        errorFecha.textContent = 'El formato debe ser DD/MM/AAAA.';
        return;
    }
    
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const año = parseInt(partes[2], 10);
    
    // Validaciones más completas
    if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
        errorFecha.textContent = 'Los valores deben ser números válidos.';
        return;
    }
    
    if (dia < 1 || dia > 31) {
        errorFecha.textContent = 'El día debe estar entre 1 y 31.';
        return;
    }
    
    if (año < 1900 || año > new Date().getFullYear()) {
        errorFecha.textContent = 'El año debe ser válido.';
        return;
    }
    
    errorFecha.textContent = 'Fecha válida.';
    errorFecha.style.color = 'green';
}

// --- LÓGICA PARA EL ESCENARIO 2 ---
function irAPantalla(idPantallaDestino) {
    const pantallaActual = document.querySelector('#flujoRecuperacion > div:not([style*="display: none"])');
    const pantallaActualId = pantallaActual ? pantallaActual.id : 'pantalla1';
    
    // Validaciones según la pantalla actual
    if (pantallaActualId === 'pantalla1' && idPantallaDestino === 'pantalla2') {
        if (!validarEmail()) {
            return; // No continuar si el email no es válido
        }
    }
    
    if (pantallaActualId === 'pantalla2' && idPantallaDestino === 'pantalla3') {
        if (!validarCodigo()) {
            return; // No continuar si el código no es válido
        }
    }
    
    if (pantallaActualId === 'pantalla3' && idPantallaDestino === 'finalizar') {
        if (!validarNuevaPassword()) {
            return; // No continuar si la contraseña no es válida
        }
        // Mostrar mensaje de éxito
        mostrarMensajeExito();
        // Habilitar botón de reinicio
        const btnReiniciar = document.querySelector('#pantalla3 button[onclick="reiniciarFlujo()"]');
        if (btnReiniciar) {
            btnReiniciar.disabled = false;
            btnReiniciar.textContent = 'Comenzar Nuevo Proceso';
        }
        return;
    }
    
    // Ocultamos todas las pantallas
    document.getElementById('pantalla1').style.display = 'none';
    document.getElementById('pantalla2').style.display = 'none';
    document.getElementById('pantalla3').style.display = 'none';
    
    // Mostramos solo la pantalla de destino
    document.getElementById(idPantallaDestino).style.display = 'block';
    
    // Limpiar mensajes de error al cambiar de pantalla
    limpiarErroresFlujo();
}

function validarEmail() {
    const emailInput = document.querySelector('#pantalla1 input[type="email"]');
    const email = emailInput.value.trim();

    let errorElement = document.getElementById('errorEmail');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = 'errorEmail';
        errorElement.className = 'mensaje-error';
        emailInput.parentNode.appendChild(errorElement);
    }

    if (!email) {
        errorElement.textContent = 'Ingrese un email.';
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'El formato del email no es válido. Debe contener @ y un dominio válido.';
        return false;
    }

    errorElement.textContent = '';
    return true;
}

function validarCodigo() {
    const codigoInput = document.querySelector('#pantalla2 input[type="text"]');
    const codigo = codigoInput.value.trim();

    let errorElement = document.getElementById('errorCodigo');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = 'errorCodigo';
        errorElement.className = 'mensaje-error';
        codigoInput.parentNode.appendChild(errorElement);
    }

    if (!codigo) {
        errorElement.textContent = 'Ingrese el código de seguridad.';
        return false;
    }

    if (codigo.length !== 6 || !/^\d{6}$/.test(codigo)) {
        errorElement.textContent = 'El código debe tener exactamente 6 dígitos.';
        return false;
    }

    errorElement.textContent = '';
    return true;
}

function validarNuevaPassword() {
    const passwordInput = document.querySelector('#pantalla3 input[type="password"]');
    const password = passwordInput.value;
    
    // Crear o encontrar elemento de error
    let errorElement = document.getElementById('errorNuevaPassword');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = 'errorNuevaPassword';
        errorElement.className = 'mensaje-error';
        passwordInput.parentNode.appendChild(errorElement);
    }
    
    if (!password) {
        errorElement.textContent = 'Debe ingresar una nueva contraseña.';
        return false;
    }
    
    if (password.length < 8) {
        errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        return false;
    }
    
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    
    if (!tieneCaracterEspecial) {
        errorElement.textContent = 'Debe incluir al menos un carácter especial (@, #, $, etc.).';
        return false;
    }
    
    if (!tieneMayuscula) {
        errorElement.textContent = 'Debe incluir al menos una letra mayúscula.';
        return false;
    }
    
    if (!tieneMinuscula) {
        errorElement.textContent = 'Debe incluir al menos una letra minúscula.';
        return false;
    }
    
    if (!tieneNumero) {
        errorElement.textContent = 'Debe incluir al menos un número.';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function mostrarMensajeExito() {
    // Crear o encontrar elemento de éxito
    let exitoElement = document.getElementById('mensajeExito');
    if (!exitoElement) {
        exitoElement = document.createElement('div');
        exitoElement.id = 'mensajeExito';
        exitoElement.style.cssText = `
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
            font-weight: bold;
            text-align: center;
        `;
        document.getElementById('pantalla3').appendChild(exitoElement);
    }
    
    exitoElement.innerHTML = `
        <strong>¡Éxito!</strong><br>
        Su contraseña ha sido cambiada correctamente.<br>
        Ya puede iniciar sesión con su nueva contraseña.
    `;
}

function limpiarErroresFlujo() {
    const errores = ['errorEmail', 'errorCodigo', 'errorNuevaPassword', 'mensajeExito'];
    errores.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            if (id === 'mensajeExito') {
                elemento.remove();
            } else {
                elemento.textContent = '';
            }
        }
    });
}

function reiniciarFlujo() {
    // Limpiar todos los campos
    document.querySelector('#pantalla1 input[type="email"]').value = '';
    document.querySelector('#pantalla2 input[type="text"]').value = '';
    document.querySelector('#pantalla3 input[type="password"]').value = '';
    
    // Limpiar errores y mensaje de éxito
    limpiarErroresFlujo();
    
    // Deshabilitar botón de reinicio otra vez
    const btnReiniciar = document.querySelector('#pantalla3 button[onclick="reiniciarFlujo()"]');
    if (btnReiniciar) {
        btnReiniciar.disabled = true;
        btnReiniciar.textContent = 'Reiniciar Proceso';
    }
    
    // Volver a la pantalla 1
    irAPantalla('pantalla1');
}

// --- LÓGICA PARA EL ESCENARIO 3 ---
function verificarCondiciones() {
    // Verificamos si al menos un producto está seleccionado
    const productosSeleccionados = document.querySelectorAll('input[name="producto"]:checked').length > 0;
    
    // Verificamos si una dirección está seleccionada
    const direccionSeleccionada = document.querySelector('input[name="direccion"]:checked') !== null;
    
    const btnConfirmar = document.getElementById('btnConfirmarPedido');
    
    // Si ambas condiciones son verdaderas, habilitamos el botón
    if (productosSeleccionados && direccionSeleccionada) {
        btnConfirmar.disabled = false;
    } else {
        btnConfirmar.disabled = true;
    }
}

// --- LÓGICA PARA EL ESCENARIO 5 ---
function validarPassword() {
    const password = document.getElementById('password').value;
    const errorPassword = document.getElementById('errorPassword');
    
    // Resetear color
    errorPassword.style.color = '#d93025';
    
    if (password.length < 8) {
        errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        return;
    }
    
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    
    if (!tieneCaracterEspecial) {
        errorPassword.textContent = 'La contraseña debe incluir al menos un carácter especial (@, #, $, etc.).';
        return;
    }
    
    if (!tieneMayuscula) {
        errorPassword.textContent = 'La contraseña debe incluir al menos una letra mayúscula.';
        return;
    }
    
    if (!tieneMinuscula) {
        errorPassword.textContent = 'La contraseña debe incluir al menos una letra minúscula.';
        return;
    }
    
    if (!tieneNumero) {
        errorPassword.textContent = 'La contraseña debe incluir al menos un número.';
        return;
    }
    
    errorPassword.textContent = '¡Contraseña válida y segura!';
    errorPassword.style.color = 'green';
}

// --- LÓGICA PARA EL ESCENARIO 4 (MENÚ) ---
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-principal a');
    
    // Deshabilitar botón de reinicio al cargar la página
    const btnReiniciar = document.querySelector('#pantalla3 button[onclick="reiniciarFlujo()"]');
    if (btnReiniciar) {
        btnReiniciar.disabled = true;
    }
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los links
            menuLinks.forEach(l => l.classList.remove('activo'));
            
            // Agregar clase activa al link clickeado
            this.classList.add('activo');
            
            // Simular navegación
            const texto = this.textContent;
            alert(`Navegando a: ${texto}`);
        });
    });
});