---
name: new-week
description: Tạo một tuần học mới (weekN) cho repo pccp-practice — sinh README.md mục lục, các file lý thuyết 0X-<chu-de>.md, và các file .js stub (chỉ có function rỗng, KHÔNG có lời giải). Dùng khi user nói "thêm tuần mới", "tạo tuần 3", "gen week4", "tạo bài tập tuần mới".
---

# Tạo tuần học mới

Sinh ra một thư mục `weekN/` có cấu trúc giống hệt `week2/` đã có sẵn trong repo.

**Nguyên tắc bất di bất dịch: file `.js` chỉ chứa comment link + JSDoc + function rỗng. TUYỆT ĐỐI không viết lời giải, không viết gợi ý thuật toán trong file js, không thêm test/console.log.** Người dùng tự giải — đây là repo luyện tập.

## Bước 1 — Thu thập input

Cần biết 3 thứ:

1. **Số tuần** (`N`) — nếu user không nói, lấy số lớn nhất trong các thư mục `week*` hiện có rồi +1.
2. **Các chủ đề** (3–4 chủ đề/tuần) — nếu user không nói, đề xuất theo lộ trình rồi hỏi xác nhận bằng `AskUserQuestion`.
3. **Danh sách bài tập** — mỗi bài gồm: tên, link, độ khó, chủ đề, nguồn (LeetCode / Programmers).
   Nếu user không liệt kê, tự đề xuất ~10 bài LeetCode + ~3 bài Programmers bám sát các chủ đề, rồi trình bày cho user duyệt trước khi tạo file.

Gợi ý lộ trình tiếp theo nếu user để mình chọn chủ đề:

| Tuần | Cụm chủ đề gợi ý |
| --- | --- |
| 3 | Hash Map & Set · Stack & Queue · Prefix Sum · Sorting nâng cao |
| 4 | Linked List · Tree (DFS/BFS) · Heap / Priority Queue |
| 5 | Graph (BFS/DFS/Topological Sort) · Union-Find · Dijkstra |
| 6 | DP 1 chiều · DP 2 chiều · Backtracking · Bit manipulation |

Kiểm tra thư mục trước khi ghi. **Không ghi đè file `.js` đã tồn tại** (có thể user đã giải dở) — báo lại là đã bỏ qua.

## Bước 2 — Tạo file lý thuyết `0X-<slug>.md`

Một file cho mỗi chủ đề, đánh số `01`, `02`, ... theo thứ tự, slug kebab-case tiếng Anh (`01-two-pointers.md`, `02-sliding-window.md`).

Toàn bộ nội dung viết bằng **tiếng Việt** (giữ nguyên thuật ngữ tiếng Anh cho tên kỹ thuật), theo đúng khung sau:

````markdown
# Tuần {N} · Phần {i} — {Tên chủ đề}

> [⬅ Mục lục tuần {N}](README.md) · Tiếp theo: [{Chủ đề kế}]({file kế}.md)

## Ý tưởng cốt lõi

- 2–3 gạch đầu dòng: ý tưởng chính và độ phức tạp đạt được

## {Các dạng phổ biến}

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |

---

## Ví dụ cơ bản — {tên dạng}

{1–2 câu mô tả}

```js
// code mẫu ngắn, chạy được, dùng arrow function hoặc const
```

---

## Ví dụ mở rộng — {tên dạng}

```js
```

---

## Lỗi biên thường gặp

- 4–6 gạch đầu dòng, tập trung vào off-by-one, điều kiện `while`, đặc thù JS
  (ví dụ `sort()` mặc định so sánh chuỗi, `Map` vs object, tràn số...)

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [{Tên bài}]({link}) | {Medium} | ⬜ |
````

Quy ước:
- Dòng `>` ở đầu là breadcrumb: file cuối cùng thì ghi `Tiếp theo:` trỏ về `README.md` hoặc bỏ vế đó.
- Cột **Trạng thái**: `⬜` khi chưa giải, `✅ [tenFile.js](tenFile.js)` khi đã giải. Tuần mới luôn bắt đầu bằng `⬜` cho tất cả.
- Mỗi bài tập phải xuất hiện ở đúng file chủ đề của nó, và cũng xuất hiện trong bảng tổng ở README.

## Bước 3 — Tạo `README.md` của tuần

````markdown
# Tuần {N} — {Chủ đề 1}, {Chủ đề 2} & {Chủ đề 3}

## Tổng quan

{1–2 đoạn: vì sao cụm kỹ thuật này quan trọng trong đề thi thực tế}

### Mục tiêu sau tuần {N}

- 3–4 gạch đầu dòng mô tả năng lực đạt được

---

## Mục lục kiến thức

| Phần | Nội dung | Độ phức tạp đạt được |
| --- | --- | --- |
| 1 | [{Chủ đề 1}](01-....md) — {mô tả ngắn} | `O(n)` |

---

## Gợi ý nhận diện bài toán

| Dấu hiệu trong đề bài | Kỹ thuật nên nghĩ tới |
| --- | --- |
| "{từ khóa hay gặp trong đề}" | [**{Chủ đề}**](0X-....md) |

---

## Bài tập

### LeetCode

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 1 | [{Tên}]({link}) | Medium | {Chủ đề} | ⬜ |

### Programmers

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 11 | [{Tên tiếng Hàn}]({link}) | Level 2 | {Chủ đề} | ⬜ |
````

Đánh số `#` chạy liên tục qua cả hai bảng (LeetCode 1..n, Programmers tiếp tục n+1...).

## Bước 4 — Tạo file `.js` stub

Một file cho mỗi bài trong danh sách, đặt thẳng trong `weekN/`.

**Đặt tên file:**
- LeetCode → đúng tên hàm trong signature của LeetCode, camelCase: `threeSum.js`, `lengthOfLongestSubstring.js`, `minSubArrayLen.js`.
- Programmers → tên tiếng Anh mô tả bài, camelCase: `gemShopping.js`, `lifeboat.js`, `largeNumbers.js`.
- Nếu trùng tên hàm giữa hai bài (ví dụ `search`), thêm hậu tố phân biệt cho bài sau: `searchRotated.js`.

**Nội dung LeetCode** — đúng 3 phần, không hơn:

```js
// {link đề bài}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var functionName = function (nums, target) {};
```

**Nội dung Programmers** — hàm luôn tên `solution`:

```js
// {link đề bài}
/**
 * @param {string[]} gems
 * @return {number[]}
 */
function solution(gems) {}
```

Tên và kiểu tham số phải khớp signature gốc của đề. Thân hàm để **rỗng hoàn toàn**.

## Bước 5 — Báo cáo

Trả về cho user một bảng: `#` · tên bài · file vừa tạo. Nêu rõ:
- file nào bị bỏ qua vì đã tồn tại,
- lựa chọn đặt tên nào lệch khỏi tên hàm gốc và vì sao.

Không tự ý chạy `git`, không tự ý sửa các tuần cũ.
