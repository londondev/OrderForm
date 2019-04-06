// console.log(this);

// function a(){
//     console.log(this);
// }
// a();

// var b=function(){
//     console.log(this);
//     this.newvariable='hello';
// }
// b();

// belongs to global
// var b=function(){
//     console.log(this);
//     this.newvariable='hello';
// }

// b();
// console.log(newvariable);

//belongs to object
var c = {
    name: 'The c object',
    log: function(){
        //++
        //this.name='Ammended name';
        console.log(this);
    }
}

c.log();