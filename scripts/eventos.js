const indexHTML = document.querySelector("main");
indexHTML.innerHTML += `<div id="addReservaModal" id_evento class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="addReservaModalLabel">Reserva de ingressos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <form id="reserva" class="col-12">
              <input type="hidden" name="event_id" id="id" value="" />
            <form method="post" id="insert_form">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Nome</label>
                    <div class="col-sm-10">
                        <input data-name="nome" type="text" class="form-control" id="nome" placeholder="Nome completo">
                    </div>
                </div>
<br>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">E-mail</label>
                    <div class="col-sm-10">
                        <input name="email" type="email" class="form-control" id="email"
                            placeholder="Seu melhor e-mail">
                    </div>
                </div>
                <input type="hidden" name="tickets" id="tickets">
                <input type="hidden" name="id" data-id="inputId" id="id">
                <div class="form-group row">
                    <div class="col-sm-10">
                    <br>
                        <input type="submit" name="CadUser" id="CadUser" value="Confirmar reserva"
                            class="btn btn-dark">
                    </div>
                </div>
            </form>
            </form>
        </div>
    </div>
</div>
</div>`;
console.log(indexHTML);


//

const url = "https://soundgarden-api.vercel.app/bookings";
const eventosLista = document.querySelector("#eventos");

const listarEventos = async () => {
  const response = await fetch(`${url}/events`, {
    method: "GET",
    redirect: "follow",
  });
  const eventos = await response.json();

  let novaLista = "";

  for (let index = 0; index < 3; index++) {
    novaLista = `<article class="evento card p-5 m-3"><h2>${eventos[index].name}</h2>
    <h4>${eventos[index].attractions}</h4>
    <p>${eventos[index].description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>`;
  }
  eventosLista.innerHTML = novaLista;

  for (let index = 0; index < 2; index++) {
    novaLista = `<article class="evento card p-5 m-3"><h2>${eventos[index].name}</h2>
    <h4>${eventos[index].attractions}</h4>
    <p>${eventos[index].description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>`;
  }
  eventosLista.innerHTML += novaLista;

  for (let index = 0; index < 1; index++) {
    novaLista = `<article class="evento card p-5 m-3"><h2>${eventos[index].name}</h2>
    <h4>${eventos[index].attractions}</h4>
    <p>${eventos[index].description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>`;
  }
  eventosLista.innerHTML += novaLista;
};

listarEventos();

//MODAL
const modalReserva = document.getElementById("addReservaModal");

const formReserva = modalReserva.querySelector("form");

formReserva.addEventListener("submit", (event) => {
  event.preventDefault();

  const dados = {
    owner_name: document.getElementById('nome').value,
    owner_email: document.getElementById('email').value,
    number_tickets: 1,
    event_id: "",
  }; 

  fetch(`${url}/bookings/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then(() => {
      alert("Reserva feita com sucesso");
      window.location.replace("eventos.html")
    })
    .catch((error) => console.log(error.message));
});

//

const eventShow= document.getElementById('div-eventos')

let eventos = fetch('https://soundgarden-api.vercel.app/events')
.then(response => response.json())
.then(data => {
          
    for (i=0; i<data.length; i++){        
        let dataDoEvento0 = formataData(data[i].scheduled)
        listaEvento(data[i].name, dataDoEvento0, data[i].attractions, data[i].description)
                      
    }
    });

function listaEvento(nomeDoEvento, data, atracoes,descricao) {

    const exibeEventos = document.createElement('article')
    exibeEventos.classList.add('evento-card')
    exibeEventos.innerHTML = `<h2>${nomeDoEvento} - ${data}</h2>
    <h4>${atracoes}</h4>
    <p>
      ${descricao}
    </p>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
    reservar ingresso
  </button>`
    eventShow.append(exibeEventos)
}
function formataData (data){
    console.log(data)
    let dataArr = [...data]
    let ano = dataArr[0]+dataArr[1]+dataArr[2]+dataArr[3]
    let mes = dataArr[5]+dataArr[6]
    let dia = dataArr[8]+dataArr[9]
    let dataDoEvento = `${dia}/${mes}/${ano}`
    return dataDoEvento

}
