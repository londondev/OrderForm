function sortOrder(sortBy){
  return{
      sortText(a,b){
          var x = a[sortBy].toString().toLowerCase();
          var y = b[sortBy].toString().toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
      },
      sortTextDesc(a,b){
          var x = a[sortBy].toString().toLowerCase();
          var y = b[sortBy].toString().toLowerCase();
          if (x > y) {return -1;}
          if (x < y) {return 1;}
          return 0;
      },
      sortNumber(a,b){
        if (a[sortBy]< b[sortBy]) {return -1;}
        if (a[sortBy] > b[sortBy]) {return 1;}
        return 0;
    },
    sortNumberDesc(a,b){
        if (a[sortBy]> b[sortBy]) {return -1;}
        if (a[sortBy] < b[sortBy]) {return 1;}
        return 0;
    },

  }
}



var orderList=[
  {
    orderId:1,
    amount:5,
    unitPrice:4,
    total:20
  },
  {
    orderId:2,
    amount:4,
    unitPrice:6,
    total:24
  },
  {
    orderId:3,
    amount:1,
    unitPrice:22,
    total:22
  },
];

var sortOrder=new sortOrder('unitPrice');
var orderedList=orderList.sort(sortOrder.sortNumberDesc);
console.log(orderedList);

