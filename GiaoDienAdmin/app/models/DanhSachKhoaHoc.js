"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DanhSachKhoaHoc = /** @class */ (function () {
    function DanhSachKhoaHoc() {
        this.DSKhoaHoc = [];
    }
    DanhSachKhoaHoc.prototype.ThemKhoaHoc = function (khoaHoc) {
        this.DSKhoaHoc.push(khoaHoc);
    };
    DanhSachKhoaHoc.prototype.SuaKhoaHoc = function (khoaHoc) {
        var entity = this.LayKhoaHoc(khoaHoc.MaKhoaHoc);
        if (entity) {
            entity.TenKhoaHoc = khoaHoc.TenKhoaHoc;
            entity.MoTa = khoaHoc.MoTa;
            entity.LuotXem = khoaHoc.LuotXem;
            entity.HinhAnh = khoaHoc.HinhAnh;
            entity.NguoiTao = khoaHoc.NguoiTao;
        }
    };
    DanhSachKhoaHoc.prototype.LayKhoaHoc = function (maKH) {
        for (var _i = 0, _a = this.DSKhoaHoc; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.MaKhoaHoc === maKH) {
                return item;
            }
        }
    };
    DanhSachKhoaHoc.prototype.XoaKhoaHoc = function (maKH) {
        this.DSKhoaHoc = this.DSKhoaHoc.filter(function (x) { return x.MaKhoaHoc !== maKH; });
    };
    DanhSachKhoaHoc.prototype.TimKiemKhoaHoc = function (tuKhoa) {
        if (!tuKhoa)
            return this.DSKhoaHoc;
        return this.DSKhoaHoc.filter(function (x) { return x.TenKhoaHoc.trim().toLowerCase().indexOf(tuKhoa.trim().toLowerCase()) > -1 ||
            x.MoTa.trim().toLowerCase().indexOf(tuKhoa.trim().toLowerCase()) > -1; });
    };
    return DanhSachKhoaHoc;
}());
exports.DanhSachKhoaHoc = DanhSachKhoaHoc;
//# sourceMappingURL=DanhSachKhoaHoc.js.map