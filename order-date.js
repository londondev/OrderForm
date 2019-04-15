var deliveryFees = {
  standard: 0.0,
  fast: 2.99,
  express: 4.99
};
var orderList = [];
var selectedDeliveryType;
var orderIdToEdit = null;

function init() {
  var orderDateInput = document.getElementById("orderDate");
  orderDateInput.addEventListener("blur", validateOrderDate);

  var orderButton = document.getElementById("submitOrder");
  orderButton.addEventListener("click", orderSubmit);

  var amountBox = document.getElementById("amount");
  var unitPriceBox = document.getElementById("unitPrice");
  amountBox.addEventListener("blur", event =>
    calculateTotalAmount(amountBox, unitPriceBox)
  );

  unitPriceBox.addEventListener("blur", event =>
    calculateTotalAmount(amountBox, unitPriceBox)
  );
  var radioButtons = document.getElementsByName("delivery");
   selectedDeliveryType = radioButtons[0].value;
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener("click", event =>
      addDeliveryFeeToTotal(event.target.value)
    );
  });

  var itemBox = document.getElementById("itemName");
  itemBox.addEventListener("change", event => itemSelected(event.target.value));
  itemBox.addEventListener("change", event =>
    calculateTotalAmount(amountBox, unitPriceBox)
  );

  document.getElementById("unitPrice").value = document.getElementById(
    "itemName"
  ).value;

  var table = document.getElementById("orderTable");
  // var cellIndexes = table
  // console.log("cell index", cellIndexes);

  table.addEventListener("click", function(e) {
    // console.log(e.target.cellIndex);
    if (e.target.nodeName == "TH") {
      // console.log(e)
      sortTable(e.target.cellIndex);
  }
  });
}
function sortTable(n) {
  var table, rows, x, y, shouldSwitch;
  table = document.getElementById("orderTable");
  rows = table.rows;
  shouldSwitch = false;
  switching = true;
  // console.log("table", table);
  // console.log("rows", rows);
  // console.log("n", n);
  while (switching) {
    switching = false;
    for (let i = 1; i < rows.length - 1; i++) {
      // console.log('rows length',rows.length)
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      // console.log('x',x)
      // console.log('y',y)
      if (isNaN(x.innerHTML) ? x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() : Number(x.innerHTML) > Number(y.innerHTML) ) {
        shouldSwitch = true;
        }
      
      if (shouldSwitch) {
        // console.log("parent node", rows[i].parentNode);
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        shouldSwitch = false;
        switching = true;
      }
    }
  }
}


function itemSelected(val) {
  document.getElementById("unitPrice").value = val;

  var amountBox = document.getElementById("amount");
  var unitPriceBox = document.getElementById("unitPrice");
  calculateTotalAmount(amountBox, unitPriceBox);

  addDeliveryFeeToTotal(selectedDeliveryType);
}

function orderSubmit() {
  if (!orderIdToEdit) {
    var newOrder = {
      orderId:
        orderList.length === 0
          ? 1
          : Math.max.apply(
              Math,
              orderList.map(function(o) {
                return o.orderId;
              })
            ) + 1,
      orderDate: document.getElementById("orderDate").value,
      itemName: document.getElementById("itemName").value,
      amount: document.getElementById("amount").value,
      unitPrice: document.getElementById("unitPrice").value,
      totalPrice: document.getElementById("totalPrice").value,
      selectedDeliveryType,
      totalAll: document.getElementById("totalAll").value
    };
    orderList.push(newOrder);
    renderRow(newOrder);
  } else {
    var currentOrder = orderList.find(o => o.orderId === orderIdToEdit);
    (currentOrder.orderDate = document.getElementById("orderDate").value),
      (currentOrder.itemName = document.getElementById("itemName").value),
      (currentOrder.amount = document.getElementById("amount").value),
      (currentOrder.unitPrice = document.getElementById("unitPrice").value),
      (currentOrder.totalPrice = document.getElementById("totalPrice").value),
      currentOrder.selectedDeliveryType,
      (currentOrder.totalAll = document.getElementById("totalAll").value);
    updateRow(currentOrder);
  }
  cleanForm();
}

function cleanForm() {
  (document.getElementById("orderDate").value = ""),
    (document.getElementById("itemName").value = ""),
    (document.getElementById("amount").value = ""),
    (document.getElementById("unitPrice").value = ""),
    (document.getElementById("totalPrice").value = ""),
    (document.getElementById("totalAll").value = "");
  document.getElementById("standard").checked = true;
  selectedDeliveryType = "standard";
}

function populateForm(order) {
  document.getElementById("orderDate").value = order.orderDate;
  document.getElementById("itemName").value = order.itemName;
  document.getElementById("amount").value = order.amount;
  document.getElementById("unitPrice").value = order.unitPrice;
  document.getElementById("totalPrice").value = order.totalPrice;
  document.getElementById("totalAll").value = order.totalAll;
  document.getElementById(order.selectedDeliveryType).checked = true;
}

function renderRow(newOrder) {
  var orderTable = document.getElementById("orderTable");
  var row = orderTable.insertRow(orderList.length);
  var cellIndex = 0;
  var currentCell;

  Object.values(newOrder).forEach(val => {
    currentCell = row.insertCell(cellIndex);
    currentCell.innerHTML = val;
    cellIndex++;
  });
  currentCell = row.insertCell(cellIndex++);
  currentCell.innerHTML =
    '<button id="btn_delete' +
    newOrder.orderId +
    '" onclick="deleteOrder(' +
    newOrder.orderId +
    ')">Delete</button>';
  currentCell = row.insertCell(cellIndex++);
  currentCell.innerHTML =
    '<button id="btn_edit' +
    newOrder.orderId +
    '" onclick="editOrder(' +
    newOrder.orderId +
    ')">Edit</button>';
}

function updateRow(order) {
  var editButon = document.getElementById("btn_edit" + order.orderId);
  var currentRow = editButon.parentNode.parentNode;
  Object.values(order).forEach((orderProperty, index) => {
    currentRow.cells[index].innerHTML = orderProperty;
  });
}

function deleteOrder(orderId) {
  orderList = orderList.filter(o => o.orderId !== orderId);
  var btn = document.getElementById("btn_delete" + orderId);
  deleteRow(btn);
}

function editOrder(orderId) {
  var editOrder = orderList.find(o => o.orderId === orderId);
  orderIdToEdit = orderId;
  populateForm(editOrder);
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function validateOrderDate() {
  var orderDateValidation = document.getElementById("invalidOrderDate");
  var dateValue = document.getElementById("orderDate").value;
  if (!isValidOrderDate(dateValue)) {
    orderDateValidation.style.display = "block";
    document.getElementById("orderDate").focus();
  } else {
    orderDateValidation.style.display = "none";
  }
}

function calculateTotalAmount(amountBox, unitPriceBox) {
  if (!amountBox.value || !unitPriceBox.value) return;
  var totalPriceBox = document.getElementById("totalPrice");
  totalPriceBox.value = amountBox.value * unitPriceBox.value;
   addDeliveryFeeToTotal(selectedDeliveryType);
}

function addDeliveryFeeToTotal(deliveryType) {
  selectedDeliveryType = deliveryType;
  var totalAll = document.getElementById("totalAll");
  var totalPriceBox = document.getElementById("totalPrice");
  if (!totalPriceBox.value) return;
  totalAll.value = (
    Number(totalPriceBox.value) + Number(deliveryFees[deliveryType])
  ).toFixed(2);
}

init();

function isValidOrderDate(date) {
  var dateParts = date.split("/");
  var day = dateParts[0];
  var month = dateParts[1];
  var year = dateParts[2];
  return isValidDate(date) && !isPastDate(year, month, day);
}
function isValidDate(date) {
  var dateParts = date.split("/");
  var day = dateParts[0];
  var month = dateParts[1];
  var year = dateParts[2];
  var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dateParts.length !== 3) return false;
  if (!isNumeric(day) || !isNumeric(month) || !isNumeric(year)) return false;
  if (month > 12) return false;
  if (month === "02" && year % 4 === 0) {
    if (day > 29) return false;
  } else if (day > daysOfMonth[month - 1]) {
    return false;
  }
  return true;
}

function isPastDate(year, month, day) {
  var today = new Date();
  var givenDate = new Date(year, month - 1, day);
  return givenDate < today;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function createNewOrder() {
  var newOrder = {
    amount: 5,
    item: "Shoes"
  };

  orderList.push(newOrder);
}

/*
  homework:
 1- On submit, save order to array,
 2- Clean order form
 3- Order date must be validated on blur
*/
