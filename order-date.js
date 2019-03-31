function init() {
  var orderButton = document.getElementById("submitOrder");

  orderButton.addEventListener("click", event => orderSubmit(event));

  var amountBox = document.getElementById("amount");
  var unitPriceBox = document.getElementById("unitPrice");
  amountBox.addEventListener("blur", event =>
    calculateTotalAmount(amountBox, unitPriceBox)
  );

  unitPriceBox.addEventListener("blur", event =>
    calculateTotalAmount(amountBox, unitPriceBox)
  );
  document
    .getElementById("standart")
    .addEventListener("click", addDeliveryFeeToTotal);
  document
    .getElementById("fast")
    .addEventListener("click", addDeliveryFeeToTotal);
  document
    .getElementById("express")
    .addEventListener("click", addDeliveryFeeToTotal);
  var orderDateBox = document.getElementById("orderDate");
  orderDateBox.addEventListener("blur", event => orderSubmit(event));

  var itemName = document.getElementById("itemN");
  itemName.addEventListener("click", event => getItemPrice(event));
}

function getItemPrice(event) {
  var itemPrice = document.getElementById("itemN").value;
  var unitPriceBox = document.getElementById("unitPrice");
  unitPriceBox.value = itemPrice;
}

function orderSubmit(event) {
  var orderDateValidation = document.getElementById("invalidOrderDate");
  var dateValue = document.getElementById("orderDate").value;
  if (!validateDate(dateValue)) {
    orderDateValidation.style.display = "block";
  } else {
    orderDateValidation.style.display = "none";
  }
}

function calculateTotalAmount(amountBox, unitPriceBox) {
  if (!amountBox.value || !unitPriceBox.value) return;
  var totalPriceBox = document.getElementById("totalPrice");
  totalPriceBox.value = amountBox.value * unitPriceBox.value;
}


function validateDate(date) {
  var checkBoxArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "/", "9"];
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();
  let arr1 = date.split("");
  let arr = date.split("/");
  let day = Number(arr[0]);
  let month = Number(arr[1]);
  let year = Number(arr[2]);
  let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (var i = 0; i < arr1.length; i++) {
    if (!checkBoxArr.includes(arr1[i])) {
      return false;
    }
  }
  if (arr1.length !== 10) {
    return false;
  } else if (year < yyyy) {
    return false;
  } else if (year === yyyy && month < mm) {
    return false;
  } else if (year === yyyy && month === mm && day <= dd) {
    return false;
  } else if (month > 12) {
    return false;
  } else if (month === 1 || month > 2) {
    if (day > listOfDays[month - 1]) {
      return false;
    }
  } else if (month === 2) {
    if (year % 4 === 0 && day > 29) {
      return false;
    } else if (year % 4 !== 0 && day > listOfDays[month - 1]) {
      return false;
    }
  }
  return true;

}

function addDeliveryFeeToTotal() {
  var amountBox = document.getElementById("amount");
  var unitPriceBox = document.getElementById("unitPrice");
  if (!amountBox.value || !unitPriceBox.value) return;
  var totalPriceBox = document.getElementById("totalPrice").value;
  var totalAll = document.getElementById("totalAll");
  var type = document.getElementsByName("delivery");
  var deliveryAmount = 0;
  if (type[0].checked) {
    deliveryAmount = 0;
  } else if (type[1].checked) {
    deliveryAmount = 2.99;
  } else {
    deliveryAmount = 4.99;
  }
  totalAll.value = (deliveryAmount + Number(totalPriceBox)).toFixed(2);
}


init();

/*validation code :
    - Date will be validated on date input blur
    check if the date is valid date,
    for example: 32/03/2019 is invalid date
                 30/02/2019 is invalid date
    if the date is before the current date, it is invalid date
  */

/*
===
    standard ==> 0 add,
    fast ==> 2.99 add,
    express => 4.99 add
  */

/*
  homework:
  1- Implement validateDate
  2- Implement addDeliveryFeeToTotal
  3- Add items to array with each price, when item is selected
  populate, unit price automatically.
*/
