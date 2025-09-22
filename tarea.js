const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const tareas = [];
let id = 0;

function editartarea(tarea) {
    console.clear();
    console.log("Editar tarea - ID:", tarea.id);
    console.log("Deje vacío para no cambiar, o ingrese '--' para dejar en blanco.");

    rl.question(`Titulo actual (${tarea.titulo}): `, function(nuevoTitulo) {
        if (nuevoTitulo.length > 0) tarea.titulo = nuevoTitulo;
        rl.question(`Descripcion actual (${tarea.descripcion}): `, function(nuevaDesc) {
            if (nuevaDesc === '--') {
                tarea.descripcion = '';
            } else if (nuevaDesc.length > 0) {
                tarea.descripcion = nuevaDesc;
            }
            rl.question(`Estado actual (${tarea.estado}) [pendiente/en curso/terminada]: `, function(nuevoEstado) {
                if (["pendiente","en curso","terminada"].includes(nuevoEstado.toLowerCase())) {
                    tarea.estado = nuevoEstado.toLowerCase();
                }
                rl.question(`Vencimiento actual (${tarea.vencimiento}): `, function(nuevoVenc) {
                    if(nuevoVenc === '--') {
                        tarea.vencimiento = null;
                    } else if (nuevoVenc.length > 0) {
                        tarea.vencimiento = new Date(nuevoVenc);
                    }
                    rl.question(`Dificultad actual (${tarea.dificultad}) [facil/medio/dificil]: `, function(nuevaDif) {
                        if (["facil","medio","dificil"].includes(nuevaDif.toLowerCase())) {
                            tarea.dificultad = nuevaDif.toLowerCase();
                        }
                        console.clear();
                        console.log("Tarea actualizada correctamente:");
                        console.log(`ID: ${tarea.id}`);
                        console.log(`Titulo: ${tarea.titulo}`);
                        console.log(`Descripcion: ${tarea.descripcion}`);
                        console.log(`Estado: ${tarea.estado}`);
                        console.log(`Creacion: ${tarea.creacion}`);
                        console.log(`Vencimiento: ${tarea.vencimiento}`);
                        console.log(`Dificultad: ${tarea.dificultad}`);
                        rl.question("0 para volver a la lista de tareas, cualquier otra tecla para volver al menú principal: ", function(respuesta) {
                            switch(respuesta) {
                                case "0":
                                    vertareas();
                                    break;
                                default:
                                    menu();
                                    break;
                            }
                        });
                    });
                });
            });
        });
    });
}
function mostrarListaYDetalles(lista, volverFunc = menu) {
    if(lista.length === 0){
        console.log("No hay tareas.");
        rl.question("0 para volver, cualquier otra tecla para menú principal: ", function(respuesta){
            switch(respuesta){
                case "0":
                    vertareas();
                    break;
                default:
                    menu();
                    break;
            }
        });
        return;
    }
    for(let i = 0; i < lista.length; i++){
        console.log(`${lista[i].id} - ${lista[i].titulo}`);
    }
    rl.question("Ingrese el ID de la tarea para ver detalles o 0 para volver: ", function(idtarea){
        if(idtarea === "0"){
            volverFunc();
            return;
        }
        const idnum = parseInt(idtarea);
        let tarea = null;
        for(let i = 0; i < lista.length; i++){
            if(lista[i].id === idnum){
                tarea = lista[i];
                break;
            }
        }
        if(tarea){
            console.clear();
            console.log("Detalles de la tarea:");
            console.log(`ID: ${tarea.id}`);
            console.log(`Titulo: ${tarea.titulo}`);
            console.log(`Descripcion: ${tarea.descripcion}`);
            console.log(`Estado: ${tarea.estado}`);
            console.log(`Creacion: ${tarea.creacion}`);
            console.log(`Vencimiento: ${tarea.vencimiento}`);
            console.log(`Dificultad: ${tarea.dificultad}`);
            console.log("1 para editar");
            console.log("0 para volver a la lista");
            console.log("Cualquier otra tecla para menú principal");
            rl.question("Seleccione una opción: ", function(opcion){
                switch(opcion){
                    case "1":
                        editartarea(tarea);
                        break;
                    case "0":
                        mostrarListaYDetalles(lista, volverFunc);
                        break;
                    default:
                        menu();
                        break;
                }
            });
        } else {
            console.log("ID no válido.");
            rl.question("0 para volver a la lista, otra tecla para menú principal: ", function(respuesta){
                switch(respuesta){
                    case "0":
                        mostrarListaYDetalles(lista, volverFunc);
                        break;
                    default:
                        menu();
                        break;
                }
            });
        }
    });
}
function vertareas(){
    if(tareas.length === 0){
        console.clear();
        console.log("No hay tareas");
        rl.question("Desea agregar una tarea? (1. Si / 0. No)", function(respuesta){
            switch(respuesta){
                case "1":
                    agregartarea();
                    break;
                case "0":
                    menu();
                    break;
                default:
                    console.clear();
                    console.log("Opcion no valida");
                    vertareas();
                    break;
            }
        });
    }
    else{
        console.log("Que tareas deseas ver?");
        console.log("1. Todas las tareas");
        console.log("2. Pendientes");
        console.log("3. En curso");
        console.log("4. Terminadas");
        console.log("0. Volver al menu principal");
        rl.question("Seleccione una opcion: ", function(opcion){
            switch(opcion){
                case "1":
                    console.clear();
                    mostrarListaYDetalles(tareas);
                    break;
                case "2":
                    console.clear();
                    mostrarListaYDetalles(tareas.filter(t => t.estado === "pendiente"));
                    break;
                case "3":
                    console.clear();
                    mostrarListaYDetalles(tareas.filter(t => t.estado === "en curso"));
                    break;
                case "4":
                    console.clear();
                    mostrarListaYDetalles(tareas.filter(t => t.estado === "terminada"));
                    break;
                case "0":
                    menu();
                    break;
                default:
                    console.clear();
                    console.log("Opcion no valida");
                    vertareas();
                    break;
            }
        });
    }
}
function buscartarea() {
    console.clear();
    rl.question("Ingrese el título o parte del título de la tarea: ", function(busqueda) {
        if(busqueda.length === 0){
            console.log("Debe ingresar algún texto para buscar.");
            return buscartarea();
        }
        let resultados = tareas.filter(t => t.titulo.toLowerCase().includes(busqueda.toLowerCase()));
        if(resultados.length === 0){
            console.log("No se encontraron tareas con ese título.");
            rl.question("0 para volver al menú principal, cualquier otra tecla para intentar otra búsqueda: ", function(respuesta){
                switch(respuesta){
                    case "0":
                        menu();
                        break;
                    default:
                        buscartarea();
                        break;
                }
            });
        } else {
            console.log("Tareas encontradas:");
            mostrarListaYDetalles(resultados, buscartarea);
        }
    });
}
function agregartarea(){
    console.log("Agrega una nueva tarea");
    rl.question("Ingrese el titulo de la tarea: ", (titulo) => {
        if(titulo.length === 0){
            console.clear();
            console.log("El titulo no puede estar vacio.");
            agregartarea();
            return;
        }
        rl.question("Ingrese la descripcion de la tarea: ", (descripcion) => {
            rl.question("Ingrese el vencimiento de la tarea (aaaa-mm-dd): ", (vencimientouser) => {
                let vencimiento = vencimientouser ? new Date(vencimientouser) : null;
                console.log("Seleccione el estado de la tarea:");
                console.log("1. Pendiente");
                console.log("2. En curso");
                console.log("3. Terminada");
                rl.question("Opcion: ", (opcionEstado) => {
                    let estado = "pendiente";
                    switch(opcionEstado) {
                        case "1":
                            estado = "pendiente";
                            break;
                        case "2":
                            estado = "en curso";
                            break;
                        case "3":
                            estado = "terminada";
                            break;
                        default:
                            console.log("Opción no válida, se asignará 'pendiente' por defecto.");
                            break;
                    }
                    console.log("Seleccione la dificultad de la tarea:");
                    console.log("1. Facil");
                    console.log("2. Medio");
                    console.log("3. Dificil");
                    rl.question("Opcion: ", (opcionDificultad) => {
                        let dificultad = "facil";
                        switch(opcionDificultad) {
                            case "1":
                                dificultad = "facil";
                                break;
                            case "2":
                                dificultad = "medio";
                                break;
                            case "3":
                                dificultad = "dificil";
                                break;
                            default:
                                console.log("Opción no válida, se asignará 'facil' por defecto.");
                                break;
                        }
                        id++;
                        const creacion = new Date();
                        const nuevatarea = { 
                            id: id,
                            titulo: titulo,
                            descripcion: descripcion,
                            estado: estado,
                            creacion: creacion,
                            vencimiento: vencimiento,
                            dificultad: dificultad
                        }
                        tareas.push(nuevatarea);
                        console.clear();
                        console.log("Tarea agregada y guardada exitosamente.");
                        menu();
                    });
                });
            });
        });
    });
}
function menu(){
    console.log("Gestor de tareas en JS");
    console.log("1. Ver tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("0. Salir");
    rl.question("Seleccione una opcion: ", function(opcion){
        switch(opcion){
            case "1":
                console.clear();
                vertareas();
                break;
            case "2":
                console.clear();
                buscartarea();
                break;
            case "3":
                console.clear();
                agregartarea();
                break;
            case "0":
                console.log("Saliendo...");
                rl.close();
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