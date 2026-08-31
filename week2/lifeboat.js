// https://school.programmers.co.kr/learn/courses/30/lessons/42885
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
function solution(people = [70, 50, 80, 50], limit = 100) {
  people.sort((a, b) => a - b);
  let answer = 0;
  let left = 0;
  let right = people.length - 1;

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++;
    }
    right--;
    answer++;
  }
  return answer;
}

solution();
