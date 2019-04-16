
var amountOrder = 3; 
var dateOrder = 1;

var orderDateBtn = document.getElementById('orderDateBtn');
orderDateBtn.addEventListener('click', (event) => sortOrderDate(dateOrder));

var orderAmountBtn = document.getElementById('orderAmountBtn');
orderAmountBtn.addEventListener('click', (event) => sortOrder(amountOrder));

function sortOrderDate(num){
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("orderTable");
  
    switching = true;
    dir = "asc";
      while (switching) {
         switching = false;
         rows = table.rows;
      
        for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[num];
        y = rows[i + 1].getElementsByTagName("TD")[num];
  
        var date = x.innerHTML.split('/').reverse().join('');
        var date1 = y.innerHTML.split('/').reverse().join('');
    
        if (dir == "asc"){
            if (date1 > date) {
                shouldSwitch = true;
                x.style.backgroundColor = 'red';
                y.style.backgroundColor = 'red';
                break;
            }
        }else if (dir == "desc") {
            if(date > date1){
                shouldSwitch = true;
                x.style.backgroundColor = 'red';
                y.style.backgroundColor = 'red';
                break;
            }
        }
    }
    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;      
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
  }
  };

function sortOrder(num){
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("orderTable");
    dir = 'asc'
    switching = true;
      while (switching) {
         switching = false;
         rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[num];
        y = rows[i + 1].getElementsByTagName("TD")[num];
        
        if(dir=='asc'){
            if (Number(x.innerHTML) > Number(y.innerHTML)){
                shouldSwitch = true;
                x.style.backgroundColor = 'red';
                y.style.backgroundColor = 'red';
                break;
            }
              }else if(dir='desc'){
                  if(Number(x.innerHTML) < Number(y.innerHTML)){
                    shouldSwitch = true;
                    x.style.backgroundColor = 'red';
                    y.style.backgroundColor = 'red';
                    break; 
                  }
              }  
        }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      }else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
  }
}
};