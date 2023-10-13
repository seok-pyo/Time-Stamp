const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const inputName = document.querySelector("#name");
const clearName = document.querySelector("#clearName");

submitBtn.addEventListener("click", () => {
  localStorage.setItem("name", nameInput.value);
  const input = localStorage.getItem("name") || "";
  inputName.innerHTML += input;
  nameInput.value = "";
});

inputName.innerHTML += localStorage.getItem("name") || "";

clearName.addEventListener("click", () => {
  localStorage.removeItem("name");
  inputName.innerHTML = "이름 : ";
});
