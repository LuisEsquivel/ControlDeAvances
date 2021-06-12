

var arrayCellsData = ["Id", "Descripcion", "ActivoBit", "FechaAlta"];
var arrayColumnsTable = ["Descripción", "Activo", "Fecha Alta"];



$(document).ready(async () => {

    $("#CmbFase").change(async () => {

        var id = await $("CmbFase option:selected").val(); 
        alert(id);
        await GetList("/Documentacion/List/", id);

    });

});



function GetInfoById(id) {
    window.GetById("/Documentacion/GetByID", id);
}

async function Add() {
    var form = document.getElementById("form");
    await window.add("/Documentacion/Add", form, arrayColumnsTable, true, arrayCellsData)
}




async function GetList(url, idFase) {

    var parameters = {
        "idFase": idFase,
    };


    await $.ajax({
        method: "POST",
        url: url,
        data: parameters, /*parámetros enviados al controlador*/
        dataType: "json",


        success: function (data) {
            CreateSlide(data);
        },
        error: function () {
            console.log("No se ha podido obtener la información");
            swal(NoSePudoObtenerLaInformacion, "", "warning");
        }
    });


}




function CreateSlide(data) {

    //var container = document.getElementById("carousel-inner");
    //container.innerHTML = "";

    if (data == "0") {
        contenido = "No se encontró Información";
        return;
    }



    var Slide = "";
    var SlideId = 1;
    var Card = "";
    var length = 1;


    for (var i = 0; i < data.length; i++) {

        if (length == 1) {

            Slide += "<div class='carousel-item active' id='" + SlideId + "'>";

            Slide += "</div>";
        }


        else if (length > 1) {

            Slide += "<div class='carousel-item' id='" + SlideId + "'>";

            Slide += "</div>";

        }


        var id = '"' + data[i]["Id"] + '"';
        var imagen = data[i]["RutaImagen"].toString().replace("~", "..");
        var descripcion = data[i]["Descripcion"];


        Card += "<div class='card rounded h-100'>"; // start card

        Card += "<div class='card-img'>"
        Card += "<img class='card-img-top img-fluid rounded' onerror='imgError(this);' src='" + imagen + "'  style='cursor:pointer;'>";
        Card += "</div>";

        Card += "<div class='card-body text-center'>"; // start card body
        Card += "</div>"; // end card body

        Card += "<div class='card-footer text-center'>"; //start card footer
        Card += "<div class='row'>";
        Card += "<a class='card-title  col-sm-12' >" + descripcion + "</a>";
        Card += "</div>";
        Card += "</div>"; // end card footer

        Card += "</div>"; // end card

        length++;



        document.getElementById("carousel-inner").innerHTML += Slide;
        document.getElementById(SlideId).innerHTML += Card;


        Slide = "";
        Card = "";
        SlideId++;

    }

}


function imgError(image) {
    image.src = "../img/carrusel/sinimagen.jpg";
}

