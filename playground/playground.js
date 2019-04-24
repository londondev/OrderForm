var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    if(number>10)
      reject('cannot enter more than 10');
    else{
      resolve('well done, you entered correct number', number);
    }
  }, 300);
});
var number=10;
promise1
.then(response=> console.log(response))
.catch(err=> console.log('errored:', err));

var region='London';
axios.get('www.weather.com/region=' + region)
.then(printWeather)
.catch(handleError);

function printWeather(weather){
  console.log(weather);
}

function handleError(error){
  console.log(error);
}





