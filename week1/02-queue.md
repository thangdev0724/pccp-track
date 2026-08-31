# Tuần 1 · Phần 2 — Queue

> [⬅ Stack](01-stack.md) · Tiếp theo: [Hashmap & Hashset](03-hashmap.md)

## Ý tưởng cốt lõi

- Nguyên tắc **FIFO** (First In First Out) — phần tử vào trước ra trước
- JS **không có** kiểu Queue dựng sẵn, và đây là cái bẫy lớn nhất: `arr.shift()` là `O(n)` vì phải dịch toàn bộ mảng. Dùng nó trong BFS sẽ biến `O(n)` thành `O(n²)` và **timeout**
- Cách đúng: giữ một **con trỏ `head`** và chỉ đọc `queue[head++]`, hoặc dùng **hai mảng** đổi vai nhau theo từng lớp

## Các dạng phổ biến

| Dạng | Cách làm | Bài toán tiêu biểu |
| --- | --- | --- |
| **Queue bằng con trỏ head** | `push` để thêm, `queue[head++]` để lấy ra — cả hai `O(1)` | BFS, mô phỏng xử lý tác vụ |
| **Duyệt theo lớp** | mỗi vòng xử lý trọn `queue.length` phần tử hiện tại | BFS đếm số bước, duyệt cây theo tầng |
| **Deque (hai đầu)** | thêm/bớt ở cả hai đầu | sliding window, bài toán quay vòng |
| **Monotonic deque** | giữ deque đơn điệu, lưu chỉ số | max/min của mọi cửa sổ trượt trong `O(n)` |

---

## Ví dụ cơ bản — queue `O(1)` bằng con trỏ head

Không xoá phần tử khỏi mảng, chỉ dịch con trỏ. Đổi lại tốn thêm bộ nhớ cho phần đã xử lý — hầu như luôn là đánh đổi đáng giá.

```js
const processTasks = (tasks) => {
  const queue = [...tasks];
  let head = 0;
  const done = [];

  while (head < queue.length) {
    const task = queue[head++]; // O(1), thay cho queue.shift()
    done.push(task);
    // thêm việc mới phát sinh: queue.push(...)
  }

  return done;
};
```

Khi cần một queue thật sự (giải phóng bộ nhớ, dùng lâu dài), gói lại thành class:

```js
class Queue {
  #items = [];
  #head = 0;

  get size() {
    return this.#items.length - this.#head;
  }

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    if (this.size === 0) return undefined;
    const item = this.#items[this.#head++];

    if (this.#head > 1000 && this.#head * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#head); // dọn phần đã xử lý
      this.#head = 0;
    }

    return item;
  }
}
```

---

## Ví dụ mở rộng — duyệt theo lớp & monotonic deque

Khi đề hỏi "sau bao nhiêu **bước/phút**", xử lý trọn một lớp mỗi vòng lặp bằng hai mảng:

```js
const countLevels = (start, getNeighbors) => {
  const visited = new Set([start]);
  let queue = [start];
  let level = 0;

  while (queue.length > 0) {
    const nextQueue = [];

    for (const node of queue) {
      for (const next of getNeighbors(node)) {
        if (visited.has(next)) continue;
        visited.add(next);
        nextQueue.push(next);
      }
    }

    queue = nextQueue;
    if (queue.length > 0) level++;
  }

  return level;
};
```

**Monotonic deque** — giá trị lớn nhất của mọi cửa sổ trượt kích thước `k`, tổng cộng `O(n)`:

```js
const maxSlidingWindow = (nums, k) => {
  const deque = []; // lưu CHỈ SỐ, giá trị giảm dần từ đầu tới cuối
  const result = [];
  let head = 0;

  for (let i = 0; i < nums.length; i++) {
    // phần tử nhỏ hơn nums[i] không bao giờ còn là max nữa -> bỏ khỏi đuôi
    while (deque.length > head && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);

    if (deque[head] <= i - k) head++; // phần tử đầu đã rơi ra ngoài cửa sổ
    if (i >= k - 1) result.push(nums[deque[head]]);
  }

  return result;
};
```

---

## Lỗi biên thường gặp

- **`queue.shift()` là `O(n)`** — lỗi kinh điển và nguy hiểm nhất vì code vẫn cho kết quả **đúng**, chỉ là timeout với dữ liệu lớn. Tương tự, `unshift()` cũng `O(n)`
- Với con trỏ `head`, điều kiện dừng là `head < queue.length`, **không phải** `queue.length > 0` — mảng không bao giờ ngắn lại nên `queue.length > 0` sẽ lặp vô hạn
- Cũng vì vậy, `queue.length` **không còn là số phần tử đang chờ**. Số phần tử thật là `queue.length - head`; dùng nhầm khi duyệt theo lớp sẽ sai số bước
- Duyệt theo lớp mà vừa `push` vừa đọc `queue.length` trong cùng một vòng `for` thì lớp sau bị gộp vào lớp hiện tại — chốt `const size = queue.length` **trước** vòng lặp, hoặc dùng hai mảng như ví dụ trên
- Tăng biến đếm bước sai chỗ khiến kết quả lệch đúng 1. Kiểm tra bằng trường hợp nhỏ nhất: nguồn nằm ngay cạnh đích
- Đánh dấu `visited` **lúc đưa vào queue**, không phải lúc lấy ra — nếu không, cùng một phần tử vào queue nhiều lần
- Monotonic deque phải lưu **chỉ số**, vì cần biết phần tử đầu đã rơi ra khỏi cửa sổ hay chưa (`deque[head] <= i - k`) — lưu giá trị thì không kiểm tra được

## Bài tập của phần này

Tuần 1 chưa có bài tập riêng cho Queue — cấu trúc này được dùng thật sự khi học **BFS** ở tuần 3. Các bài luyện Queue nằm ở đó:

| Bài | Độ khó | Trạng thái |
| --- | --- | --- |
| [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) *(tuần 3)* | Medium | ⬜ |
| [Open the Lock](https://leetcode.com/problems/open-the-lock/) *(tuần 3)* | Medium | ⬜ |
| [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844) *(tuần 3)* | Level 2 | ⬜ |

Xem thêm: [Tuần 3 · BFS](../week3/02-bfs.md)
