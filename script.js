function get(selector) {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`ERROR: ${selector} not found!`);
}
const form = get("#form");
const fullname = get("#fullname");

const messageContainer = get(".message-container");
const message = get("#message");

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

  barcodeGen(user);
  console.log(user.firstname);
  fullname.textContent = `${user.firstname} ${user.lastname}`;
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid) {
    storeFormData();
  }
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

// Event listeners
form.addEventListener("submit", processFormData);
