# Tuần 1 — Stack, Queue & Hashmap

## Tổng quan

Tuần đầu tiên tập trung vào việc thiết lập nền tảng cho cả chương trình: giới thiệu **format đề thi PCCP** và ôn lại ba cấu trúc dữ liệu xuất hiện thường xuyên nhất trong các bài toán độ khó Easy–Medium: **Stack**, **Queue**, và **Hashmap**. Đây là những "công cụ" cơ bản nhưng lại quyết định tốc độ giải bài rất nhiều — nắm chắc khi nào nên dùng cấu trúc nào sẽ giúp giảm đáng kể thời gian suy nghĩ hướng giải trong lúc thi.

Ba cấu trúc này cũng là **nền của mọi tuần sau**: Queue là lõi của BFS ([tuần 3](../week3/02-bfs.md)), monotonic stack quay lại ở Greedy ([tuần 2](../week2/04-greedy.md)), còn Hashmap kết hợp với Prefix Sum thành một dạng bài riêng ở [tuần 4](../week4/02-prefix-sum.md).

### Mục tiêu sau tuần 1

- Hiểu rõ đặc tính **LIFO** của Stack và **FIFO** của Queue, biết khi nào bài toán "gợi ý" dùng cấu trúc nào
- Thành thạo **Hashmap/Hashset** để tối ưu độ phức tạp từ `O(n²)` xuống `O(n)` trong các bài tìm kiếm, đếm tần suất
- Cài đặt đúng ba cấu trúc này **bằng JavaScript**, tránh các bẫy đặc thù của ngôn ngữ (`shift()` là `O(n)`, object ép key sang chuỗi)
- Làm quen với format đề thi PCCP: số lượng câu, thang điểm, cách chấm theo test case

---

## Mục lục kiến thức

| Phần | Nội dung | Độ phức tạp đạt được |
| --- | --- | --- |
| 1 | [Stack](01-stack.md) — LIFO, ghép cặp, monotonic stack | `O(n²)` → `O(n)` |
| 2 | [Queue](02-queue.md) — FIFO, duyệt theo lớp, monotonic deque | thao tác `O(1)` |
| 3 | [Hashmap & Hashset](03-hashmap.md) — tra cứu, đếm tần suất, gom nhóm | `O(n²)` → `O(n)` |

---

## Gợi ý nhận diện bài toán

| Dấu hiệu trong đề bài | Kỹ thuật nên nghĩ tới |
| --- | --- |
| "ngoặc hợp lệ", "đóng/mở phải khớp nhau" | [**Stack**](01-stack.md) |
| "phần tử lớn hơn/nhỏ hơn **gần nhất**", "phải chờ bao lâu đến khi..." | [**Stack**](01-stack.md) (monotonic) |
| "hoàn tác", "quay lại trạng thái trước" | [**Stack**](01-stack.md) |
| "duyệt theo lớp/theo tầng", "khoảng cách ngắn nhất không trọng số" | [**Queue**](02-queue.md) (BFS) |
| "xử lý theo thứ tự đến trước", mô phỏng hàng đợi | [**Queue**](02-queue.md) |
| "max/min của mọi cửa sổ trượt" | [**Queue**](02-queue.md) (monotonic deque) |
| "kiểm tra tồn tại", "có phần tử trùng không" | [**Hashset**](03-hashmap.md) |
| "đếm số lần xuất hiện", "phần tử xuất hiện nhiều nhất" | [**Hashmap**](03-hashmap.md) |
| "tìm cặp giá trị thoả điều kiện", "gom nhóm theo đặc điểm chung" | [**Hashmap**](03-hashmap.md) |

---

## Bài tập

### LeetCode

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 1 | [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | Hashmap | ⬜ |
| 2 | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | Easy | Stack | ⬜ |
| 3 | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | Easy | Hashset | ⬜ |
| 4 | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Easy | Hashmap | ⬜ |
| 5 | [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) | Easy | Stack (monotonic) | ⬜ |
| 6 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Medium | Hashmap | ⬜ |
| 7 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | Hashmap | ⬜ |
| 8 | [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) | Medium | Stack (monotonic) | ⬜ |

### Programmers

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 9 | [완주하지 못한 선수](https://school.programmers.co.kr/learn/courses/30/lessons/42576) | Level 1 | Hashmap | ⬜ |
| 10 | [전화번호 목록](https://school.programmers.co.kr/learn/courses/30/lessons/42577) | Level 2 | Hashset | ⬜ |
| 11 | [주식가격](https://school.programmers.co.kr/learn/courses/30/lessons/42584) | Level 2 | Stack (monotonic) | ⬜ |
| 12 | [베스트앨범](https://school.programmers.co.kr/learn/courses/30/lessons/42579) | Level 3 | Hashmap + Sort | ⬜ |
