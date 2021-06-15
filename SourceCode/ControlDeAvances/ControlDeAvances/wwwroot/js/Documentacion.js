

var arrayCellsData = ["Id", "Descripcion", "ActivoBit", "FechaAlta"];
var arrayColumnsTable = ["Descripción", "Activo", "Fecha Alta"];



$(document).ready(async () => {


    $('#CmbFase').val(1).change();

    $('.carousel').carousel({
        interval: false,
    });


    $("#CmbFase").change(async () => {

        var id = document.getElementById("CmbFase").value;
        await GetList("/Documentacion/List/", id);

    });


    $('#carousel-example').on('slide.bs.carousel', function (event) {

        //var idItemCarruselActive = document.querySelector('.carousel-item.active').id
        //var totalItems = $('.carousel').find(".carousel-item").length;
        //var item = $('.carousel').find(".carousel-item.active").index();
        //if (item == 0 || item == "0") { item == 1;}
        //document.getElementById("NumeroDeImagen").innerHTML = item + " de " + totalItems;

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


async function AddComment() {
    var Id = "Comentarios" + document.getElementById("IdRelacion").value;
    var form = await document.getElementById("form");

    var data = await window.add("/Comentarios/Create", form, "", false, "");

    if (data != '0' && !data.toString().includes("Error Al Guardar Comentario")) {
       await AddCommentToHtml(data, Id);
    }

}


async function AddCommentToHtml(data, Id) {

    if (Id != null) {
        var elementHtml = document.getElementById(Id);
        elementHtml.innerHTML = "";
        elementHtml.innerHTML = data;
    }

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

    document.getElementById("carousel-inner").innerHTML = "";

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
            Card += "</div>";

            Card += "<div class='w-100 ml-auto'> <button id='" + data[i]["Id"] + "' class='btn btn-sm btn-info' onclick='window.AbrirFormulario(1); LlenarFormulario(" + data[i]["Id"] + "); ')' > Comentar </button> </div>"

            Card += "<div class='row'>";
            Card += "<div class='col-sm-12'>";
            Card += comentarios;
            Card += "</div>";

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



function LlenarFormulario(id) {
    $("#IdRelacion").val(id);
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

}


function Delete(id) {
    window.DeleteById("/Comentarios/Delete", id);
}




 

