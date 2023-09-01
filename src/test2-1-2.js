// 2 - 给定一个任意长度的数组，打印出所有的组合。
// 例如，给定[1,2,3]
// 则返回[ [1], [2], [3], [1,2], [2,3], [1,3], [1,2,3] ]

let nums = [1,2,3];

const func = (nums) => {
  let res = [];
  let n = nums.length;
  let max = (n * n - 1);
  for (let i = 1; i < max; i++) {
    let str = i.toString(2).padStart(n, '0');
    let temp = [];
    for (let idx in str) {
      if (str[idx] === '1') {
        temp.push(nums[idx]);
      }
    }
    res.push(temp);
  }
  return res;
}

console.log(func(nums))