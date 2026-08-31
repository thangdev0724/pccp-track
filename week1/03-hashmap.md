# Tuần 1 · Phần 3 — Hashmap & Hashset

> [⬅ Queue](02-queue.md) · [Mục lục tuần 1](README.md)

## Ý tưởng cốt lõi

- Bảng băm cho phép tra cứu / thêm / xoá trung bình `O(1)` — đây là công cụ **đổi bộ nhớ lấy tốc độ** phổ biến nhất, thường hạ `O(n²)` xuống `O(n)`
- Mẫu tư duy chung: thay vì "với mỗi phần tử, quét lại cả mảng để tìm thứ cần", hãy "vừa duyệt vừa **ghi nhớ** những gì đã thấy, rồi tra cứu trong một bước"
- Trong JS dùng **`Map`** và **`Set`**, không dùng object thường — lý do ở phần lỗi biên bên dưới

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Tra cứu phần bù** | duyệt một lượt, tra `target - num` trong những gì đã thấy | Two Sum |
| **Kiểm tra tồn tại / trùng lặp** | `Set`, so sánh `set.size` với `arr.length` | Contains Duplicate, 전화번호 목록 |
| **Đếm tần suất** | `map.set(k, (map.get(k) ?? 0) + 1)` | Valid Anagram, Top K Frequent |
| **Gom nhóm theo khoá** | sinh một "chữ ký" từ phần tử, gom các phần tử cùng chữ ký | Group Anagrams |
| **Đếm rồi sắp xếp** | dựng map tần suất, đổi sang mảng, sort theo nhiều tiêu chí | 베스트앨범 |

---

## Ví dụ cơ bản — tra cứu phần bù và đếm tần suất

Two Sum: chỉ cần **một lượt duyệt** vì ta tra cứu trong phần đã đi qua.

```js
const findPairWithSum = (nums, target) => {
  const seen = new Map(); // giá trị -> chỉ số

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i); // ghi nhận SAU khi tra, tránh tự ghép với chính mình
  }

  return [];
};
```

Đếm tần suất — mẫu lặp lại ở rất nhiều bài:

```js
const countFrequency = (items) => {
  const freq = new Map();

  for (const item of items) {
    freq.set(item, (freq.get(item) ?? 0) + 1); // `?? 0` vì get() trả undefined khi chưa có
  }

  return freq;
};
```

Kiểm tra trùng lặp gọn nhất bằng `Set`:

```js
const hasDuplicate = (nums) => new Set(nums).size !== nums.length;
```

---

## Ví dụ mở rộng — gom nhóm và đếm rồi sắp xếp

**Gom nhóm theo chữ ký**: mọi từ đảo chữ của nhau đều cho cùng một chuỗi sau khi sort ký tự.

```js
const groupBySignature = (words) => {
  const groups = new Map();

  for (const word of words) {
    const key = [...word].sort().join(''); // "eat" và "tea" đều thành "aet"
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }

  return [...groups.values()];
};
```

**Đếm rồi sắp xếp theo nhiều tiêu chí** — chuyển `Map` sang mảng rồi sort:

```js
const topKByCount = (nums, k) => {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) ?? 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1]) // giảm dần theo số lần xuất hiện
    .slice(0, k)
    .map(([value]) => value);
};
```

Khi cần sort theo **hai tiêu chí** (nhiều nhất trước, bằng nhau thì chỉ số nhỏ trước) — mẫu hay gặp ở 베스트앨범:

```js
const byCountThenIndex = (a, b) => b.count - a.count || a.index - b.index;
```

Toán tử `||` ở đây hoạt động vì `b.count - a.count` bằng `0` (falsy) đúng khi hai tiêu chí đầu hoà nhau.

---

## Lỗi biên thường gặp

- **Object thường ép mọi key sang chuỗi**: `obj[1]` và `obj["1"]` là cùng một ô. Tệ hơn, `Object.keys()` trả về **key dạng số theo thứ tự tăng dần** chứ không theo thứ tự chèn — bài cần giữ thứ tự sẽ sai âm thầm. `Map` giữ đúng kiểu key và đúng thứ tự chèn
- `map.get(k)` trả `undefined` khi chưa có key. `undefined + 1` ra `NaN`, và `NaN` lan ra toàn bộ phép tính sau đó mà không ném lỗi. Luôn `?? 0`
- Kiểm tra tồn tại bằng `if (map.get(k))` là sai khi giá trị hợp lệ là `0` hoặc `false` — dùng `map.has(k)`
- Object có sẵn key kế thừa: `"toString" in {}` là `true`, và key `"__proto__"` không gán được như bình thường. `Map` không dính bẫy này
- Thứ tự ghi/đọc trong bài Two Sum: phải **tra cứu trước, ghi nhận sau**, nếu không một phần tử sẽ tự ghép với chính nó khi `target` gấp đôi nó
- `map.size` là **thuộc tính**, `arr.length` cũng vậy, nhưng `str.length` và `set.size` khác tên — nhầm `.length` trên `Map`/`Set` cho ra `undefined`
- Dùng mảng hoặc object làm key của `Map` thì so sánh theo **tham chiếu**, hai mảng nội dung giống hệt nhau vẫn là hai key khác nhau. Muốn so sánh theo nội dung thì phải tự sinh khoá chuỗi
- `[...word].sort()` an toàn với ký tự Unicode nhiều byte, còn `word.split('')` cắt sai emoji và ký tự ngoài BMP
- Sort số bằng `arr.sort()` không truyền comparator sẽ so sánh **theo chuỗi** (`[10, 9]` giữ nguyên) — luôn `sort((a, b) => a - b)`

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | ⬜ |
| [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | Easy | ⬜ |
| [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Easy | ⬜ |
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Medium | ⬜ |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | ⬜ |
| [완주하지 못한 선수](https://school.programmers.co.kr/learn/courses/30/lessons/42576) | Level 1 | ⬜ |
| [전화번호 목록](https://school.programmers.co.kr/learn/courses/30/lessons/42577) | Level 2 | ⬜ |
| [베스트앨범](https://school.programmers.co.kr/learn/courses/30/lessons/42579) | Level 3 | ⬜ |
