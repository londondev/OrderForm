function init(){
  var orderButton=document.getElementById('submitOrder')
  orderButton.addEventListener('click', (event) => orderSubmit(event));

  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  amountBox.addEventListener('blur', (event) => calculateTotalAmount(amountBox, unitPriceBox));
  
  unitPriceBox.addEventListener('blur', (event)=> calculateTotalAmount(amountBox, unitPriceBox));
}

function orderSubmit(event){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    var dateValue=document.getElementById('orderDate').value;
    if(!validateDate(dateValue)){
      orderDateValidation.style.display='block';  
    }   
}

function calculateTotalAmount(amountBox, unitPriceBox){
  if(!amountBox.value ||  !unitPriceBox.value)
   return;
   var totalPriceBox=document.getElementById('totalPrice');
   totalPriceBox.value=amountBox.value * unitPriceBox.value;
}

function validateDate(date){
  /*validation code :
    - Date will be validated on date input blur 
    check if the date is valid date, 
    for example: 32/03/2019 is invalid date
                 30/02/2019 is invalid date
    if the date is before the current date, it is invalid date 
  */
  return false;
}

function addDeliveryFeeToTotal(deliveryType){
  /*
    standard ==> 0 add,
    fast ==> 2.99 add,
    express => 4.99 add
  */
}

init();


/*
  homework:
  1- Implement validateDate
  2- Implement addDeliveryFeeToTotal
  3- Add items to array with each price, when item is selected
  populate, unit price automatically.
*/







































