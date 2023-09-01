// 1 - 手写一个【有序】数组的二分查找。并写若干测试用例。
// // 返回target所在array的索引，若无则返回-1

let arr = [1,2,3,4,5,6,7,8]
let target = 7;

const func = (nums, target) => {
  let n = nums.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    let midIdx = Math.floor((left + right) / 2);
    if (target === nums[midIdx]) {
      return nums.indexOf(target);
    }
    else if (target > nums[midIdx]) {
      left = midIdx + 1;
    }else {
      right = midIdx - 1;
    }
  }
  return -1;
}

console.log(func(arr,target))

