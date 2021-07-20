window.addEventListener('load', function(){
    
    let formulario= document.querySelector('form-container');
    let nombre= document.querySelector('#firt_name');
    let apellido= document.querySelector('#last_name');
    let email= document.querySelector('#email');
    let avatar = document.querySelector('#avatar');
    let password= document.querySelector('#password')
    
    const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];
    
    let errors = {};

    
    
    nombre.addEventListener('blur', function(e){
        let feedback = ''; 
        let feedbackElement = nombre.nextElementSibling;
        if(nombre.value== ""){
                feedback= "El nombre no puede estar incompleto"
            }
            else if(nombre.value.length < 2){
                feedback= "El nombre debe tener más de 2 caracteres"
            }
            if (feedback) {
                feedbackElement.innerText = feedback
                errors.nombre = feedback;
                console.log(errors);
            }
        })
        apellido.addEventListener('blur', () =>{
            let feedback = ''; 
            let feedbackElement = apellido.nextElementSibling;
            if(apellido.value== ""){
                feedback= "El apellido no puede estar incompleto"
            }
            else if(apellido.value.length < 2){
                feedback= "El apellido debe tener más de 2 caracteres"
            }
            if (feedback) {
                feedbackElement.innerText = feedback
                errors.apellido = feedback;
            }
        })
        email.addEventListener('blur', () =>{
            let feedback = ''; 
            let feedbackElement = email.nextElementSibling;
            
            if(email.value== ""){
                feedback= "El email no puede estar incompleto"
            }
            else if(!expValidEmail.test(email.value)){
                feedback= 'El formato de e-mail no es correcto'
            }
            if (feedback) {
                feedbackElement.innerText = feedback
                errors.email = feedback;
            }
        })
        avatar.addEventListener('blur', () =>{
            let feedback = ''; 
            let feedbackElement = avatar.nextElementSibling;
            
            if(avatar){
                let filename = avatar.value;
                let fileExtension = filename.split(".").pop();
                console.log(acceptedExtensions);
                console.log(fileExtension);
                console.log(acceptedExtensions.includes(fileExtension));
                if (!acceptedExtensions.includes(fileExtension)) {
                    feedback= `Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`
                    
                }
                
            }
            if (feedback) {
                feedbackElement.innerText = feedback
                errors.avatar = feedback;
            }
        })
        password.addEventListener('blur', () =>{
            let feedback = ''; 
            let feedbackElement = password.nextElementSibling;
            
            if(password.value== ""){
                feedback= "La contraseña no puede estar incompleta"
            }
            else if(password.value.length < 8){
                feedback= "La contraseña debe tener minimo 8 caracteres"
            }
            if (feedback) {
                feedbackElement.innerText = feedback
                errors.password = feedback;
            }
        })
        
        
        
        form.addEventListener('submit', function(e){
        
            //console.log(Object.keys(errors).length);
            if (Object.keys(errors).length > 0) {
                e.preventDefault();
                }
            if (nombre.value.trim() == ""){
                    e.preventDefault();
                    feedback = 'El nombre no puede quedar vacío'
                    nombre.nextElementSibling.innerText = feedback;
               }
            if (apellido.value.trim() == ""){
                e.preventDefault();
                feedback = 'El apellido no puede quedar vacío'
                apellido.nextElementSibling.innerText = feedback;
           }
           if (email.value.trim() == ""){
                e.preventDefault();
                feedback = 'El e-mail no puede quedar vacío'
                email.nextElementSibling.innerText = feedback;
            }
           
            if (password.value.trim() == ""){
                e.preventDefault();
                feedback = 'La contraseña no puede quedar vacía'
                password.nextElementSibling.innerText = feedback;
            }
           })
       
    
                
        
        
});

