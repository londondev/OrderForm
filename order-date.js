function init(){
  var orderButton=document.getElementById('submitOrder')
  orderButton.addEventListener('click', (event) => orderSubmit(event));

  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  amountBox.addEventListener('blur', (event) => calculateTotalAmount(amountBox, unitPriceBox));
  
  unitPriceBox.addEventListener('blur', (event)=> calculateTotalAmount(amountBox, unitPriceBox));
}

function orderSubmit(event){
    //event.preventDefault();
    var orderDateValidation=document.getElementById('invalidOrderDate');
    orderDateValidation.style.display='block';
    return false;
}

function calculateTotalAmount(amountBox, unitPriceBox){
  if(!amountBox.value ||  !unitPriceBox.value)
   return;
   var totalPriceBox=document.getElementById('totalPrice');
   totalPriceBox.value=amountBox.value * unitPriceBox.value;
}

init();