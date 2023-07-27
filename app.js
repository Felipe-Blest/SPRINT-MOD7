import axios from 'axios';
import moment from 'moment';

// function nuevoUsuario() { ... }
const nuevoUsuario = (async () => {
    let nombre = document.querySelector('#nombre-form1').value
    let balance = document.querySelector('#balance-form1').value
    try {
        const response = await fetch("http://localhost:3000/usuario", {
            method: "post",
            body: JSON.stringify({
                nombre,
                balance,
            }),
        });
        location.reload();
    } catch (e) {
        alert("Algo salió mal ..." + e);
    }
});

// function getUsuarios() { ... }
const getUsuarios = async () => {
    const usuarios = document.querySelector('.usuarios')
    const response = await fetch("http://localhost:3000/usuarios");
    let data = await response.json();

    data.forEach(data => {
        usuarios.innerHTML += `
        <tr>
                <td>${data.nombre}</td>
                <td>${data.balance}</td>
                <td>
                  <button
                    class="btn btn-warning mr-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onclick="setInfoModal('${data.nombre}', '${data.balance}', '${data.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarUsuario('${data.id}')">Eliminar</button>
                </td>
              </tr>
        `
    });
};

// function actualizarUsuario(id) { ... }
// const actualizarUsuario = async (id) => {
//     const
// }

// function eliminarUsuario(id) { ... }
const eliminarUsuario = async (id) => {
    const response = await fetch(`http://localhost:3000/usuario?id=${id}`, {
        method: "DELETE",
    });
    getUsuarios();
};


// function nuevaTransferencia() { ... }
const nuevaTransferencia = (async (e) => {
    e.preventDefault();
    const emisor = document.querySelector('#emisor').value
    const receptor = document.querySelector('#receptor').value
    const monto = document.querySelector('#monto').value
    if (!monto || !emisor || !receptor) {
        alert("Debe seleccionar un emisor, receptor y monto a transferir");
        return false;
    }
    try {
        const response = await fetch("http://localhost:3000/transferencia", {
            method: "post",
            body: JSON.stringify({
                emisor,
                receptor,
                monto,
            }),
        });
        const data = await response.json();
        location.reload();
    } catch (e) {
        console.log(e);
        alert("Algo salió mal..." + e);
    }
});


// function getTransferencias() { ... }
const getTransferencias = async () => {
    const { data } = await axios.get("http://localhost:3000/transferencias");
    data.forEach((data) => {
        $(".transferencias").append(`
       <tr>
         <td> ${formatDate(data[4])} </td>
         <td> ${data[1]} </td>
         <td> ${data[2]} </td>
         <td> ${data[3]} </td>
       </tr>
     `);
    });
};


// function formatDate(date) { ... }
const formatDate = (timestamp) => {
    return moment(timestamp).format("DD/MM/YYYY HH:mm");
};

// Exporta las funciones que necesites utilizar en los controladores.
module.exports = {
    nuevoUsuario,
    nuevaTransferencia,
    getUsuarios,
    eliminarUsuario,
    getTransferencias,
};