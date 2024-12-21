"use strict";

//Lấy các DOM element
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const editForm = document.getElementById("edit-form");

const tableBodyEl = document.getElementById("tbody"); //id của thân bảng

//Lấy danh sách thú cưng từ localStorage
let petList = JSON.parse(getFromStorage("petList", "[]"));
//Lấy danh sách breed
let breedArr = JSON.parse(getFromStorage("breedArr", "[]"));

//Hiển thị danh sách thú cưng lên bảng
renderTableEditPet(petList);

//Hàm hiển thị danh sách thú cưng lên bảng
function renderTableEditPet(petList) {
  // Xóa toàn bộ nội dung của bảng
  tableBodyEl.innerHTML = "";

  // Duyệt qua mảng petArr để tạo hàng cho từng thú cưng
  petList.forEach((pet) => {
    // Chuyển thuộc tính dateAdded từ chuỗi về đối tượng Date
    pet.dateAdded = new Date(pet.dateAdded);

    const row = document.createElement("tr");

    // Tạo nội dung HTML cho hàng bằng Template String
    row.innerHTML = `
        <th scope="row">${pet.id}</th>
				<td>${pet.name}</td>
				<td>${pet.age}</td>
				<td>${pet.type}</td>
				<td>${pet.weight} kg</td>
				<td>${pet.length} cm</td>
				<td>${pet.breed}</td>
				<td>
						<i class="bi bi-square-fill" style="color: ${pet.color}"></i>
				</td>
        <td><i class= "${
          pet.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td><i class= "${
          pet.dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td><i class= "${
          pet.sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
				<td>${pet.dateAdded.getDate()}/${
      pet.dateAdded.getMonth() + 1
    }/${pet.dateAdded.getFullYear()}</td>
				<td><button type="button" class="btn btn-warning" onclick="startEditPet('${
          pet.id
        }')">Edit</button>
				</td>
    `;

    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  });
}

//Hàm edit pet
const startEditPet = (petId) => {
  // Tìm thú cưng trong mảng dựa vào ID
  const pet = petList.find((p) => p.id === petId);

  // Tìm thấy thú cưng, Hiển thị thông tin của nó lên bảng
  if (pet) {
    idInput.value = pet.id; //Cố định phần ID cho input đầu vào, hiển thị thông tin hiện tại của pet
    typeInput.value = pet.type;
    vaccinatedInput.checked = pet.vaccinated;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    weightInput.value = pet.weight;
    lengthInput.value = pet.length;
    colorInput.value = pet.color;
    renderBreed(breedArr);
    breedInput.value = pet.breed;
    dewormedInput.checked = pet.dewormed;
    sterilizedInput.checked = pet.sterilized;

    //Xóa class active khỏi form để hiển thị bảng chỉnh sửa
    editForm.classList.remove("active");
  } else {
    console.log("Pet not found!");
  }
};

//Tạo eventListener cho submit edit
submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); //Ngăn chặn form submit mặc định nếu có

  const petId = idInput.value;
  // Tìm thú cưng trong mảng dựa vào ID
  const pet = petList.find((p) => p.id === petId);

  //Cập nhật lại dữ liệu đã nhập từ các input
  pet.name = nameInput.value;
  pet.age = ageInput.value;
  pet.type = typeInput.value;
  pet.weight = weightInput.value;
  pet.length = lengthInput.value;
  pet.color = colorInput.value;
  pet.breed = breedInput.value;
  pet.vaccinated = vaccinatedInput.checked;
  pet.dewormed = dewormedInput.checked;
  pet.sterilized = sterilizedInput.checked;

  //Validate dữ liệu
  const validate = validateEditPetData(pet);

  // Thêm thú cưng vào danh sách khi dữ liệu hợp lệ
  if (validate) {
    //Lưu petList xuống LocalStorage
    saveToStorage("petList", JSON.stringify(petList));
    //Thiết lập lại giao diện web
    editForm.classList.add("active");
    renderTableEditPet(petList);
  }
});

//Hàm renderBreed sẽ nhận danh sách Breed cần hiển thị và tạo các thẻ <option> để đưa vào select cho người dùng chọn
function renderBreed(breedArr) {
  // Xóa nội dung của phần chọn breed trước khi thêm mới
  breedInput.innerHTML = "";

  //Tạo tùy chọn mặc định "Select Breed"
  const defaultOption = document.createElement("option");
  defaultOption.value = "Select Breed";
  breedInput.appendChild(defaultOption);

  //Duyệt qua mảng breedArr VÀ tạo các thẻ option cho mỗi breed
  breedArr.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.breed;
    option.textContent = breed.breed;
    breedInput.appendChild(option);
  });
}

//Bắt sự kiện thay đổi trên type Input
typeInput.addEventListener("change", function () {
  //Lấy loại người dùng chọn
  const selectedType = typeInput.value;

  //Lọc các breed theo loại đã chọn
  const filteredBreeds = breedArr.filter(
    (breed) => breed.type === selectedType
  );

  //Gọi hàm renderBreed ĐỂ cập nhật danh sách theo loại
  if (filteredBreeds.length === 0) {
    renderBreed(breedArr);
  } else {
    renderBreed(filteredBreeds);
  }
});

//Hàm validate pet data
const validateEditPetData = function (data) {
  //Kiểm tra dữ liệu không được bỏ trống
  if (
    !data.id ||
    !data.name ||
    !data.age ||
    !data.type ||
    !data.weight ||
    !data.length ||
    !data.color ||
    !data.breed
  ) {
    alert("All fields are required!");
    return false;
  }

  //Kiểm tra age trong khoảng 1-15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  //Kiểm tra weight trong khoảng 1-15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  //Kiểm tra length trong khoảng 1-100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  //Kiểm tra trường Type phải được chọn
  if (data.type === "Select Type" || data.type === "") {
    alert("Please select Type!");
    return false;
  }

  //Kiểm tra trường Breed phải được chọn
  if (data.breed === "Select Breed" || data.breed === "") {
    alert("Please select Breed!");
    return false;
  }

  return true;
};

//Thêm animation khi người dùng click vào navbar

const sidebarEl = document.getElementById("sidebar");
if (sidebarEl) {
  sidebarEl.addEventListener("click", function () {
    sidebarEl.classList.toggle("active");
  });
}
