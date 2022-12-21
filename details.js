fetch('https://amazing-events.onrender.com/api/events')
.then(respuesta => respuesta.json())
.then (eventos => {
   let evento = eventos.events

  const queryString = location.search
  console.log(queryString)
  const parms = new URLSearchParams(queryString)
  const id = parms.get("id")
  let everyEvent = evento.find (item => item._id == id)
  console.log(everyEvent)

  const container = document.getElementById("cardDetails")

  container.innerHTML = `
  
  <h2 class="card-header">${everyEvent.name}</h2>
      <div class="card-body">
       <img src="${everyEvent.image}">
        <h5 class="card-title">${everyEvent.description}</h5>
        <h6 class="card-text">${everyEvent.category}</h6>
      </div>
  `
})