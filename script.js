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

function validateForm() {
  isValid = form.checkValidity();
  if (!isValid) {
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
}

function storeFormData() {
  const user = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    schoollevel: form.schlevel.value,
  };

  formReset();
  createBarCode();
  createIdNumber();
  barcodeGen(user);
  console.log(user.firstname);
  fullname.textContent = `${user.firstname} ${user.lastname}`;
  teamname.textContent = "White Eagle";
  department.textContent = `${user.schoollevel.toUpperCase()}`;
  teamlogoImg.setAttribute("src", "img/team" + 1 + ".jpg");
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid) {
    storeFormData();
  }
}

function createBarCode() {
  const ns = "http://www.w3.org/2000/svg";
  const thatBarCode = document.createElementNS(ns, "svg");
  thatBarCode.setAttribute("id", "barcode");
  teamId.appendChild(thatBarCode);
}

function createIdNumber() {
  const idNumber = document.createElement("p");
  idNumber.setAttribute("id", "idnumber");
  idNumber.textContent = "0875132659844";
  teamId.appendChild(idNumber);
}

function barcodeGen(userData) {
  const { firstname, lastname, schoollevel } = userData;
  var barcodedata = `${firstname} ${lastname} ${schoollevel}`;
  //   var data = document.querySelector(".input").value;
  const thatCodeBar = document.getElementById("barcode");
  JsBarcode(thatCodeBar, barcodedata, {
    background: "#fff",
    color: "#000",
    height: 100,
    displayValue: false,
  });
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
}

function printBarCode() {}

function newBarCode() {
  const thatCodeBar = document.getElementById("barcode");
  const idNumber = document.getElementById("idnumber");

  teamId.removeChild(thatCodeBar);
  teamId.removeChild(idNumber);

  fullname.textContent = "Your Name";
  teamname.textContent = "Your Team";
  department.textContent = "Department";
  teamlogoImg.setAttribute("src", "img/team" + 0 + ".jpg");
  init();
}
// Event listeners
window.addEventListener("DOMContentLoaded", init);
form.addEventListener("submit", processFormData);
printBarCodeBtn.addEventListener("click", printBarCode);
newCodeBtn.addEventListener("click", newBarCode);
