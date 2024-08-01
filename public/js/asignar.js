document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del empleado desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const empleadoId = urlParams.get('id_empleado');

    if (empleadoId) {
        const idEmpleadoField = document.getElementById('id_empleado');
        if (idEmpleadoField) {
            idEmpleadoField.value = empleadoId;
        }
    }

    // Agregar la validación del formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
});

function validateForm(event) {
    const idEmpleado = document.getElementById('id_empleado').value;
    const sueldoBase = parseFloat(document.getElementById('sueldo_base').value);
    const descuentos = parseFloat(document.getElementById('descuentos').value);
    const comision = parseFloat(document.getElementById('comision').value);
    const prestamo = parseFloat(document.getElementById('prestamo').value);

    if (!idEmpleado) {
        alert('Por favor, ingrese el ID del empleado.');
        event.preventDefault();
        return;
    }

    if (isNaN(sueldoBase) || isNaN(descuentos) || isNaN(comision) || isNaN(prestamo)) {
        alert('Por favor, ingrese valores válidos en todos los campos.');
        event.preventDefault();
        return;
    }

    if (descuentos < 5 || descuentos > 30) {
        alert('Los descuentos deben estar entre 5 y 30.');
        event.preventDefault();
        return;
    }

    if (comision < 5 || comision > 30) {
        alert('La comisión debe estar entre 5 y 30.');
        event.preventDefault();
        return;
    }

    if (prestamo > sueldoBase) {
        alert('El préstamo no puede ser mayor que el sueldo base.');
        event.preventDefault();
        return;
    }

    if (sueldoBase < 500) {
        alert('El sueldo base no puede ser menor a 500.');
        event.preventDefault();
        return;
    }

    // Si todo está correcto, el formulario se envía
    alert('Formulario válido. Enviando datos...');
}
