# Tuần 2 — Two Pointers, Sliding Window, Binary Search & Greedy

## Tổng quan

Tuần 2 tập trung vào ba kỹ thuật xuất hiện với tần suất rất cao trong các đề thi thực tế: **Two Pointers**, **Sliding Window**, và **Binary Search**. Đây đều là những kỹ thuật giúp giảm độ phức tạp từ `O(n²)` xuống `O(n)` hoặc `O(log n)`, thường là "chìa khóa" để một bài toán Medium trở nên dễ giải quyết trong giới hạn thời gian thi.

### Mục tiêu sau tuần 2

- Nhận diện được khi nào bài toán trên mảng/chuỗi **đã sắp xếp** hoặc **có tính đơn điệu** thì nên dùng Two Pointers hoặc Binary Search
- Thành thạo kỹ thuật Sliding Window (cả kích thước cố định lẫn kích thước thay đổi) để xử lý bài toán về substring/subarray
- Tránh các lỗi thường gặp về điều kiện biên (off-by-one) khi cài đặt

---

## Mục lục kiến thức

| Phần | Nội dung | Độ phức tạp đạt được |
| --- | --- | --- |
| 1 | [Two Pointers](01-two-pointers.md) — đối xứng & cùng chiều | `O(n²)` → `O(n)` |
| 2 | [Sliding Window](02-sliding-window.md) — fixed-size & variable-size | `O(n)` |
| 3 | [Binary Search](03-binary-search.md) — chuẩn, boundary, on-answer, rotated | `O(log n)` |
| 4 | [Greedy](04-greedy.md) — sort + duyệt tuyến tính, monotonic stack | `O(n log n)` |

---

## Gợi ý nhận diện bài toán

| Dấu hiệu trong đề bài | Kỹ thuật nên nghĩ tới |
| --- | --- |
| "mảng đã sắp xếp", "tìm cặp/tổng" | [**Two Pointers**](01-two-pointers.md) |
| "substring/subarray liên tiếp thỏa điều kiện", "độ dài lớn nhất/nhỏ nhất của đoạn con" | [**Sliding Window**](02-sliding-window.md) |
| "mảng đã sắp xếp" + "tìm kiếm", hoặc đề bài có tính đơn điệu dù không phải mảng | [**Binary Search**](03-binary-search.md) |
| "tối đa/tối thiểu số lượng lựa chọn", "có thể sắp xếp rồi duyệt tuyến tính để quyết định" | [**Greedy**](04-greedy.md) |

---

## Bài tập

### LeetCode

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 1 | [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Medium | Two Pointers | ✅ [twoSum.js](twoSum.js) |
| 2 | [3Sum](https://leetcode.com/problems/3sum/) | Medium | Two Pointers | ⬜ |
| 3 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Medium | Two Pointers | ✅ [maxArea.js](maxArea.js) |
| 4 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Hard | Two Pointers | ⬜ |
| 5 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Medium | Sliding Window | ⬜ |
| 6 | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Medium | Sliding Window | ⬜ |
| 7 | [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) | Medium | Sliding Window | ⬜ |
| 8 | [Binary Search](https://leetcode.com/problems/binary-search/) | Easy | Binary Search | ⬜ |
| 9 | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Medium | Binary Search | ⬜ |
| 10 | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Medium | Binary Search | ⬜ |

### Programmers

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 11 | [보석 쇼핑](https://school.programmers.co.kr/learn/courses/30/lessons/67258) | Level 3 | Sliding Window | ⬜ |
| 12 | [큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883) | Level 2 | Greedy | ✅ |
| 13 | [구명보트](https://school.programmers.co.kr/learn/courses/30/lessons/42885) | Level 2 | Greedy + Two Pointers | ✅ |
