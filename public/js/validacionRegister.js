window.addEventListener('load', function(){

    let formulario= document.querySelector('form-container');



    formulario.addEventListener('blur', function(e){
        e.preventDefault();

        let nombre= document.querySelector('#firt_name');
        if(nombre.value== ""){
            alert("El nombre no puede estar incompleto")
        }
        else if(nombre.value.length>2){
            alert("El nombre debe tener más de 2 caracteres")
        }
        let apellido= document.querySelector('#last_name');
        if(apellido.value== ""){
            alert("El apellido no puede estar incompleto")
        }
        else if(apellido.value.length>2){
            alert("El apellido debe tener más de 2 caracteres")
        }
        let email= document.querySelector('#email');
        const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

        if(email.value== ""){
            alert("El email no puede estar incompleto")
        }
        else if(!expValidEmail.test(email.value)){
            alert('El formato de e-mail no es correcto')
        }
        let avatar = document.querySelector('#avatar');
        let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];
        if(avatar){
            let filename = avatar.value;
            let fileExtension = filename.split(".").pop();
            console.log(acceptedExtensions);
            console.log(fileExtension);
            console.log(acceptedExtensions.includes(fileExtension));
            if (!acceptedExtensions.includes(fileExtension)) {
                alert (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
                
            }
            
        }
        let password= document.querySelector('#password')
        if(password.value== ""){
            alert("La contraseña no puede estar incompleta")
        }
        else if(password.value.length>8){
            alert("La contraseña debe tener minimo 8 caracteres")
        }
    })



    
    
});

