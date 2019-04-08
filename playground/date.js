
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



 var result= isValidOrderDate('01/04/2019');
 console.log(result);
 //isValidDate('fdjsfkljsd) ==> false
//date(aa/11/2019) ==>false
//date(01/13/2019) ==>false
//date(32/01/2019) ==>false
//date(29/02/2020) ==> true
//date()








