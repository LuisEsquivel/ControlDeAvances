

var ErrorAlEliminar = "Error al eliminar";
var EliminadoCorrectamente = "Se eliminó correctamente";
var InformacionEnviada = "Información Enviada";
var InformacionNoEnviada = "Información No Enviada";
var InformaciónAlmacenada = "Información Almacenada";
var NoSeEncontroInformacion = "No Se Encontró Información";
var NoSePudoObtenerLaInformacion = "No se pudo obtener la Información";
var Error = "Ocurrió un Error";
var idTable = "";



var sinInfo = "<button type='button' value='NUEVO' class='btn btn-success ml-5' onclick='AbrirFormulario(1);'> <i class='fa fa-user-plus'> NUEVO</i></button>"
    + "<h5 class='ml-2 mt-2' id='Title'>" + $("#Titulo").text() + "</h5>"
    + "<center clas>"
    + "<h1>No hay información para mostrar!!</h1>"
    + "</center>";

var InfoError = "<center>"
    + "<h1>No se pudo obtener la información!!</h1>"
    + "</center>";

var spinner = "<center>"
    + "<h1>Cargando...</h1>"
    + "<div class='preloader-wrapper big active'> "
    + "<div class='spinner-layer spinner-blue-only' >"
    + "<div class='circle-clipper left'>"
    + "<div class='circle'></div>"
    + "</div><div class='gap-patch'>"
    + "<div class='circle'></div>"
    + "</div><div class='circle-clipper right'>"
    + "<div class='circle'></div>"
    + "</div>"
    + "</div >"
    + "</div >"
    + "</center>";


var formSearch = "<form method='POST' id='formSearched' class='row container-fluid'>"
    + "<div class='ml-auto form-inline'>"
    + "<label for='searched' class='col-form-label mr-3'>Buscar</label>"
    + "<div class='form-inlinemb-3'>"
    + "<input type='text' class='form-control' id='searched' name='searched' />"
    + "</div>"
    + "</div >"
    + "</form >";

function TableDesign(idTable) {


    //document.getElementById("footer").classList.remove("fixed-bottom");

    $("#" + idTable + "_length").addClass("text-primary form-inline");
    $("#" + idTable + "_filter").addClass("text-primary");
    $("#" + idTable + "_info").addClass("text-primary");
    $("#" + idTable + "_paginate").addClass("text-primary");
    $(".form-control-sm").addClass("text-primary");

    var groupColumn = 1;

    // Order by the grouping
    $('#' + idTable + ' tbody').on('click', 'tr.group', function () {
        var currentOrder = table.order()[0];
        if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
            table.order([groupColumn, 'desc']).draw();
        }
        else {
            table.order([groupColumn, 'asc']).draw();
        }
    });


}



//function centrar(id) {
//    var nav = document.getElementById("nav");
//    var footer = document.getElementById("footer");
//    footer.classList.add("fixed-bottom");
//    var height = nav.clientHeight + footer.clientHeight;
//    var objeto = document.getElementById(id);
//    var centrar = window.innerHeight - height;
//    objeto.style.paddingTop = 0;
//    objeto.style.cssText = "padding-top:" + (centrar - (centrar - 1)) + "px !important";
//}


$(document).ready(function () {


    $("#sidebarCollapse").click(() => {

        if (document.getElementById(idTable) != null) {

            var widthTable = document.getElementById(idTable).offsetWidth;
            var widthThead = document.getElementById("thead").offsetWidth

            alert("ancho tabla =" + widthTable + " , ancho thead =" + widthThead);

            if (widthThead < widthTable) {
                widthThead = widthThead + (widthTable - widthThead);
            }

        }

    });

    //userLogeado();
    //cargar imágen
    $('#file').change(function (e) {
        addImage(e);
    });

    $("#EstaActivo").change(() => {
        $("#IsActive").val($("#EstaActivo").prop("checked"));
    });

    $("#EsIntegradorBit").change(() => {
        $("#EsIntegrador").val($("#EsIntegradorBit").prop("checked"));
    });


    $("#EsAdminBit").change(() => {
        $("#EsAdmin").val($("#EsAdminBit").prop("checked"));
    });



    if ($("#Modal").length > 0) {
        var modal = document.getElementById("Modal");
        modal.style.cssText = "background-color:transparent !important; width:100% !important; overflow-y:hidden; max-height:100% !important;";
    }


    if ($("#frmLogin").length > 0) {
        centrar("frmLogin");
        document.getElementById("footer").classList.remove("fixed-bottom");
    }

    if ($("#frmRegister").length > 0) {
        centrar("frmRegister");
        document.getElementById("footer").classList.remove("fixed-bottom");
    }

    if ($("#frmOlvideContraseña").length > 0) {
        centrar("frmOlvideContraseña");
        document.getElementById("footer").classList.remove("fixed-bottom");
    }



    if ($("#frmVerificarCuenta").length > 0) {
        centrar("frmVerificarCuenta");
        document.getElementById("footer").classList.remove("fixed-bottom");
    }



    if ($("#ChkFiltros").length > 0) {

        HabilitarFiltros();

        $("#ChkFiltros").change(() => {
            HabilitarFiltros();
        });

    }


    if ($("#BtnClearDateInicial").length > 0) {
        $("#BtnClearDateInicial").click(() => {
            if ($("#FechaInicialDate").length > 0) {
                $("#FechaInicialDate").val("");
                $("#FechaFinalDate").val("");
                $("#FechaInicialDate").keypress();
            }
        });
    }


    if ($("#BtnClearDateFinal").length > 0) {
        $("#BtnClearDateFinal").click(() => {
            if ($("#FechaFinalDate").length > 0) {
                $("#FechaFinalDate").val("");
                $("#FechaFinalDate").keypress();
            }
        });
    }

    if ($("#FechaInicialDate").length > 0) {
        $("#FechaInicialDate").on("keyup change", () => {
            $("#FechaFinalDate").val($("#FechaInicialDate").val());
        });
    }


    //$.get("/Home/UsuarioLogeado", function (data) {
    //    if (data.length > 0) {
    //        document.getElementById("userLogeado").innerHTML =data;
    //    }

    //})


});


function userLogeado() {

    $.ajax({
        type: 'GET',
        url: '/Home/UsuarioLogeado',
        data: $(this).serialize(),
        success: function (data) {
            if (data.length > 0) {
                document.getElementById("userLogeado").innerHTML = data;
            }
        }
    });

}


function HabilitarFiltros() {
    $('#formSearch').find('input, textarea, button, select').val("");
    $('#formSearched').find('input').val("");

    if ($("#ChkFiltros").prop("checked")) {
        $('#formSearch').find('input, textarea, button, select').attr('disabled', false);
        $('#formSearch').show();

        $('#formSearched').hide();
    } else {
        $('#formSearch').find('input, textarea, button, select').attr('disabled', true);
        $('#formSearch').hide();

        $('#formSearched').show();
    }
}



language_data =
{

    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla =(",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad"
    }

}


jQuery(document).ready(function () {
    jQuery('.soloNumeros').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) return false;

    });
});



async function add(urlAdd, formData, arrayColumnas, BtnAddUser = false, arrayCellsData) {


    form.onsubmit = (e) => {
        e.preventDefault();
        return;
    }

    var returnData;

    await $.ajax({
        type: "POST",
        url: urlAdd,
        data: new FormData(formData),
        contentType: false,
        processData: false,
        dataType: "json",

        success: function (result) {


            if (JSON.stringify(result) == '{}') {
                swal(Error, "", "warning");
                return
            }

            if (result == "Correo Enviado") {
                swal(InformacionEnviada, "", "success");
                LimpiarFormulario();
                return;
            }
            if (result == "Problema al enviar correo") {
                swal(Error, InformacionNoEnviada, "warning");
                return;
            }

            if (JSON.stringify(result).includes("Ya Existe")) {
                swal(result, "", "warning");
                return;
            }


            if (!$.trim(result)) {
                swal(NoSeEncontroInformacion, "", "warning");
                $("#container").empty();
                container.innerHTML = sinInfo;
                return;
            } else {


                if (arrayColumnas.length > 0) {
                    Table(arrayColumnas, result, arrayCellsData);
                }
                else { returnData = result; }
            }

            swal(InformaciónAlmacenada, "", "success");
            CerrarFormulario();
            return;

        },
        error: function () {
            console.log("No se ha podido obtener la información");
            $("#container").empty();
            container.innerHTML = InfoError;
            return;
        }


    });


    return returnData;
}


async function list(url) {

    var container = document.getElementById("container");
    container.innerHTML = spinner;
    //centrar("container");
    var returnData;


    await $.ajax({
        method: "GET",
        url: url,
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (datos) {

            if (!$.trim(datos)) {
                swal(NoSeEncontroInformacion, "", "warning");
                $("#container").empty();
                container.innerHTML = sinInfo;
                return;
            } else {

                returnData = datos
            }


        },
        error: function () {
            console.log("No se ha podido obtener la información " + url);
            $("#container").empty();
            container.innerHTML = InfoError;
            return;
        }


    });


    return returnData;
}




async function FillDropDown(url, control, primerElemento) {

    await $.ajax({
        method: "GET",
        url: url,
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (data) {

            if (!$.trim(data)) {
                console.log("No se ha podido obtener la información " + url);
                return;
            }

            llenarCombo(data, control, primerElemento);

        },
        error: function () {
            console.log("No se ha podido obtener la información " + url);
            return;
        }


    });


}



function Table(arrayColumnsTable, data, arrayCellsData, columnaAcciones = true, BtnAddUser = true) {

    var container = document.getElementById("container");;
    container.classList.add("container");
    var contenido = "";


    contenido += "<div class='justify-content-start mb-5  form-inline'>";

    if (BtnAddUser) {
        contenido += "<button type='button' value='NUEVO' class='btn btn-success' onclick='AbrirFormulario(1);'> <i class='fa fa-user-plus'> NUEVO</i></button>";
    }

    contenido += " <h2 class='ml-2 mt-2 text-center font-weight-bold' id='Title'  style='color:#F08034;' >" + $("#Titulo").text() + "</h2>"
    contenido += "</div>";

    if (data == null) {
        container.innerHTML = contenido;
    }

    if (data.length == 0) {

        if ($(idTable).length > 0) {
            $(idTable).DataTable().clear().draw();
        }
        return;
    }


    idTable = "Table" + $("#Titulo").text().replace(/\s+/g, "");


    if (data.length == 1 && $("#" + idTable).length > 0) {
        AddRow(data, idTable, arrayCellsData);
        swal(InformaciónAlmacenada, "", "success");
        CerrarFormulario();
        return;
    };

    contenido += "<table class='table display responsive nowrap' id='" + idTable + "'  style='width: 100%'>";
    contenido += "<thead class='thead-dark text-white'  id='thead'>";
    contenido += "<tr>";

    for (i = 0; i < arrayColumnsTable.length; i++) {

        var theadColumn = arrayColumnsTable[i];

        if (theadColumn.includes("_")) {
            theadColumn = theadColumn.replace("_", " ");
        }

        contenido += "<th>";
        contenido += theadColumn;
        contenido += "</th>";
    }

    if (columnaAcciones) {
        contenido += "<th class='text-center'> Editar </th>";
        //contenido += "<th class='text-center'> Eliminar </th>";
    }

    contenido += "</tr>";
    contenido += "</thead>";


    var id;

    contenido += "<tbody>";
    for (row = 0; row < data.length; row++) {

        contenido += "<tr class='trsGen' id='" + data[row]["Id"] + "'>";

        for (celda = 0; celda < arrayCellsData.length; celda++) {

            //var cell = keys[celda];
            var cell = arrayCellsData[celda];

            //if cell is an Image

            if (cell == "Imagen") {
                contenido += "<td>";
                contenido += "<img src=" + data[row][cell] + " class='img-fluid' style='width: 100px; height: 100px;'>";
                contenido += "</td>";
            }


            if (!cell.includes("Imagen") && !cell.includes("Pdf") && !cell.includes("Video")) {

                //No mostramos el Id
                if (!cell.includes("Id")) {
                    contenido += "<td>";
                    contenido += data[row][cell];
                    contenido += "</td>";
                }

            }



            /*Get Id For Filter or Delete(EstadoActivo==false)*/
            if (cell == "Id") {
                id = data[row][cell];

                //verificamos si el id contiene letras y si es así lo ponemos entre comillas
                const regex = /^[0-9]*$/;
                if (regex.test(id) == false) { id = '"' + id + '"'; }

            }


            if (cell.includes("Pdf")) {
                var pdf = data[row][cell];
                contenido += "<td class='text-center'>";
                if (pdf != null) {
                    pdf = '"' + pdf + '"';
                    contenido += "<img class='img' onclick='Modal(" + pdf + ");' src='../img/PDF.png'/>"

                }
                contenido += "</td>";
            }

            if (cell.includes("Video")) {
                var video = data[row][cell];
                contenido += "<td class='text-center'>";

                if (video != null) {
                    video = '"' + video + '"';
                    contenido += "<img class='img p-0' onclick='Modal(" + video + ");' src='../img/iconyoutube.png' />"
                }
                contenido += "</td>";
            }

        }//end for


        if (columnaAcciones) {

            contenido += "<td class='text-center'>";
            contenido += "<button id='BtnEditar' class='editar btn btn-secondary btn-sm  redondo' onclick='GetInfoById(" + id + ");'>  <i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i></button> ";
            contenido += "</td>";

        }


        contenido += "</tr>";

    }//end data

    contenido += "</tbody>";
    contenido += "</table>";


    $("#container").css("height", "");
    container.innerHTML = contenido;

    $("#" + idTable).DataTable({
        //dom: 'Bfrtip',
        "scrollY": true,

        lengthMenu: [
            [7, 14, 21, -1],
            ['7', '14', '21', 'Todo']
        ],
        buttons: [
            'pageLength',
        ],

        order: [[0, "desc"]],

        language: language_data
    });


    TableDesign(idTable);
}




//Get object by Id
async function GetById(url, id) {

    var parameters = {
        "id": id,
    };


    await $.ajax({
        method: "POST",
        url: url,
        data: parameters, /*parámetros enviados al controlador*/
        dataType: "json",


        success: function (data) {

            AbrirFormulario(2);
            LlenarFormulario(data);

        },
        error: function () {
            console.log("No se ha podido obtener la información");
            swal(NoSePudoObtenerLaInformacion, "", "warning");

        }
    });


}


//Get object by Id
async function DeleteById(url, id) {

    var deleted = false;

    var parameters = {
        "Id": id,
    };


    await swal({
        title: "¿Estás seguro de eliminar este elemento?",
        text: "¡Una vez eliminado no se podrá recuperar!",
        icon: "warning",
        buttons: {
            cancel: true,
            confirm: true,
        },
    })
        .then((willDelete) => {

            if (willDelete) {

                $.ajax({
                    method: "DELETE",
                    url: url,
                    data: parameters,
                    //dataType: "json",

                    success: function (data) {


                        if (data == "deleted") {
                            var itemId = id.toString() + id.toString();
                            if (data == "deleted") {
                                document.getElementById(itemId).remove();
                                deleted = true;

                                if (deleted == true) {
                                    swal(EliminadoCorrectamente, {
                                        icon: "success",
                                    });
                                }

                            }
                        }


                    },
                    error: function () {
                        console.log("No se ha podido obtener la información");
                        swal(NoSePudoObtenerLaInformacion, "", "warning");

                    }
                });



            } else {

            }

        });


}



function LlenarFormulario(data) {


    try {


        //obtenemos los keys del JSON ejemplo: ID, NOMBRE...
        var keys = Object.keys(data[0]);


        for (row = 0; row < data.length; row++) {

            //recorremos las keys o los campos del array
            for (k = 0; k < keys.length; k++) {

                //key o campo actual
                var nombreCampo = keys[k];

                var elementHtml = $("#" + nombreCampo);

                //verificamos que exista el elemento en el html
                if (elementHtml.length > 0) {

                    //obtenemos el typo de elemento html
                    var type = "";
                    type = document.getElementById(nombreCampo).type.toLowerCase();

                    //obtenemos el valor del campo
                    var value = data[row][nombreCampo];

                    if (type == 'checkbox') {

                        if (value.toString().toLowerCase() == "true") {
                            elementHtml.prop('checked', true);
                        } else {
                            elementHtml.prop('checked', false);
                        }
                    }


                    else if (type.includes('select')) {
                        $("#" + nombreCampo + " option[ value=" + value + "]").prop('selected', true);
                    }


                    else if (type == 'date') {

                        var date = new Date(value);
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();

                        if (month < 10) { month = "0" + month.toString(); }
                        if (day < 10) { day = "0" + day.toString(); }

                        value = year.toString() + "-" + month.toString() + "-" + day.toString();
                        elementHtml.val(value);

                    }


                    else {
                        elementHtml.val(value);
                    }

                }//end if element exist

            }//end for keys
        }

    } catch (ex) {
        console.log(ex.toString());
    }


}




function ImagePreview(e) {

    var file = e.target.files[0],
        imageType = /image.*/;

    if (file == null) { $('#Image').attr("src", ""); $("llevaImagen").val(false); return; }

    if (!file.type.match(imageType))
        return;

    var reader = new FileReader();

    reader.onload = function (e) {
        var result = e.target.result;
        $('#Image').attr("src", result);
        $("#llevaImagen").val(true);
    }

    reader.readAsDataURL(file);
}



function LimpiarFormulario() {
    $("#form").trigger('reset');
    if ($("#Image").length > 0) $("#Image").attr("src", "");
}



async function AbrirFormulario(operacion) {

    if (operacion == 1) {
        LimpiarFormulario();
        $("#BtnUpdate").hide();
        $("#BtnAdd").show();
        $("#ModalTitle").text("Agregar " + $("#Titulo").text());
        $("#DivIsActive").hide();
    }

    if (operacion == 2) {
        $("#BtnUpdate").show();
        $("#BtnAdd").hide();
        $("#ModalTitle").text("Actualizar " + $("#Titulo").text());
        $("#DivIsActive").show();
        document.getElementById("BtnAdd").classList.remove("mt-3");
        if ($("#BtnCancelar").length > 0) {
            document.getElementById("BtnCancelar").classList.remove("mb-1");
        }


    }


    $('#Modal').modal('show')
}



function CerrarFormulario() {
    LimpiarFormulario();
    $('#Modal').modal('hide')
}



function Cancelar() {
    LimpiarFormulario();
    CerrarFormulario();
}



function AbrirModal(url) {

    if (modal_open == false) {
        $("#FileUrl").attr("src", url);
        $("#FileUrl")[0].src += "?autoplay=1";
    }


    //para mantenerlo estático al presionar fuera del modal y si se presiona ESC que se cierre
    $('#Modal').modal({ backdrop: 'static', keyboard: true })

    var modal = "display: block; padding-rigth: 17px;";
    $(".modal").removeAttr("style");
    $(".modal").attr("style", modal);

    $("#Modal").modal("show");

    modal_open = true;
}


var style = "position: fixed;"
"top: 0px;"
"left: 0px;"
"bottom: 0px;"
"right: 0px;"
"width: 100 %;"
"height: 100%;"
"border: none;"
"margin: 0;"
"padding: 0;"
"overflow: hidden;"
"z-index: 999999;";


var maximized = false;
var modal_open = false;




jQuery(document).ready(function () {
    jQuery('.soloNumeros').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) return false;
    });
});



var Filtrar = async function (frm, ControllerAction) {


    let response = await fetch(ControllerAction, {
        method: 'POST',
        processData: false,
        contentType: false,
        body: new FormData(frm)
    });

    let result = await response.json();

    if (ControllerAction == "/Seguimiento/Filtrar"
        || ControllerAction == "/Seguimiento/Buscar"
        || ControllerAction == "/Seguimiento/Imprimir"
    ) {
        return result;
    }

    if (result != null) {
        Table(arrayColumnas, result);
    }


}




var Login = async function () {

    //var container = document.getElementById("container");
    //container.innerHTML = spinner;

    var frm = document.getElementById("frmLogin");

    frm.onsubmit = async (e) => {

        e.preventDefault();


        let response = await fetch("/Login/Access", {
            method: 'POST',
            processData: false,
            contentType: false,
            body: new FormData(frm)
        });

        let result = await response.json();

        if (result == 0) {
            swal("¡Usuario o Contraseña Incorrectos!", "Verifique", "warning");
        } else {


            if (result == "/Registrarse/VerificarCuenta") {
                window.location.href = result;
            } else {

                swal("Bienvenido " + result + " :)")
                    .then(() => {
                        window.location.href = "/Home/Index";
                        return;
                    });
            }


        }

    }

    //$("#container").empty();
}





async function Register() {


    //var container = document.getElementById("container");
    //container.innerHTML = spinner;


    var frm = document.getElementById("frmRegister");


    frm.onsubmit = async (e) => {

        e.preventDefault();


        let response = await fetch("/Registrarse/Add", {
            method: 'POST',
            processData: false,
            contentType: false,
            body: new FormData(frm)
        });

        let result = await response.json();

        if (result == "success") {

            swal("Registro Éxitoso ", "Inicia Sesión", "success")
                .then(() => {
                    window.location.href = "/Login/Index";
                    return;
                });

        } else {

            if (result.includes("Ya Existe")) {
                swal(result, "", "warning");
                return;
            }

            if (result.includes("error")) {
                console.log(result);
                swal("Algo salió mal", "", "warning");
                return;
            }

        }


        //$("#container").empty();

    }

}



var ValidarCuenta = async function () {

    var container = document.getElementById("container");
    container.innerHTML = spinner;

    var frm = document.getElementById("frmVerificarCuenta");

    frm.onsubmit = async (e) => {

        e.preventDefault();

        let response = await fetch("/Registrarse/ValidarCuenta", {
            method: 'POST',
            processData: false,
            contentType: false,
            body: new FormData(frm)
        });

        let result = await response.json();

        if (result == 1) {

            swal("Cuenta Verificada")
                .then(() => {
                    window.location.href = "/Home/Index";
                });
            s
        } else {
            swal("¡Revisa el código de verificación y vuelve a intentarlo!", "Verifique", "warning");
        }

    }

    $("#container").empty();

}





var EnviarCodigoDeVerificacion = async function () {

    //var container = document.getElementById("container");
    //container.innerHTML = spinner;

    var frm = document.getElementById("frmOlvideContraseña");

    frm.onsubmit = async (e) => {

        e.preventDefault();

        let response = await fetch("/Registrarse/EnviarContraseñaAlCorreoAsociado", {
            method: 'POST',
            processData: false,
            contentType: false,
            body: new FormData(frm)
        });

        let result = await response.json();

        if (result.includes("La contraseña se envió al correo")) {

            swal(result + "" + "")
                .then(() => {
                    window.location.href = "/Login/Index";
                });

        } else if (result.includes("Error")) {
            console.log(result);
            swal("Algo salío mal", "", "warning");
        } else {
            swal(result, "", "warning");
        }

    }

    //$("#container").empty();

}




var UpdatePassword = async function () {

    var container = document.getElementById("container");
    container.innerHTML = spinner;

    var frm = document.getElementById("frmUpdatePassord");

    frm.onsubmit = async (e) => {

        e.preventDefault();

        let response = await fetch("/Registrarse/UpdatePassword", {
            method: 'POST',
            processData: false,
            contentType: false,
            body: new FormData(frm)
        });

        let result = await response.json();

        if (result == 1) {

            swal("Tu Contraseña Se Actualizó Con Exito")
                .then(() => {
                    window.location.href = "/Home/Index";
                });

        } else if (result == 0) {
            swal("Las Contraseñas No Coinciden", "Verifique", "warning");
        } else if (result == -1) {
            swal("Algo salió mal... Intentalo Más Tarde", "Verifique", "warning");
        } else if (result == 2) {
            swal("El Código de verificación no es correcto", "Verifique", "warning");
        }

    }

    $("#container").empty();

}



//METODO GENERICO PARA LLENAR LOS COMBOBOX
function llenarCombo(data, control, primerElemento) {

    var contenido = "";

    if (primerElemento == true) {
        contenido += "<option value='' selected>---SELECCIONE---</option>"
    }

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i]["IID"] + "'>";
        contenido += data[i]["NOMBRE"];
        contenido += "</option>";
    }

    control.innerHTML = contenido;
}



//Google Signing
async function GoogleSignIn(googleUser) {


    if (Registers == false) { return; }

    var profile = await googleUser.getBasicProfile();

    return SignInGoogle(profile);

    Registers = false;

}


async function SignInGoogle(profile) {


    var parameters = {
        "NombreVar": await profile.getName(),
        "UsuarioVar": await profile.getEmail(),
        "Password": "GoogleAccount",
        "GoogleAccount": true
    }



    $.ajax({
        method: "POST",
        url: "/Registrarse/Add",
        data: parameters, /*parámetros enviados al controlador*/
        dataType: "json",

        success: await function (result) {

            if (result == 1) {
                swal("Bienvenido " + profile.getName() + " :)")
                    .then(() => {
                        window.location.href = "/Home/Index";
                    });

            } else {
                swal("Algo salió mal al Iniciar Sesión", "", "warning");

            }

        },
        error: await function () {
            swal("Algo salió mal al Iniciar Sesión", "", "warning");
        }
    });


}



var Registers = false;
function Registrar() {
    Registers = true;
}



function AddRow(data, idTable, arrayCellsData) {


    if (data == null || data.length == 0) { return; }

    var Id = '"' + data[0]["Id"] + '"';
    var ColumnEdit = "<div class='text-center'> ";
    ColumnEdit += "<button id='BtnEditar' class='editar btn btn-secondary btn-sm  redondo' onclick='GetInfoById(" + Id + ");'>  <i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i></button> ";
    ColumnEdit += "</div>";

    var table = document.getElementById(idTable);

    if ($("#" + data[0]["Id"]).length > 0) {
        document.getElementById(data[0]["Id"]).remove();
    }


    var newRow = table.insertRow(1);
    var numberCell = 0;

    for (var i = 0; i < arrayCellsData.length; i++) {

        var item = arrayCellsData[i];
        newRow.insertCell(numberCell);

        if (!item.includes("Id")) {
            var newText = data[0][item];
            table.rows[1].cells[numberCell].innerHTML = newText;
            numberCell++;
        }

    }


    newRow.insertCell(numberCell);
    table.rows[1].cells[numberCell].innerHTML = ColumnEdit;

    var tr = table.rows[1];
    var att = document.createAttribute("id");
    att.value = data[0]["Id"];
    tr.setAttributeNode(att);

}