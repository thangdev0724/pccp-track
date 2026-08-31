function solution(number = "4177252841", k = 4) {
  const stack = [];

  for (const ch of number) {
    while (k > 0 && stack.length && stack[stack.length - 1] < ch) {
      console.log(stack, "pop");
      stack.pop();
      k--;
    }
    console.log(stack, "push");
    stack.push(ch);
  }
  console.log(stack.pop(), "Overall");
  return stack.slice(0, stack.length - k).join("");
}
solution();
