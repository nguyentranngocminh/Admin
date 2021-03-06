"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var CKEDITOR = require("CKEDITOR");
var KhoaHoc_1 = require("../models/KhoaHoc");
var DanhSachKhoaHoc_1 = require("../models/DanhSachKhoaHoc");
var DanhSachNguoiDung_1 = require("../models/DanhSachNguoiDung");
var KhoaHocService_1 = require("../services/KhoaHocService");
var NguoiDungService_1 = require("../services/NguoiDungService");
var danhSachKhoaHoc = new DanhSachKhoaHoc_1.DanhSachKhoaHoc();
var khoaHocService = new KhoaHocService_1.KhoaHocService();
var nguoiDungService = new NguoiDungService_1.NguoiDungService();
var danhSachNguoiDung = new DanhSachNguoiDung_1.DanhSachNguoiDung();
//Gọi phương thức lấy danh sách khóa học từ api
khoaHocService.LayDanhSachKhoaHoc().done(function (DSKH) {
    danhSachKhoaHoc.DSKhoaHoc = DSKH;
    LoadDanhSachKhoaHoc(danhSachKhoaHoc.DSKhoaHoc);
    LoadDanhSachGiaoVien();
});
function LoadDanhSachGiaoVien() {
    var dsgv = new NguoiDungService_1.NguoiDungService();
    dsgv.LayDanhSachNguoiDung().done(function (DSNguoiDung) {
        danhSachNguoiDung.DSNguoiDung = DSNguoiDung;
        LayThongTinGiaoVien(danhSachNguoiDung.DSNguoiDung);
    });
}
function LayThongTinGiaoVien(DSNguoiDung) {
    var noiDungSelect = "";
    for (var i = 0; i < DSNguoiDung.length; i++) {
        var nd = DSNguoiDung[i];
        if (nd.MaLoaiNguoiDung === "GV") {
            noiDungSelect += "\n            <option value='" + nd.TaiKhoan + "'>" + nd.HoTen + "</option>\n            ";
        }
    }
    $("#NguoiTao").html(noiDungSelect);
}
function LoadDanhSachKhoaHoc(DSKH) {
    var noiDungTable = "";
    for (var i = 0; i < DSKH.length; i++) {
        var khoaHoc = DSKH[i];
        noiDungTable += "\n            <tr>\n                <td><input type=\"checkbox\" class=\"ckbMaKhoaHoc\" value=\"" + khoaHoc.MaKhoaHoc + "\"/></td>\n                <td>" + khoaHoc.TenKhoaHoc + "</td>\n                <td><img src='" + khoaHoc.HinhAnh + "'style=\"width:100px; height:150px\"/></td>\n                <td>" + khoaHoc.LuotXem + "</td>\n                <td>" + khoaHoc.NguoiTao + "</td>\n                <td>\n                    <button class=\"btn btn-primary btnEdit\"  MaKhoaHoc=\"" + khoaHoc.MaKhoaHoc + "\" ><i class=\"fa fa-pencil\">Edit</i></button> \n                </td>\n                <td><button class=\"btn btn-danger btnDel\" MaKhoaHoc=\"" + khoaHoc.MaKhoaHoc + "\"><i class=\"fa fa-trash-o\">Delete</i></button> </td>\n                <td>\n            </td>\n            </tr>\n        ";
        // <th>${khoaHoc.MoTa}</th>
    }
    $("#tblDanhSachKhoaHoc").html(noiDungTable);
}
$("body").delegate(".btnDel", "click", function () {
    var makh = $(this).attr("MaKhoaHoc");
    danhSachKhoaHoc.XoaKhoaHoc(makh);
    LoadDanhSachKhoaHoc(danhSachKhoaHoc.DSKhoaHoc);
});
CKEDITOR.replace("MoTa");
$("body").delegate(".btnEdit", "click", function () {
    var btnEdit = $(this);
    var title = "Chỉnh sửa thông tin khóa học";
    var KhoaHoc = danhSachKhoaHoc.LayKhoaHoc(btnEdit.attr("MaKhoaHoc"));
    console.log("MoTa", KhoaHoc.MoTa);
    var footer = "\n        <button class=\"btn btn-success\" id=\"btnSave\">Save</button>\n        <button class=\"btn btn-success\" id=\"btnClose\">Close</button>\n    ";
    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
    $("#MaKhoaHoc").val(KhoaHoc.MaKhoaHoc);
    $("#MaKhoaHoc").attr("readonly", "true");
    $("#TenKhoaHoc").val(KhoaHoc.TenKhoaHoc);
    CKEDITOR.instances["MoTa"].setData(KhoaHoc.MoTa);
    $("#LuotXem").val(KhoaHoc.LuotXem);
    $("#NguoiTao").val(KhoaHoc.NguoiTao);
    $("#btnOpenPopup").trigger("click");
});
$("body").delegate("#btnClose", "click", function () {
    $(".close").trigger("click");
});
$("body").delegate("#btnSave", "click", function () {
    var MaKH = document.getElementById("MaKhoaHoc").value;
    var TenKH = $("#TenKhoaHoc").val();
    var HinhAnh = "";
    var MoTa = CKEDITOR.instances["MoTa"].getData();
    var LuotXem = $("#LuotXem").val();
    var NguoiTao = $("#NguoiTao").val();
    var khoaHoc = new KhoaHoc_1.KhoaHoc(MaKH, TenKH, MoTa, HinhAnh, LuotXem, NguoiTao);
    danhSachKhoaHoc.SuaKhoaHoc(khoaHoc);
    LoadDanhSachKhoaHoc(danhSachKhoaHoc.DSKhoaHoc);
    $("#MaKhoaHoc").removeAttr("readonly");
});
$("#btnThemKhoaHoc").click(function () {
    var title = "Thêm thông tin khóa học";
    var footer = "\n        <button class=\"btn btn-success\" id=\"btnAdd\">Add</button>\n        <button class=\"btn btn-success\" id=\"btnClose\">Close</button>\n    ";
    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
    $(".delText").val("");
});
$("body").delegate("#btnAdd", "click", function () {
    var MaKhoaHoc = $("#MaKhoaHoc").val();
    var TenKhoaHoc = $("#TenKhoaHoc").val();
    var LuotXem = $("#LuotXem").val();
    var NguoiTao = $("#NguoiTao").val();
    //Lấy giá trị mô tả
    // var MoTa = CKEDITOR.instances["MoTa"].getData();
    var khoaHoc = new KhoaHoc_1.KhoaHoc(MaKhoaHoc, TenKhoaHoc, "", "", LuotXem, NguoiTao);
    danhSachKhoaHoc.ThemKhoaHoc(khoaHoc);
    LoadDanhSachKhoaHoc(danhSachKhoaHoc.DSKhoaHoc);
    $(".delText").val("");
});
// nguoiDungService.LayDanhSachNguoiDung().done(function(DSNguoiDung){
//     danhSachNguoiDung.DSNguoiDung = DSNguoiDung;
//     LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
//     console.log(LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung));
// });
// function LoadDanhSachNguoiDung(DSNguoiDung){
//     var noiDungTable ="";
//     for (var i=0; i<DSNguoiDung.length; i++){
//         var nguoiDung = DSNguoiDung[i];
//         noiDungTable+=`
//             <tr>
//                 <td><i class="fa fa-asterisk" id=${nguoiDung.TaiKhoan}></i></td>
//                 <td class="tdHoTen">${nguoiDung.HoTen}</td>
//                 <td>${nguoiDung.MatKhau}</td>
//                 <td>${nguoiDung.Email}</td>
//                 <td>${nguoiDung.SoDT}</td>
//                 <td>
//                     <button class="btn btn-primary btnEdit"  MaNguoiDung="${nguoiDung.TaiKhoan}" ><i class="fa fa-pencil">Edit</i></button> 
//                 </td>
//                 <td><button class="btn btn-danger btnDel" MaNguoiDung="${nguoiDung.TaiKhoan}"><i class="fa fa-trash-o">Delete</i></button> </td>
//                 <td>
//             </td>
//             </tr>
//         `;
//     }
//     $("#tblDanhSachNguoiDung").html(noiDungTable);
// }
// $("#btnThemNguoiDung").click(function(){
//     var title ="Thêm thông tin người dùng";
//     var footer =`
//         <button class="btn btn-success" id="btnAdd">Add</button>
//         <button class="btn btn-success" id="btnClose">Close</button>
//     `;
//     $(".modal-title").html(title);
//     $(".modal-footer").html(footer);
//     $(".delText").val("");
//     ThongBao();
// });
// $("body").delegate("#btnAdd","click", function(){
//     var tk = $("#TaiKhoan").val();
//     var ht = $("#HoTen").val();
//     var mk = $("#MatKhau").val();
//     var email = $("#Email").val();
//     var sdt = $("#SoDienThoai").val();
//     var maLoaiNguoiDung = $('#LoaiNguoiDung').val();
//     var tenLoaiNguoiDung = $('#LoaiNguoiDung option:selected').text();
//     //Lấy giá trị mô tả
//     var nguoiDung = new NguoiDung(tk, mk, ht, email, sdt, maLoaiNguoiDung,tenLoaiNguoiDung);
//     danhSachNguoiDung.ThemNguoiDung(nguoiDung); 
//     LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
//     $(".delText").val("");
//     ThongBao();
// });
// $("body").delegate("#btnClose","click", function(){
//     $(".close").trigger("click");
// });
// $("body").delegate(".btnDel", "click", function(){
//     var MaND= $(this).attr("MaNguoiDung");
//     danhSachNguoiDung.XoaNguoiDung(MaND);
//     LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
// });
// $("body").delegate(".btnEdit", "click", function(){
//     var title="Sửa thông tin người dùng";
//     var footer =`
//     <button class="btn btn-success" id="btnSave">Save</button>
//     <button class="btn btn-success" id="btnClose">Close</button>
//     `;
//     $(".modal-title").html(title);
//     $(".modal-footer").html(footer);
//     var MaND= $(this).attr("MaNguoiDung");
//     var nguoiDung = danhSachNguoiDung.LayNguoiDung(MaND);
//     $("#TaiKhoan").val(nguoiDung.TaiKhoan);
//     $("#HoTen").val(nguoiDung.HoTen);
//     $("#MatKhau").val(nguoiDung.MatKhau);
//     $("#Email").val(nguoiDung.Email);
//     $("#SoDienThoai").val(nguoiDung.SoDT);
//     $('#LoaiNguoiDung').val(nguoiDung.MaLoaiNguoiDung);
//     $('#LoaiNguoiDung option:selected').text(nguoiDung.TenLoaiNguoiDung);
//     $("#TaiKhoan").attr("readonly","true");
//     $("#btnOpenPopupNguoiDung").trigger("click");
// });
// $("body").delegate("#btnSave", "click", function(){
//     var tk = $("#TaiKhoan").val();
//     var ht = $("#HoTen").val();
//     var mk = $("#MatKhau").val();
//     var email = $("#Email").val();
//     var sdt = $("#SoDienThoai").val();
//     var maLoaiNguoiDung = $('#LoaiNguoiDung').val();
//     var tenLoaiNguoiDung = $('#LoaiNguoiDung option:selected').text();
//     //Lấy giá trị mô tả
//     var nguoiDung = new NguoiDung(tk, mk, ht, email, sdt, maLoaiNguoiDung,tenLoaiNguoiDung);
//     danhSachNguoiDung.SuaNguoiDung(nguoiDung);
//     LoadDanhSachNguoiDung(danhSachNguoiDung.DSNguoiDung);
//     $(".delText").val("");
//     $("#TaiKhoan").removeAttr("readonly");
//     ThongBao();
// });
// function ThongBao(){
// 	// swal("Good job!", "You clicked the button!", "success");
// }
// $("#btnTimKiemNguoiDung").click(TimKiemNguoiDung);
//     $("#txtTuKhoa").keyup(TimKiemNguoiDung);
//     function TimKiemNguoiDung(){
//         var tukhoa = $("#txtTuKhoa").val();
//         //Tọa đối tượng dsNguoiDung chứa kq tìm kiếm
//         var nguoiDung = danhSachNguoiDung.TimKiemNguoiDung(tukhoa);
//         LoadDanhSachNguoiDung(nguoiDung);
//         HighLight(tukhoa);
//     }
//     // LayStorage();
//     function HighLight(tukhoa){
//         $(".tdHoTen").each(function(){
//             var noiDungHTML = $(this).html();
//             var doDai = noiDungHTML.lenght;
//             //kt trong noi dung html co tu khoa hay khong
//             if(noiDungHTML.indexOf(tukhoa)!==-1){
//                 var viTriTuKhoa = noiDungHTML.indexOf(tukhoa);
//                 var kqMoi =`${ noiDungHTML.substring(0, viTriTuKhoa)}<span class="text-success">${tukhoa}</span>${noiDungHTML.substring(viTriTuKhoa+tukhoa.length)}`;
//                 $(this).html(kqMoi);
//             }
//         });
//     }
//# sourceMappingURL=index.js.map