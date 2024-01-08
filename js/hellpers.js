export function validarInputRequerido(input){
    if(input.value.trim().length > 0){ //trim: quita espacios vacíos al principio y final
        // console.log('está todo ok');
        input.className='form-control is-valid'; //con esto le cambiamos la clase que tiene. is-valid: Valida (pone tilde y pinta de verde)
        return true;
    } else{
        // console.log('no está todo ok');
        input.className='form-control is-invalid'; //con esto le cambiamos la clase que tiene. is-invalid: Invalida (pone x y pinta de rojo)
        return false;
    }
};

export function validarInputDescripcion(input){
    if(input.value.trim().length >= 10 && input.value.trim().length <= 200){
        input.className='form-control is-valid';
        return true;
    } else{
        input.className='form-control is-invalid';
        return false;
    }
};

export function validarInputPrecio(input){
    const regExPrecio = /^(\d{1,9}(?:\,\d{1,2})?|\d{1,2}(?:\,\d{1,2})?)$/;
    if(regExPrecio.test(input.value)){
        input.className='form-control is-valid';
        return true;
    } else{
        input.className='form-control is-invalid';
        return false;
    }
};

export function validarInputImgUrl(input){
    const regExURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if(regExURL.test(input.value)){
        input.className='form-control is-valid';
        return true;
    } else{
        input.className='form-control is-invalid';
        return false;
    }
}


export function validarTodo(inpCodigo, inpNombre, inpDescripcion, inpPrecio, inpUrl){
    if(validarInputRequerido(inpCodigo) && validarInputRequerido(inpNombre) && validarInputDescripcion(inpDescripcion) && validarInputPrecio(inpPrecio) && validarInputImgUrl(inpUrl)){
        return true;
    } else{
        return false;
    }
}


export function CodigoAleatorio(){
    const regCode = JSON.parse(localStorage.getItem('regCode')) || [];
    let repeat=false;
    let code;
    do{
        code = parseInt((Math.random() * 10000)); //parseInt: Pasa a entero. El resto genera un nùmero aleatorio
        for(let index=0 ; index<regCode.length ; index++){
            if(code == regCode[index]){
                repeat=true;
                break;
            } else{
                repeat=false;
            }
        }
    } while(repeat);
    regCode.push(code);
    localStorage.setItem('regCode', JSON.stringify(regCode)) //Actualizar localStorage. 'regCode' con què nombre guardamos. el resto dónde lo guardamos
    return code;
}

export function ObtenerCodigoAleatorio(){
    return window.crypto.randomUUID(); //Devuelve un código random sin repetir alfanumérico
}