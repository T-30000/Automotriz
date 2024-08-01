document.addEventListener('DOMContentLoaded', loadEmpleados);

async function loadEmpleados() {
    try {
        const response = await fetch("/empleados-pendientes-contratacion"); // Endpoint para obtener empleados
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const empleados = await response.json();
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas
        empleados.forEach(empleado => {
            const card = document.createElement('div');
            card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-white', 'custom-card');
            card.setAttribute('data-id', empleado.id_empleado);
            card.innerHTML = `
                <img class="w-full" src="${empleado.foto_url}" alt="Employee image" style="height: 14em;">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">${empleado.nombre} ${empleado.apellido}</div>
                    <p class="text-gray-700 text-base">
                        <strong>Actualmente:</strong> ${empleado.estado || 'No especificada'}<br>
                        <strong>Celular:</strong> ${empleado.telefono || 'No especificado'}<br>
                        <strong>Email:</strong> ${empleado.email || 'No especificado'}<br>
                        <strong>Direccion:</strong> ${empleado.direccion || 'No especificado'}<br>
                        <strong>Fecha de contratación:</strong> ${empleado.fecha_contrato || 'No especificado'}<br>
                        <strong>Puesto:</strong> ${empleado.puesto || 'No especificado'}<br>
                        <strong>Sueldo:</strong> ${empleado.sueldo || 'No especificado'}<br>
                        <strong>Comisión:</strong> ${empleado.comision || 'No especificado'}<br>
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded custom-discard-btn" onclick="handleDiscard('${empleado.id_empleado}')">Despedir</button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading employees:', error);
        alert('Error al cargar los empleados. Por favor, inténtelo de nuevo más tarde.');
    }
}

async function handleDiscard(empleadoId) {
    openModal(`¿Seguro que desea descartar al empleado con ID ${empleadoId}?`, empleadoId);
}

function openModal(message, empleadoId) {
    document.getElementById('customModalText').textContent = message;
    document.getElementById('customConfirmBtn').setAttribute('data-id', empleadoId);
    document.getElementById('customModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('customModal').style.display = 'none';
}

document.getElementById('customConfirmBtn').addEventListener('click', async function() {
    const empleadoId = this.getAttribute('data-id');
    try {
        const response = await fetch('/despedir-empleado', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ empleado_id: empleadoId }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        alert(result.message || 'Empleado descartado exitosamente');
        closeModal();
        loadEmpleados(); // Recargar la lista de empleados
    } catch (error) {
        console.error('Error discarding employee:', error);
        alert('Error al descartar el empleado. Por favor, inténtelo de nuevo más tarde.');
    }
});

document.getElementById('customCancelBtn').addEventListener('click', closeModal);
