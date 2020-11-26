const tools = {
  
  formatTime: function(number: number) : string {
    let num = Math.round(number);
    let min = tools.setZero(Math.floor(num / 60)); // 分钟
    let sec = tools.setZero(num % 60);
    return `${min}:${sec}`;
  },
  setZero: function(number: number):string {
    if(number < 10) {
      return `0${number}`;
    } else {
      return `${number}`;
    }
  }
}

export default tools;