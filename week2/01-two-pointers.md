# Tuần 2 · Phần 1 — Two Pointers

> [⬅ Mục lục tuần 2](README.md) · Tiếp theo: [Sliding Window](02-sliding-window.md)

## Ý tưởng cốt lõi

- Dùng hai con trỏ di chuyển trên mảng/chuỗi (thường đã sắp xếp) để giảm số lần duyệt lặp lồng nhau
- Độ phức tạp thường giảm từ `O(n²)` xuống `O(n)`

## Hai dạng phổ biến

| Dạng | Cách di chuyển | Bài toán tiêu biểu |
| --- | --- | --- |
| **Đối xứng** (opposite direction) | một con trỏ từ đầu, một con trỏ từ cuối, di chuyển vào giữa | tìm cặp tổng bằng target, container chứa nước nhiều nhất |
| **Cùng chiều** (same direction) | cả hai con trỏ đi từ đầu, một cái nhanh một cái chậm (fast & slow pointer) | loại bỏ phần tử trùng, phát hiện chu trình trong linked list |

---

## Ví dụ cơ bản — đối xứng

Tìm cặp có tổng bằng target trong mảng đã sắp xếp.

```js
const twoSumSorted = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
};
```

---

## Ví dụ mở rộng — cùng chiều

Loại bỏ phần tử trùng trong mảng đã sắp xếp.

```js
const removeDuplicates = (nums) => {
  if (nums.length === 0) return 0;

  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1; // độ dài mảng sau khi loại trùng
};
```

Biến thể fast & slow trên linked list (phát hiện chu trình):

```js
const hasCycle = (head) => {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
};
```

---

## Lỗi biên thường gặp

- `while (left < right)` chứ **không** phải `<=`: nếu dùng `<=` thì có lúc `left === right`, tức là lấy **cùng một phần tử hai lần** cho một "cặp"
- Trong bài trả về **index 1-based** (Two Sum II), nhớ `+1` cho cả hai chỉ số
- Bài 3Sum: sau khi tìm được một bộ ba, phải **nhảy qua các giá trị trùng** ở cả `left` và `right`, nếu không kết quả sẽ có bộ ba lặp lại
- Với dạng đối xứng, ở mỗi vòng lặp **chỉ được di chuyển một** con trỏ (trừ khi bài toán yêu cầu khác), nếu không sẽ bỏ sót cặp
- JS: sắp xếp số phải truyền comparator — `nums.sort((a, b) => a - b)`, vì `sort()` mặc định so sánh theo chuỗi

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Medium | ✅ [twoSum.js](twoSum.js) |
| [3Sum](https://leetcode.com/problems/3sum/) | Medium | ⬜ |
| [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Medium | ✅ [maxArea.js](maxArea.js) |
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Hard | ⬜ |
| [구명보트](https://school.programmers.co.kr/learn/courses/30/lessons/42885) | Level 2 | ⬜ |
