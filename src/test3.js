// 字符串数组比较
// String[] fun(String[] arr1, String[] arr2)
// 输入：两个String数组
// 输出：一个String数组
// 要求输出两个数组中满足如下条件的字符串集合：在其中一个数组中只出现1次，在另外一个数组中没有出现
// 举例：输入 {“aa”,”bb”,”cc”,”aa”} {“bb”,”dd”,”cc”},输出{“dd”};

let strs1 = ['aa','bb','cc','aa'];
let strs2 = ['bb','dd','cc'];

const count = (arr) => {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]]) obj[arr[i]] += 1;
    else obj[arr[i]] = 1;
  }
  return obj;
}



const func = (arr1, arr2) => {
  let res = [];
  let obj1 = count(arr1);
  let obj2 = count(arr2);
  // for(let i = 0; i < arr1.length; i++) {
  //   if(obj1[arr1[i]]) obj1[arr1[i]] += 1;
  //   else obj1[arr1[i]] = 1;
  // }
  // for(let j = 0; j < arr2.length; j++) {
  //   if(obj2[arr2[j]]) obj2[arr2[j]] += 1;
  //   else obj2[arr2[j]] = 1;
  // }

  for(let key in obj1) {
    if(obj1[key] === 1) {
      if(!arr2.includes(key)) {
        res.push(key);
      }
    }
  }
  for(let key in obj2) {
    if(obj2[key] === 1) {
      if(!arr1.includes(key)) {
        res.push(key);
      }
    }
  }
  return res;
}

console.log(func(strs1,strs2))

