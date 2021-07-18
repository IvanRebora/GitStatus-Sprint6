window.addEventListener('load', function(){
    let formulario= document.querySelector('form-container');
    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];
    formulario.addEventListener('blur', function(e){
        e.preventDefault();
        let name = document.querySelector('#name');
        if(name.value == ""){
            alert("El nombre no puede estar vacío")
        }
        else if(name.value.length>5){
            alert("Elegir un nombre de 5 caracteres mínimo")
        }

        let description = document.querySelector('#description');
        if(description.value.length>20){
            alert("Escribir mínimo 20 caracteres")
        }
        let image = document.querySelector('#image');
        if(image){
            let filename = image.value;
            let fileExtension = filename.split(".").pop();
            console.log(acceptedExtensions);
            console.log(fileExtension);
            console.log(acceptedExtensions.includes(fileExtension));
            if (!acceptedExtensions.includes(fileExtension)) {
                alert(`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
                
            }
            
        }
       

    })
})