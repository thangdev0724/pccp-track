// https://leetcode.com/problems/container-with-most-water/
/**
 * Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
 */

/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = (height = [1, 8, 6, 2, 5, 4, 8, 3, 7]) => {
  let max = 0;
  let len = height.length;
  let i = 0;
  let j = len - 1;
  while (i < j) {
    const space = j - i;
    const min = Math.min(height[i], height[j]);
    const currentMax = space * min;
    max = currentMax > max ? currentMax : max;
    if (height[i] <= height[j]) {
      i++;
    } else {
      j--;
    }
  }
  return max;
};

maxArea();
