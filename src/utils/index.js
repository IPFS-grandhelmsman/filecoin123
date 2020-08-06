import i18n from '@/lang'
// import { getToken } from '@/utils/auth'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'

  let date

  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return [i18n.t('js_vals.time_sun'),
        i18n.t('js_vals.time_mon'),
        i18n.t('js_vals.time_tue'),
        i18n.t('js_vals.time_wed'),
        i18n.t('js_vals.time_thu'),
        i18n.t('js_vals.time_fri'),
        i18n.t('js_vals.time_sat')
      ][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })

  return time_str
}

export function matchFloatNumber(no01, no02) {
  if (isNaN(no01) || isNaN(no02)) {
    return false
  }
  return no01 - no02 <= Number.EPSILON
}

export function formatNumber(no) {
  if (no < 1) {
    const num = (no || 0).toString()
    if (num.length > 8) {
      return num.slice(0, 8)
    } else {
      return num
    }
  }
  const num = (no || 0).toString()
  let result = ''
  const x = num.split('.')
  let x1 = x[0]
  let x2 = x.length > 1 ? '.' + x[1] : ''

  if (x2.length > 3) {
    x2 = x2.slice(0, 3)
  }

  while (x1.length > 3) {
    result = ',' + x1.slice(-3) + result
    x1 = x1.slice(0, x1.length - 3)
  }
  if (x1) {
    result = x1 + result
  }

  result += x2

  return result
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return i18n.t('js_vals.time_just_now')
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + i18n.t('js_vals.time_minutes_ago')
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + i18n.t('js_vals.time_hours_ago')
  } else if (diff < 3600 * 24 * 2) {
    return i18n.t('js_vals.time_one_day_ago')
  }

  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + i18n.t('js_vals.time_month') +
      d.getDate() + i18n.t('js_vals.time_day') +
      d.getHours() + i18n.t('js_vals.time_hour') +
      d.getMinutes() + i18n.t('js_vals.time_minute')
    )
  }
}

// 格式化历史时间
export function formatHistoryTime(time) {
  let withDay = false
  let withHour = false
  let withMinute = false

  const days = parseInt(time / (1000 * 60 * 60 * 24))
  if (days > 0) {
    withDay = true
  }

  const hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (hours > 0) {
    withHour = true
  }

  const minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
  if (minutes > 0) {
    withMinute = true
  }

  const seconds = parseInt((time % (1000 * 60)) / (1000))

  if (withDay) {
    return i18n.t('time.day_hour_minute', [days, hours, minutes])
  } else if (withHour) {
    return i18n.t('time.hour_minute_second', [hours, minutes, seconds])
  } else if (withMinute) {
    return i18n.t('time.minute_second', [minutes, seconds])
  } else {
    return i18n.t('time.second', [seconds])
  }
}

// 格式化文件大小
export function formatFileSize(value) {
  if (!value) {
    return '0 Bytes'
  }
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const temp = parseFloat(value)
  index = Math.floor(Math.log(temp) / Math.log(1024))
  let size = temp / Math.pow(1024, index)
  size = size.toFixed(2)
  return size + ' ' + units[index]
}
