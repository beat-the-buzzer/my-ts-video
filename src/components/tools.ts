// 组件内部使用的公共方法，实际上，我觉得还可以放在外层，作为一个公共的方法
const tools = {
  formatTime: function (number: number): string {
    let num = Math.round(number);
    let min = tools.setZero(Math.floor(num / 60)); // 分钟
    let sec = tools.setZero(num % 60);
    return `${min}:${sec}`;
  },
  setZero: function (number: number): string {
    if (number < 10) {
      return `0${number}`;
    } else {
      return `${number}`;
    }
  }
}

export default tools;