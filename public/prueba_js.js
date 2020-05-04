function Crear(){
    let conte = document.getElementById("ul-1");
    $.ajax({
        type:"POST",
        data: {"pestas": JSON.stringify(pestas),"cajas": JSON.stringify(cajas)},
        url:"/crear",
        success:function(data){
            $('#consola').val(data);
        },
    });
}


function Filtrar(){
    $.ajax({
        type:"POST",
        data: {"doc": JSON.stringify("hola")},
        url:"/filtrar",
        success:function(data){
            $('#consola').val(data);
        },
    });
}

function IrErrores() {
    window.open("/errores");
}

function IrSimbolos() {
    window.open("/simbolos");
}

