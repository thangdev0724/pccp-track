# Tuần 4 — Tư duy DP, Prefix Sum, DP 1 chiều & DP 2 chiều

## Tổng quan

Tuần 4 có hai nhiệm vụ song song. Thứ nhất là **tổng hợp** lại toàn bộ kiến thức đã học trong 3 tuần trước (Stack/Queue/Hashmap, Two Pointers/Sliding Window/Binary Search, Graph) thành một "bản đồ" thống nhất — biết nhìn đề bài là biết nên thử kỹ thuật nào trước. Thứ hai là bổ sung mảng kiến thức mới: **Dynamic Programming (DP) cơ bản** — dạng bài thường nằm ở vị trí câu khó nhất trong đề thi, cùng với **Prefix Sum**, kỹ thuật nhẹ về lý thuyết nhưng xuất hiện dày đặc dưới nhiều biến thể.

Cuối tuần sẽ diễn ra buổi **mock test thứ hai**, đóng vai trò là "phép thử" gần với thực tế nhất trước khi cả nhóm bước vào tuần tự ôn tập cuối cùng. Đây là dịp để đo lường tiến bộ so với mock test #1 ở [tuần 3](../week3/README.md).

### Mục tiêu sau tuần 4

- Nhận diện được bài toán DP qua hai đặc điểm: **optimal substructure** (chia được thành bài toán con) và **overlapping subproblems** (bài toán con lặp lại)
- Thành thạo **DP 1 chiều** và bước đầu làm quen **DP 2 chiều**, viết được công thức truy hồi trước khi gõ code
- Dùng thành thạo **Prefix Sum** và các biến thể: kết hợp hashmap, prefix 2D, difference array
- Tổng hợp lại bản đồ kỹ thuật của cả 4 tuần và đo được sự tiến bộ so với mock test #1

---

## Mục lục kiến thức

| Phần | Nội dung | Độ phức tạp đạt được |
| --- | --- | --- |
| 1 | [Tư duy tiếp cận DP](01-dp-mindset.md) — top-down, bottom-up, rolling array | `O(2^n)` → `O(n)` |
| 2 | [Prefix Sum](02-prefix-sum.md) — 1D, + hashmap, 2D, difference array | truy vấn `O(n)` → `O(1)` |
| 3 | [DP 1 chiều](03-dp-1d.md) — truy hồi cố định, Kadane, DP theo giá trị | `O(n)` – `O(n²)` |
| 4 | [DP 2 chiều](04-dp-2d.md) — lưới, hai chuỗi, 0/1 knapsack | `O(m × n)` |

---

## Gợi ý nhận diện bài toán

| Dấu hiệu trong đề bài | Kỹ thuật nên nghĩ tới |
| --- | --- |
| "tổng của đoạn `[l, r]`", nhiều truy vấn trên cùng một mảng | [**Prefix Sum**](02-prefix-sum.md) |
| "đếm số đoạn con có tổng bằng k" | [**Prefix Sum + Hashmap**](02-prefix-sum.md) |
| Nhiều thao tác cộng trên đoạn/vùng, chỉ đọc kết quả ở cuối | [**Difference Array**](02-prefix-sum.md) |
| "có bao nhiêu cách", "số cách đi tới..." | [**DP**](01-dp-mindset.md) — đếm, khởi tạo base case `= 1` |
| "tối đa/tối thiểu" nhưng thử tham lam thì tìm được phản ví dụ | [**DP**](03-dp-1d.md) thay vì Greedy |
| Kết quả tại vị trí `i` phụ thuộc vài vị trí liền trước | [**DP 1 chiều**](03-dp-1d.md) |
| Bài toán liên quan tới **hai chuỗi/hai dãy**, hoặc di chuyển trên lưới | [**DP 2 chiều**](04-dp-2d.md) |
| "chọn một tập con sao cho tổng bằng...", mỗi món dùng tối đa 1 lần | [**DP 2 chiều**](04-dp-2d.md) — 0/1 knapsack |
| Đệ quy vét cạn ra `O(2^n)` và thấy bài con bị tính lại | [**Memoization**](01-dp-mindset.md) |

---

## Bảng tổng hợp kỹ thuật (ôn lại cả 4 tuần)

| Kỹ thuật | Dấu hiệu nhận biết | Độ phức tạp |
| --- | --- | --- |
| [Stack](../week1/01-stack.md) | Ngoặc hợp lệ, phần tử liền kề lớn/nhỏ hơn | → `O(n)` |
| [Queue](../week1/02-queue.md) / [BFS](../week3/02-bfs.md) | Duyệt theo lớp, khoảng cách ngắn nhất không trọng số | → `O(V + E)` |
| [Hashmap](../week1/03-hashmap.md) | Đếm tần suất, kiểm tra tồn tại, tìm cặp giá trị | `O(n²)` → `O(n)` |
| [Two Pointers](../week2/01-two-pointers.md) | Mảng đã sắp xếp, tìm cặp/tổng | `O(n²)` → `O(n)` |
| [Sliding Window](../week2/02-sliding-window.md) | Subarray/substring liên tiếp thoả điều kiện | `O(n²)` → `O(n)` |
| [Binary Search](../week2/03-binary-search.md) | Mảng đã sắp xếp, tính đơn điệu | `O(n)` → `O(log n)` |
| [Greedy](../week2/04-greedy.md) | Sort xong duyệt tuyến tính là ra đáp án | `O(n log n)` |
| [DFS](../week3/03-dfs.md) | Liên thông, đếm vùng, duyệt hết khả năng | → `O(V + E)` |
| [Dijkstra](../week3/04-dijkstra.md) | Đường đi ngắn nhất có trọng số không âm | → `O((V + E) log V)` |
| [Prefix Sum](02-prefix-sum.md) | Truy vấn tổng đoạn lặp đi lặp lại | truy vấn `O(1)` |
| [DP](01-dp-mindset.md) | Bài toán con lặp lại, tối ưu hoá lựa chọn | `O(2^n)` → `O(n)` / `O(n²)` |

---

## Bài tập

### LeetCode

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 1 | [Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/) | Easy | Prefix Sum | ⬜ |
| 2 | [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | Easy | Tư duy DP | ⬜ |
| 3 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | Prefix Sum + Hashmap | ⬜ |
| 4 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Medium | DP 1 chiều | ⬜ |
| 5 | [Coin Change](https://leetcode.com/problems/coin-change/) | Medium | DP 1 chiều | ⬜ |
| 6 | [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) | Medium | DP 1 chiều | ⬜ |
| 7 | [Unique Paths](https://leetcode.com/problems/unique-paths/) | Medium | DP 2 chiều | ⬜ |
| 8 | [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) | Medium | DP 2 chiều | ⬜ |
| 9 | [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) | Medium | DP 2 chiều (0/1 knapsack) | ⬜ |

### Programmers

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 10 | [파괴되지 않은 건물](https://school.programmers.co.kr/learn/courses/30/lessons/92344) | Level 3 | Difference Array 2D | ⬜ |
