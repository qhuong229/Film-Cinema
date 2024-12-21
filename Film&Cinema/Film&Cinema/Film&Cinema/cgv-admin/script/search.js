"use strict";

const tableBodyEl = document.getElementById("tbody"); // thân bảng
const table01 = document.getElementById("table-1"); // cả bảng
const findPetBtn = document.getElementById("find-btn");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");

//Lấy dữ liệu mảng Pet
let petList = JSON.parse(getFromStorage("petList", "[]"));

//Lấy dữ liệu mảng breed
let breedArr = JSON.parse(getFromStorage("breedArr", "[]"));

//Hiển thị các option breed
renderBreed(breedArr);

//Tạo
findPetBtn.addEventListener("click", findPets);

//Tạo hàm callback findPets() để thêm vào addEventListener của nút find
function findPets() {
  // Lấy giá trị từ form
  const idInputV = document.getElementById("input-id").value;
  const nameInputV = document.getElementById("input-name").value;
  const typeInputV = typeInput.value;
  const breedInputV = breedInput.value;
  const vaccinatedInputV = document.getElementById("input-vaccinated").checked;
  const dewormedInputV = document.getElementById("input-dewormed").checked;
  const sterilizedInputV = document.getElementById("input-sterilized").checked;

  //Lọc danh sách thú cưng theo các điều kiện
  const filteredPets = petList.filter(function (pet) {
    // Kiểm tra từng điều kiện: nếu trường không được nhập, coi như nó thỏa mãn luôn
    const matchesID = idInputV === "" || pet.id.includes(idInputV);

    const matchesName = nameInputV === "" || pet.name.includes(nameInputV);

    const matchesType =
      typeInputV === ("" || "Select Type") || pet.type.includes(typeInputV);
    console.log(typeInputV);
    console.log(pet.type.includes(typeInputV));

    const matchesBreed =
      breedInputV === ("" || "Select Breed") || pet.breed.includes(breedInputV);
    console.log(breedInputV);
    const matchesVaccinated = !vaccinatedInputV || pet.vaccinated;
    const matchesDewormed = !dewormedInputV || pet.dewormed;
    const matchesSterilized = !sterilizedInputV || pet.sterilized;

    //Trả về thú cưng thỏa mãn tất cả điều kiện
    return (
      matchesID &&
      matchesName &&
      matchesType &&
      matchesBreed &&
      matchesVaccinated &&
      matchesDewormed &&
      matchesSterilized
    );
  });
  // Gọi hàm renderTableData để hiển thị danh sách thú cưng đã lọc
  if (filteredPets.length !== 0) {
    renderTableData(filteredPets);
  } else {
    alert("Pet not found");
  }
}

//Hàm hiển thị danh sách thú cưng lên bảng
function renderTableData(petList) {
  //Hiển thị lại phần bảng
  table01.classList.remove("active");
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
    `;

    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  });
}

//Hàm renderBreed sẽ nhận danh sách Breed cần hiển thị và tạo các thẻ <option> để đưa vào select cho người dùng chọn
function renderBreed(breedArr) {
  // Xóa nội dung của phần chọn breed trước khi thêm mới
  breedInput.innerHTML = "";

  //Tạo tùy chọn mặc định "Select Breed"
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select Breed";
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

//Thêm animation khi người dùng click vào navbar

const sidebarEl = document.getElementById("sidebar");
if (sidebarEl) {
  sidebarEl.addEventListener("click", function () {
    sidebarEl.classList.toggle("active");
  });
}
