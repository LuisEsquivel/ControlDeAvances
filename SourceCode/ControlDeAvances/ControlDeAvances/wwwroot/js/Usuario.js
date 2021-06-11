
var arrayCellsData = ["Id", "Nombre", "Usuario", "Rol", "ActivoBit", "FechaAlta"];
var arrayColumnsTable = ["Nombre", "Cuenta", "Rol", "Activo", "Fecha Alta"];



//navegadores modernos
document.addEventListener("DOMContentLoaded", async function (event) {

    var data = await window.list("/Usuarios/Listar", arrayColumnsTable, 0, null);
    window.Table(arrayColumnsTable, data, arrayCellsData, true, false); 
    await window.FillDropDown("/Usuarios/FillDropDown", document.getElementById("RolID"), true);

});

function GetInfoById(id) {
    window.GetById("/Usuarios/GetById", id);
}


async function Add() {
    var form = document.getElementById("form");
    await window.add("/Usuarios/Add", form, arrayColumnsTable, false, arrayCellsData)
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

