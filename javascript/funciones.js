function validarFormulario(event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    var mascota = document.getElementById('mascota').value.trim();
    var vacuna = document.getElementById('vacuna').value.trim();
    var fecha = document.getElementById('fecha').value;
    var proximaDosis = document.getElementById('proxima_dosis').value;
    var email = document.getElementById('Email').value;

    // Variable para rastrear si hay algún error
    var hayError = false;

    // Validar el campo de mascota
    if (mascota === '') {
        mostrarError('mascota', 'Por favor ingrese el nombre de la mascota');
        hayError = true;
    } else if (!/^[a-zA-Z]+$/.test(mascota)) {
        mostrarError('mascota', 'Por favor ingrese solo caracteres alfabéticos');
        hayError = true;
    } else {
        ocultarError('mascota');
    }

    // Validar el campo de vacuna
    if (vacuna === '') {
        mostrarError('vacuna', 'Por favor ingrese el nombre de la vacuna');
        hayError = true;
    } else if (!/^[a-zA-Z]+$/.test(vacuna)) {
        mostrarError('vacuna', 'Por favor ingrese solo caracteres alfabéticos');
        hayError = true;
    } else {
        ocultarError('vacuna');
    }
 // Validar campo de fecha
 if (!esFechaValida(fecha)) {
    mostrarError('fecha', 'Por favor seleccione una fecha válida');
    hayError = true;
} else {
    ocultarError('fecha');
}
  // Validar campo de próxima dosis
  if (!esFechaValida(proximaDosis)) {
    mostrarError('proxima_dosis', 'Por favor seleccione una fecha válida para la próxima dosis');
    hayError = true;
} else if (fecha && proximaDosis <= fecha) {
    mostrarError('proxima_dosis', 'La próxima dosis debe ser posterior a la fecha de la vacuna');
    hayError = true;
} else {
    ocultarError('proxima_dosis');
}

    // Validar el formato del email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarError('Email', 'Ingrese un correo electrónico válido');
        hayError = true;
    } else {
        ocultarError('Email');
    }

    // Si hay algún error, evitamos que el formulario se envíe
    if (hayError) {
        return false;
    }

    // Si la validación ha pasado, mostrar notificación y enviar el formulario
    Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: '¡Tu formulario ha sido enviado correctamente!',
        showConfirmButton: false,
        timer: 2000
    });

    return true;
}

function mostrarError(campo, mensaje) {
    var campoElemento = document.getElementById(campo);
    campoElemento.classList.add('is-invalid');

    var errorMensaje = campoElemento.nextElementSibling;
    errorMensaje.innerText = mensaje;
    errorMensaje.style.display = 'block';
}

function ocultarError(campo) {
    var campoElemento = document.getElementById(campo);
    if (campoElemento) {
        campoElemento.classList.remove('is-invalid');

        var errorMensaje = campoElemento.nextElementSibling;
        if (errorMensaje) {
            errorMensaje.innerText = '';
            errorMensaje.style.display = 'none';
        }
    }
}
function esFechaValida(fecha) {
    var partesFecha = fecha.split('-');
    var anio = parseInt(partesFecha[0]);
    var mes = parseInt(partesFecha[1]) - 1; 
    var dia = parseInt(partesFecha[2]);
    var fechaObj = new Date(anio, mes, dia);
    return !isNaN(fechaObj.getTime()) && fechaObj.getFullYear() === anio && fechaObj.getMonth() === mes && fechaObj.getDate() === dia;
}

        function eliminarFila(element){
            $(element).parent().parent().remove()
        }
        function agregarFila(){

            Swal.fire({
                title: "<strong><u>Formulario de ingreso</u></strong>",
                icon: "info",
                html: `
                <div id="form-sweet" class="card border-dark mb-3" style="max-width: 100%;">

                    <div class="card-body text-dark">
                        <div id="campoNombre">
                            <h5 class="card-title">Nombre mascota</h5>
                            <input class="form-control" type="text" id="nombre" required>
                        </div>
                        <div id="campoVacuna">
                            <h5 class="card-title">Vacuna</h5>
                            <input class="form-control" type="text" id="vacuna">
                        </div>
                        <div id="campoPrecio">
                            <h5 class="card-title">Precio</h5>
                            <input class="form-control" type="number" id="precio">
                        </div>
                        <div id="campoFecha">
                            <h5 class="card-title">Fecha</h5>
                            <input class="form-control" type="date" id="fecha">
                        </div>
                        <div id="campoDosis">
                            <h5 class="card-title">Proxima dosis</h5>
                            <input class="form-control" type="date" id="proxDosis">
                        </div>

                    </div>
                </div>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `
                <button onclick="agregarFilaTabla($('#form-sweet input'))" class="btn btn-success">Aceptar</button>
                `,
                cancelButtonText: `
                <button class="btn btn-danger">Cancelar</button>
                `,
            });

            

            /*
            
             <tr id="fila0">
                <th scope="col">Fecha</th>
                <th scope="col">Vacuna</th>
                <th scope="col">Proxima dosis</th>
                <th scope="col">Valor</th>
                <th scope="col">Accion</th>
            </tr>
            */

        }
        function agregarFilaTabla(div){
            console.log(div)
            var fecha = "<td scope='col'>"+div[3].value+"</td>"
            var vacuna = "<td scope='col'>"+div[1].value+"</td>"
            var PróximaDosis = "<td scope='col'>"+div[4].value+"</td>"
            var valor = "<td scope='col'>"+div[2].value+"</td>"
            var accion = "<td scope='col'><button onclick=\"eliminarFila(this)\" class=\"btn btn-outline-danger\">Eliminar</button></td>"
            var htmlFila = "<tr >"+fecha+vacuna+PróximaDosis+valor+accion+"</tr>"

            $("#vacuna").append(htmlFila)

        }