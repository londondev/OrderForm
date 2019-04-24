 var deliveryFees={
   standard:0.0,
   fast:2.99,
   express:4.99
 }
 var orderList=[];
 var selectedDeliveryType;
 var orderIdToEdit=null;
 var orderDirection=null;
 var sortByField=null;

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

  var headerTr=document.getElementById('headerTr');
  headerTr.addEventListener('click', (event)=>sortOrders(event));
}

function sortOrders(event){
  var sortBy=event.target.getAttribute('data-sortBy');
  var dataType=event.target.getAttribute('data-type')
  if(!sortBy)
    return;
  var sorter=new sortOrder(sortBy);
  if(sortBy==='orderDate'){
    return;
  }else{
    if(dataType==='text'){
      if(sortByField===sortBy && orderDirection==='asc'){
        orderList=orderList.sort(sorter.sortTextDesc);
        orderDirection='desc'; 
      }else{
        orderList=orderList.sort(sorter.sortText);
        orderDirection='asc';
      }
    }
    else{
      if(sortByField===sortBy && orderDirection==='asc'){
        orderList=orderList.sort(sorter.sortNumberDesc);
        orderDirection='desc';
      }else{
        orderList=orderList.sort(sorter.sortNumber);
        orderDirection='asc'
      }
    }
    sortByField=sortBy;
    var table = document.getElementById('orderTable');
    var rowArray=Array.from(table.rows);
    rowArray.forEach((r,i) => {
    if(i>0 && i<orderList.length + 1)
      table.deleteRow(1);
    });
    orderList.forEach((o,i)=> renderRow(o,i + 1));
  }

}

function itemSelected(val){
  document.getElementById('unitPrice').value=val;

  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  calculateTotalAmount(amountBox, unitPriceBox);

  addDeliveryFeeToTotal(selectedDeliveryType);
}

function orderSubmit(){
  if(!orderIdToEdit){
    var newOrder={
      orderId: orderList.length===0? 1: Math.max.apply(Math, orderList.map(function(o) { return o.orderId; })) + 1,
      orderDate:document.getElementById('orderDate').value,
      itemName:document.getElementById('itemName').value,
      amount: document.getElementById('amount').value,
      unitPrice:document.getElementById('unitPrice').value,
      totalPrice:document.getElementById('totalPrice').value,
      selectedDeliveryType,
      totalAll:document.getElementById('totalAll').value
    }
    orderList.push(newOrder);
    renderRow(newOrder);
  }else{
    var currentOrder=orderList.find(o=>o.orderId===orderIdToEdit);
    currentOrder.orderDate=document.getElementById('orderDate').value,
    currentOrder.itemName=document.getElementById('itemName').value,
    currentOrder.amount= document.getElementById('amount').value,
    currentOrder.unitPrice=document.getElementById('unitPrice').value,
    currentOrder.totalPrice=document.getElementById('totalPrice').value,
    currentOrder.selectedDeliveryType,
    currentOrder.totalAll=document.getElementById('totalAll').value;
    updateRow(currentOrder);
  }
    cleanForm();
    
}

function cleanForm(){
  document.getElementById('orderDate').value='',
  document.getElementById('itemName').value='',
  document.getElementById('amount').value='',
  document.getElementById('unitPrice').value='',
  document.getElementById('totalPrice').value='',
  document.getElementById('totalAll').value='';
  document.getElementById('standard').checked=true;
  selectedDeliveryType='standard';
}

function populateForm(order){
  document.getElementById('orderDate').value=order.orderDate;
  document.getElementById('itemName').value=order.itemName;
  document.getElementById('amount').value=order.amount;
  document.getElementById('unitPrice').value=order.unitPrice;
  document.getElementById('totalPrice').value=order.totalPrice;
  document.getElementById('totalAll').value=order.totalAll;
  document.getElementById(order.selectedDeliveryType).checked=true;
}

function renderRow(newOrder, orderIndex){
    orderIndex=orderIndex===undefined ? orderList.length : orderIndex;
    var orderTable=document.getElementById('orderTable');
    var row=orderTable.insertRow(orderIndex);
    var cellIndex=0;
    var currentCell;
 
    Object.keys(newOrder).forEach(key=>{
      currentCell=row.insertCell(cellIndex);
      currentCell.innerHTML=newOrder[key];
      if(key===sortByField)
        currentCell.style.backgroundColor = 'red';
      cellIndex++;
    });
    currentCell=row.insertCell(cellIndex++);
    currentCell.innerHTML='<button id="btn_delete' + newOrder.orderId + '" onclick="deleteOrder(' + newOrder.orderId + ')">Delete</button>';
    currentCell=row.insertCell(cellIndex++);
    currentCell.innerHTML='<button id="btn_edit' + newOrder.orderId + '" onclick="editOrder(' + newOrder.orderId + ')">Edit</button>';

    if(orderList.length===1){
      addSummaryRow(newOrder.totalAll);
    }else{
      updateSummaryRow(orderList.reduce((prev, curr) => prev + Number(curr.totalAll),0));
    }
}

function addSummaryRow(total){
    var summaryRow=orderTable.insertRow(orderList.length + 1);
    var cell=summaryRow.insertCell(0);
    cell.colSpan="7";
    var cellTotal=summaryRow.insertCell(1);
    cellTotal.innerHTML=total;
    cellTotal.colSpan="3";
    cellTotal.id='summary';
}

function updateSummaryRow(total){
  document.getElementById('summary').innerHTML=total;
}

function updateRow(order){
  var editButon=document.getElementById('btn_edit' + order.orderId);
  var currentRow=editButon.parentNode.parentNode;
  Object.values(order).forEach((orderProperty, index) =>{
    currentRow.cells[index].innerHTML = orderProperty;
  });

  updateSummaryRow(orderList.reduce((prev, curr) => prev + Number(curr.totalAll),0))
}

function deleteOrder(orderId){
   orderList=orderList.filter(o=> o.orderId !== orderId);
   var btn=document.getElementById('btn_delete' + orderId);
   deleteRow(btn);
}

function editOrder(orderId){
  var editOrder=orderList.find(o=> o.orderId === orderId);
  orderIdToEdit=orderId;
  populateForm(editOrder);
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function validateOrderDate(){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    var dateValue=document.getElementById('orderDate').value;
    if(!isValidOrderDate(dateValue)){
      orderDateValidation.style.display='block';  
      document.getElementById('orderDate').focus();
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
  if(!totalPriceBox.value)
    return;
  totalAll.value=(Number(totalPriceBox.value) + Number(deliveryFees[deliveryType])).toFixed(2);
}

init();



function isValidOrderDate(date){
  var dateParts=date.split('/');
  var day=dateParts[0];
  var month=dateParts[1];
  var year=dateParts[2];
  return isValidDate(date) && !isPastDate(year, month, day);
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







































