# Tuần 3 · Phần 3 — DFS (Depth-First Search)

> [⬅ BFS](02-bfs.md) · Tiếp theo: [Dijkstra](04-dijkstra.md)

## Ý tưởng cốt lõi

- Đi **sâu hết mức** theo một nhánh rồi mới quay lại nhánh khác; cài bằng **đệ quy** (ngắn gọn) hoặc **Stack tường minh** (an toàn với đồ thị lớn)
- DFS **không** cho đường đi ngắn nhất, đổi lại nó rất hợp với các câu hỏi "có/không" và "đếm": liên thông, chu trình, liệt kê mọi khả năng
- Độ phức tạp `O(V + E)`, giống BFS — chọn cái nào phụ thuộc câu hỏi của đề, không phải tốc độ

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Flood fill** | gặp ô chưa thăm thì DFS "nhuộm" cả vùng, đếm số lần khởi động | Number of Islands, 무인도 여행 |
| **Đếm thành phần liên thông** | vòng lặp qua mọi đỉnh, mỗi lần khởi động DFS là một thành phần | Number of Provinces |
| **Phát hiện chu trình (có hướng)** | 3 trạng thái: `0` chưa thăm, `1` đang trong ngăn xếp, `2` đã xong. Gặp lại `1` → có chu trình | Course Schedule |
| **DFS ngược từ biên** | xuất phát từ các ô biên, đi ngược điều kiện, giao hai tập kết quả | Pacific Atlantic Water Flow |
| **Backtracking** | thử → đệ quy → **hoàn tác**, liệt kê mọi tổ hợp/hoán vị | 타겟 넘버, 여행경로 |

---

## Ví dụ cơ bản — đếm thành phần liên thông

```js
const countComponents = (n, graph) => {
  const visited = new Array(n).fill(false);

  const dfs = (node) => {
    visited[node] = true;
    for (const next of graph[node]) {
      if (!visited[next]) dfs(next);
    }
  };

  let count = 0;
  for (let node = 0; node < n; node++) {
    if (!visited[node]) {
      dfs(node);
      count++;
    }
  }

  return count;
};
```

Flood fill trên grid — thay vì mảng `visited` riêng, có thể **ghi đè** trực tiếp lên grid nếu đề cho phép:

```js
const floodFill = (grid, r, c) => {
  const rows = grid.length;
  const cols = grid[0].length;

  if (r < 0 || r >= rows || c < 0 || c >= cols) return 0;
  if (grid[r][c] !== 1) return 0; // đã nhuộm, hoặc là nước

  grid[r][c] = 0; // đánh dấu ngay khi vào, tránh quay lại vô hạn
  let size = 1;

  for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    size += floodFill(grid, r + dr, c + dc);
  }

  return size;
};
```

---

## Ví dụ mở rộng — stack tường minh, chu trình & backtracking

DFS lặp, tránh tràn ngăn xếp khi đồ thị sâu:

```js
const dfsIterative = (graph, start) => {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue; // kiểm tra lúc POP, vì một đỉnh có thể vào stack nhiều lần

    visited.add(node);
    for (const next of graph[node]) {
      if (!visited.has(next)) stack.push(next);
    }
  }

  return visited;
};
```

Phát hiện chu trình trong đồ thị **có hướng** bằng 3 trạng thái:

```js
const hasCycle = (n, graph) => {
  const state = new Array(n).fill(0); // 0 = chưa thăm, 1 = đang duyệt, 2 = đã xong

  const dfs = (node) => {
    state[node] = 1;

    for (const next of graph[node]) {
      if (state[next] === 1) return true;              // quay lại đỉnh đang trong ngăn xếp
      if (state[next] === 0 && dfs(next)) return true;
    }

    state[node] = 2; // duyệt xong toàn bộ nhánh dưới nó
    return false;
  };

  for (let node = 0; node < n; node++) {
    if (state[node] === 0 && dfs(node)) return true;
  }

  return false;
};
```

Khung backtracking — điểm mấu chốt là **hoàn tác** sau khi đệ quy trở về:

```js
const permute = (nums) => {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  const backtrack = () => {
    if (path.length === nums.length) {
      result.push([...path]); // COPY, không push thẳng `path`
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);

      backtrack();

      path.pop();      // hoàn tác
      used[i] = false; // hoàn tác
    }
  };

  backtrack();
  return result;
};
```

---

## Lỗi biên thường gặp

- **Tràn ngăn xếp**: Node giới hạn khoảng `10^4` khung đệ quy. Grid `1000 × 1000` toàn đất có thể sâu `10^6` bước → phải chuyển sang bản dùng stack tường minh
- Đánh dấu `visited` **trước khi** gọi đệ quy vào đỉnh đó, không phải sau — nếu không sẽ lặp vô hạn trên đồ thị có chu trình
- Bản đệ quy kiểm tra `visited` lúc **vào hàm**; bản dùng stack kiểm tra lúc **pop** (vì một đỉnh có thể được push nhiều lần trước khi được xử lý)
- Backtracking quên `path.pop()` hoặc quên `used[i] = false` → kết quả lẫn lộn giữa các nhánh
- `result.push(path)` push **tham chiếu**: mọi phần tử trong `result` sẽ cùng trỏ tới một mảng đã bị sửa. Luôn `[...path]`
- Chu trình trong đồ thị **vô hướng** khác đồ thị **có hướng**: đồ thị vô hướng phải bỏ qua đỉnh cha, còn kỹ thuật 3 trạng thái ở trên chỉ dành cho đồ thị có hướng
- Ghi đè lên grid gốc là mẹo tiết kiệm bộ nhớ, nhưng **phá dữ liệu đầu vào** — cẩn thận nếu còn cần dùng lại grid (ví dụ bài phải chạy hai lượt như Pacific Atlantic)
- 여행경로: khi có nhiều hành trình hợp lệ, đề yêu cầu chọn hành trình **nhỏ nhất theo thứ tự alphabet** → phải sort danh sách kề trước khi DFS

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Medium | ⬜ |
| [Course Schedule](https://leetcode.com/problems/course-schedule/) | Medium | ⬜ |
| [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Medium | ⬜ |
| [타겟 넘버](https://school.programmers.co.kr/learn/courses/30/lessons/43165) | Level 2 | ⬜ |
| [무인도 여행](https://school.programmers.co.kr/learn/courses/30/lessons/154540) | Level 2 | ⬜ |
