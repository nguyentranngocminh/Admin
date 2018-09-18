"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
// import { ThongTinDangNhap } from "../models/ThongTinDangNhap";
var NguoiDungService = /** @class */ (function () {
    function NguoiDungService() {
    }
    NguoiDungService.prototype.DangKy = function (nguoiDung) {
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy",
            type: "POST",
            dataType: "JSON",
            data: nguoiDung
        });
    };
    // public DangNhap(taiKhoan: ThongTinDangNhap){
    //     return $.ajax({
    //         url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${taiKhoan.TaiKhoan}&matkhau=${taiKhoan.MatKhau}`,
    //         type: "GET",
    //         dataType: "JSON"
    //     });
    // }
    NguoiDungService.prototype.LayDanhSachNguoiDung = function () {
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET",
            dataType: "JSON"
        });
    };
    NguoiDungService.prototype.XoaNguoiDung = function (taiKhoan) {
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/" + taiKhoan,
            type: "DELETE",
            dataType: "JSON"
        });
    };
    return NguoiDungService;
}());
exports.NguoiDungService = NguoiDungService;
//# sourceMappingURL=NguoiDungService.js.map