# Tuần 2 · Phần 3 — Binary Search

> [⬅ Sliding Window](02-sliding-window.md) · [Mục lục tuần 2](README.md) · Tiếp theo: [Greedy](04-greedy.md)

## Ý tưởng cốt lõi

- Áp dụng cho mảng đã sắp xếp, hoặc bài toán có tính chất **"đơn điệu" (monotonic)** — nếu một giá trị thỏa mãn điều kiện thì mọi giá trị "lớn hơn/nhỏ hơn" nó cũng thỏa mãn
- Độ phức tạp: `O(log n)`

## Các biến thể hay gặp trong đề thi

1. Tìm kiếm chính xác một giá trị
2. Tìm cận trái/cận phải (lower bound / upper bound)
3. **Binary search trên đáp án** (binary search on answer) — không tìm trên mảng mà tìm trên **không gian giá trị của đáp án**, thường gặp ở các bài Medium–Hard
4. Tìm kiếm trong mảng đã xoay (rotated sorted array)

---

## Ví dụ cơ bản — binary search chuẩn

Tìm chính xác một giá trị.

```js
const binarySearch = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};
```

---

## Ví dụ mở rộng — binary search on answer

Tìm giá trị nhỏ nhất thỏa mãn điều kiện `check()`.

```js
const binarySearchOnAnswer = (low, high, check) => {
  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (check(mid)) {
      high = mid; // mid thỏa mãn, thử thu hẹp về phía nhỏ hơn
    } else {
      low = mid + 1;
    }
  }

  return low;
};
```

Cách dùng: xác định **khoảng giá trị của đáp án** `[low, high]`, viết hàm `check(x)` trả về "với giá trị `x` thì có làm được không". Nếu `check` là đơn điệu (sai... sai, đúng... đúng) thì binary search tìm được ranh giới.

```js
// Ví dụ: chia mảng thành m đoạn, tìm tổng đoạn lớn nhất nhỏ nhất có thể
const splitArray = (nums, m) => {
  const check = (limit) => {
    let groups = 1;
    let sum = 0;
    for (const n of nums) {
      if (sum + n > limit) {
        groups++;
        sum = n;
      } else {
        sum += n;
      }
    }
    return groups <= m;
  };

  return binarySearchOnAnswer(
    Math.max(...nums),                  // đáp án không thể nhỏ hơn phần tử lớn nhất
    nums.reduce((a, b) => a + b, 0),    // và không thể lớn hơn tổng cả mảng
    check
  );
};
```

---

## Hai khung sườn — đừng trộn lẫn

| | Tìm chính xác | Tìm ranh giới (boundary) |
| --- | --- | --- |
| Khởi tạo | `right = n - 1` | `right = n` (hoặc `high` = giá trị lớn nhất có thể) |
| Điều kiện lặp | `while (left <= right)` | `while (left < right)` |
| Cập nhật | `left = mid + 1` / `right = mid - 1` | `left = mid + 1` / `right = mid` |
| Trả về | `mid` khi trùng, `-1` nếu không có | `left` sau khi vòng lặp kết thúc |

Chọn **một** trong hai khung và giữ nguyên. Nguyên nhân số một gây vòng lặp vô hạn là trộn `while (left < right)` với `right = mid - 1`, hoặc `left = mid` với cách lấy `mid` làm tròn xuống.

## Lỗi biên thường gặp

- JS: **luôn** `Math.floor((left + right) / 2)`, vì `/` trả về số thực — thiếu `Math.floor` là `nums[mid]` thành `undefined`
- Với số rất lớn có thể viết `left + Math.floor((right - left) / 2)` cho an toàn (thói quen tốt mang từ Java/C++ sang, tuy JS ít khi tràn số vì dùng double)
- Search in Rotated Sorted Array: mỗi bước phải xác định **nửa nào đang được sắp xếp** rồi mới kiểm tra target có nằm trong nửa đó hay không
- Find Minimum in Rotated Sorted Array: so `nums[mid]` với `nums[right]` (không phải `nums[left]`), dùng khung boundary với `right = mid`

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Binary Search](https://leetcode.com/problems/binary-search/) | Easy | ⬜ |
| [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Medium | ⬜ |
| [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Medium | ⬜ |
