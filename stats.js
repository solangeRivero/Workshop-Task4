let contenedorEvents = document.getElementById('primerStat')
let contenedorCategoria = document.getElementById('eventosfuturosfilas')
let contenedorCategoriaPast = document.getElementById('eventosPasadosfilas')



let dataStats;
let dataStatsGeneral;

fetch('https://amazing-events.onrender.com/api/events')
 .then((res) => res.json())
 .then((data) =>{
    dataStatsGeneral = data
    dataStats = data.events




    let masAlto = porcentajeMasAlto(dataStats)
    let masBajo = porcentajeMasBajo(dataStats)
    let mayorCapacidad = eventsMayorCapacidad(dataStats)
    table1(masAlto.name, masBajo.name, mayorCapacidad.name, contenedorEvents)


    function table1(d1, d2, d3, cont){
        let html = `
        <tr>
           <td>${d1}</td>
           <td>${d2}</td>
           <td>${d3}</td>
        </tr>`
        cont.innerHTML += html
    }

    function porcentajeMasAlto(datos){
        let eventosAsis = datos.filter(elements =>elements.assistance)
        let porcentajeEvent = eventosAsis.map(elements =>{
            let aux = {name:elements.name, percentage:elements.assistance / elements.capacity *100}
            return aux})
            let porcentajeEventosOrdenado = porcentajeEvent.sort((a,b)=>a.percentage - b.percentage)
            return porcentajeEventosOrdenado.slice(-1)[0]
    }



    function porcentajeMasBajo(datos){
        let eventosAsis = datos.filter(elements =>elements.assistance)
        let porcentajeEvent = eventosAsis.map(elements =>{
            let aux = {name:elements.name, percentage:elements.assistance / elements.capacity *100}
            return aux})
            let porcentajeEventosOrdenado = porcentajeEvent.sort((a,b)=>a.percentage - b.percentage)
            return porcentajeEventosOrdenado.slice(0,1)[0]
    }


    function eventsMayorCapacidad(datos){
        let eventosCapacidad = datos.map(elements =>{
            let aux = {name:elements.name, capacity:elements.capacity}
            return aux})
            let capacidadEventosOrdenado = eventosCapacidad.sort((a,b)=>a.percentage - b.percentage)
            return capacidadEventosOrdenado.slice(-1)[0]
    }

    



    eventosFuturos(dataStats, contenedorCategoria)

 function eventosFuturos(eventos, contenedor){
    contenedor.innerHTML = ''
    let listaEvento = ''
    const eventosFiltrados = eventos.filter(events => events.date > dataStatsGeneral.currentDate)
    eventosFiltrados.forEach((element) => {
        listaEvento += `
        <tr>
            <td>${element.category}</td>
            <td>$${(element.price * element.estimate).toLocaleString()}</td>
            <td>${((element.estimate * 100) / element.capacity).toFixed(2)} %</td>
        </tr>`   
    
    });
    contenedor.innerHTML = listaEvento
 }



  eventosPast(dataStats, contenedorCategoriaPast)

 function eventosPast(eventos, contenedor){
    contenedor.innerHTML = ''
    let listaEvento = ''
    const eventosFiltrados = eventos.filter(events => events.date < dataStatsGeneral.currentDate)
    eventosFiltrados.forEach((element) => {
        listaEvento += `
        <tr>
            <td>${element.category}</td>
            <td>$${(element.price * element.assistance).toLocaleString()}</td>
            <td>${((element.assistance * 100) / element.capacity).toFixed(2)} %</td>
        </tr>`   
    
    });
    contenedor.innerHTML = listaEvento
 }

 })




