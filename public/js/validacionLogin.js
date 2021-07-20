window.addEventListener('load', function(){
    let formulario= document.querySelector('form-container');
    let password= document.querySelector('#password')
    let email= document.querySelector('#email');
    
    const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    let errors = {};
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
    password.addEventListener('blur', () =>{
        let feedback = ''; 
        let feedbackElement = password.nextElementSibling;
        if(password.value== ""){
            feedback= "La contraseña no puede estar incompleta"
        }
        else if(password.value.length>8){
            feedback= "La contraseña debe tener minimo 8 caracteres"
        }
        if (feedback) {
            feedbackElement.innerText = feedback
            errors.password = feedback;
        }
    })
    
    formulario.addEventListener('submit', function(e){
        
        //console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            e.preventDefault();
            }
        if (email.value.trim() == ""){
                e.preventDefault();
                feedback = 'El email no puede quedar vacío'
                email.nextElementSibling.innerText = feedback;
           }
        if (password.value.trim() == ""){
            e.preventDefault();
            feedback = 'La contraseña no puede quedar vacía'
            password.nextElementSibling.innerText = feedback;
       }
   
       })
   
})