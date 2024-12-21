"use strict";
//Lấy danh sách thú cưng từ localStorage
let petList = JSON.parse(getFromStorage("phongchieu", "[]"));
//Lấy danh sách Breed từ localStorage

//Lấy các DOM element
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBMIBtn = document.getElementById("calculate-bmi-btn");
const tenphongInput = document.getElementById("input-tenphongchieu");
const marapInput = document.getElementById("input-marap");
const sogheInput = document.getElementById("input-soghe");
const tableBodyEl = document.getElementById("tbody"); //id của thân bảng

if (tableBodyEl) {
  renderTableData(petList); //Hiển thị thông tin bảng mỗi lần tải lại trang
  // renderBreed(breedArr);
}

//Hàm hiển thị danh sách thú cưng lên bảng
function renderTableData(petList) {
  // Xóa toàn bộ nội dung của bảng
  tableBodyEl.innerHTML = "";

  let index = 1
  // Duyệt qua mảng petArr để tạo hàng cho từng thú cưng
  petList.forEach((pet) => {
    console.log('pet', pet);
    
    // Chuyển thuộc tính dateAdded từ chuỗi về đối tượng Date
    pet.dateAdded = new Date(pet.dateAdded);

    const row = document.createElement("tr");
    // Tạo nội dung HTML cho hàng bằng Template String
    row.innerHTML = `
        <th scope="row">${index++}</th>
        <th scope="row">${pet.id}</th>
        <td>${pet.tenphong}</td>
        <td>${pet.marap}</td>
        <td>${pet.soghe}</td>
        <td>${pet.dateAdded.getDate()}/${
      pet.dateAdded.getMonth() + 1
    }/${pet.dateAdded.getFullYear()}</td>
        <td>
        <img src="view.png" data-bs-toggle="modal"
            data-bs-target="#viewModal" type="button" onclick="startEditPet('${
              pet.id
            }')"/>
        <img src="edit.png" data-bs-toggle="modal"
            data-bs-target="#exampleModal" type="button" onclick="startEditPet('${
              pet.id
            }')"/>
        <img src="delete.png" type="button" onclick="deletePet('${
          pet.id
        }')"/>
        </td>
    `;

    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  });
}

//Hàm Xóa các dữ liệu vừa nhập trên Form
const clearInput = () => {
  idInput.value = "";
  thoiluongInput.value = "Select Type";
  // vaccinatedInput.checked = false;
  nameInput.value = "";
  categoryInput.value = "";
  // dewormedInput.checked = false;
  // sterilizedInput.checked = false;

  //Đặt lại trạng thái cho nút Caculate Bmi
  // resetCalculateBMIBtn();

  //Đặt lại trạng thái cho nút Show Healthy Pet
  // resetHealthyBtn();
};

//Hàm edit pet
const startEditPet = (petId) => {
  // Tìm thú cưng trong mảng dựa vào ID
  const pet = petList.find((p) => p.id === petId);

  // Tìm thấy thú cưng, Hiển thị thông tin của nó lên bảng
  if (pet) {
    idInput.value = pet.id; //Cố định phần ID cho input đầu vào, hiển thị thông tin hiện tại của pet
    thoiluongInput.value = pet.thoiluong;
    nameInput.value = pet.name;
    categoryInput.value = pet.category;

    //Xóa class active khỏi form để hiển thị bảng chỉnh sửa
    editForm.classList.remove("active");
  } else {
    console.log("Pet not found!");
  }
};

//Hàm delete pet khỏi mảng, cập nhật lại bảng
const deletePet = (petId) => {
  // Confirm before deleting the pet
  if (confirm("Are you sure?")) {
    // Tìm vị trí của thú cưng trong mảng dựa vào ID
    const petIndex = petList.findIndex((pet) => pet.id === petId);

    // Nếu tìm thấy thú cưng, xóa nó khỏi mảng
    if (petIndex !== -1) {
      petList.splice(petIndex, 1); // Xóa 1 phần tử tại vị trí petIndex
      //Lưu petList xuống LocalStorage
      saveToStorage("phongchieu", JSON.stringify(petList));
      ///
      renderTableData(petList); // Reload lại bảng sau khi xóa
      // resetHealthyBtn();
      // resetCalculateBMIBtn();
    } else {
      console.log("Pet not found!");
    }
  }
};

//Bắt sự kiện Click trên nút "Submit"
if (submitBtn) {
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); //Ngăn chặn form submit mặc định nếu có

    //Lấy dữ liệu từ các input
    const petData = {
      id: idInput.value,
      name: nameInput.value,
      category: categoryInput.value,
      thoiluong: thoiluongInput.value,
      // vaccinated: vaccinatedInput.checked,
      // dewormed: dewormedInput.checked,
      // sterilized: sterilizedInput.checked,
      dateAdded: new Date(),
    };

    //Validate dữ liệu
    const validate = validatePetData(petData);
    console.log(petData); // In ra để kiểm tra dữ liệu đầu vào

    // Thêm thú cưng vào danh sách khi dữ liệu hợp lệ
    if (validate) {
      petList.push(petData);
      //Lưu petList xuống LocalStorage
      saveToStorage("phongchieu", JSON.stringify(petList));
      //Thiết lập lại giao diện web
      clearInput();
      renderTableData(petList);
    }
  });
}

//Hàm tính toán BMI
function calculateBMI(petDataList) {
  if (!showBMI) {
    // Nếu đang ở ko hiển thị BMI thì
    petDataList.forEach((pet) => {
      if (pet.type === "Dog") {
        document.getElementById(`bmi-${pet.id}`).textContent = (
          (pet.weight * 703) /
          pet.length ** 2
        ).toFixed(2);
      }
      if (pet.type === "Cat") {
        document.getElementById(`bmi-${pet.id}`).textContent = (
          (pet.weight * 886) /
          pet.length ** 2
        ).toFixed(2);
      }
    });
    calculateBMIBtn.textContent = "Hide BMI"; // Đổi tên nút
  } else {
    // Nếu đang ở hiển thị BMI thì
    petDataList.forEach((pet) => {
      document.getElementById(`bmi-${pet.id}`).textContent = "?";
    });
    calculateBMIBtn.textContent = "Calculate BMI"; // Đổi tên nút
  }
  showBMI = !showBMI; // Đổi trạng thái showBMI
}

// Bắt sự kiện click vào nút để chuyển đổi giữa hai chế độ
if (calculateBMIBtn) {
  calculateBMIBtn.addEventListener("click", function () {
    if (healthyCheck) {
      const healthyPetList = petList.filter(
        (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
      );
      renderTableData(healthyPetList); // Hiển thị chỉ thú cưng khỏe mạnh
      calculateBMI(healthyPetList);
    } else {
      calculateBMI(petList);
    }
  });
}

/*** ASM 02***/

//Thêm animation khi người dùng click vào navbar

const sidebarEl = document.getElementById("sidebar");
if (sidebarEl) {
  sidebarEl.addEventListener("click", function () {
    sidebarEl.classList.toggle("active");
  });
}

var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
  backdrop: "static",
  keyboard: false, // Ngăn việc đóng modal bằng phím Esc
});

function previewImage(event) {
  console.log('event', event);
  
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgInput.value = e.target.result; // Lưu URL base64 vào imgInput
    };
    reader.readAsDataURL(file);
  }
}