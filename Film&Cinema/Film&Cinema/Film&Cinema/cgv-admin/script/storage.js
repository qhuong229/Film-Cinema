// LocalStorage - API giúp lưu trữ các dữ liệu (dạng String hoặc Number) theo cấu trúc Key-Value xuống dưới bộ nhớ của trình duyệt
//Hàm lưu dữ liệu xuống LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//Hàm lấy dữ liệu từ LocalStorage theo key tương ứng
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal; //toán tử gán giá trị mặc định
}
