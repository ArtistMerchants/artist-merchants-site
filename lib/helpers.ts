export const handleize = (str: string) => {
  return str.toLowerCase().replace(/\s/g, '-')
}

export const capitalize = (str?: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const compareArrays = (arr1: unknown, arr2: unknown): boolean => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }

  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}
