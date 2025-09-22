const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
 
function sumar(num1, num2){
    return num1 + num2;
};
function restar(num1, num2){
    return num1 - num2;
};
function multiplicacion(num1, num2){
    return num1 * num2;
};
function division(num1, num2){
    if(num2 === 0){
        console.log("Error: indeterminacion");
        menu();
    }
    else {
        return num1 / num2;
    }
};
function menu(){
    console.log("Calculadora con JS");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicacion");
    console.log("4. Division");
    console.log("0. Salir");
    rl.question("Seleccione una operacion: ", function(operacion){
        switch(operacion){
            case "1":
                console.log("SUMAR");
                rl.question("Ingrese el primer numero: ", function(num1){
                    rl.question("Ingrese el segundo numero: ", function(num2){
                        const resultado = sumar(parseFloat(num1), parseFloat(num2));
                        console.log(`El resultado es: ${resultado}`);
                        menu();
                    })
                })
                break;
            case "2":
                console.log("RESTAR");
                rl.question("Ingrese el primer numero: ", function(num1){
                    rl.question("Ingrese el segundo numero: ", function(num2){
                        const resultado = restar(parseFloat(num1), parseFloat(num2));
                        console.log(`El resultado es: ${resultado}`);
                        menu();
                    })
                }) 
                break;
            case "3":
                console.log("MULTIPLICAR");
                rl.question("Ingrese el primer numero: ", function(num1){
                    rl.question("Ingrese el segundo numero: ", function(num2){
                        const resultado = multiplicacion(parseFloat(num1), parseFloat(num2));
                        console.log(`El resultado es: ${resultado}`);
                        menu();
                    })
                })
                break;
            case "4":
                console.log("DIVIDIR");
                rl.question("Ingrese el primer numero: ", function(num1){
                    rl.question("Ingrese el segundo numero: ", function(num2){
                        const resultado = division(parseFloat(num1), parseFloat(num2));
                        console.log(`El resultado es: ${resultado}`);
                        menu();
                    })
                })
                break;
            case "0":
                console.log("Saliendo...");
                rl.close();
                console.clear();
                break;
            default:
                console.clear();
                console.log("Opcion no valida");
                menu();
                break;
        }
    })
};
menu();