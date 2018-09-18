import { KhoaHoc } from "../models/KhoaHoc";
import * as $ from 'jquery';
// import { ThongTinDangNhap } from "../models/ThongTinDangNhap";

export class KhoaHocService {
    constructor(){}
    
    public LayDanhSachKhoaHoc = function(){
        return $.ajax({
            url:"http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc",
            type:"GET",
            dataType:"json"
        });
    }
    //Phương thức Thêm khóa học kết nối với api của backend
    //Đưa dữ liệu từ client lên server thông qua API
    public ThemKhoaHoc = function(khoaHoc){
        return $.ajax({
            url:"http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc",
            type:"POST",
            dataType:"json",
            data: khoaHoc
        });
    }
    //phương thức xóa dựa trên Mã khóa học
    public XoaKhoaHoc = function(MaKhoaHoc){
        return $.ajax({
            url:`http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${MaKhoaHoc}`,
            type:"DELETE",
            async:false//Tắt cơ chế bất đồng bộ
        });
    }
    public CapNhatKhoaHoc = function(MaKhoaHoc, TenKhoaHoc, MoTa, LuotXem, NguoiTao){
        var khoaHoc = {MaKhoaHoc:MaKhoaHoc, TenKhoaHoc:TenKhoaHoc, MoTa:MoTa, LuotXem:LuotXem, NguoiTao:NguoiTao}
        var jsonData = JSON.stringify(khoaHoc);
        return $.ajax({
            url:`http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc`,
            type:"PUT",
            contentType: `application/json`,
            dataType:"json",
            data:jsonData,
        });
    }
}