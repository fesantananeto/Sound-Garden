const API_URL = "https://soundgarden-api.vercel.app/bookings";

const buscaParametro = () => {

    const url = new URL(window.location.href);

    const id = url.searchParams.get('id');

    return id;
}
console.log(buscaParametro())

const listarReserva = async () => {
    const eventos = await fetch(API_URL + "/event/" + buscaParametro(), {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        
        return resposta.json();
    });
    
    const tbody = document.querySelector('.listar-reserva tbody');
    let htmlEventos = "";
    eventos.forEach(evento => {
        htmlEventos += `
            <tr>
                <th scope="row">#</th>
                <td>${evento.owner_name}</td>
                <td>${evento.owner_email}</td>
                <td>${evento.number_tickets}</td>
              </tr>
        `;
    });
    tbody.innerHTML = htmlEventos;
}
listarReserva();