export const PADDING_HORIZONTAL = 7
export const PADDING_VERTICAL = 40
export const IDLE_LOGOUT_TIME_LIMIT = 1 * 60 * 1000
export const INACTIVITY_CHECK_INTERVAL_MS = 1000

export function extractSelect(data, keyProperty, valueProperty) {
  return data?.map((item) => ({
    key: item[keyProperty]?.toString(),
    value: item[valueProperty],
  }))
}

export function getObjectById(array, id) {
  return array.find((item) => item.id === id)
}

export function maskString(string, length) {
  const maskedStr = "*".repeat(string.length - length) + string.slice(-length)
  return maskedStr
}
