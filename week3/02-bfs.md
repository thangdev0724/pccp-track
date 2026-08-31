# Tuần 3 · Phần 2 — BFS (Breadth-First Search)

> [⬅ Biểu diễn đồ thị](01-graph-representation.md) · Tiếp theo: [DFS](03-dfs.md)

## Ý tưởng cốt lõi

- Duyệt theo từng **lớp**: xử lý hết mọi đỉnh cách nguồn `k` bước rồi mới sang các đỉnh cách `k + 1` bước, cài bằng **Queue**
- Vì đi theo lớp nên lần **đầu tiên** chạm tới một đỉnh chính là đường đi ngắn nhất tới đỉnh đó — chỉ đúng khi đồ thị **không trọng số** (mọi cạnh coi như dài 1)
- Độ phức tạp `O(V + E)`; với grid `R × C` là `O(R × C)` vì mỗi ô chỉ vào queue đúng một lần

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **BFS khoảng cách** | `dist` map/mảng, gán `dist[v] = dist[u] + 1` khi lần đầu chạm `v` | 게임 맵 최단거리, số bước ít nhất |
| **BFS theo lớp** | mỗi vòng `while` xử lý trọn `queue.length` phần tử hiện tại, tăng biến `steps` | Rotting Oranges, 단어 변환 |
| **Multi-source BFS** | nạp **tất cả** nguồn vào queue ngay từ đầu với `dist = 0` | cam thối lan đồng thời, khoảng cách tới ô gần nhất |
| **BFS trên đồ thị trạng thái** | "đỉnh" là một trạng thái (chuỗi khoá, tổ hợp số), cạnh là một phép biến đổi hợp lệ | Open the Lock, 단어 변환 |

---

## Ví dụ cơ bản — khoảng cách ngắn nhất từ một nguồn

```js
const bfsShortestPath = (graph, start) => {
  const dist = new Map([[start, 0]]);
  const queue = [start];
  let head = 0; // con trỏ đầu queue, thay cho shift()

  while (head < queue.length) {
    const node = queue[head++];

    for (const next of graph.get(node) ?? []) {
      if (!dist.has(next)) {
        dist.set(next, dist.get(node) + 1);
        queue.push(next);
      }
    }
  }

  return dist;
};
```

Trên grid, `dist` chính là một ma trận cùng kích thước:

```js
const bfsGrid = (grid, sr, sc) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
  const queue = [[sr, sc]];
  let head = 0;

  dist[sr][sc] = 0;

  while (head < queue.length) {
    const [r, c] = queue[head++];

    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (dist[nr][nc] !== -1) continue; // đã thăm
      if (grid[nr][nc] === 0) continue;  // tường

      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }

  return dist;
};
```

---

## Ví dụ mở rộng — BFS theo lớp & multi-source

Khi đề hỏi "sau bao nhiêu **phút/bước** thì mọi thứ xong", xử lý trọn một lớp mỗi vòng lặp:

```js
const bfsByLevel = (graph, sources) => {
  const visited = new Set(sources);
  let queue = [...sources]; // nạp TẤT CẢ nguồn cùng lúc
  let steps = 0;

  while (queue.length > 0) {
    const nextQueue = [];

    for (const node of queue) {
      for (const next of graph.get(node) ?? []) {
        if (visited.has(next)) continue;
        visited.add(next);
        nextQueue.push(next);
      }
    }

    queue = nextQueue;
    if (queue.length > 0) steps++; // chỉ tăng khi thực sự còn lớp tiếp theo
  }

  return steps;
};
```

BFS trên **đồ thị trạng thái** — hàng xóm được sinh ra chứ không có sẵn:

```js
// mỗi trạng thái là chuỗi 4 chữ số, một bước = xoay 1 bánh lên/xuống
const nextStates = (state) => {
  const result = [];

  for (let i = 0; i < state.length; i++) {
    const digit = Number(state[i]);
    for (const delta of [1, -1]) {
      const moved = (digit + delta + 10) % 10; // xoay vòng 9 -> 0, 0 -> 9
      result.push(state.slice(0, i) + moved + state.slice(i + 1));
    }
  }

  return result;
};
```

---

## Lỗi biên thường gặp

- `queue.shift()` là `O(n)` trong JS → BFS thành `O(n²)` và **timeout** với grid lớn. Dùng con trỏ `head` như trên, hoặc hai mảng `queue`/`nextQueue`
- Đánh dấu `visited` **lúc push vào queue**, không phải lúc pop ra — nếu không, cùng một đỉnh vào queue nhiều lần và số bước có thể sai
- Quên xử lý `start === target` (trả về 0 bước) hoặc `start` nằm ngay trong danh sách cấm (Open the Lock với deadend là `"0000"`)
- Lệch 1 khi đếm: đề hỏi **số bước** hay **số ô đi qua**? 게임 맵 최단거리 tính số ô nên đáp án là `dist + 1` so với cách đếm cạnh
- BFS theo lớp: tăng `steps` sai chỗ sẽ thừa 1 lớp. Kiểm tra bằng ví dụ nhỏ nhất (nguồn đứng cạnh đích)
- Không tới được đích thì phải trả về giá trị quy ước của đề (`-1`, `0`, hay `[]`) — đừng để rơi ra ngoài vòng lặp mà không trả gì
- Multi-source: nạp hết nguồn **trước khi** vào vòng `while`, chứ không BFS lần lượt từng nguồn
- BFS **không** dùng được cho đồ thị có trọng số khác nhau — đó là việc của [Dijkstra](04-dijkstra.md)

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Open the Lock](https://leetcode.com/problems/open-the-lock/) | Medium | ⬜ |
| [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | Medium | ⬜ |
| [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844) | Level 2 | ⬜ |
| [단어 변환](https://school.programmers.co.kr/learn/courses/30/lessons/43163) | Level 3 | ⬜ |
