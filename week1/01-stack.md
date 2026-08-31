# Tuần 1 · Phần 1 — Stack

> [⬅ Mục lục tuần 1](README.md) · Tiếp theo: [Queue](02-queue.md)

## Ý tưởng cốt lõi

- Nguyên tắc **LIFO** (Last In First Out) — phần tử vào sau ra trước. `push` / `pop` / `peek` đều `O(1)`
- Trong JS **không cần cấu trúc riêng**: mảng thường đã là stack hoàn hảo với `push()` và `pop()` (cả hai đều `O(1)` ở cuối mảng)
- **Monotonic stack** là biến thể quan trọng nhất trong đề thi: giữ stack luôn đơn điệu để tìm "phần tử lớn/nhỏ hơn gần nhất" trong `O(n)` thay vì `O(n²)`

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Ghép cặp / đối xứng** | gặp mở thì push, gặp đóng thì pop và đối chiếu | Valid Parentheses |
| **Monotonic stack (giảm dần)** | phần tử mới **lớn hơn** đỉnh thì pop — tìm phần tử lớn hơn tiếp theo | Daily Temperatures, Next Greater Element |
| **Monotonic stack (tăng dần)** | phần tử mới **nhỏ hơn** đỉnh thì pop — tìm phần tử nhỏ hơn tiếp theo | 주식가격, histogram |
| **Mô phỏng / hoàn tác** | lưu lịch sử trạng thái, pop để quay lại | undo/redo, rút gọn đường dẫn |
| **Duyệt biểu thức** | push toán hạng, gặp toán tử thì pop hai phần tử | tính biểu thức hậu tố |

---

## Ví dụ cơ bản — ghép cặp dấu ngoặc

Gặp ngoặc mở thì push, gặp ngoặc đóng thì pop ra đối chiếu. Cuối cùng stack phải **rỗng**.

```js
const isBalanced = (s) => {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false; // pop() trên mảng rỗng ra undefined -> false
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0; // còn thừa ngoặc mở thì không hợp lệ
};
```

---

## Ví dụ mở rộng — monotonic stack

Tìm **phần tử lớn hơn tiếp theo** của mỗi vị trí. Stack lưu **chỉ số** (không lưu giá trị) để còn tính được khoảng cách:

```js
const nextGreater = (nums) => {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // các chỉ số, giá trị giảm dần từ đáy lên đỉnh

  for (let i = 0; i < nums.length; i++) {
    // nums[i] "phá vỡ" tính đơn điệu -> mọi phần tử nhỏ hơn nó đều tìm được đáp án
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const prev = stack.pop();
      result[prev] = nums[i];
    }
    stack.push(i);
  }

  return result; // chỉ số còn kẹt trong stack giữ nguyên -1: không có phần tử nào lớn hơn
};
```

Đổi `result[prev] = nums[i]` thành `result[prev] = i - prev` là ra bài "phải chờ bao nhiêu ngày/bao lâu" — cùng một khung, chỉ khác thứ ghi vào kết quả.

Khi cần tra cứu chéo giữa hai mảng (Next Greater Element I), kết hợp monotonic stack với một `Map`:

```js
const buildNextGreaterMap = (nums) => {
  const map = new Map(); // giá trị -> phần tử lớn hơn tiếp theo
  const stack = [];

  for (const num of nums) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      map.set(stack.pop(), num);
    }
    stack.push(num);
  }

  return map; // giá trị không có trong map nghĩa là không tìm được -> -1
};
```

---

## Lỗi biên thường gặp

- `[].pop()` trả về `undefined` chứ **không ném lỗi**. Điều này tiện cho bài ngoặc (`undefined !== '('` → `false` là đúng ý), nhưng ở bài khác sẽ khiến lỗi lan âm thầm — luôn tự hỏi "stack có thể rỗng ở đây không?"
- JS **không có** `stack.peek()`. Đỉnh stack là `stack[stack.length - 1]`, và trên mảng rỗng nó là `undefined`. Có thể dùng `stack.at(-1)` cho gọn
- Quên kiểm tra `stack.length === 0` ở cuối bài ghép cặp: chuỗi `"((("` sẽ bị coi là hợp lệ vì vòng lặp chạy hết mà không sai lần nào
- Monotonic stack nên lưu **chỉ số** thay vì giá trị — có chỉ số thì luôn suy ra được giá trị, ngược lại thì không, mà nhiều bài cần khoảng cách `i - prev`
- Điều kiện `while` dùng `<` hay `<=` quyết định cách xử lý **giá trị bằng nhau**. Đề hỏi "lớn hơn" thì dùng `<`, hỏi "lớn hơn hoặc bằng" thì dùng `<=` — thử với mảng toàn phần tử giống nhau để kiểm chứng
- Vòng `while` bên trong không làm độ phức tạp thành `O(n²)`: mỗi phần tử chỉ được push một lần và pop tối đa một lần, tổng cộng vẫn là `O(n)`
- Các chỉ số **còn kẹt trong stack** sau vòng lặp là những vị trí không có đáp án — phải khởi tạo `result` bằng giá trị mặc định (`-1` hoặc `0`) đúng theo đề

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | Easy | ⬜ |
| [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) | Easy | ⬜ |
| [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) | Medium | ⬜ |
| [주식가격](https://school.programmers.co.kr/learn/courses/30/lessons/42584) | Level 2 | ⬜ |
