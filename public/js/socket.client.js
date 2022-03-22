//Referencias HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => { //Este metodo ayuda a conocer cuando se conecta al servidor
    console.log('Conectado al servidor'); //Como un listener
    
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

// On, se usa para escuchar eventos
socket.on('disconnect', () => {
    console.log('Desconectado del Servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';

});

socket.on('send-message', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: '123456',
        date: new Date().getTime()
    }

    socket.emit('send-message', payload, (id) => {
        console.log('Desde el server', id);
    });
});

