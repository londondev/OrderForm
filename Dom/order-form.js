function orderForm(orderList){
  var deliveryFees={
    standard:0.0,
    fast:2.99,
    express:4.99
  }
  var selectedDeliveryType;
  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  var totalPriceBox=document.getElementById('totalPrice');
  var totalAllBox=document.getElementById('totalAll');
  var orderDateBox=document.getElementById('orderDate');
  var itemNameBox=document.getElementById('itemName');
  var orderButton=document.getElementById('submitOrder');

  function itemSelected(val){
    unitPriceBox.value=val;
    calculateTotalAmount(amountBox, unitPriceBox);
    addDeliveryFeeToTotal(selectedDeliveryType);
  }
  function calculateTotalAmount(amountBox, unitPriceBox){
    if(!amountBox.value ||  !unitPriceBox.value)
     return;
   totalPriceBox.value=amountBox.value * unitPriceBox.value;
  }
  function addDeliveryFeeToTotal(deliveryType){
    selectedDeliveryType=deliveryType;
    
    if(!totalPriceBox.value)
      return;
      totalAllBox.value=(Number(totalPriceBox.value) + Number(deliveryFees[deliveryType])).toFixed(2);
  }
  function orderSubmit(){
    if(!orderIdToEdit){
      var newOrder={
        orderId: orderList.length===0? 1: Math.max.apply(Math, orderList.map(function(o) { return o.orderId; })) + 1,
      }
      orderList.add(newOrder);
      //renderRow(newOrder);
  
    }else{
      var currentOrder=orderList.find(o=>o.orderId===orderIdToEdit);
      orderList.update(currentOrder);
      orderIdToEdit=null;
    }
      cleanForm();
  }
  function cleanForm(){
    orderDateBox.value='',
    itemNameBox.value='',
    amountBox.value='',
    unitPriceBox.value='',
    totalPriceBox.value='',
    totalAllBox.value='';
    document.getElementById('standard').checked=true;
    selectedDeliveryType='standard';
  }
  
  function validateOrderDate(){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    orderDateBox.value;
    if(!Date.prototype.isValidOrderDate(dateValue)){
      orderDateValidation.style.display='block';  
      document.getElementById('orderDate').focus();
    }else{
      orderDateValidation.style.display='none'; 
    }   
  }


  function populateOrderObject(currentOrder){
    currentOrder.orderDate=orderDateBox.value,
    currentOrder.itemName=itemNameBox.value,
    currentOrder.amount= amountBox.value,
    currentOrder.unitPrice=unitPriceBox.value,
    currentOrder.totalPrice=totalPriceBox.value,
    currentOrder.selectedDeliveryType,
    currentOrder.totalAll=totalAllBox.value;
  }
    return {
        initOrderForm=() =>{
            orderDateBox.addEventListener('blur', validateOrderDate);
            orderButton.addEventListener('click', orderSubmit);
            amountBox.addEventListener('blur', (event) => calculateTotalAmount(amountBox, unitPriceBox));
            unitPriceBox.addEventListener('blur', (event)=> calculateTotalAmount(amountBox, unitPriceBox));
            itemBox.addEventListener('change', (event) =>  itemSelected(event.target.value)); 
            unitPriceBox.value=document.getElementById('itemName').value;
            var radioButtons=document.getElementsByName('delivery');
            radioButtons.forEach(radioButton=>{
                radioButton.addEventListener('click', (event) =>  addDeliveryFeeToTotal(event.target.value));
            });
        },
        populateForm(order){
          orderDateBox.value=order.orderDate;
          itemNameBox.value=order.itemName;
          amountBox.value=order.amount;
          unitPriceBox.value=order.unitPrice;
          totalPriceBox.value=order.totalPrice;
          totalAllBox.value=order.totalAll;
          document.getElementById(selectedDeliveryType).checked=true;
        }
        
    }
}





  

  



  