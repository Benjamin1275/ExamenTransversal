function cargarDatosSelect(url, selectId, valueField, textField, defaultText = "Seleccione una opción") {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Esto te ayudará a ver la estructura de los datos
            const select = document.querySelector(selectId);
            select.innerHTML = ''; // Limpiar opciones existentes

            // Crear y añadir la opción predeterminada
            const defaultOption = document.createElement('option');
            defaultOption.textContent = defaultText;
            defaultOption.value = '';
            select.appendChild(defaultOption);

            // Añadir las opciones obtenidas de la API
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item?.[valueField]; // Acceso seguro a la propiedad
                option.textContent = item?.[textField]; // Acceso seguro a la propiedad
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

$(document).ready(function() {
    // URL base de tu API
    const url_api = 'http://localhost:9010/api/';

    // Llamadas a cargarDatosSelect con la URL completa formada por la URL base + path específico
    cargarDatosSelect(url_api + 'servicioAd', '#cbServicios', 'idServicioAdicional', 'nombre');
    cargarDatosSelect(url_api + 'tipoHab', '#cbTipoHab', 'idTipoHabitacion', 'nombre');
    cargarDatosSelect(url_api + 'empleado', '#cbEmpleado', 'idEmpleado', 'rut');
    cargarDatosSelect(url_api + 'hotel', '#cbHotel', 'idHotel', 'nombre');
});

// Para guardar datos estaticos en la bd
$('#btnGuardar').click(function() {
    const estadoHabitacion = $('#cbEstado').val();
    const tipoCama = $('#cbTamano').val();
    const url_api = 'http://localhost:9010/api/habitaciones'; 

    const datosHabitacion = {
        estado: estadoHabitacion,
        tipoCama: tipoCama,
    };

    $.ajax({
        type: "POST",
        url: url_api, 
        contentType: "application/json", 
        data: JSON.stringify(datosHabitacion), 
        success: function(response) {
            console.log('Datos guardados correctamente:', response);
        },
        error: function(error) {
            console.error('Error al guardar los datos:', error);
        }
    });
});