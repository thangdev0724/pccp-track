# Tuần 3 · Phần 1 — Biểu diễn đồ thị

> [⬅ Mục lục tuần 3](README.md) · Tiếp theo: [BFS](02-bfs.md)

## Ý tưởng cốt lõi

- Trước khi duyệt được đồ thị, phải chọn cách **lưu** nó. Cách lưu quyết định độ phức tạp của mọi thao tác về sau
- **Adjacency list** tốn `O(V + E)` bộ nhớ và duyệt hàng xóm trong `O(deg(u))` — đây là lựa chọn mặc định cho gần như mọi bài thi
- Rất nhiều bài "grid" thực chất là **đồ thị ẩn**: mỗi ô là một đỉnh, 4 (hoặc 8) ô liền kề là cạnh — không cần dựng thêm cấu trúc nào cả

## Ba cách biểu diễn

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Adjacency List** | `Map` hoặc mảng các mảng: `graph[u] = [v1, v2, ...]` | đồ thị thưa, đề cho `edges`/`prerequisites`/`tickets` |
| **Adjacency Matrix** | mảng 2 chiều: `m[u][v] = 1` nếu có cạnh | đồ thị dày, hoặc đề **cho sẵn** ma trận (`isConnected`) |
| **Grid (lưới 2D)** | không dựng gì, coi `(r, c)` là đỉnh, 4 hướng là cạnh | đếm đảo, lan truyền trạng thái, tìm đường trong mê cung |

Quy đổi nhanh: `V` đỉnh, `E` cạnh → list tốn `O(V + E)` bộ nhớ nhưng kiểm tra "có cạnh `u–v` không" mất `O(deg(u))`; matrix tốn `O(V²)` bộ nhớ nhưng kiểm tra cạnh trong `O(1)`.

---

## Ví dụ cơ bản — dựng Adjacency List từ danh sách cạnh

Đề thường cho `n` đỉnh (đánh số `0..n-1`) và mảng `edges`. Dùng mảng các mảng cho nhanh:

```js
const buildGraph = (n, edges) => {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u); // bỏ dòng này nếu là đồ thị CÓ HƯỚNG
  }

  return graph;
};
```

Khi đỉnh không phải số liên tiếp (tên sân bay, chuỗi từ...), dùng `Map`:

```js
const buildGraphMap = (edges) => {
  const graph = new Map();

  for (const [u, v] of edges) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  return graph;
};
```

Đồ thị **có trọng số** thì phần tử là cặp `[đỉnh, trọng số]`:

```js
const buildWeightedGraph = (n, edges) => {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
  }

  return graph;
};
```

---

## Ví dụ mở rộng — grid như đồ thị ẩn

Bốn hướng đi và hàm kiểm tra biên là hai thứ lặp lại ở gần như mọi bài grid:

```js
const DIRS = [
  [-1, 0], // lên
  [1, 0],  // xuống
  [0, -1], // trái
  [0, 1],  // phải
];

const neighbors = (grid, r, c) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const result = [];

  for (const [dr, dc] of DIRS) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      result.push([nr, nc]);
    }
  }

  return result;
};
```

Mảng `visited` cho grid — luôn tạo bằng `Array.from`, **không** dùng `fill` với mảng:

```js
const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
```

Khi cần đưa toạ độ `(r, c)` vào `Set` (ví dụ Pacific Atlantic), mã hoá thành số hoặc chuỗi:

```js
const key = r * cols + c; // nhanh hơn `${r},${c}`
```

Chuyển adjacency **matrix** sang **list** (khi đề cho ma trận nhưng muốn duyệt kiểu list):

```js
const matrixToList = (m) => {
  const n = m.length;
  const graph = Array.from({ length: n }, () => []);

  for (let u = 0; u < n; u++) {
    for (let v = 0; v < n; v++) {
      if (u !== v && m[u][v] === 1) graph[u].push(v);
    }
  }

  return graph;
};
```

---

## Lỗi biên thường gặp

- `new Array(n).fill([])` tạo ra **n tham chiếu tới cùng một mảng** — push vào `graph[0]` thì `graph[5]` cũng đổi theo. Luôn dùng `Array.from({ length: n }, () => [])`
- Đồ thị **vô hướng** phải push cả hai chiều; đồ thị **có hướng** (Course Schedule, 여행경로) chỉ push một chiều — nhầm chỗ này là sai toàn bộ bài
- Đỉnh đánh số **từ 1** (Network Delay Time) chứ không phải từ 0: nhớ cấp phát `n + 1` phần tử hoặc trừ 1 khi đánh chỉ số
- Dùng object thường (`{}`) làm graph thì key số bị **ép sang chuỗi** — `Object.keys()` trả về `["0", "1"]`, so sánh `===` với số sẽ sai. Dùng `Map` hoặc mảng
- Grid: phải kiểm tra biên **trước khi** truy cập `grid[nr][nc]`, vì `grid[-1]` là `undefined` và `undefined[0]` thì ném lỗi
- Grid không vuông: `grid.length` là số **hàng**, `grid[0].length` mới là số **cột** — đảo hai cái này là lỗi kinh điển
- Đề có thể có cạnh lặp hoặc self-loop; BFS/DFS vẫn chạy đúng nhờ `visited`, nhưng đếm bậc (indegree) thì phải cẩn thận

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) | Medium | ⬜ |
| [여행경로](https://school.programmers.co.kr/learn/courses/30/lessons/43164) | Level 3 | ⬜ |
