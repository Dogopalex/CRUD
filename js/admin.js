import {
    validarInputRequerido,
    validarInputDescripcion,
    validarInputPrecio,
    validarInputImgUrl,
    validarTodo,
    ObtenerCodigoAleatorio,
  } from "./hellpers.js";
  
  let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
  let bodyTabla = document.querySelector("tbody");
  let inputCodigo = document.getElementById("codigo");
  let inputNombre = document.getElementById("nombre");
  let inputDescripcion = document.getElementById("descripcion");
  let inputPrecio = document.getElementById("precio");
  let inputImgUrl = document.getElementById("imgUrl");
  console.log(bodyTabla);
  let form = document.querySelector("form");
  inputCodigo.value = ObtenerCodigoAleatorio();
  
  form.addEventListener("submit", GuardarProducto);
  
  inputCodigo.addEventListener("blur", () => {
    validarInputRequerido(inputCodigo);
  });
  
  inputNombre.addEventListener("blur", () => {
    validarInputRequerido(inputNombre);
  });
  
  inputDescripcion.addEventListener("blur", () => {
    validarInputDescripcion(inputDescripcion);
  });
  
  inputPrecio.addEventListener("blur", () => {
    validarInputPrecio(inputPrecio);
  });
  
  inputImgUrl.addEventListener("blur", () => {
    validarInputImgUrl(inputImgUrl);
  });
  //Llamamos a la funcion listar productos para crear filas en nuestra tabla
  ListarProductos();
  
  let esEdicion = false;
  
  function GuardarProducto(e) {
    // e = event
    e.preventDefault();
    if (
      validarTodo(
        inputCodigo,
        inputNombre,
        inputDescripcion,
        inputPrecio,
        inputImgUrl
      )
    ) {
      if (esEdicion) {
        GuardarProductoEditado();
      } else {
        CrearProducto();
      }
    } else {
      Swal.fire({
        title: "Ups",
        text: "Todos los campos son requeridos",
        icon: "error",
      });
    }
  }
  
  function CrearProducto() {
    const nuevoProducto = {
      codigo: inputCodigo.value,
      nombre: inputNombre.value,
      descripcion: inputDescripcion.value,
      precio: inputPrecio.value,
      imgUrl: inputImgUrl.value,
    };
  
    arrayProductos.push(nuevoProducto);
    Swal.fire({
      title: "Exito",
      text: "El producto se guardo correctamente",
      icon: "success",
    });
    LimpiarFormulario();
    ListarProductos();
  }
  
  function GuardarProductoEditado() {
    let indexProducto = arrayProductos.findIndex((element) => {
      return element.codigo === inputCodigo.value;
    });
  
    if (indexProducto !== -1) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Vas a cambiar los datos de un producto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          arrayProductos[indexProducto].codigo = inputCodigo.value;
          arrayProductos[indexProducto].nombre = inputNombre.value;
          arrayProductos[indexProducto].descripcion = inputDescripcion.value;
          arrayProductos[indexProducto].precio = inputPrecio.value;
          arrayProductos[indexProducto].imgUrl = inputImgUrl.value;
          esEdicion=false;
          Swal.fire({
            title: "Exito",
            text: "El producto se actualizo correctamente",
            icon: "success",
          });
  
          LimpiarFormulario();
          ListarProductos();
        }else{
          esEdicion=false;
          LimpiarFormulario();
        }
      });
    }else{
      console.log('entro en el else de guardar producto editado por q el codigo no existe dentro del arrProductos');
    }
  }
  //con esta forma declaramos una funcion global
  window.LimpiarFormulario = function () {
    form.reset();
    inputCodigo.className = "form-control";
    inputCodigo.value = ObtenerCodigoAleatorio();
    inputNombre.className = "form-control";
    inputDescripcion.className = "form-control";
    inputPrecio.className = "form-control";
    inputImgUrl.className = "form-control";
    GuardarLocalStorage();
  };
  
  function GuardarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
  }
  
  function ListarProductos() {
    bodyTabla.innerHTML = "";
    arrayProductos.forEach((element) => {
      bodyTabla.innerHTML += ` <tr>                  
         <th scope="row">${element.codigo}</th>
         <td>${element.nombre}</td>
         <td>${element.descripcion}</td>
         <td>${element.precio}</td>
         <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
         <td class="">
         <div class="d-flex">
           <button type="button" class="btn btn-warning mx-1" onclick="PrepararEdicion('${element.codigo}')">Editar</button>
           <button type="button" class="btn btn-danger mx-1">Eliminar</button>
           </div>
         </td>                
       </tr>`;
    });
  }
  
  window.PrepararEdicion = function (codigo) {
    const productoAEditar = arrayProductos.find((element) => {
      return element.codigo === codigo;
    });
    if (productoAEditar !== undefined) {
      inputCodigo.value = productoAEditar.codigo;
      inputNombre.value = productoAEditar.nombre;
      inputDescripcion.value = productoAEditar.descripcion;
      inputPrecio.value = productoAEditar.precio;
      inputImgUrl.value = productoAEditar.imgUrl;
    }
    esEdicion = true;
  };