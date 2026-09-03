// https://school.programmers.co.kr/learn/courses/30/lessons/340213
/**
 * @param {string} video_len
 * @param {string} pos
 * @param {string} op_start
 * @param {string} op_end
 * @param {string[]} commands
 * @return {string}
 */
function solution(video_len, pos, op_start, op_end, commands) {
  video_len = convertToSecond(video_len);
  pos = convertToSecond(pos);
  op_start = convertToSecond(op_start);
  op_end = convertToSecond(op_end);
  video_len;

  function skipOp(currentPos) {
    if (currentPos >= op_start && currentPos <= op_end) {
      return op_end;
    }
    return currentPos;
  }
  pos = skipOp(pos);
  for (const command of commands) {
    if (command === "prev") {
      pos = Math.max(0, pos - 10);
    } else {
      pos = Math.min(video_len, pos + 10);
    }
    pos = skipOp(pos);
  }
  console.log(toFormattedTime(pos));
  return toFormattedTime(pos);
}

function toFormattedTime(seconds) {
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, 0);
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, 0);
  return `${mm}:${ss}`;
}

function convertToSecond(str = "") {
  const [minStr, secStr] = str.split(":");
  const minutes = +minStr * 60;
  const seconds = +secStr;

  const sumSeconds = minutes + seconds;
  return sumSeconds;
}

solution("07:22", "04:05", "00:15", "04:07", ["next"]);
