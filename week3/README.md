# Tuần 3 — Biểu diễn đồ thị, BFS, DFS & Dijkstra

## Tổng quan

Tuần 3 là tuần "nặng" nhất về mặt kiến thức thuật toán, khi cả nhóm bước vào chuyên đề **Graph (đồ thị)** — một trong những dạng bài xuất hiện thường xuyên ở các bài Medium–Hard trong đề thi PCCP. Điểm khó của đồ thị không nằm ở việc thuộc code BFS/DFS (hai đoạn code này rất ngắn), mà ở chỗ **nhận ra bài toán là đồ thị**: một lưới ô vuông, một danh sách môn học tiên quyết, hay một tập chuỗi khác nhau đúng một ký tự — tất cả đều là đồ thị được nguỵ trang.

Đây cũng là tuần diễn ra buổi **mock test đầu tiên**, nhằm đánh giá năng lực thực tế của cả nhóm sau 2 tuần luyện nền tảng ([Tuần 2](../week2/README.md)), trước khi bước vào giai đoạn tổng hợp ở tuần 4.

### Mục tiêu sau tuần 3

- Nắm chắc hai kỹ thuật duyệt đồ thị cơ bản: **BFS** và **DFS**, và biết khi nào nên dùng cái nào
- Hiểu và cài đặt được thuật toán **Dijkstra** để tìm đường đi ngắn nhất có trọng số (kèm min-heap tự viết, vì JS không có sẵn)
- Làm quen với cách biểu diễn đồ thị trong bài toán thực tế: **grid** (lưới 2D), **adjacency list**, **adjacency matrix**
- Hoàn thành buổi mock test đầu tiên và tự đánh giá được điểm mạnh/yếu của bản thân

---

## Mục lục kiến thức

| Phần | Nội dung | Độ phức tạp đạt được |
| --- | --- | --- |
| 1 | [Biểu diễn đồ thị](01-graph-representation.md) — adjacency list, matrix, grid | `O(V + E)` bộ nhớ |
| 2 | [BFS](02-bfs.md) — khoảng cách ngắn nhất, theo lớp, multi-source | `O(V + E)` |
| 3 | [DFS](03-dfs.md) — flood fill, liên thông, chu trình, backtracking | `O(V + E)` |
| 4 | [Dijkstra](04-dijkstra.md) — đường đi ngắn nhất có trọng số | `O((V + E) log V)` |

---

## Gợi ý nhận diện bài toán

| Dấu hiệu trong đề bài | Kỹ thuật nên nghĩ tới |
| --- | --- |
| "khoảng cách ngắn nhất", "số bước ít nhất", mọi cạnh chi phí như nhau | [**BFS**](02-bfs.md) |
| "sau bao nhiêu phút thì lan hết", nhiều điểm xuất phát cùng lúc | [**BFS**](02-bfs.md) (multi-source) |
| "đếm số vùng/đảo", "liên thông", "có bao nhiêu nhóm" | [**DFS**](03-dfs.md) (flood fill) |
| "có thể hoàn thành không", "phụ thuộc/tiên quyết", "thứ tự hợp lệ" | [**DFS**](03-dfs.md) (phát hiện chu trình) |
| "liệt kê mọi cách", "đếm số cách", "duyệt hết mọi khả năng" | [**DFS**](03-dfs.md) (backtracking) |
| "chi phí/thời gian nhỏ nhất" nhưng mỗi cạnh có **trọng số khác nhau** | [**Dijkstra**](04-dijkstra.md) |
| "tối thiểu hoá giá trị lớn nhất trên đường đi" | [**Dijkstra**](04-dijkstra.md) (đổi `+` thành `max`) |
| Đề cho `edges` / `prerequisites` / ma trận `isConnected` | [**Biểu diễn đồ thị**](01-graph-representation.md) — dựng graph trước đã |

---

## Bài tập

### LeetCode

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 1 | [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Medium | DFS | ✅ [numIslands.js](numIslands.js) |
| 2 | [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) | Medium | Biểu diễn đồ thị | ⬜ |
| 3 | [Open the Lock](https://leetcode.com/problems/open-the-lock/) | Medium | BFS | ⬜ |
| 4 | [Course Schedule](https://leetcode.com/problems/course-schedule/) | Medium | DFS | ⬜ |
| 5 | [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | Medium | BFS | ⬜ |
| 6 | [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Medium | DFS | ⬜ |
| 7 | [Network Delay Time](https://leetcode.com/problems/network-delay-time/) | Medium | Dijkstra | ⬜ |
| 8 | [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Medium | Dijkstra | ⬜ |
| 9 | [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) | Medium | Dijkstra | ⬜ |

### Programmers

| # | Bài | Độ khó | Kỹ thuật | Trạng thái |
| --- | --- | --- | --- | --- |
| 10 | [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844) | Level 2 | BFS | ⬜ |
| 11 | [여행경로](https://school.programmers.co.kr/learn/courses/30/lessons/43164) | Level 3 | Biểu diễn đồ thị + DFS | ⬜ |
| 12 | [타겟 넘버](https://school.programmers.co.kr/learn/courses/30/lessons/43165) | Level 2 | DFS | ⬜ |
| 13 | [단어 변환](https://school.programmers.co.kr/learn/courses/30/lessons/43163) | Level 3 | BFS | ⬜ |
| 14 | [무인도 여행](https://school.programmers.co.kr/learn/courses/30/lessons/154540) | Level 2 | DFS | ⬜ |
