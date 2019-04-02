
function isValidDate(date){
   
}


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }




 var result= isValidDate('01/13/2019');
 console.log(result);
//date(aa/11/2019) ==>false
//date(01/13/2019) ==>false
//date(32/01/2019) ==>false
//date()