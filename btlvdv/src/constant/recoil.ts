import { atom ,useSetRecoilState } from 'recoil';
export const cartState = atom({
  key: 'cartState',
  default: [],
});
export const ThongTinKhachHang = atom({
  key: 'ThongTinKhachHang',
  default: {tenKH:"Lỗi"},
});
export const categoryState = atom({
  key: 'categoryState',
  default: { maChuyenMuc: null, tenChuyenMuc: null },
});
export const dataSearch = atom({
  key: 'dataSearch',
  default: [],
});
export const thongtinTK = atom({
  key: 'thongtinTK',
  default: {mataikhoan:null,
    taikhoan:null,
    matkhau:null,
  }
    
});

export const useSetThongTinTK = () => {
  return useSetRecoilState(thongtinTK);
};