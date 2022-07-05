





let camisas=[
    {
    id: 1,
    nombre: "Camisa Wajiira",
    color: "blanca",
    estilo: "estampado",
    precio: 180,
    stock: 27,
    imagen: "/media/camisa wajiira estampada.webp",
    },

    {
    id: 2,
    nombre: "Camisa Malta",
    color: "roja",
    estilo: "rayas",
    precio: 75,
    stock: 5,
    imagen: "/media/camisa malta rayas.webp",
        },

    {
    id: 3,
    nombre: "Camisa Oporto",
    color: "beige",
    estilo: "rayas",
    precio: 225,
    stock: 12,
    imagen: "/media/camisa Oporto rayas.jpg",
        },

    {
    id: 4,
    nombre: "Camisa Britania",
    color: "azul",
    estilo: "cuadros",
    precio:  89,
    stock: 46,
    imagen: "/media/camisa britania cuadros.webp",
        },

        {
            id: 5,
            nombre: "pantalon Wajiira",
            color: "blanca",
            estilo: "estampado",
            precio: 180,
            stock: 27,
            imagen: "/media/pantalon estampado.jpg"
            },
        
            {
            id: 6,
            nombre: "pantalon Malta",
            color: "roja",
            estilo: "rayas",
            precio: 75,
            stock: 5,
            imagen:"/media/pantalon rayas.jpg"
                },
        
            {
                id: 7,
            nombre: "pantalon Oporto",
            color: "beige",
            estilo: "rayas",
            precio: 225,
            stock: 12,
            imagen:"/media/pantalon rayas 2.jpg"
                },
        
            {
            id: 8,    
            nombre: "Pantalon Britania",
            color: "azul",
            estilo: "cuadros",
            precio:  89,
            stock: 46,
            imagen:"/media/pantalon cuadros.jpg"
                },
        

]






let estilocamisacuadros = document.getElementById("camisa-cuadros");
console.log(estilocamisacuadros );
estilocamisacuadros.addEventListener("click",camisacuadros);

function camisacuadros(){

    let checkestilo = camisas.filter(item => item.estilo === "cuadros");
    let salida = productgenerator(checkestilo);

return salida;

}


let estilocamisarayas = document.getElementById("camisa-rayas");
estilocamisarayas.addEventListener("click",camisarayas);

function camisarayas(){

    let checkestilo = camisas.filter(item => item.estilo === "rayas");
    let salida = productgenerator(checkestilo);

return salida;
}


let estiloestampado = document.getElementById("camisa-estampado");
estiloestampado.addEventListener("click",camisaestampado);

function camisaestampado(){
 let checkestilo = camisas.filter(item => item.estilo === "estampado");
 let salida = productgenerator(checkestilo);
return salida;
}


let todo = document.getElementById("todo");
todo.addEventListener("click", todoitem );

function todoitem(){
let salida = productgenerator(camisas);
return salida
}


let preciomenor = document.getElementById("preciomenor");
preciomenor.addEventListener("click",menorprecioprimero);

function menorprecioprimero(){
let filtromenor = camisas.sort((a,b)=> a.precio - b.precio)
let salida = productgenerator(filtromenor);
return salida;
}


let preciomayor = document.getElementById("preciomayor");
preciomayor.addEventListener("click", mayorprecioprimero);

function mayorprecioprimero(){
let filtromayor = camisas.sort((a,b)=> b.precio - a.precio)
let salida = productgenerator(filtromayor);
return salida;
}

function productgenerator(array){
    let padre = document.querySelector(".cards-container")
    padre.textContent = '';
   let out = array.forEach(item =>{
    let producto = document.createElement("div");
    producto.setAttribute("class","product-card")
  
       producto.innerHTML = 

       `  <img src="${item.imagen}">
          <div class="product-info">
           <div>
          <p>${item.precio}</p>
          <p>${item.nombre}</p>            
          </div>
          <figure  id='addtocart-btm'>
           <button id='addtocart-btm'><img src="media/icons/bt_add_to_cart.svg" alt=""></button>
          </figure>
      </div> `
      const miNodoBoton = document.createElement('button');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', item.id);
        miNodoBoton.addEventListener('click', addtocartbuttom);
      
      
      
        producto.appendChild(miNodoBoton);

       padre.append(producto)
});

return out

}


let cart = [];
let manta = [];

const DOMcart = document.getElementById("shoppingcart-display")

let addtocart = document.getElementById("addtocart-btm")

const miLocalStorage =  window.localStorage;

function addtocartbuttom(evento){

cart.push(evento.target.getAttribute('marcador'))

optimizarcart();

agregarcarritoStorage();

}


function optimizarcart(){


DOMcart.textContent = '';

const cartsinduplicados = [... new Set(cart)]
console.log(cartsinduplicados)
cartsinduplicados.forEach((item) =>{
const myitem =  camisas.filter((itemcamisa)=>{
    return itemcamisa.id === parseInt(item)
    });
const numerodeunidades = cart.reduce((sum,itemId) => {
return itemId === item ? sum += 1 : sum;
},0)

const miNodo = document.createElement('li');
       
        miNodo.textContent = `${numerodeunidades} x ${myitem[0].nombre} - ${myitem[0].precio}`;
        const miBoton = document.createElement('button');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        const miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-primary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', item.id);
                    miNodoBoton.addEventListener('click', addtocartbuttom);
        miNodo.appendChild(miBoton);
        DOMcart.appendChild(miNodo);
        miNodo.appendChild(miNodoBoton);
      
        

})
}



function agregarcarritoStorage(){
miLocalStorage.setItem('cart', JSON.stringify(cart));

}

function borrarItemCarrito(evento) {
    
    const id = evento.target.dataset.item;
  
    cart = cart.filter((carritoId) => {
        return carritoId !== id;
    });
  
    optimizarcart();
    agregarcarritoStorage();
}


function cargarCarritoDeLocalStorage () {
  
    if (miLocalStorage.getItem('cart') !== null) {
      
        cart = JSON.parse(miLocalStorage.getItem('cart'));
    }
}

cargarCarritoDeLocalStorage()
optimizarcart()
productgenerator(camisas)
console.log(cargarCarritoDeLocalStorage())
let data = miLocalStorage.getItem("cart")
let cartpage = document.getElementById("cartpage")
document.addEventListener("DOMContentLoaded",cartpageloader)

function cartpageloader(){


    manta = JSON.parse(miLocalStorage.getItem('cart'));


}



//menu deslizable 

const iconoMenu = document.querySelector('#icono-menu'),
      menu = document.querySelector('#menu');

iconoMenu.addEventListener('click', (e) => {

   
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');

});

const iconoMenu2 = document.querySelector('#icono-menu2')
      

iconoMenu2.addEventListener('click', (e) => {
    menu.classList.add('active');
});
