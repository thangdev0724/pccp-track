# Tuần 2 · Phần 2 — Sliding Window

> [⬅ Two Pointers](01-two-pointers.md) · [Mục lục tuần 2](README.md) · Tiếp theo: [Binary Search](03-binary-search.md)

## Ý tưởng cốt lõi

- Là một biến thể của [Two Pointers](01-two-pointers.md), áp dụng cho bài toán tìm **subarray/substring liên tiếp** thỏa mãn điều kiện nào đó
- Thường kết hợp với Map/Set (đã học tuần 1) để theo dõi tần suất phần tử trong cửa sổ hiện tại
- Độ phức tạp: `O(n)` vì mỗi phần tử chỉ được thêm/xóa khỏi cửa sổ tối đa 1 lần

## Hai dạng

| Dạng | Đặc điểm |
| --- | --- |
| **Fixed-size window** | kích thước cửa sổ cố định, trượt dần qua mảng |
| **Variable-size window** | kích thước cửa sổ co giãn theo điều kiện (mở rộng khi còn hợp lệ, thu hẹp khi vi phạm điều kiện) |

---

## Ví dụ cơ bản — fixed-size window

Tổng lớn nhất của cửa sổ kích thước `k`.

```js
const maxSumFixedWindow = (nums, k) => {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];

  let maxSum = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
};
```

---

## Ví dụ mở rộng — variable-size window

Chuỗi con dài nhất không lặp ký tự, kết hợp `Set`.

```js
const lengthOfLongestSubstring = (s) => {
  const seen = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};
```

Khi cần đếm tần suất thay vì chỉ kiểm tra tồn tại, dùng `Map`:

```js
const count = new Map();

// thêm phần tử vào cửa sổ
count.set(ch, (count.get(ch) ?? 0) + 1);

// bỏ phần tử khỏi cửa sổ
count.set(ch, count.get(ch) - 1);
if (count.get(ch) === 0) count.delete(ch);
```

Xóa key khi đếm về `0` là quan trọng: nhiều bài dùng `count.size` làm số loại phần tử phân biệt trong cửa sổ.

---

## Khung sườn chung

Hầu hết bài variable-size window đều rơi vào một trong hai khung dưới đây.

Tìm cửa sổ **dài nhất** còn hợp lệ:

```js
let left = 0;
let best = 0;
for (let right = 0; right < arr.length; right++) {
  add(arr[right]);                 // mở rộng
  while (!isValid()) {             // vi phạm -> thu hẹp
    remove(arr[left]);
    left++;
  }
  best = Math.max(best, right - left + 1);
}
```

Tìm cửa sổ **ngắn nhất** đã đủ điều kiện:

```js
let left = 0;
let best = Infinity;
for (let right = 0; right < arr.length; right++) {
  add(arr[right]);
  while (isValid()) {              // đã đủ -> co lại để tìm ngắn hơn
    best = Math.min(best, right - left + 1);
    remove(arr[left]);
    left++;
  }
}
return best === Infinity ? 0 : best;
```

Điểm khác nhau duy nhất: **cập nhật đáp án bên ngoài hay bên trong vòng `while`**.

## Lỗi biên thường gặp

- Độ dài cửa sổ là `right - left + 1`, không phải `right - left`
- Bài "ngắn nhất": khởi tạo `Infinity` và nhớ đổi về `0` khi không tìm được đoạn nào
- Khi thu hẹp, phải **xóa/giảm đếm phần tử ở `left` trước rồi mới `left++`** — đảo thứ tự là sai state
- Fixed-size window: vòng lặp trượt bắt đầu từ `i = k`, phần tử bị đẩy ra là `nums[i - k]`
- Longest Repeating Character Replacement: cửa sổ hợp lệ khi `(độ dài cửa sổ) - (tần suất ký tự nhiều nhất) <= k`
- JS: dùng `Map`/`Set` thay vì object thường khi key có thể là chuỗi đặc biệt, và `count.get(ch) ?? 0` để tránh `undefined + 1 === NaN`

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Medium | ⬜ |
| [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Medium | ⬜ |
| [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) | Medium | ⬜ |
| [보석 쇼핑](https://school.programmers.co.kr/learn/courses/30/lessons/67258) | Level 3 | ⬜ |
