let nums = [1,2,2,2,5,0]
//[0,1,3,5,7,12,12]
const fun = (nums) => {
  let n = nums.length; //6
  let arr = new Array(n+1).fill(0);
  for(let i = 1; i <= n; i++) {
    arr[i] = arr[i - 1] + nums[i - 1];
  }
  // let left = 1;
  // let right = n;
  // let mid = Math.floor((left + right) / 2);
  let res = 0;
  let M = 100000007;
  //[0,1,3,5,7,12,12]
  for(let i = 1; i < n; i++) {  //n:6
    if(arr[i] * 3 > arr[n]) break;
    let left = i + 1;
    let right = n - 1;
    while ( left <= right ) {
      let mid = Math.floor((left + right) / 2); //3,4
      if(arr[n] - arr[mid] < arr[mid] - arr[i]) {
        right = mid - 1;
      }else{
        left = mid + 1;
      }
    }
    //[0,1,3,5,7,12,12]
    let left2 = i + 1;
    let right2 = n - 1;
    while ( left2 <= right2 ) {
      let mid = Math.floor((left2 + right2) / 2);
      if(arr[mid] - arr[i] < arr[i]) {
        left2 = mid + 1;
      }else{
        right2 = mid - 1;
      }
    }
    res += left - left2;
  }

  return res;
}

console.log(fun(nums))