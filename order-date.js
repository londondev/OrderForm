var itemNameBox=document.getElementById('itemN');
var amountBox=document.getElementById('amount');
var unitPriceBox=document.getElementById('unitPrice');
var totalPriceBox=document.getElementById('totalPrice');
var deliveryOptions = document.getElementsByName('delivery');
var totalAllBox = document.getElementById('totalAll');
var orderDateBox = document.getElementById('orderDate');


var orderList=[];
var selectedDeliveryType = function(){
  var result = '';
  if(deliveryOptions[0].checked){
    result = deliveryOptions[0].value;
  }else if(deliveryOptions[1].checked){
    result = deliveryOptions[1].value;
  }else if(deliveryOptions[2].checked){
    result = deliveryOptions[2].value;
  }
  return result;
}

var orderIdToEdit=null;

function init(){
  
  var currentDate = new Date().toLocaleDateString();
  document.getElementById('orderDate').value = currentDate;

  var orderButton=document.getElementById('submitOrder')
  orderButton.addEventListener('click', (event) => clickSubmit(event));

  orderDateBox.addEventListener('blur', (event) => orderSubmit(event));

  orderDateBox.addEventListener('focus', function(){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    if(!orderIdToEdit){
      if((orderDateBox.value = orderDateValidation.innerHTML)){
        document.getElementById('orderDate').value = currentDate;
      }
    }
  });

  itemNameBox.addEventListener('change', (event) => itemNumber(itemNameBox, unitPriceBox, totalPriceBox, amountBox, totalAllBox, deliveryOptions));
  
  amountBox.addEventListener('change', (event)=> calculateTotalAmount(amountBox, unitPriceBox, totalPriceBox, totalAllBox, deliveryOptions));

  deliveryOptions.forEach(item=>item.addEventListener('click', (event) => addDeliveryFeeToTotal(totalAllBox, totalPriceBox, deliveryOptions)));

};

function orderSubmit(event){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    var dateValue=document.getElementById('orderDate').value;
    if(!validateDate(dateValue)){
      document.getElementById('orderDate').value = orderDateValidation.innerHTML;
    } else{
      orderDateValidation.style.display='none'; 
    }  
};

function clickSubmit(){
  var orderDateValidation=document.getElementById('invalidOrderDate');
  var dateValue=document.getElementById('orderDate').value;

  if(!orderIdToEdit){
    if(!validateDate(dateValue)){
      orderDateValidation.style.display = 'block';
    }else if(itemNameBox.value === ""){
      document.getElementById('item-span').style.display = 'block';
    }else if(amountBox.value === ""){
      document.getElementById('item-span').style.display = 'none';
      document.getElementById('amount-span').style.display = 'block';
    } else{  
      document.getElementById('amount-span').style.display = 'none';
      document.getElementById('item-span').style.display = 'none';

    var newOrder={
      orderId: orderList.length === 0 ? 1: Math.max.apply(Math, orderList.map(function(o) { return o.orderId; })) + 1,
      orderDate: document.getElementById('orderDate').value,
      itemName: document.getElementById('itemN').value,
      amount: document.getElementById('amount').value,
      unitPrice: document.getElementById('unitPrice').value,
      totalPrice: document.getElementById('totalPrice').value,
      selectedDeliveryType: selectedDeliveryType(),
      totalAll: document.getElementById('totalAll').value
    }
    orderList.push(newOrder);
    renderRow(newOrder);
    document.getElementById('orderTable').style.display='block';
    cleanForm();
  }
}else{
  var currentOrder=orderList.find(o=>o.orderId===orderIdToEdit);
    currentOrder.orderDate=document.getElementById('orderDate').value,
    currentOrder.itemName=document.getElementById('itemN').value,
    currentOrder.amount= document.getElementById('amount').value,
    currentOrder.unitPrice=document.getElementById('unitPrice').value,
    currentOrder.totalPrice=document.getElementById('totalPrice').value,
    currentOrder.selectedDeliveryType,
    currentOrder.totalAll=document.getElementById('totalAll').value;
    updateRow(currentOrder);
    orderIdToEdit=null;
    cleanForm();
}
  
};

function cleanForm(){
  var currentDate = new Date().toLocaleDateString();
  document.getElementById('orderDate').value=currentDate,
  document.getElementById('itemN').value='',
  document.getElementById('amount').value='',
  document.getElementById('unitPrice').value='',
  document.getElementById('totalPrice').value='',
  document.getElementById('totalAll').value='',
  document.getElementsByName('delivery')[0].checked = 'checked'
};

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

    currentCell = row.insertCell(cellIndex++);
    currentCell.innerHTML='<button id="btn_' + newOrder.orderId + '" onclick="deleteOrder(' + newOrder.orderId + ')">X</button>';
    row.insertCell(cellIndex++).innerHTML='<button id="edit_btn_' + newOrder.orderId + '" onclick="edit(' + newOrder.orderId + ')">Edit</button>';
};

function populateForm(order){
  document.getElementById('orderDate').value=order.orderDate;
  document.getElementById('itemN').value=order.itemName;
  document.getElementById('amount').value=order.amount;
  document.getElementById('unitPrice').value=order.unitPrice;
  document.getElementById('totalPrice').value=order.totalPrice;
  document.getElementById('totalAll').value=order.totalAll;
  document.getElementsByName('delivery')[0].checked=true;
};

function edit(orderId){
  var editOrder=orderList.find(o=> o.orderId === orderId);
  orderIdToEdit=orderId;
  populateForm(editOrder);
};

function updateRow(order){
  var editButon=document.getElementById('edit_btn_' + order.orderId);
  var currentRow=editButon.parentNode.parentNode;
  Object.values(order).forEach((orderProperty, index) =>{
    currentRow.cells[index].innerHTML = orderProperty;
  });
};

function deleteOrder(orderId){
  orderList=orderList.filter(o=> o.orderId !== orderId);
  var btn=document.getElementById('btn_' + orderId);
  deleteRow(btn);
};

function deleteRow(btn) {
 var row = btn.parentNode.parentNode;
 row.parentNode.removeChild(row);
};

function calculateTotalAmount(amountBox, unitPriceBox, totalPriceBox, totalAllBox, deliveryOptions){
  if(!amountBox.value ||  !unitPriceBox.value)
   return;
   totalPriceBox.value = amountBox.value * unitPriceBox.value;
   addDeliveryFeeToTotal(totalAllBox,totalPriceBox, deliveryOptions);
};

function itemNumber(itemNameBox, unitPriceBox, totalPriceBox, amountBox, totalAllBox, deliveryOptions){
  var i = itemNameBox.selectedIndex;
    unitPriceBox.value = itemNameBox.options[i].value;
    totalPriceBox.value = amountBox.value * unitPriceBox.value;
    addDeliveryFeeToTotal(totalAllBox,totalPriceBox, deliveryOptions);
}

function validateDate(date){
  var dates = date.split('/');
  var day=dates[0];
  var month=dates[1];
  var year=dates[2];
  var daysOfMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(dates.length !== 3)
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

  var today=new Date();
  var givenDate=new Date(year, month - 1, day);
  return givenDate < today ?false :true
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function addDeliveryFeeToTotal(totalAllBox, totalPriceBox, deliveryOptions){
  var price = 0;
  if(deliveryOptions[0].checked){
    price = 0;
  }else if(deliveryOptions[1].checked){
    price = 2.99;
  }else if(deliveryOptions[2].checked){
    price = 4.99;
  }
  totalAllBox.value = `£${(Number(totalPriceBox.value) + price).toFixed(2)}`
}

init();
