let inputs = ['A,A,A,A,A,B,B,B,B,B,C,C,C,C,C,D,D,D,D,F,F,F,F,E,E,E,G,G,G',4];
console.log(fun(inputs));
function fun(arr) {
  let str = arr[0];
  let strArr = str.split(',');
  let CD = parseInt(arr[1]);
  let size = 0;
  let sizeMax = 0;
  let obj = {}; //{2:0,3:0}

  for(let i = 0; i < strArr.length; i++) {
    let task = strArr[i];
    let time = 1;
    if(!obj[task]) obj[task] = time;
    else{
      time = obj[task] + 1;
      obj[task] = time;
    }
    if(size < time) {
      size = time;
      sizeMax = 1;
    }else if(size === time) {
      sizeMax ++;
    }
  }

  let keyNum = 0;
  for(let key in obj) {
    keyNum++;
  }

  if(keyNum > CD + 1) {
    let res = sizeMax + (size - 1) * (CD + 1);
    if(res >= strArr.length) {
      return res;
    }else{
      return strArr.length;
    }
  }else{
    return sizeMax + (size - 1) * (CD + 1);
  }
}