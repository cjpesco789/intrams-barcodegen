function get(selector) {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`ERROR: ${selector} not found!`);
}
const form = get("#form");
const fullname = get("#fullname");
const teamname = get("#teamname");
const department = get("#department");

const teamId = get(".team-identification");
const teamlogoImg = get(".team-logo img");

const messageContainer = get(".message-container");
const message = get("#message");

const formResult = get(".form-result");

const printBarCodeBtn = get(".print-barcode-btn");
const newCodeBtn = get(".new-code-btn");

let isValid = false;
let studentFound = false;
function validateForm() {
  isValid = form.checkValidity();
  if (!isValid) {
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }

  if (form.firstname.value === "Clark Joy" && form.lastname.value === "Sala") {
    message.textContent = "Student not found.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  } else {
    studentFound = true;
  }
}

function storeFormData() {
  const user = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    schoollevel: form.schlevel.value,
  };

  const idNumber = "565777879112";
  createBarCode(idNumber);
  createIdNumber(idNumber);

  fullname.textContent = `${user.firstname} ${user.lastname}`;
  teamname.textContent = "White Eagle";
  department.textContent = `${user.schoollevel.toUpperCase()}`;
  teamlogoImg.setAttribute("src", "img/team" + 1 + ".jpg");

  formReset();
}

function processFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid && studentFound) {
    storeFormData();
  }
}

function createIdNumber(idNumber) {
  const idNumberText = document.createElement("p");
  idNumberText.setAttribute("id", "idnumber");
  idNumberText.textContent = idNumber;
  teamId.appendChild(idNumberText);
}

function init() {
  form.hidden = false;
  messageContainer.style.display = "flex";
  formResult.hidden = true;
}

function formReset() {
  form.reset();
  form.hidden = true;
  messageContainer.style.display = "none";
  formResult.hidden = false;
  isValid = false;
  studentFound = false;
}

function printBarCode() {
  newCodeBtn.hidden = true;
  print();
  newCodeBtn.hidden = false;
}

function createBarCode(idNumber) {
  const thatBarCode = document.createElement("img");
  thatBarCode.setAttribute("id", "barcode");

  JsBarcode(thatBarCode, idNumber, {
    format: "CODE128",
    width: 2,
    background: "#fff",
    color: "#000",
    height: 100,
    displayValue: false,
  });

  teamId.appendChild(thatBarCode);
}

function newBarCode() {
  const thatCodeBar = document.getElementById("barcode");
  const idNumber = document.getElementById("idnumber");

  teamId.removeChild(thatCodeBar);
  teamId.removeChild(idNumber);

  fullname.textContent = "Your Name";
  teamname.textContent = "Your Team";
  department.textContent = "Department";
  teamlogoImg.setAttribute("src", "img/team" + 0 + ".jpg");
  message.textContent = "Don't Hesitate!";
  message.style.color = "#000";
  messageContainer.style.borderColor = "#000";
  init();
}
// Event listeners
window.addEventListener("DOMContentLoaded", init);
form.addEventListener("submit", processFormData);

newCodeBtn.addEventListener("click", newBarCode);
printBarCodeBtn.addEventListener("click", printBarCode);
