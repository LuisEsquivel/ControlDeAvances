

var arrayCellsData = ["Id", "Descripcion", "ActivoBit", "FechaAlta"];
var arrayColumnsTable = ["Descripción", "Activo", "Fecha Alta"];


//navegadores modernos
document.addEventListener("DOMContentLoaded", async function (event) {
    var data = await window.list("/Roles/List");
    window.Table(arrayColumnsTable, data, arrayCellsData);
});

function GetInfoById(id) {
    window.GetById("/Roles/GetByID", id);
}

async function Add() {
    var form = document.getElementById("form");
    await window.add("/Roles/Add", form, arrayColumnsTable, true, arrayCellsData)
}

function Modal(url) {
    window.AbrirModal(url);
}

function Cerrar() {

    $('#Modal iframe').attr('src', '');
    $("#Modal").modal("hide");
    window.modal_open = false;

}

$(document).keyup(function (e) {
    if (e.which == 27) {

        if (window.maximized == false) {
            window.Cerrar();
        }

        if (window.maximized == true) {
            window.MinimizeModal();
            window.AbrirModal();
        }

    }
});