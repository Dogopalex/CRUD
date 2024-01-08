//Explicación clase 14 diciembre

import { validarInputRequerido, validarInputDescripcion, validarInputPrecio, validarInputImgUrl, validarTodo } from "./hellpers.js";
let arrayProductos=JSON.parse(localStorage.getItem('productos')) || [];

let inputCodigo=document.getElementById('codigo');
let inputNombre=document.getElementById('nombre');
let inputDescripcion=document.getElementById('descripcion');
let inputPrecio=document.getElementById('precio');
let inputImgUrl=document.getElementById('imgUrl');

let form=document.querySelector('form');

console.log(form);

form.addEventListener('submit', GuardarProducto); //Le pasamos el nombre del evento (submit), y la función a ejecutar (GuardarProducto)

inputCodigo.addEventListener('blur', ()=>{
    validarInputRequerido(inputCodigo);
}); //Cuando pierdo el foco (blur), que recién valide

inputNombre.addEventListener('blur', ()=>{
    validarInputRequerido(inputNombre);
});

inputDescripcion.addEventListener('blur', ()=>{
    validarInputDescripcion(inputDescripcion);
});

inputPrecio.addEventListener('blur', ()=>{
    validarInputPrecio(inputPrecio);
});

inputImgUrl.addEventListener('blur', ()=>{
    validarInputImgUrl(inputImgUrl);
});


function GuardarProducto(e){ //e = event
    e.preventDefault(); //Evita que se recargue la página cuando ponemos el botón de "enviar" (Funciona solo con la función de arriba 'form.addEve...')
    if(validarTodo(inputCodigo, inputNombre, inputDescripcion, inputPrecio, inputImgUrl)){
        CrearProducto();
    } else{
        Swal.fire({ // Efecto al poner aceptar
            title: "Ups",
            text: "Todos los campos son requeridos",
            icon: "error"
          });
    }
    // CrearProducto();
}

function CrearProducto(){ //Con ésto creamos un nuevo objeto
    const nuevoProducto={
        codigo: inputCodigo.value,
        nombre: inputNombre.value,
        descripcion: inputDescripcion.value,
        precio: inputPrecio.value,
        imgUrl: inputImgUrl.value
    };
    arrayProductos.push(nuevoProducto); //Guardamos el objeto en el array arrayProductos (el primero de arriba)

    Swal.fire({ // Efecto al poner aceptar
        title: "Exito",
        text: "El proucto se guardò exitosamente",
        icon: "success"
      });

    LimpiarFormulario();
}

function LimpiarFormulario(){ //Con ésto limpiamos el formulario
    form.reset(); //con reset reestablece el formulario
    inputCodigo.className='form-control';
    inputNombre.className='form-control';
    inputDescripcion.className='form-control';
    inputPrecio.className='form-control';
    inputImgUrl.className='form-control';
    GuardarLocalStorage();
};

function GuardarLocalStorage(){
    localStorage.setItem('productos', JSON.stringify(arrayProductos));
}