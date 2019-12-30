const fullTime = function (time) {
  return time > 9 ? time : '0' + time
};
module.exports = {
  isNotEmpty(value) {
    if (value === undefined || value === 'undefined' || value === '') {
      return null
    } else {
      return JSON.stringify(value)
    }
  },
  getTodayBeginTime(){
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = fullTime(time.getDate());
    //2019-06-06 00:00:00
    return JSON.stringify(year + '-' + month + '-' + day + ' 00:00:00')
  },
  getTodayEndTime(){
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = fullTime(time.getDate())+1;
    //2019-06-07 00:00:00
    return JSON.stringify(year + '-' + month + '-' + day + ' 00:00:00')
  },
  //获取当前时间戳
  getNowTimeStamp() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = fullTime(time.getDate()) + 1;

    let hours = fullTime(time.getHours());
    let minutes = fullTime(time.getMinutes());
    let seconds = fullTime(time.getSeconds());

    return `${year}-${month}-${day}`;
    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
