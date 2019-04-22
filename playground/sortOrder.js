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
          if (Number(a[sortBy])< Number(b[sortBy])) {return -1;}
          if (Number(a[sortBy]) > Number(b[sortBy])) {return 1;}
          return 0;
      },
      sortNumberDesc(a,b){
          if (Number(a[sortBy]) > Number(b[sortBy])) {return -1;}
          if (Number(a[sortBy]) < Number(b[sortBy])) {return 1;}
          return 0;
      },
  
    }
  }

