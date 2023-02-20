const novoEventoNome = document.getElementById("nome");
const novoEventoAtracao = document.getElementById("atracoes");
const novoEventoDescricao = document.getElementById("descricao");
const novoEventoData = document.getElementById("data");
const novoEventoLotacao = document.getElementById("lotacao");

const novoEventoForm = document.querySelector("form");

const novoEvento = {
  name:"",
  poster:"",
  attractions:[],
  description:"",
  scheduled:"",
  number_tickets: 0    
}

function dateToISO(data){
  let dataHora = data.split(' ')
  let [dia, mes, ano] = dataHora[0].split('/')
  let [hora, minuto] = dataHora[1].split(':')

  let dataFormatada = new Date (ano, mes, dia, hora, minuto)
  return dataFormatada.toISOString()
}

novoEventoForm.onsubmit = (event)=>{
  event.preventDefault();    
  let atracoes= novoEventoAtracao.value.split(',')

  novoEvento.attractions.push(...atracoes)

  novoEvento.description = novoEventoDescricao.value
  novoEvento.name = novoEventoNome.value
  novoEvento.number_tickets = novoEventoLotacao.value
  novoEvento.poster = "link do poster"

  novoEvento.scheduled = dateToISO(novoEventoData.value)

  fetch('https://soundgarden-api.vercel.app/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoEvento)
  }).then(responseCreateEvent => {
    if(responseCreateEvent.ok){
      return responseCreateEvent.json();        
    }else{
      console.error("Error Creating OBJECT")
    }
  }).then(dataCreateEvent => {
    console.log(dataCreateEvent);
    alert("Evento criado com sucesso!");
    window.location.href = "admin.html";
  }).catch(errorCreateEvent =>{
    console.log(errorCreateEvent);
  });
};
