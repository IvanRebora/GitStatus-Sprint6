window.addEventListener('load', function(){
   
    let formulario= document.querySelector('form-container');
    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];
   
    let name = document.querySelector('#name');
    let description = document.querySelector('#description');
    let image = document.querySelector('#image');
    let errors = {};
    name.addEventListener('blur', () =>{
        let feedback = ''; 
        let feedbackElement = name.nextElementSibling;
       if(name.value == ""){
           feedback= "El nombre no puede estar vacío"
           }
           else if(name.value.length < 5){
               feedback= "Elegir un nombre de 5 caracteres mínimo"
           }
           if (feedback) {
            feedbackElement.innerText = feedback
            errors.name = feedback;
        }
   })
      description.addEventListener('blur', () =>{
        let feedback = ''; 
        let feedbackElement = description.nextElementSibling;
          if(description.value.length < 20){
              feedback= "Escribir mínimo 20 caracteres"
          }
          if (feedback) {
            feedbackElement.innerText = feedback
            errors.description = feedback;
        }
      })

      image.addEventListener('blur', () =>{
        let feedback = ''; 
        let feedbackElement = image.nextElementSibling;
          if(image){
              let filename = image.value;
              let fileExtension = filename.split(".").pop();
              console.log(acceptedExtensions);
              console.log(fileExtension);
              console.log(acceptedExtensions.includes(fileExtension));
              if (!acceptedExtensions.includes(fileExtension)) {
                  feedback= `Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`
                  
              }
              if (feedback) {
                feedbackElement.innerText = feedback
                errors.image = feedback;
            }
              
          }
      })
        
        
      form.addEventListener('submit', (e) => {


        if (name.value == ''){
            errors.push('Complete el nombre');
            address.classList.add('is-invalida');
        }
        if (description.value == ''){
            errors.push('Debe tener minimo 20 caracteres');
        }


        if (errors.length > 0){
            e.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
            
        } else {
            form.submit();
        }
    });
   
    })
    