"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DanhSachNguoiDung = /** @class */ (function () {
    function DanhSachNguoiDung() {
        this.DSNguoiDung = [];
    }
    DanhSachNguoiDung.prototype.ThemNguoiDung = function (nguoiDung) {
        this.DSNguoiDung.push(nguoiDung);
    };
    DanhSachNguoiDung.prototype.SuaNguoiDung = function (nguoiDung) {
        var entity = this.LayNguoiDung(nguoiDung.TaiKhoan);
        if (entity) {
            entity.MatKhau = nguoiDung.MatKhau;
            entity.HoTen = nguoiDung.HoTen;
            entity.Email = nguoiDung.Email;
            entity.SoDT = nguoiDung.SoDT;
            entity.MaLoaiNguoiDung = nguoiDung.MaLoaiNguoiDung;
        }
    };
    DanhSachNguoiDung.prototype.LayNguoiDung = function (taiKhoan) {
        for (var _i = 0, _a = this.DSNguoiDung; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.TaiKhoan === taiKhoan) {
                return item;
            }
        }
    };
    DanhSachNguoiDung.prototype.XoaNguoiDung = function (taiKhoan) {
        this.DSNguoiDung = this.DSNguoiDung.filter(function (x) { return x.TaiKhoan !== taiKhoan; });
    };
    DanhSachNguoiDung.prototype.TimKiemNguoiDung = function (tuKhoa) {
        if (!tuKhoa)
            return this.DSNguoiDung;
        return this.DSNguoiDung.filter(function (x) {
            return x.TaiKhoan.trim().toLocaleLowerCase().indexOf(tuKhoa.trim().toLowerCase()) > -1 ||
                x.Email.trim().toLowerCase().indexOf(tuKhoa.trim().toLowerCase()) > -1 ||
                x.HoTen.trim().toLowerCase().indexOf(tuKhoa.trim().toLowerCase()) > -1;
        });
    };
    return DanhSachNguoiDung;
}());
exports.DanhSachNguoiDung = DanhSachNguoiDung;
//# sourceMappingURL=DanhSachNguoiDung.js.map