function templateLiterals(nombre, edad) {
    let mensaje = `Hola, mi nombre es ${nombre} y tengo ${edad} años. `;
    let mensajes = new Array(100000).fill(mensaje);
    return mensajes.join('');
}

// Función para generar una cadena usando concatenación tradicional
function concatenacionTradicional(nombre, edad) {
    let mensaje = "";
    for (let i = 0; i < 100000; i++) {
        mensaje += "Hola, mi nombre es " + nombre + " y tengo " + edad + " años. ";
    }
    return mensaje;
}

// Función para medir el tiempo de ejecución promedio de una función
function medirTiempoPromedio(funcion, parametros) {
    let totalTiempo = 0;
    let iteraciones = 10; // Número de veces que se ejecutará cada función
    for (let j = 0; j < iteraciones; j++) {
        let start = performance.now();
        funcion(...parametros);
        let end = performance.now();
        totalTiempo += end - start;
    }
    return totalTiempo / iteraciones;
}

// Ejecutamos cada método y medimos el tiempo de ejecución promedio
let nombre = "Fernando";
let edad = 25;

let tiempoPromedioConcatenacion = medirTiempoPromedio(concatenacionTradicional, [nombre, edad]);
let tiempoPromedioTemplateLiterals = medirTiempoPromedio(templateLiterals, [nombre, edad]);

document.write("Tiempo promedio de template literals:", tiempoPromedioTemplateLiterals.toFixed(4), "ms", "<br>");
document.write("Tiempo promedio de concatenación tradicional:", tiempoPromedioConcatenacion.toFixed(4), "ms", "<br>");