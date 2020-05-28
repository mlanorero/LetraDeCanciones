import { API } from './api.js'
import * as UI from './interfaz.js'


UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if ( artista === '' || cancion === '') {

    // El usuario deja los campos sin llenar, mostrar error
        UI.divMensajes.innerHTML = 'Error ... todos los campos son obligarotios'
        UI. divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = ''
            UI. divMensajes.classList.remove('error');
        }, 3000);
    } else {
    // el formulario está completo, realizar consulta a la API
        const api = new API(artista, cancion);
        api.consultarAPI()
                .then(data => {
                    if(data.respuesta.lyrics) {
                        console.log(data);
                        //La canción existe
                        const letra = data.respuesta.lyrics;
                        UI.divResultado.textContent = letra;
                    } else {
                           // El usuario deja los campos sin llenar, mostrar error
                        UI.divMensajes.innerHTML = 'La canción no existe, prueba con otra búsqueda'
                        UI. divMensajes.classList.add('error');
                        setTimeout(() => {
                        UI.divMensajes.innerHTML = ''
                        UI. divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                        }, 3000);
                    }
                }
        )
    }
})