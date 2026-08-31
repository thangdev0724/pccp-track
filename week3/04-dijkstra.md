# Tuần 3 · Phần 4 — Dijkstra

> [⬅ DFS](03-dfs.md) · [Mục lục tuần 3](README.md)

## Ý tưởng cốt lõi

- Tìm đường đi ngắn nhất từ **một đỉnh nguồn** tới mọi đỉnh còn lại trên đồ thị có **trọng số không âm**
- Luôn lấy ra đỉnh có khoảng cách tạm thời **nhỏ nhất** để xử lý trước (dùng priority queue / min-heap); khi một đỉnh được lấy ra thì khoảng cách của nó đã là tối ưu và không đổi nữa
- Độ phức tạp `O((V + E) log V)` với heap. Cạnh **âm** làm hỏng giả định trên → phải dùng Bellman-Ford (ngoài phạm vi tuần này)

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Dijkstra chuẩn** | `dist[v] = min(dist[v], dist[u] + w)` | Network Delay Time |
| **Dijkstra trên grid** | đỉnh là ô `(r, c)`, trọng số suy từ giá trị ô | đường đi tổng chi phí nhỏ nhất |
| **Đổi phép cộng thành `max`** | `cost = max(cost[u], w)` thay vì `+` → tìm đường "khó khăn nhỏ nhất" | Path With Minimum Effort |
| **Thêm chiều trạng thái** | `dist[node][k]` — khoảng cách kèm ràng buộc phụ (số chặng, số lần dùng đặc quyền) | Cheapest Flights Within K Stops |

---

## Ví dụ cơ bản — Dijkstra với min-heap

JS **không có** priority queue dựng sẵn, nên phải tự viết. Bản tối giản dưới đây đủ dùng cho mọi bài trong tuần:

```js
class MinHeap {
  constructor() {
    this.data = []; // mỗi phần tử là [priority, value]
  }

  get size() {
    return this.data.length;
  }

  push(item) {
    this.data.push(item);
    let i = this.data.length - 1;

    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[parent][0] <= this.data[i][0]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;

      while (true) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;

        if (left < this.data.length && this.data[left][0] < this.data[smallest][0]) smallest = left;
        if (right < this.data.length && this.data[right][0] < this.data[smallest][0]) smallest = right;
        if (smallest === i) break;

        [this.data[smallest], this.data[i]] = [this.data[i], this.data[smallest]];
        i = smallest;
      }
    }

    return top;
  }
}
```

Dijkstra dùng heap trên, `graph[u]` là mảng các cặp `[v, w]`:

```js
const dijkstra = (graph, start, n) => {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  const heap = new MinHeap();
  heap.push([0, start]); // [khoảng cách, đỉnh]

  while (heap.size > 0) {
    const [d, node] = heap.pop();
    if (d > dist[node]) continue; // bản ghi cũ, đã có đường ngắn hơn được xử lý

    for (const [next, weight] of graph[node]) {
      const newDist = d + weight;
      if (newDist < dist[next]) {
        dist[next] = newDist;
        heap.push([newDist, next]);
      }
    }
  }

  return dist;
};
```

---

## Ví dụ mở rộng — Dijkstra trên grid

Đỉnh là ô `(r, c)`, chi phí đi vào một ô là giá trị của ô đó. Toàn bộ khung y hệt, chỉ thay cách sinh hàng xóm:

```js
const minPathCost = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));

  const heap = new MinHeap();
  dist[0][0] = grid[0][0];
  heap.push([grid[0][0], 0 * cols + 0]); // mã hoá (r, c) thành một số

  while (heap.size > 0) {
    const [d, code] = heap.pop();
    const r = Math.floor(code / cols);
    const c = code % cols;
    if (d > dist[r][c]) continue;

    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      const newDist = d + grid[nr][nc];
      if (newDist < dist[nr][nc]) {
        dist[nr][nc] = newDist;
        heap.push([newDist, nr * cols + nc]);
      }
    }
  }

  return dist[rows - 1][cols - 1];
};
```

Khi bài toán hỏi "đoạn khó khăn nhất **nhỏ nhất**" thay vì "tổng nhỏ nhất", chỉ đổi đúng công thức gộp chi phí:

```js
const newCost = Math.max(d, Math.abs(grid[nr][nc] - grid[r][c])); // thay cho d + w
```

---

## Lỗi biên thường gặp

- **Bỏ dòng `if (d > dist[node]) continue;`** — thuật toán vẫn ra đúng kết quả nhưng xử lý lại rất nhiều bản ghi cũ và có thể timeout. Đây là "lazy deletion", bắt buộc khi heap không hỗ trợ `decrease-key`
- So sánh trong heap phải theo **khoảng cách**, không phải theo đỉnh. Nhầm chỉ số `[0]`/`[1]` là lỗi im lặng, kết quả sai mà không báo lỗi
- Đỉnh đánh số **từ 1** (Network Delay Time): cấp phát `n + 1` phần tử, và khi kiểm tra "tới được hết chưa" thì bỏ qua chỉ số 0
- Không tới được đỉnh nào đó thì `dist` còn `Infinity` → phải trả về `-1` (hoặc giá trị đề quy ước), đừng trả `Infinity`
- `Infinity + w` vẫn là `Infinity` nên không tràn số, nhưng nếu dùng `Number.MAX_SAFE_INTEGER` làm vô cực thì phép cộng sẽ **tràn** và sinh so sánh sai
- Trọng số **âm** → Dijkstra sai, kể cả khi chỉ có một cạnh âm
- Ràng buộc "tối đa `k` chặng" **không** giải được bằng Dijkstra một chiều `dist[node]`: một đường dài hơn nhưng ít chặng hơn vẫn có thể là đáp án. Phải mở rộng trạng thái thành `dist[node][stops]`, hoặc dùng Bellman-Ford `k + 1` vòng
- `arr.sort()` mỗi vòng lặp thay cho heap thì `O(V² log V)` — chấp nhận được với `n ≤ 100`, nhưng đừng quen tay

## Bài tập của phần này

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) | Medium | ⬜ |
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Medium | ⬜ |
| [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) | Medium | ⬜ |
