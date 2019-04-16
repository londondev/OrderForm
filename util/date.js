Date.prototype.isValidOrderDate=function(date){
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