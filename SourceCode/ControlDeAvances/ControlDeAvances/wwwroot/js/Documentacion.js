

var arrayCellsData = ["Id", "Descripcion", "ActivoBit", "FechaAlta"];
var arrayColumnsTable = ["Descripción", "Activo", "Fecha Alta"];



$(document).ready(async () => {

    //$('.carousel').carousel({
    //    interval: 10000,
    //});


    $("#CmbFase").change(async () => {

        var id = document.getElementById("CmbFase").value;
        await GetList("/Documentacion/List/", id);

    });

    //$('#carousel-example').on('slide.bs.carousel', function (event) {
    //    var idItemCarruselActive = document.querySelector('.carousel-item.active').id

    //    document.getElementById("ComentaiosId").innerHTML = idItemCarruselActive;

    //});

    $("#img").on("click", () => {
        alert("CALABAZO");
        window.ZoomIn();
    });


    $('.carousel .carousel-item').each(function () {
        var minPerSlide = 3;
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < minPerSlide; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
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

        var SlideId = data[i]["Id"];

        if ($("#" + SlideId).length == 0) {


            if (length == 1) {

                Slide += "<div class='carousel-item active' id='" + SlideId + "'>";

                Slide += "</div>";
            }


            else if (length > 1) {

                Slide += "<div class='carousel-item' id='" + SlideId + "'>";

                Slide += "</div>";

            }


            var imagen = data[i]["RutaImagen"].toString().replace("~", "..");
            var descripcion = data[i]["Descripcion"];
            var comentarios = data[i]["Comentarios"];


            Card += "<div class='card-rounded'>"; // start card

            Card += "<div id='img' class='card-img'>"
            Card += "<img onclick='ZoomImage(this.src, this.alt);' class='card-img-top img-fluid' onerror='imgError(this);' src='" + imagen + "'  style='cursor:pointer;'>";
            Card += "</div>";

            //Card += "<div class='card-body'>"; // start card body
            //Card += "</div>"; // end card body

            Card += "<div class='card-footer text-center'>"; //start card footer
            Card += "<div class='row'>";
            Card += "<a class='card-title  col-sm-12' >" + descripcion + "</a>";

            //Card += "<div class='ml-auto'> <button id='" + data[i]["Id"] + "' class='btn btn-sm btn-info'> Comentar </button> </div>"
            //Card += "<div class='mt-5'>";
            //Card += comentarios;
            //Card += "</div>";
            //Card += "</div>";



            Card += "</div>"; // end card footer

            Card += "</div>"; // end card

            length++;



            document.getElementById("carousel-inner").innerHTML += Slide;
            document.getElementById(SlideId).innerHTML += Card;


            Slide = "";
            Card = "";
            //SlideId++;

        }//end if exist

    }//end for

}


function imgError(image) {
    image.src = "../img/carrusel/sinimagen.jpg";
}




async function GetComments(url, id) {

    var parameters = {
        "id": id,
    };


    await $.ajax({
        method: "POST",
        url: url,
        data: parameters, /*parámetros enviados al controlador*/
        dataType: "json",


        success: function (data) {

        },
        error: function () {
            console.log("No se ha podido obtener la información");
            swal(NoSePudoObtenerLaInformacion, "", "warning");
        }
    });



    function AddComment(data) {

    }


 

}