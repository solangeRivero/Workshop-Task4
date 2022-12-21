let contenedorCheckbox = document.getElementById("checkbox")
let padreCheckbox = document.getElementById("checkbox")
let contenedorSearch = document.getElementById("inputSearch")
let contenedorCards = document.getElementById("card-temp")


let evento = data.events
let day = data.currentDate 
let filtroEvent= evento.filter(fecha => fecha.date > day)


let categoriasNr = Array.from(new Set(evento.map(elemento => elemento.category)))


renderCards(filtroEvent, contenedorCards)

function renderCards(datos, contenedor){
  contenedor.innerHTML = ""
  // 2- Modifico esta Variable / Cargo todos los String y los concateno en CARDSSTRING+=
  let cardsString = ''
  datos.forEach( cards => {
    // 1- Aca no se modifica el contenedor a dentro del bucle 
    cardsString += `
     <div class="col">
        <div class="card">
          <img src="${cards.img}" class="card-img-top" height=170px alt="...">
              <div class="card-body">
                <h5 class="card-title text-center">${cards.name}</h5>
                <h4 class="card-title text-center">${cards.date}</h4>
                <h4 class="card-title text-center">${cards.category}</h4>
                <h5 class="card-title text-center">Place: ${cards.place}</h5>
                <p class="card-title text-center">Capacity: ${cards.capacity}</p>
                <p class="card-title text-center">Estimate: ${cards.estimate}</p>
                <p class="card-text text-center">$${cards.price}</p>
                <a id="linC" href="./details.html?id=${cards._id}" class="btn btn-primary">Go somewhere</a>
               </div>
         </div>
     </div> `
  })
  // 3- Despues del bucle hago un innerHTML de lo que me quedo concatenado en el "2"
  contenedor.innerHTML= cardsString
}

renderCheckbox(categoriasNr, contenedorCheckbox) //3- ejecuto la funcion 

function renderCheckbox(generos,contenedor){
  let options = '' //1- Variable donde guardo los opciones que voy creando 
  generos.forEach(check => { //2- recorro generos y por cada genero creo un option 
    options += `
         <div class="form-check form-check-inline">
           <input class="form-check-input ms-4" type="checkbox" value="${check}" id="${check}">
           <label class="form-check-label" for="${check}">
             ${check}</label>
        </div>`
  })
  contenedor.innerHTML += options
}




padreCheckbox.addEventListener('change', (e) =>{
  let filtrado = cruseDeFiltros()
  renderCards(filtrado, contenedorCards)
})


contenedorSearch.addEventListener('input', (e)=>{
  let filtradoPorBusqueda = cruseDeFiltros()
  renderCards(filtradoPorBusqueda, contenedorCards)
})

function filtradoPorCategoria(datos, seleccionCategorias ){
  if (seleccionCategorias.length === 0){
    return datos 
  }
  return datos.filter(data => seleccionCategorias.includes(data.category))
}
function filtrarBusqueda(datos, value){
  return datos.filter(dato => dato.name.toLowerCase().includes(value.toLowerCase()))
}


function cruseDeFiltros(){
  let checkbox=
  document.querySelectorAll('input[type="checkbox"]:checked')
  let categoriaSelect = Array.from(checkbox).map(element => element.value)
  let filtrado = filtradoPorCategoria(filtroEvent,categoriaSelect)
  let filtradoBusqueda = filtrarBusqueda(filtrado, contenedorSearch.value)
  return filtradoBusqueda
}