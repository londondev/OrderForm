
 var deliveryFees={
   standard:0.0,
   fast:2.99,
   express:4.99
 }
 var orderList=[];
 var selectedDeliveryType;
function init(){
  var orderDateInput=document.getElementById('orderDate');
  orderDateInput.addEventListener('blur', validateOrderDate);

  var orderButton=document.getElementById('submitOrder')
  orderButton.addEventListener('click', orderSubmit);

  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  amountBox.addEventListener('blur', (event) => calculateTotalAmount(amountBox, unitPriceBox));
  
  unitPriceBox.addEventListener('blur', (event)=> calculateTotalAmount(amountBox, unitPriceBox));
  var radioButtons=document.getElementsByName('delivery');
  radioButtons.forEach(radioButton=>{
    radioButton.addEventListener('click', (event) =>  addDeliveryFeeToTotal(event.target.value));
  });

  var itemBox=document.getElementById('itemName');
  itemBox.addEventListener('change', (event) =>  itemSelected(event.target.value));

  document.getElementById('unitPrice').value=document.getElementById('itemName').value;
}

function itemSelected(val){
  document.getElementById('unitPrice').value=val;
}

function orderSubmit(){
    var newOrder={
      orderDate:document.getElementById('orderDate').value,
      itemName:document.getElementById('itemName').value,
      amount: document.getElementById('amount').value,
      unitPrice:document.getElementById('unitPrice').value,
      totalPrice:document.getElementById('totalPrice').value,
      selectedDeliveryType,
      totalAll:document.getElementById('totalAll').value
    }
    orderList.push(newOrder);
    cleanForm();
    renderRow(newOrder);
}

function cleanForm(){
  document.getElementById('orderDate').value='',
  document.getElementById('itemName').value='',
  document.getElementById('amount').value='',
  document.getElementById('unitPrice').value='',
  document.getElementById('totalPrice').value='',
  document.getElementById('totalAll').value=''
}

function renderRow(newOrder){
    var orderTable=document.getElementById('orderTable');
    var row=orderTable.insertRow(orderList.length);
    var cellIndex=0;
    var currentCell;
 
    Object.values(newOrder).forEach(val=>{
      currentCell=row.insertCell(cellIndex);
      currentCell.innerHTML=val;
      cellIndex++;
    })

}

function validateOrderDate(){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    var dateValue=document.getElementById('orderDate').value;
    if(!isValidOrderDate(dateValue)){
      orderDateValidation.style.display='block';  
    }else{
      orderDateValidation.style.display='none'; 
    }   
}

function calculateTotalAmount(amountBox, unitPriceBox){
  if(!amountBox.value ||  !unitPriceBox.value)
   return;
   var totalPriceBox=document.getElementById('totalPrice');
   totalPriceBox.value=amountBox.value * unitPriceBox.value;
}

function addDeliveryFeeToTotal(deliveryType){
  selectedDeliveryType=deliveryType;
  var totalAll=document.getElementById('totalAll');
  var totalPriceBox=document.getElementById('totalPrice');
  totalAll.value=(Number(totalPriceBox.value) + Number(deliveryFees[deliveryType])).toFixed(2);
}

init();



function isValidOrderDate(date){
  return isValidDate(date) && !isPastDate(date);
}
function isValidDate(date){
 var dateParts=date.split('/');
 var day=dateParts[0];
 var month=dateParts[1];
 var year=dateParts[2];
 var daysOfMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 if(dateParts.length !== 3)
    return false;
 if(!isNumeric(day) || !isNumeric(month) || !isNumeric(year))
    return false;
 if(month > 12)
    return false;
 if(month==='02' && year % 4 === 0){
      if(day > 29)
          return false;
 }
 else if(day > daysOfMonth[month -1]){
       return false;
 }
 return true;
}

function isPastDate(year, month, day){
  var today=new Date();
  var givenDate=new Date(year, month - 1, day);
  return givenDate < today;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function createNewOrder(){
  var newOrder={
    amount:5,
    item:'Shoes'
  }

  orderList.push(newOrder)
}

/*
  homework:
 1- On submit, save order to array,
 2- Clean order form
 3- Order date must be validated on blur
*/







































