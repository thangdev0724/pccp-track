# Tuần 4 · Phần 1 — Tư duy tiếp cận DP

> [⬅ Mục lục tuần 4](README.md) · Tiếp theo: [Prefix Sum](02-prefix-sum.md)

## Ý tưởng cốt lõi

- DP không phải một thuật toán cụ thể mà là **cách tổ chức lời giải đệ quy**: giải bài toán con một lần, ghi lại kết quả, lần sau cần thì lấy ra dùng
- Một bài phù hợp với DP khi có đủ **hai** đặc điểm: **optimal substructure** (lời giải tối ưu của bài lớn dựng được từ lời giải tối ưu của bài con) và **overlapping subproblems** (đệ quy thuần sẽ tính đi tính lại cùng một bài con)
- Hiệu quả điển hình: từ `O(2^n)` của đệ quy vét cạn xuống `O(n)` hoặc `O(n²)` — bằng đúng **số trạng thái × chi phí tính một trạng thái**

## Hai cách cài đặt

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Top-down** (memoization) | viết đệ quy tự nhiên theo đề, thêm `memo` để cache kết quả | dễ nghĩ ra khi công thức truy hồi phức tạp, trạng thái thưa |
| **Bottom-up** (tabulation) | dựng bảng `dp` từ base case, lặp tiến lên đến đáp án | nhanh hơn, không lo tràn ngăn xếp — mặc định nên dùng |
| **Rolling array** | bottom-up nhưng chỉ giữ 1–2 hàng/ô gần nhất | khi `dp[i]` chỉ phụ thuộc `dp[i-1]`, `dp[i-2]` → bộ nhớ `O(1)` |

Quy trình 4 bước nên làm **trước khi gõ dòng code nào**:

1. **Định nghĩa trạng thái**: `dp[i]` (hoặc `dp[i][j]`) *nghĩa là gì* — viết ra bằng lời, thành một câu đầy đủ
2. **Công thức truy hồi**: `dp[i]` tính từ những trạng thái nào
3. **Base case**: giá trị khởi tạo, và khởi tạo bằng `0`, `Infinity` hay `-Infinity`
4. **Thứ tự duyệt**: đảm bảo mọi trạng thái phụ thuộc đã được tính xong trước

---

## Ví dụ cơ bản — từ đệ quy vét cạn tới memoization

Fibonacci đệ quy thuần gọi lại `fib(n - 2)` rất nhiều lần → `O(2^n)`:

```js
const fibSlow = (n) => (n <= 1 ? n : fibSlow(n - 1) + fibSlow(n - 2));
```

Thêm `memo` — mỗi trạng thái chỉ tính một lần, thành `O(n)`:

```js
const fibMemo = (n, memo = new Map()) => {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);

  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
};
```

Cùng bài toán, viết bottom-up — không đệ quy, không lo tràn ngăn xếp:

```js
const fibTable = (n) => {
  if (n <= 1) return n;

  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};
```

---

## Ví dụ mở rộng — rolling array & khung memo tổng quát

`dp[i]` chỉ cần hai giá trị liền trước → bỏ hẳn mảng, còn `O(1)` bộ nhớ:

```js
const fibRolling = (n) => {
  if (n <= 1) return n;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }

  return curr;
};
```

Khung memo khi trạng thái có **nhiều chiều** — mã hoá key thành chuỗi hoặc số:

```js
const solve = (nums) => {
  const memo = new Map();

  const dfs = (i, remain) => {
    if (i >= nums.length) return remain === 0 ? 1 : 0;

    const key = `${i},${remain}`; // hoặc i * (maxRemain + 1) + remain nếu cần nhanh hơn
    if (memo.has(key)) return memo.get(key);

    const result = dfs(i + 1, remain) + dfs(i + 1, remain - nums[i]);
    memo.set(key, result);
    return result;
  };

  return dfs(0, 0);
};
```

---

## Lỗi biên thường gặp

- **Định nghĩa trạng thái mơ hồ** là nguyên nhân số một khiến DP sai. Nếu không diễn đạt được `dp[i]` bằng một câu tiếng Việt rõ ràng thì công thức truy hồi chắc chắn sẽ lỏng lẻo
- Khởi tạo sai: bài tìm **min** phải khởi tạo `Infinity`, bài tìm **max** khởi tạo `-Infinity` (hoặc `nums[0]`), bài **đếm** khởi tạo `0` với base case `= 1`. Dùng nhầm `0` cho bài min thì mọi `Math.min` đều ra 0
- `new Array(n).fill(0)` an toàn với số, nhưng `new Array(m).fill(new Array(n).fill(0))` tạo **m tham chiếu tới cùng một hàng** — luôn dùng `Array.from({ length: m }, () => new Array(n).fill(0))`
- Memo **không phân biệt "chưa tính" với "kết quả là 0/false"**: nếu dùng object và kiểm tra `if (memo[key])` thì kết quả `0` sẽ bị tính lại mãi. Dùng `Map` + `memo.has(key)`
- Top-down với `n` lớn (`10^5`) vẫn **tràn ngăn xếp** dù đã memo, vì độ sâu đệ quy không giảm — chuyển sang bottom-up
- Thứ tự duyệt sai: bottom-up mà đọc `dp[i + 1]` trong khi đang duyệt tăng dần thì đang đọc giá trị **chưa được tính**
- Nhầm DP với Greedy: greedy chọn một hướng và không quay lại, DP xét **mọi** lựa chọn ở mỗi bước. Nếu tìm được phản ví dụ cho lời giải tham lam thì đó là dấu hiệu phải dùng DP

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | Easy | ⬜ |
