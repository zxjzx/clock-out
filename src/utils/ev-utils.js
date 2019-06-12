
export default {

  isNotEmpty(obj){
    if(JSON.stringify(obj) === "{}"){
      return false
    }
    return true
  }
}
