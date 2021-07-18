window.addEventListener('load', function(){
    let formulario= document.querySelector('form-container');

    formulario.addEventListener('blur', function(e){
        e.preventDefault();
        let email= document.querySelector('#email');
        const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

        if(email.value== ""){
            alert("El email no puede estar incompleto")
        }
        else if(!expValidEmail.test(email.value)){
            alert('El formato de e-mail no es correcto')
        }
        let password= document.querySelector('#password')
        if(password.value== ""){
            alert("La contraseña no puede estar incompleta")
        }
        else if(password.value.length>8){
            alert("La contraseña debe tener minimo 8 caracteres")
        }
    })
})