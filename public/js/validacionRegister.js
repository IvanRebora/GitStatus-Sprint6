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

/*window.onload = () => {
    
    const form = document.querySelector('form-container');
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('email');
    const avatar = document.getElementById('avatar');
    const password = document.getElementById('password');
    const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    let regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];

    let errors = {};
    
    
    
//Valido información del nombre
    first_name.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = first_name.nextElementSibling;
        
        console.log(feedbackElement);
        if(first_name.value.trim() == ""){
            feedback = 'El nombre no puede quedar vacío'
        } else if(first_name.value.length < 2){
            feedback = 'El nombre debe tener 2 o mas caracteres'
        }
        console.log(feedbackElement);
        //console.log(feedback);
        if (feedback) {
            feedbackElement.innerText = feedback
            errors.first_name = feedback;
            console.log(errors);
        }
       
        });
        
//Valido información del apellido
last_name.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = last_name.nextElementSibling;
   
    if(last_name.value.trim() == ""){
        feedback = 'El apellido no puede quedar vacío'
    } else if(last_name.value.length < 2){
        feedback = 'El apellido debe tener 2 o mas caracteres'
    }
    
    if (feedback) {
        feedbackElement.innerText = feedback
        errors.last_name = feedback;
        
    }
    });

//Valido información del email
email.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = email.nextElementSibling;
   
    if(email.value.trim() == ""){
        feedback = 'El e-mail no puede quedar vacío'
    } else if(!expValidEmail.test(email.value)){
        feedback = 'El formato de e-mail no es correcto'
    } 
    
    if (feedback) {
        feedbackElement.innerText = feedback
        errors.email = feedback;
    }
    });
    
    
//Valido información del contraseña
password.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = password.nextElementSibling;
   
    if(password.value.trim() == ""){
        feedback = 'La contraseña no puede quedar vacío'
    } else if(!regularExpression.test(password.value)){
        feedback = 'La contraseña debe contener caracteres especiales números y letras mayusculas y minúsculas'
    } 
    
    if (feedback) {
        feedbackElement.innerText = feedback;
        errors.password = feedback;
    }
    });
    

    //Valido información del imagen
    avatar.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = avatar.nextElementSibling;
    
   
    if(avatar){
        let filename = avatar.value;
        let fileExtension = filename.split(".").pop();
        console.log(acceptedExtensions);
        console.log(fileExtension);
        console.log(acceptedExtensions.includes(fileExtension));
        if (!acceptedExtensions.includes(fileExtension)) {
            feedback = `Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`
            
        }
        
    }
    if (feedback) {
        feedbackElement.innerText = feedback;
        errors.avatar = feedback;

    }
})
       
       form.addEventListener('submit', function(e){
        
        //console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            e.preventDefault();
            }
        if (first_name.value.trim() == ""){
                e.preventDefault();
                feedback = 'El nombre no puede quedar vacío'
                first_name.nextElementSibling.innerText = feedback;
           }
        if (last_name.value.trim() == ""){
            e.preventDefault();
            feedback = 'El apellido no puede quedar vacío'
            last_name.nextElementSibling.innerText = feedback;
       }
       if (email.value.trim() == ""){
            e.preventDefault();
            feedback = 'El e-mail no puede quedar vacío'
            email.nextElementSibling.innerText = feedback;
        }

        if (password.value.trim() == ""){
            e.preventDefault();
            feedback = 'El celular no puede quedar vacío'
            password.nextElementSibling.innerText = feedback;
        }
       })
   

    
}
*/