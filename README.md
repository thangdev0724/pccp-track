# PCCP Practice

Repo luyện thuật toán chuẩn bị cho kỳ thi **PCCP** (và các đề coding test kiểu LeetCode / Programmers), viết bằng **JavaScript**.

Mỗi tuần là một thư mục gồm ba loại file:

| Loại file | Vai trò |
| --- | --- |
| `README.md` | mục lục của tuần: tổng quan, bảng nhận diện bài toán, danh sách bài tập + trạng thái |
| `0X-<chu-de>.md` | lý thuyết từng chủ đề: ý tưởng cốt lõi, ví dụ code, **lỗi biên thường gặp** |
| `<tenHam>.js` | bài làm — chỉ có link đề, JSDoc và hàm rỗng. Lời giải do người học tự viết |

---

## Lộ trình

| Tuần | Chủ đề | Bài tập | Tiến độ |
| --- | --- | --- | --- |
| 1 | [Stack · Queue · Hashmap](week1/README.md) | 12 | 0 / 12 |
| 2 | [Two Pointers · Sliding Window · Binary Search · Greedy](week2/README.md) | 13 | 4 / 13 |
| 3 | [Biểu diễn đồ thị · BFS · DFS · Dijkstra](week3/README.md) | 14 | 0 / 14 · mock test #1 |
| 4 | [Tư duy DP · Prefix Sum · DP 1 chiều · DP 2 chiều](week4/README.md) | 10 | 0 / 10 · mock test #2 |

**Tổng: 4 / 49 bài.**

---

## Mục lục lý thuyết

### [Tuần 1 — Stack, Queue & Hashmap](week1/README.md)

1. [Stack](week1/01-stack.md) — LIFO, ghép cặp, monotonic stack
2. [Queue](week1/02-queue.md) — FIFO, duyệt theo lớp, monotonic deque
3. [Hashmap & Hashset](week1/03-hashmap.md) — tra cứu, đếm tần suất, gom nhóm

### [Tuần 2 — Two Pointers, Sliding Window, Binary Search & Greedy](week2/README.md)

1. [Two Pointers](week2/01-two-pointers.md) — đối xứng & cùng chiều
2. [Sliding Window](week2/02-sliding-window.md) — fixed-size & variable-size
3. [Binary Search](week2/03-binary-search.md) — chuẩn, boundary, on-answer, rotated
4. [Greedy](week2/04-greedy.md) — sort + duyệt tuyến tính, monotonic stack

### [Tuần 3 — Graph](week3/README.md)

1. [Biểu diễn đồ thị](week3/01-graph-representation.md) — adjacency list, matrix, grid
2. [BFS](week3/02-bfs.md) — khoảng cách ngắn nhất, theo lớp, multi-source
3. [DFS](week3/03-dfs.md) — flood fill, liên thông, chu trình, backtracking
4. [Dijkstra](week3/04-dijkstra.md) — đường đi ngắn nhất có trọng số

### [Tuần 4 — Prefix Sum & Dynamic Programming](week4/README.md)

1. [Tư duy tiếp cận DP](week4/01-dp-mindset.md) — top-down, bottom-up, rolling array
2. [Prefix Sum](week4/02-prefix-sum.md) — 1D, + hashmap, 2D, difference array
3. [DP 1 chiều](week4/03-dp-1d.md) — truy hồi cố định, Kadane, DP theo giá trị
4. [DP 2 chiều](week4/04-dp-2d.md) — lưới, hai chuỗi, 0/1 knapsack

---

## Bản đồ kỹ thuật

Bảng tổng hợp toàn bộ kỹ thuật đã học — dùng để tra nhanh khi gặp đề lạ:
**[Bảng tổng hợp kỹ thuật](week4/README.md#bảng-tổng-hợp-kỹ-thuật-ôn-lại-cả-4-tuần)**

Ngoài ra mỗi tuần đều có một bảng **"Gợi ý nhận diện bài toán"** ánh xạ từ khoá trong đề sang kỹ thuật nên thử trước.

---

## Quy ước

- **File `.js` không chứa lời giải mẫu.** Chỉ có comment link đề bài, JSDoc khớp signature gốc, và thân hàm rỗng
- Tên file LeetCode = đúng tên hàm trong signature (`twoSum.js`, `canFinish.js`); tên file Programmers = tên tiếng Anh mô tả bài (`lifeboat.js`, `unbrokenBuildings.js`), hàm luôn tên `solution`
- Trạng thái bài tập trong README: `⬜` chưa giải · `✅ [tenFile.js](tenFile.js)` đã giải. Giải xong nhớ cập nhật ở **cả** README của tuần và file lý thuyết của chủ đề tương ứng
- Tuần mới được sinh bằng skill [`/new-week`](.claude/skills/new-week/SKILL.md)
