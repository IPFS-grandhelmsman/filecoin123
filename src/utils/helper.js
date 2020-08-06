export function navigate(context, path, selector) {
  path = path.toLowerCase()
  const random = new Date().getTime()
  context.$router.push({
    path: '/' + path + '/' + selector,
    params: {
      random: random
    }
  })
}

export function loading(context, text = 'loading...') {
  const result = context.$loading({
    lock: true,
    text: text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.6)'
  })
  return result
}

/**
 * 地址格式化
 * @param {*} data        源地址
 * @param {*} number  前后保留多少位
 */
export function getAddrFormat(data, number = 16) {
  if (data.length === 0) {
    return
  }
  const str1 = data.substr(0, number)
  const str2 = data.substr(data.length - number)
  return str1 + '...' + str2
}