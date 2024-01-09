//Explicación clase 14 diciembre

import { validarInputRequerido, validarInputDescripcion, validarInputPrecio, validarInputImgUrl, validarTodo, ObtenerCodigoAleatorio } from "./hellpers.js";

let arrayProductos=JSON.parse(localStorage.getItem('productos')) || [];
let bodyTabla=document.querySelector('tbody');
let inputCodigo=document.getElementById('codigo');
let inputNombre=document.getElementById('nombre');
let inputDescripcion=document.getElementById('descripcion');
let inputPrecio=document.getElementById('precio');
let inputImgUrl=document.getElementById('imgUrl');
console.log(bodyTabla);
let form=document.querySelector('form');

inputCodigo.value=ObtenerCodigoAleatorio(); //Con ésto lleno el campo con el código aleatorio, sin que el usuario pueda

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

//Llamamos a la funcion listar prodctos para crear filas en nuestra tabla
ListarProductos();

let esEdicion = false;

function GuardarProducto(e){ //e = event
    e.preventDefault(); //Evita que se recargue la página cuando ponemos el botón de "enviar" (Funciona solo con la función de arriba 'form.addEve...')
    if(validarTodo(inputCodigo, inputNombre, inputDescripcion, inputPrecio, inputImgUrl)){
        if(esEdicion){
            //Llamar a la función para gurdar el producto editado
            GuardarProductoEditado();
        } else{
            CrearProducto();    
        }
        
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
    bodyTabla.innerHTML=''; //Para evitar que se repitan de nuevo los productos, cuando ingreso uno
    ListarProductos();
};

function GuardarProductoEditado(){
    let indexProducto = arrayProductos.findIndex((element)=> { //findIndex: Funciona igual que el Find, pero devuelve el índice
        return element.codigo == inputCodigo.value;
    });
    // console.log(indexProducto);
    if(indexProducto != -1){
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Vas a cambiar los datos de un producto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar cambios",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                arrayProductos[indexProducto].codigo = inputCodigo.value;
                arrayProductos[indexProducto].nombre = inputNombre.value;
                arrayProductos[indexProducto].descripcion = inputDescripcion.value;
                arrayProductos[indexProducto].precio = inputPrecio.value;
                arrayProductos[indexProducto].imgUrl = inputImgUrl;        
                esEdicion = false;
                Swal.fire({ // Efecto al poner aceptar
                    title: "Exito",
                    text: "El proucto se actualizó exitosamente",
                    icon: "success"
                  });
                
                LimpiarFormulario();
                ListarProductos();
            } else{
                esEdicion = false;
                LimpiarFormulario();
            }
        });
    }
}

//window: Creo una función global/anónima
window.LimpiarFormulario = function(){ //Con ésto limpiamos el formulario.
    form.reset(); //con reset reestablece el formulario
    //Los input de abajo son para que cuando enviamos un formulario, se borren las tildes de validaciòn verdes
    inputCodigo.className='form-control';
    inputCodigo.value=ObtenerCodigoAleatorio();
    inputNombre.className='form-control';
    inputDescripcion.className='form-control';
    inputPrecio.className='form-control';
    inputImgUrl.className='form-control';
    GuardarLocalStorage();
};

function GuardarLocalStorage(){
    localStorage.setItem('productos', JSON.stringify(arrayProductos));
}

function ListarProductos(){
    arrayProductos.forEach((element)=> { //ForEach: Por cada elemento
        bodyTabla.innerHTML += ` <tr>
        <th scope="row"> ${element.codigo} </th>
        <td> ${element.nombre} </td>
        <td> ${element.descripcion} </td>
        <td> ${element.precio} </td>
        <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
        <td class="">
            <div class="d-flex">
                <button type="button" class="btn btn-warning mx-1" onclick="PrepararEdicion( '${element.codigo}' )">Editar</button>
                <button type="button" class="btn btn-danger mx-1">Eliminar</button>
            </div>
        </td>
    </tr>`;
    });
};

window.PrepararEdicion = function(codigo){
    const productoAEditar = arrayProductos.find((element)=> { //find: busca un elemento en el array, retorna un booleano
        return element.codigo == codigo;
    });
    if(productoAEditar !== undefined){
        inputCodigo.value = productoAEditar.codigo;
        inputNombre.value = productoAEditar.nombre;
        inputDescripcion.value = productoAEditar.descripcion;
        inputPrecio.value = productoAEditar.precio;
        inputImgUrl.value = productoAEditar.imgUrl;
    };
    esEdicion = true;
}