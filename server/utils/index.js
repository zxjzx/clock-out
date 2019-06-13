module.exports = {
  isNotEmpty(value) {
    if (value === undefined || value === 'undefined' || value === '') {
      return null
    } else {
      return JSON.stringify(value)
    }
  }
}
