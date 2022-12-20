var selectedRow = null;

//  show alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 5000);
}
// clear all fields(поле)
function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#phone").value = "";
}
// Add data
document.querySelector("#person-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // get form value
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const phone = document.querySelector("#phone").value;

  //   потвреждение
  if (firstName == "" || lastName == "" || phone == "") {
    showAlert("Заполните все необходимые поля!", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#person-list");
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${phone}</td>
      <td>
      <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
      <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Вы добавлены!", "success");
    } else {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = phone;
      selectedRow = null;
      showAlert("Edited!", "info");
    }
    clearFields();
  }
});
// edit data
document.querySelector("#person-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstName").value =
      selectedRow.children[0].textContent;
    document.querySelector("#lastName").value =
      selectedRow.children[1].textContent;
    document.querySelector("#phone").value =
      selectedRow.children[2].textContent;
  }
});
// delete button
document.querySelector("#person-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Ваши данные удалены!", "danger");
  }
});
