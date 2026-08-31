# Tuần 2 · Phần 4 — Greedy

> [⬅ Binary Search](03-binary-search.md) · [Mục lục tuần 2](README.md)

## Ý tưởng cốt lõi

- Ở mỗi bước, chọn lựa chọn tốt nhất tại thời điểm hiện tại (**local optimal**), với hy vọng rằng chuỗi các lựa chọn cục bộ tối ưu này sẽ dẫn đến kết quả tối ưu toàn cục (**global optimal**)
- Khác với DP: Greedy **không xét lại** các lựa chọn đã đưa ra, không có bước quay lui hay lưu trạng thái bài toán con
- Không phải bài toán nào cũng giải được bằng Greedy — cần chứng minh được (hoặc ít nhất tin tưởng có cơ sở) rằng lựa chọn tham lam tại mỗi bước không làm mất tính tối ưu về sau. Đây là điểm khác biệt lớn nhất so với DP, nơi ta luôn xét đầy đủ các khả năng

---

## Ví dụ cơ bản — Assign Cookies

Mỗi trẻ 1 cái bánh, tối đa số trẻ được thỏa mãn.

```js
const findContentChildren = (greed, cookies) => {
  greed.sort((a, b) => a - b);
  cookies.sort((a, b) => a - b);

  let child = 0;
  for (const cookie of cookies) {
    if (child < greed.length && greed[child] <= cookie) {
      child++;
    }
  }

  return child;
};
```

---

## Ví dụ mở rộng — Jump Game

Kiểm tra có thể đến ô cuối cùng, dùng greedy "tầm với xa nhất".

```js
const canJump = (nums) => {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }

  return true;
};
```

---

## Hai mẫu greedy hay gặp

**Mẫu 1 — Sắp xếp rồi duyệt tuyến tính:** phần lớn bài greedy dễ đều là "sort xong thì đáp án hiện ra" (Assign Cookies, 구명보트). Câu hỏi cần trả lời trước khi code: *sort theo tiêu chí nào?*

```js
// 구명보트: mỗi thuyền chở tối đa 2 người, tổng cân nặng <= limit
const solution = (people, limit) => {
  people.sort((a, b) => a - b);

  let left = 0;
  let right = people.length - 1;
  let boats = 0;

  while (left <= right) {
    if (people[left] + people[right] <= limit) left++; // ghép người nhẹ nhất với người nặng nhất
    right--;
    boats++;
  }

  return boats;
};
```

**Mẫu 2 — Monotonic stack:** khi đề yêu cầu "xóa `k` phần tử để phần còn lại lớn/nhỏ nhất" (큰 수 만들기, Remove K Digits), greedy được cài bằng stack: gặp phần tử mới lớn hơn đỉnh stack thì pop đỉnh ra (vì bỏ nó đi có lợi), pop tối đa `k` lần.

```js
// 큰 수 만들기: bỏ k chữ số để số còn lại lớn nhất
const solution = (number, k) => {
  const stack = [];

  for (const ch of number) {
    while (k > 0 && stack.length && stack[stack.length - 1] < ch) {
      stack.pop();
      k--;
    }
    stack.push(ch);
  }

  // nếu còn k > 0 (dãy đã giảm dần) thì cắt bớt từ cuối
  return stack.slice(0, stack.length - k).join('');
};
```

## Lỗi thường gặp

- **Áp dụng greedy cho bài cần DP**: nếu chọn cục bộ tối ưu mà có thể làm mất cơ hội tốt hơn về sau, greedy sẽ sai. Thử tìm phản ví dụ nhỏ trước khi tin vào lời giải tham lam
- Sau vòng lặp mẫu monotonic stack, đừng quên xử lý phần **`k` còn dư** (cắt từ cuối)
- Sort xong nhớ kiểm tra chiều: tăng dần hay giảm dần đổi hoàn toàn kết quả
- JS: `arr.sort()` mặc định so sánh **theo chuỗi** (`[10, 9]` → `[10, 9]`), luôn truyền `(a, b) => a - b` khi sort số

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883) | Level 2 | ⬜ |
| [구명보트](https://school.programmers.co.kr/learn/courses/30/lessons/42885) | Level 2 | ⬜ |
