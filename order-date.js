function init(){
  var orderButton=document.getElementById('submitOrder')
  orderButton.addEventListener('click', (event) => orderSubmit(event));
  
  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  var totalAmountBox = document.getElementsByName('delivery');
  var itemNames = document.getElementById("itemN");

  amountBox.addEventListener('blur', (event) => calculateTotalAmount(amountBox, unitPriceBox));
  
  unitPriceBox.addEventListener('blur', (event)=> calculateTotalAmount(amountBox, unitPriceBox));
  
  totalAmountBox.forEach(x => document.getElementById(x.id).addEventListener("click", addDeliveryFeeToTotal));
 
  itemNames.addEventListener("click", event => itemPrice(event));
}

function itemPrice(event) {
  var itemsArr = [];
  var itemPrice = document.getElementById("itemN").value;
  var unitPriceBox = document.getElementById("unitPrice");
  unitPriceBox.value = itemPrice;
  itemsArr.push(unitPriceBox.value);
  console.log(itemsArr);
}

function orderSubmit(event){
    var orderDateValidation = document.getElementById('invalidOrderDate');
    var dateValue = document.getElementById('orderDate').value;
    if(!validateDate(dateValue)){
      orderDateValidation.style.display='block';  
    }   else {orderDateValidation.style.display='none'; }
    
}

function calculateTotalAmount(amountBox, unitPriceBox){
  if(!amountBox.value ||  !unitPriceBox.value)
   return;
   var totalPriceBox=document.getElementById('totalPrice');
   totalPriceBox.value=amountBox.value * unitPriceBox.value;
}
 
function validateDate(date){
  
  let arrDate = date.split("/").map(Number);
  let day = arrDate[0];
  let month = arrDate[1];
  let year = arrDate[2];

  var currentDate = new Date();

  var currentDay = currentDate.getDate();
  var currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
  var currentYear = currentDate.getFullYear();
  var daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year < currentYear) {
    return false;
  } else if (year === currentYear && month < currentMonth) {
    return false;
  } else if (year === currentYear && month === currentMonth && day < currentDay) {
    return false;
  } else if (month > 12 || month < 1) {
    return false;
  } else if (month === 1 || month > 2) {
    if (day > daysOfMonths[month - 1] || day < 1) {
      return false;
  }}  else if (month === 2) {
    if (year % 4 === 0 && day > 29) {
      return false;
    } else if (year % 4 !== 0 && day > daysOfMonths[month - 1]) {
      return false;
    }}
    return true;
  }

function addDeliveryFeeToTotal(deliveryType){
 var totalPriceBox = document.getElementById("totalPrice");
 var totalIncludeDeliveryBox = document.getElementById('totalAll');
 
  if (document.getElementById("standard").checked) {
    totalIncludeDeliveryBox.value = Number(totalPriceBox.value);
  } else if (document.getElementById("fast").checked) {
    totalIncludeDeliveryBox.value = (Number(totalPriceBox.value) + 2.99).toFixed(2);
  } else {
    totalIncludeDeliveryBox.value = (Number(totalPriceBox.value) + 4.99).toFixed(2);
  }
}
 
init();


/*
  homework:
  1- Implement validateDate
  2- Implement addDeliveryFeeToTotal
  3- Add items to array with each price, when item is selected
  populate, unit price automatically.
*/







































