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

  // createBarCode();
  createBarCode2(user);
  createIdNumber();
  // barcodeGen(user);
  console.log(user.firstname);
  fullname.textContent = `${user.firstname} ${user.lastname}`;
  teamname.textContent = "White Eagle";
  department.textContent = `${user.schoollevel.toUpperCase()}`;
  teamlogoImg.setAttribute("src", "img/team" + 1 + ".jpg");
  console.log(user);
  formReset();
}

function processFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid && studentFound) {
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

  const barcode = document.getElementById("barcode");
  JsBarcode(barcode, barcodedata, {
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
  isValid = false;
  studentFound = false;
}

function printBarCode() {
  //newCodeBtn.hidden = true;
  // print();
  takeScreenShot2();
  // newCodeBtn.hidden = false;
}

function takeScreenShot2() {
  html2canvas(document.querySelector(".container"), {
    allowTaint: true,
    onrendered: function (canvas) {
      // document.body.appendChild(canvas);
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
}

function takeScreenShot() {
  const svg = document.getElementById("barcode");
  const { x, y, width, height } = svg.viewBox.baseVal;
  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const imageSVG = document.createElement("img");
  imageSVG.src = url;
  imageSVG.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(imageSVG, x, y, width, height);
  });

  teamId.appendChild(imageSVG);

  // html2canvas(document.querySelector(".container"), {
  //   onrendered: function (canvas) {
  //     // document.body.appendChild(canvas);
  //     return Canvas2Image.saveAsPNG(canvas);
  //   },
  // });
}

function createBarCode2(userData) {
  const ns = "http://www.w3.org/2000/svg";
  const thatBarCode = document.createElementNS(ns, "svg");
  thatBarCode.setAttribute("id", "barcode");

  const { firstname, lastname, schoollevel } = userData;
  var barcodedata = `${firstname} ${lastname} ${schoollevel}`;
  JsBarcode(thatBarCode, barcodedata, {
    background: "#fff",
    color: "#000",
    height: 100,
    displayValue: false,
  });

  const { x, y, width, height } = thatBarCode.viewBox.baseVal;
  const blob = new Blob([thatBarCode.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const imageSVG = document.createElement("img");
  imageSVG.setAttribute("id", "barcode2");
  imageSVG.src = url;
  imageSVG.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(imageSVG, x, y, width, height);
  });

  teamId.appendChild(imageSVG);
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
