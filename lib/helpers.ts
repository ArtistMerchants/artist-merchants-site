export const handleize = (str: string) => {
  return str.toLowerCase().replace(/\s/g, '-')
}

export const capitalize = (str?: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
