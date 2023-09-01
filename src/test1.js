let nums = [-1,2,1,-4]
let target = 1;

const func = (nums, target) => {
  let arr = nums.sort((a,b) => a - b);
  let n = arr.length;
  let best = 10000000;

  for(let i = 0; i < n; ++i) {
    if(i > 0 && arr[i] === arr[i-1]) {
      continue;
    }
    let j = i + 1;
    let k = n - 1;
    while(j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if(sum === target) {
        return target;
      }
      if(Math.abs(sum - target) < Math.abs(best - target)) {
        best = sum;
      }
      if(sum > target) {
        let k0 = k - 1;
        while(j < k0 && arr[k0] === arr[k]) {
          --k0;
        }
        k = k0;
      }else {
        let j0 = j + 1;
        while(j0 < k && arr[j0] === arr[j]) {
          ++j0;
        }
        j = j0;
      }
    }
  }
  return best;
}

console.log(func(nums,target))


// let pushed = [1,2,3,4,5];
// let popped = [4,5,3,2,1];
//
// const validateStackSequences = function (pushed, popped) {
//   const stack = [];
//   const n = pushed.length;
//   for (let i = 0, j = 0; i < n; i++) {
//     stack.push(pushed[i]);
//     while (stack.length && stack[stack.length - 1] === popped[j]) {
//       stack.pop();
//       j++;
//     }
//   }
//   return stack.length === 0;
// }
// console.log(validateStackSequences(pushed, popped))