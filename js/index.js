
//Funciones
const initApp = document.querySelector("#initApp");
//Botones
const cargarPrecios = document.querySelector("#cargarPrecios");
const verProductos = document.querySelector("#verProductos");
const calcularPedido = document.querySelector("#calcularPedido");
const btnBorrarPrecios = document.querySelector("#btnBorrarPrecios");
const btnVolverInit = document.querySelector("#btnVolverInit");
const borrarPedido = document.querySelector("#borrarPedido");
const btnAtras = document.querySelector("#btnAtras");
const volverDeVerProductos = document.getElementById('volverDeVerProductos');
//Botones para modificar precios
const modificarPrecioEntera = document.getElementById('modificarPrecioEntera');
const modificarPrecioPorcion = document.getElementById('modificarPrecioPorcion');
const modificarPrecioBudin = document.getElementById('modificarPrecioBudin');
const modificarPrecioMiga = document.getElementById('modificarPrecioMiga');
const modificarPrecioPebetin = document.getElementById('modificarPrecioPebetin');
const modificarPrecioPebete = document.getElementById('modificarPrecioPebete');
//Sections
const priceSection = document.querySelector("#priceSection");
const calculadoraPedidos = document.querySelector("#calculadoraPedidos");
const showProductos = document.querySelector("#showProductos");
//Form
const loadPrices = document.querySelector("#loadPrices");
const pedidoCliente = document.querySelector("#pedidoCliente");
//IDs para ingresar los precios de los productos
const precioEntera = document.querySelector("#precioEntera");
const precioPorcion = document.querySelector("#precioPorcion");
const precioBudin = document.querySelector("#precioBudin");
const precioMiga = document.querySelector("#precioMiga"); 
const precioPebetin = document.querySelector("#precioPebetin");
const precioPebete = document.querySelector("#precioPebete");
//Inputs total pedido
const enteraPedido = document.querySelector("#enteraPedido");
const porcionPedido = document.querySelector("#porcionPedido");
const budinPedido = document.querySelector("#budinPedido");
const migaPedido = document.querySelector("#migaPedido");
const pebetinPedido = document.querySelector("#pebetinPedido");
const pebetePedido = document.querySelector("#pebetePedido");
//Mostrar precios en pedidos
const enteraPrecio = document.getElementById('enteraPrecio');
const porcionPrecio = document.getElementById('porcionPrecio');
const budinPrecio = document.getElementById('budinPrecio');
const migaPrecio = document.getElementById('migaPrecio');
const pebetinPrecio = document.getElementById('pebetinPrecio');
const pebetePrecio = document.getElementById('pebetePrecio');
//Calculo total de cada producto pedido
const enteraTotal = document.getElementById('enteraTotal');
const porcionTotal = document.getElementById('porcionTotal');
const budinTotal = document.getElementById('budinTotal');
const migaTotal = document.getElementById('migaTotal');
const pebetinTotal = document.getElementById('pebetinTotal');
const pebeteTotal = document.getElementById('pebeteTotal');
  //Total del Pedido
const totalPedido = document.getElementById('totalPedido');
//Ingreso de cantidad a pedir
const inEnteraPedido = document.getElementById('inEnteraPedido');
const inPorcionPedido = document.getElementById('inPorcionPedido');
const inBudinPedido = document.getElementById('inBudinPedido');
const inMigaPedido = document.getElementById('inMigaPedido');
const inPebetinPedido = document.getElementById('inPebetinPedido');
const inPebetePedido = document.getElementById('inPebetePedido');
//Mostrar precios
const mostrarPrecioEntera = document.getElementById('mostrarPrecioEntera');  
const mostrarPrecioPorcion = document.getElementById('mostrarPrecioPorcion');
const mostrarPrecioBudin = document.getElementById('mostrarPrecioBudin');
const mostrarPrecioMiga = document.getElementById('mostrarPrecioMiga');
const mostrarPrecioPebetin = document.getElementById('mostrarPrecioPebetin');
const mostrarPrecioPebete = document.getElementById('mostrarPrecioPebete');

//Función para iniciar la app
function iniApp(){
  //Entra a la sección para cargar precios
    initApp.classList.remove('disable');
    cargarPrecios.addEventListener('click', () => {
        initApp.classList.add('disable');
        priceSection.classList.remove('disable');
        preciosCargados();
        modificarPrecioCargado();

    })    
  //Entra a la sección para calcular el pedido  
    calcularPedido.addEventListener('click', () => {
        initApp.classList.add('disable');
        calculadoraPedidos.classList.remove('disable');
        

    })
  //Entra a la sección para ver los productos cargados
    verProductos.addEventListener('click', () => {
      initApp.classList.add('disable');
      showProductos.classList.remove('disable');
      volverDeProductos();
      mostrarProductos();
      
  })
}

//formulario para cargar los productos
loadPrices.addEventListener("submit", (event) => {
    event.preventDefault();
    const precioProducto = {
      entera: precioEntera.value,
      porcion: precioPorcion.value,
      budin: precioBudin.value,
      miga: precioMiga.value,
      pebetin: precioPebetin.value,
      pebete: precioPebete.value,
      
    };

    
    
    //Llamamos al array precioProductos para verificar si tiene datos o si no se los cargamos.
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    if (storedPreciosProductos && storedPreciosProductos.length > 0){
      preciosCargados();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya hay precios cargados en la memoria. Borralos y volvé a cargarlos',            
          });
    }else{
        crearPreciosProductos(precioProducto);
        preciosCargados();
        Swal.fire({
          title: 'Precios cargados',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
    }   
    
  });

//Botón para borrar el array de precios y mostrar "sin precio" al lado de cada producto
  btnBorrarPrecios.addEventListener('click', () => {
  localStorage.removeItem('preciosProductos');
  mostrarPrecioEntera.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioPorcion.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioBudin.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioMiga.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioPebetin.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioPebete.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  
  precioEntera.value = '';
  precioPorcion.value = '';
  precioBudin.value = '';
  precioMiga.value = '';
  precioPebetin.value = '';
  precioPebete.value = '';

  });

//Botón para volver a la pantalla inicial  
  btnVolverInit.addEventListener('click', (e) => {
    priceSection.classList.add('disable');
    initApp.classList.remove('disable');
  })
  

//Función para cargar los precios ingersados en el form en el array.
function crearPreciosProductos (precioProducto){
        const preciosProductos = [];    
        preciosProductos.push(precioProducto);
        localStorage.setItem('preciosProductos', JSON.stringify(preciosProductos));
        
      }

      
//función para mostrar los precios cargados en la página para cargar los precios
function preciosCargados (){
const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
if (!storedPreciosProductos || storedPreciosProductos.length === 0){
  mostrarPrecioEntera.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioPorcion.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioBudin.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioMiga.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioPebetin.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>`
  mostrarPrecioPebete.innerHTML = `<p class="mostrarPreciosCargados">Sin precio</p>` 
}else{
  mostrarPrecioEntera.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].entera}.00</p>`;
mostrarPrecioPorcion.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].porcion}.00</p>`;
mostrarPrecioBudin.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].budin}.00</p>`;
mostrarPrecioMiga.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].miga}.00</p>`;
mostrarPrecioPebetin.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].pebetin}.00</p>`;
mostrarPrecioPebete.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].pebete}.00</p>`;
  
}

}  

//función que maneja los botones para modificar los precios cargados

function modificarPrecioCargado (){
  //Modifica el precio de enteras
  modificarPrecioEntera.addEventListener('click', () => {
    const precioEnteraNuevo = precioEntera.value;
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    storedPreciosProductos[0].entera = precioEnteraNuevo;
    localStorage.setItem('preciosProductos', JSON.stringify(storedPreciosProductos));
    mostrarPrecioEntera.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].entera}.00</p>`
    Swal.fire({
      title: 'Precios de ENTERA modificado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
  //Modifica el precio de porcion
  modificarPrecioPorcion.addEventListener('click', () => {
    const precioPorcionNuevo = precioPorcion.value;
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    storedPreciosProductos[0].porcion = precioPorcionNuevo;
    localStorage.setItem('preciosProductos', JSON.stringify(storedPreciosProductos));
    mostrarPrecioPorcion.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].porcion}.00</p>`
    Swal.fire({
      title: 'Precio de PORCIÓN modificado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
  //Modifica el precio de budín
  modificarPrecioBudin.addEventListener('click', () => {
    const precioBudinNuevo = precioBudin.value;
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    storedPreciosProductos[0].budin = precioBudinNuevo;
    localStorage.setItem('preciosProductos', JSON.stringify(storedPreciosProductos));
    mostrarPrecioBudin.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].budin}.00</p>`
    Swal.fire({
      title: 'Precio de BUDÍN modificado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
  //Modifica el precio de Miga
  modificarPrecioMiga.addEventListener('click', () => {
    const precioMigaNuevo = precioMiga.value;
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    storedPreciosProductos[0].miga = precioMigaNuevo;
    localStorage.setItem('preciosProductos', JSON.stringify(storedPreciosProductos));
    mostrarPrecioMiga.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].miga}.00</p>`
    Swal.fire({
      title: 'Precio de MIGA modificado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
  //Modifica el precio de pebetín
  modificarPrecioPebetin.addEventListener('click', () => {
    const precioPebetinNuevo = precioPebetin.value;
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    storedPreciosProductos[0].pebetin = precioPebetinNuevo;
    localStorage.setItem('preciosProductos', JSON.stringify(storedPreciosProductos));
    mostrarPrecioPebetin.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].pebetin}.00</p>`
    Swal.fire({
      title: 'Precio de PEBETÍN modificado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
  //Modifica el precio de Pebete
  modificarPrecioPebete.addEventListener('click', () => {
    const precioPebeteNuevo = precioPebete.value;
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    storedPreciosProductos[0].pebete = precioPebeteNuevo;
    localStorage.setItem('preciosProductos', JSON.stringify(storedPreciosProductos));
    mostrarPrecioPebete.innerHTML = `<p class="mostrarPreciosCargados">$${storedPreciosProductos[0].pebete}.00</p>`
    Swal.fire({
      title: 'Precio de PEBETE modificado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
}

//función para mostrar los productos
function mostrarProductos (){
    
    const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));
    if (storedPreciosProductos && storedPreciosProductos.length === 0){
      showProductos.innerHTML = `<div class="vistaProductos mx-auto col-10 col-md-8 col-lg-3 text-center">
      <p><strong>Entera: </strong> $00.00</p>
      <p><strong>Porción: </strong> $00.00</p>
      <p><strong>Budín: </strong> $00.00</p>
      <p><strong>Miga: </strong> $00.00</p>
      <p><strong>Pebetín: </strong> $00.00</p>
      <p><strong>Pebete: </strong> $00.00</p>
      <button type="button" class="btn btn-outline-danger btn-lg" id="btnVolver">Volver</button>
      </div>`;
    }else{
      showProductos.innerHTML = `<div class="vistaProductos mx-auto col-10 col-md-8 col-lg-3 text-center">
      <p><strong>Entera: </strong> $${storedPreciosProductos[0].entera}.00</p>
      <p><strong>Porción: </strong> $${storedPreciosProductos[0].porcion}.00</p>
      <p><strong>Budín: </strong> $${storedPreciosProductos[0].budin}.00</p>
      <p><strong>Miga: </strong> $${storedPreciosProductos[0].miga}.00</p>
      <p><strong>Pebetín: </strong> $${storedPreciosProductos[0].pebetin}.00</p>
      <p><strong>Pebete: </strong> $${storedPreciosProductos[0].pebete}.00</p>
      <button type="button" class="btn btn-outline-danger btn-lg" id="btnVolver">Volver</button>
      </div>`;         
    }


                        
const btnVolver = document.getElementById('btnVolver');                              
btnVolver.addEventListener('click', (event) => {
      event.preventDefault();
      initApp.classList.remove('disable');
      showProductos.classList.add('disable');      
  })
    
}

//Función para manejar el botón voler de Mostar Productos
function volverDeProductos (){
  volverDeVerProductos.addEventListener('click', () => {
    initApp.classList.remove('disable');
    showProductos.classList.add('disable'); 
  })
}

//Manejo de la sección para calcular pedidos

//función para calcular y mostrar el total del pedido
function mostrarPedido () {
  toNan();
  const storedPreciosProductos = JSON.parse(localStorage.getItem('preciosProductos'));

  const precioEntera = storedPreciosProductos[0].entera;
  const precioPorcion = storedPreciosProductos[0].porcion;
  const precioBudin = storedPreciosProductos[0].budin;
  const precioMiga = storedPreciosProductos[0].miga;
  const precioPebetin = storedPreciosProductos[0].pebetin;
  const precioPebete = storedPreciosProductos[0].pebete;

  const cantidadEntera = parseFloat(inEnteraPedido.value);
  const cantidadPorcion = parseFloat(inPorcionPedido.value);
  const cantidadBudin = parseFloat(inBudinPedido.value);
  const cantidadMiga = parseFloat(inMigaPedido.value);
  const cantidadPebetin = parseFloat(inPebetinPedido.value);
  const cantidadPebete = parseFloat(inPebetePedido.value); 
  
  const totalEntera = precioEntera * cantidadEntera;
  const totalPorcion = precioEntera * cantidadPorcion;
  const totalBudin = precioBudin * cantidadBudin;
  const totalMiga = precioMiga * cantidadMiga;
  const totalPebetin = precioPebetin * cantidadPebetin;
  const totalPebete = precioPebete * cantidadPebete;

  const calculoTotalPedido = totalEntera + totalPorcion + totalBudin + totalMiga + totalPebetin + totalPebete;

  enteraPrecio.innerText = `$${precioEntera}.00`;
  enteraTotal.innerText = `$${totalEntera}.00`;
  porcionPrecio.innerText = `$${precioPorcion}.00`;
  porcionTotal.innerText = `$${totalPorcion}.00`;
  budinPrecio.innerText = `$${precioBudin}.00`;
  budinTotal.innerText = `$${totalBudin}.00`;
  migaPrecio.innerText = `$${precioMiga}.00`;
  migaTotal.innerText = `$${totalMiga}.00`;
  pebetinPrecio.innerText = `$${precioPebetin}.00`;
  pebetinTotal.innerText = `$${totalPebetin}.00`;
  pebetePrecio.innerText = `$${precioPebete}.00`;
  pebeteTotal.innerText = `$${totalPebete}.00`;

  totalPedido.innerText = `$${calculoTotalPedido}.00`;                    



}

//Botón para borrar pedido
borrarPedido.addEventListener('click', () => {  
  inEnteraPedido.value = '';
  inPorcionPedido.value = '';
  inBudinPedido.value = '';
  inMigaPedido.value = '';
  inPebetinPedido.value = '';
  inPebetePedido.value = '';
  mostrarPedido();
})

btnAtras.addEventListener('click', () => {
  initApp.classList.remove('disable');
  calculadoraPedidos.classList.add('disable');
})

inEnteraPedido.addEventListener('input',mostrarPedido);
inPorcionPedido.addEventListener('input',mostrarPedido);
inBudinPedido.addEventListener('input',mostrarPedido);
inMigaPedido.addEventListener('input',mostrarPedido);
inPebetinPedido.addEventListener('input',mostrarPedido);
inPebetePedido.addEventListener('input',mostrarPedido);

//función para modificar el valor ingresado en el imput de NaN a 0
function toNan() {
  const cantidadEntera = parseFloat(inEnteraPedido.value);
  const cantidadPorcion = parseFloat(inPorcionPedido.value);
  const cantidadBudin = parseFloat(inBudinPedido.value);
  const cantidadMiga = parseFloat(inMigaPedido.value);
  const cantidadPebetin = parseFloat(inPebetinPedido.value);
  const cantidadPebete = parseFloat(inPebetePedido.value); 

  if (isNaN(cantidadEntera) || isNaN(cantidadPorcion) || isNaN(cantidadBudin) || isNaN(cantidadMiga) || isNaN(cantidadPebetin) || isNaN(cantidadPebete)){
    inEnteraPedido.value = '0';
    inPorcionPedido.value = '0';
    inBudinPedido.value = '0';
    inMigaPedido.value = '0';
    inPebetinPedido.value = '0';
    inPebetePedido.value = '0';
  }
}

iniApp();