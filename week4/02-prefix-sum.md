# Tuần 4 · Phần 2 — Prefix Sum

> [⬅ Tư duy tiếp cận DP](01-dp-mindset.md) · Tiếp theo: [DP 1 chiều](03-dp-1d.md)

## Ý tưởng cốt lõi

- Kỹ thuật **tiền xử lý**: bỏ ra `O(n)` dựng mảng `prefix[i] = tổng nums[0..i-1]`, đổi lại mọi truy vấn "tổng đoạn `[l, r]`" chỉ còn `O(1)` thay vì `O(n)`
- Công thức truy vấn: `sum(l, r) = prefix[r + 1] - prefix[l]` — dùng mảng dài `n + 1` với `prefix[0] = 0` để **không phải xử lý riêng** trường hợp `l = 0`
- Nhẹ về lý thuyết nhưng xuất hiện dưới rất nhiều biến thể: kết hợp hashmap, mở rộng lên 2 chiều, và bản "ngược" là difference array

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Prefix sum 1D** | dựng mảng cộng dồn, truy vấn bằng hiệu hai đầu | Running Sum, nhiều truy vấn tổng đoạn |
| **Prefix + Hashmap** | lưu tần suất prefix đã gặp, tìm `curr - k` | Subarray Sum Equals K, đếm đoạn con thoả điều kiện |
| **Prefix sum 2D** | bù trừ 4 góc để lấy tổng vùng chữ nhật | truy vấn tổng vùng trong ma trận |
| **Difference array** | cập nhật đoạn `O(1)`, cuối cùng cộng dồn một lần | nhiều thao tác cộng trên đoạn rồi mới đọc kết quả |
| **Difference array 2D** | đánh dấu 4 góc, cộng dồn theo hàng rồi theo cột | 파괴되지 않은 건물 |

---

## Ví dụ cơ bản — dựng prefix sum và truy vấn tổng đoạn

Quy ước `prefix[i]` = tổng của `nums[0..i-1]`, nên mảng dài `n + 1` và `prefix[0] = 0`:

```js
const buildPrefix = (nums) => {
  const prefix = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
};

// tổng đoạn [l, r], 0-indexed, bao gồm cả hai đầu
const rangeSum = (prefix, l, r) => prefix[r + 1] - prefix[l];
```

Kết hợp với **hashmap** để đếm số đoạn con có tổng bằng `k` — không cần dựng mảng prefix, chỉ cần tổng chạy:

```js
const countSubarraysWithSum = (nums, k) => {
  const seen = new Map([[0, 1]]); // tổng 0 đã "xuất hiện" 1 lần: đoạn bắt đầu từ index 0
  let curr = 0;
  let count = 0;

  for (const num of nums) {
    curr += num;
    count += seen.get(curr - k) ?? 0; // đếm TRƯỚC khi ghi nhận curr
    seen.set(curr, (seen.get(curr) ?? 0) + 1);
  }

  return count;
};
```

---

## Ví dụ mở rộng — 2D, difference array

Prefix sum 2D: mỗi ô cộng hai cạnh rồi **trừ phần đếm hai lần**:

```js
const buildPrefix2D = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;
  const prefix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      prefix[i + 1][j + 1] =
        prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j] + matrix[i][j];
    }
  }

  return prefix;
};

const regionSum = (prefix, r1, c1, r2, c2) =>
  prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];
```

**Difference array** — kỹ thuật ngược: cập nhật đoạn `O(1)`, đọc kết quả một lần ở cuối:

```js
const applyRangeUpdates = (n, updates) => {
  const diff = new Array(n + 1).fill(0); // dài n + 1 để `r + 1 === n` không tràn

  for (const [l, r, val] of updates) {
    diff[l] += val;
    diff[r + 1] -= val;
  }

  const result = new Array(n).fill(0);
  result[0] = diff[0];
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] + diff[i];
  }

  return result;
};
```

Mở rộng lên **2 chiều**: mỗi thao tác trên vùng chữ nhật chỉ chạm 4 ô, cuối cùng cộng dồn theo hàng rồi theo cột:

```js
const applyRectUpdates = (m, n, updates) => {
  const diff = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (const [r1, c1, r2, c2, val] of updates) {
    diff[r1][c1] += val;
    diff[r1][c2 + 1] -= val;
    diff[r2 + 1][c1] -= val;
    diff[r2 + 1][c2 + 1] += val; // góc bị trừ hai lần, cộng bù lại
  }

  for (let i = 0; i < m; i++) {
    for (let j = 1; j < n; j++) diff[i][j] += diff[i][j - 1]; // cộng dồn theo hàng
  }
  for (let j = 0; j < n; j++) {
    for (let i = 1; i < m; i++) diff[i][j] += diff[i - 1][j]; // rồi theo cột
  }

  return diff;
};
```

Đây chính là mấu chốt của các bài "nhiều thao tác trên vùng chữ nhật": cách ngây thơ là `O(số thao tác × m × n)` và chắc chắn timeout, cách này là `O(số thao tác + m × n)`.

---

## Lỗi biên thường gặp

- Lệch 1 giữa hai quy ước: `prefix[i]` = tổng `nums[0..i-1]` (mảng dài `n + 1`) **khác** `prefix[i]` = tổng `nums[0..i]` (mảng dài `n`). Chọn một và giữ nguyên; quy ước `n + 1` ít lỗi hơn vì không cần `if (l === 0)`
- Difference array phải cấp phát `n + 1` phần tử, nếu không thì `diff[r + 1]` với `r = n - 1` sẽ ghi ra ngoài mảng (JS không báo lỗi, chỉ âm thầm tạo thuộc tính lạ)
- Prefix + hashmap: phải khởi tạo `seen.set(0, 1)` trước vòng lặp, nếu không sẽ bỏ sót mọi đoạn con **bắt đầu từ index 0**
- Cũng bài đó: phải **cộng `count` trước, ghi nhận `curr` sau**. Đảo thứ tự thì với `k = 0` sẽ đếm thừa đoạn rỗng
- Dùng object `{}` thay `Map` để lưu prefix: key số bị ép sang chuỗi, và prefix **âm** (`-3` → `"-3"`) vẫn chạy nhưng `if (seen[curr - k])` sẽ hiểu nhầm giá trị `0` là "chưa có". Dùng `Map` + `?? 0`
- Prefix sum 2D quên trừ `prefix[i][j]`: phần giao bị cộng hai lần. Kiểm tra nhanh bằng ma trận `2 × 2` toàn số 1 (tổng phải là 4)
- Tổng có thể vượt `2^53` khi `n` lớn và giá trị lớn — JS mất chính xác âm thầm, không báo lỗi. Nếu đề cho khoảng giá trị rộng thì cân nhắc `BigInt`
- Prefix sum chỉ dùng được khi mảng **không thay đổi** giữa các truy vấn; có cập nhật xen kẽ truy vấn thì cần cấu trúc khác (Fenwick/Segment tree, ngoài phạm vi tuần này)

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/) | Easy | ⬜ |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | ⬜ |
| [파괴되지 않은 건물](https://school.programmers.co.kr/learn/courses/30/lessons/92344) | Level 3 | ⬜ |
