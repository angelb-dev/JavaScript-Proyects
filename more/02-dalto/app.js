let freePass = false;

let validarEdad = (time)=>{
    let edad = prompt("Cual es tu edad?")
    if (edad >= 18) {
        document.write(`<br> Tenes ${edad} años, sos mayor, por ende podes entrar. Hora actual: ${time}. <br>`)
        if (time >= 2 && time < 8 && freePass == false) {
            freePass = true;
            document.write(`¡Y además entras gratis, amigo! Son las 2:00 A. M. cortesía de la casa. <br>`)
        }
    } else if (edad < 18) {
        document.write(`<br> Tienes ${edad} años, no puedes entrar, eres menor. Hora actual: ${time}. <br>`)
    }
}

validarEdad(23)
validarEdad(0)
validarEdad(1)
validarEdad(2)
validarEdad(3)