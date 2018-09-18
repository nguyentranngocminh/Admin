"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
// import 'popper.js';
// import 'font-awesome/css/font-awesome.css';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/css/style.css';
// import '../helpers/notification';
// import './taikhoan';
var NguoiDung_1 = require("../models/NguoiDung");
var DanhSachKhoaHoc_1 = require("../models/DanhSachKhoaHoc");
var DanhSachNguoiDung_1 = require("../models/DanhSachNguoiDung");
var KhoaHocService_1 = require("../services/KhoaHocService");
var NguoiDungService_1 = require("../services/NguoiDungService");
var danhSachKhoaHoc = new DanhSachKhoaHoc_1.DanhSachKhoaHoc();
var khoaHocService = new KhoaHocService_1.KhoaHocService();
var nguoiDungService = new NguoiDungService_1.NguoiDungService();
var danhSachNguoiDung = new DanhSachNguoiDung_1.DanhSachNguoiDung();
nguoiDungService.LayDanhSachNguoiDung().done(function (DSNguoiDung) {
    danhSachNguoiDung.DSNguoiDung = DSNguoiDung;
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
    console.log(LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung));
});
function LoadDanhSachNguoiDung(DSNguoiDung) {
    var noiDungTable = "";
    for (var i = 0; i < DSNguoiDung.length; i++) {
        var nguoiDung = DSNguoiDung[i];
        noiDungTable += "\n            <tr>\n                <td><i class=\"fa fa-asterisk\" id=" + nguoiDung.TaiKhoan + "></i></td>\n                <td class=\"tdHoTen\">" + nguoiDung.HoTen + "</td>\n                <td>" + nguoiDung.MatKhau + "</td>\n                <td>" + nguoiDung.Email + "</td>\n                <td>" + nguoiDung.SoDT + "</td>\n                <td>\n                    <button class=\"btn btn-primary btnEdit\"  MaNguoiDung=\"" + nguoiDung.TaiKhoan + "\" ><i class=\"fa fa-pencil\">Edit</i></button> \n                </td>\n                <td><button class=\"btn btn-danger btnDel\" MaNguoiDung=\"" + nguoiDung.TaiKhoan + "\"><i class=\"fa fa-trash-o\">Delete</i></button> </td>\n                <td>\n            </td>\n            </tr>\n        ";
    }
    $("#tblDanhSachNguoiDung").html(noiDungTable);
}
$("#btnThemNguoiDung").click(function () {
    var title = "Thêm thông tin người dùng";
    var footer = "\n        <button class=\"btn btn-success\" id=\"btnAdd\">Add</button>\n        <button class=\"btn btn-success\" id=\"btnClose\">Close</button>\n    ";
    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
    $(".delText").val("");
    ThongBao();
});
$("body").delegate("#btnAdd", "click", function () {
    var tk = $("#TaiKhoan").val();
    var ht = $("#HoTen").val();
    var mk = $("#MatKhau").val();
    var email = $("#Email").val();
    var sdt = $("#SoDienThoai").val();
    var maLoaiNguoiDung = $('#LoaiNguoiDung').val();
    var tenLoaiNguoiDung = $('#LoaiNguoiDung option:selected').text();
    //Lấy giá trị mô tả
    var nguoiDung = new NguoiDung_1.NguoiDung(tk, mk, ht, email, sdt, maLoaiNguoiDung, tenLoaiNguoiDung);
    danhSachNguoiDung.ThemNguoiDung(nguoiDung);
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
    $(".delText").val("");
    ThongBao();
});
$("body").delegate("#btnClose", "click", function () {
    $(".close").trigger("click");
});
$("body").delegate(".btnDel", "click", function () {
    var MaND = $(this).attr("MaNguoiDung");
    danhSachNguoiDung.XoaNguoiDung(MaND);
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
});
$("body").delegate(".btnEdit", "click", function () {
    var title = "Sửa thông tin người dùng";
    var footer = "\n    <button class=\"btn btn-success\" id=\"btnSave\">Save</button>\n    <button class=\"btn btn-success\" id=\"btnClose\">Close</button>\n    ";
    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
    var MaND = $(this).attr("MaNguoiDung");
    var nguoiDung = danhSachNguoiDung.LayNguoiDung(MaND);
    $("#TaiKhoan").val(nguoiDung.TaiKhoan);
    $("#HoTen").val(nguoiDung.HoTen);
    $("#MatKhau").val(nguoiDung.MatKhau);
    $("#Email").val(nguoiDung.Email);
    $("#SoDienThoai").val(nguoiDung.SoDT);
    $('#LoaiNguoiDung').val(nguoiDung.MaLoaiNguoiDung);
    $('#LoaiNguoiDung option:selected').text(nguoiDung.TenLoaiNguoiDung);
    $("#TaiKhoan").attr("readonly", "true");
    $("#btnOpenPopupNguoiDung").trigger("click");
});
$("body").delegate("#btnSave", "click", function () {
    var tk = $("#TaiKhoan").val();
    var ht = $("#HoTen").val();
    var mk = $("#MatKhau").val();
    var email = $("#Email").val();
    var sdt = $("#SoDienThoai").val();
    var maLoaiNguoiDung = $('#LoaiNguoiDung').val();
    var tenLoaiNguoiDung = $('#LoaiNguoiDung option:selected').text();
    //Lấy giá trị mô tả
    var nguoiDung = new NguoiDung_1.NguoiDung(tk, mk, ht, email, sdt, maLoaiNguoiDung, tenLoaiNguoiDung);
    danhSachNguoiDung.SuaNguoiDung(nguoiDung);
    LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
    $(".delText").val("");
    $("#TaiKhoan").removeAttr("readonly");
    ThongBao();
});
function ThongBao() {
    // swal("Good job!", "You clicked the button!", "success");
}
$("#btnTimKiemNguoiDung").click(TimKiemNguoiDung);
$("#txtTuKhoa").keyup(TimKiemNguoiDung);
function TimKiemNguoiDung() {
    var tukhoa = $("#txtTuKhoa").val();
    //Tọa đối tượng dsNguoiDung chứa kq tìm kiếm
    var nguoiDung = danhSachNguoiDung.TimKiemNguoiDung(tukhoa);
    LoadDanhSachNguoiDung(nguoiDung);
    HighLight(tukhoa);
}
// LayStorage();
function HighLight(tukhoa) {
    $(".tdHoTen").each(function () {
        var noiDungHTML = $(this).html();
        var doDai = noiDungHTML.lenght;
        //kt trong noi dung html co tu khoa hay khong
        if (noiDungHTML.indexOf(tukhoa) !== -1) {
            var viTriTuKhoa = noiDungHTML.indexOf(tukhoa);
            var kqMoi = noiDungHTML.substring(0, viTriTuKhoa) + "<span class=\"text-success\">" + tukhoa + "</span>" + noiDungHTML.substring(viTriTuKhoa + tukhoa.length);
            $(this).html(kqMoi);
        }
    });
}
//# sourceMappingURL=nguoidung(hocvien).js.map