

 var orderList=[];
 var selectedDeliveryType;
 var orderIdToEdit=null;

function init(){
    var orderForm=new orderForm(orderList);
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
    });
    currentCell=row.insertCell(cellIndex++);
    currentCell.innerHTML='<button id="btn_delete' + newOrder.orderId + '" onclick="deleteOrder(' + newOrder.orderId + ')">Delete</button>';
    currentCell=row.insertCell(cellIndex++);
    currentCell.innerHTML='<button id="btn_edit' + newOrder.orderId + '" onclick="editOrder(' + newOrder.orderId + ')">Edit</button>';
}

function updateRow(order){
  var editButon=document.getElementById('btn_edit' + order.orderId);
  var currentRow=editButon.parentNode.parentNode;
  Object.values(order).forEach((orderProperty, index) =>{
    currentRow.cells[index].innerHTML = orderProperty;
  });
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







init();





/*
  homework:
 1- On submit, save order to array,
 2- Clean order form
 3- Order date must be validated on blur
*/







































