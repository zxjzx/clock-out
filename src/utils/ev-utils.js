let fullTime = function (time) {
  return time > 9 ? time : '0' + time
};
export default {

  //判断对象不为空
  isNotEmpty(obj) {
    if (JSON.stringify(obj) === "{}") {
      return false
    }
    return true
    // 或者 return Object.keys(obj).length === 0
  },
  //判断对象是数组
  isArray(arr) {
    if (Array.isArray(arr)) {
      return true
    }
    return false
  },

  //判断是字符串
  isString(str) {
    if (Object.prototype.toString.call(str) === "[object String]") {
      return true
    }
    return false
  },
  //获取当天凌晨时间
  getTodayDate() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = fullTime(time.getDate());
    //2019-06-06 11:56:04
    return year + '-' + month + '-' + day + ' 00:00:00'
  },


}
