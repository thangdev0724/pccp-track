// https://leetcode.com/problems/3sum/
/**
 * @param {number[]} nums
 * @return {number[][]}
 * @example
 * @input nums = [-1,0,1,2,-1,-4]
 * @output [[-1,-1,2],[-1,0,1]]
 */
var threeSum = function (nums = []) {
  const result = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    const num = nums[i];

    while (left < right) {}
  }

  console.log(result);
};

threeSum([-1, 0, 1, 2, -1, -4]);
