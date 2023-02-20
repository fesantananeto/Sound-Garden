const eventTable = document.getElementById('table_body')

let eventos = fetch('https://soundgarden-api.vercel.app/events')
.then(response => response.json())
.then(data => {    
    for (i=0; i<data.length; i++){
        let dataDoEvento = new Date (data[i].scheduled)        
        listaEvento(i,dataDoEvento, data[i].name)        
    }
    });

function listaEvento(numeroDoEvento, data, titulo) {
    const exibeEventos = document.createElement('tr')
    exibeEventos.innerHTML = `<th scope="row" id="evento-${numeroDoEvento+1}">${numeroDoEvento+1}</th>
        <td>${data}</td>
        <td>${titulo}</td>
        <td><a href="reservas.html" class="btn btn-dark">ver reservas</a>
        <a href="editar.html" class="btn btn-secondary">editar</a>
        <a href="editar.html" class="btn btn-danger">excluir</a>
        </td>`
    eventTable.append(exibeEventos)
}
